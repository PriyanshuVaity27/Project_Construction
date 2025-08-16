from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.document import Document
from app.schemas.document import DocumentResponse, DocumentCreate
from app.utils.cloudflare_r2 import r2_service
import uuid

router = APIRouter()


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    description: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Upload to R2
    upload_result = await r2_service.upload_file(file, "documents")
    
    # Save metadata to database
    db_document = Document(
        id=str(uuid.uuid4()),
        file_name=upload_result["file_name"],
        file_url=upload_result["file_url"],
        file_size=upload_result["file_size"],
        content_type=upload_result["content_type"],
        uploaded_by=current_user.id,
        description=description
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document


@router.get("/", response_model=List[DocumentResponse])
def read_documents(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Document)
    
    # Non-admin users can only see their own documents
    if current_user.role.value != "admin":
        query = query.filter(Document.uploaded_by == current_user.id)
    
    documents = query.offset(skip).limit(limit).all()
    return documents


@router.get("/{document_id}", response_model=DocumentResponse)
def read_document(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    document = db.query(Document).filter(Document.id == document_id).first()
    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Non-admin users can only see their own documents
    if current_user.role.value != "admin" and document.uploaded_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return document


@router.delete("/{document_id}")
def delete_document(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    document = db.query(Document).filter(Document.id == document_id).first()
    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Non-admin users can only delete their own documents
    if current_user.role.value != "admin" and document.uploaded_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Extract key from URL for R2 deletion
    key = document.file_url.split(f"{r2_service.bucket}.{r2_service.account_id}.r2.cloudflarestorage.com/")[1]
    r2_service.delete_file(key)
    
    db.delete(document)
    db.commit()
    return {"message": "Document deleted successfully"}