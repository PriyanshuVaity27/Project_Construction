from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DocumentBase(BaseModel):
    file_name: str
    description: Optional[str] = None


class DocumentCreate(DocumentBase):
    pass


class DocumentResponse(DocumentBase):
    id: str
    file_url: str
    file_size: Optional[str] = None
    content_type: Optional[str] = None
    uploaded_by: str
    created_at: datetime

    class Config:
        from_attributes = True