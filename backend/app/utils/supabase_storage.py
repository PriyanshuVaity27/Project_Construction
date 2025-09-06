from supabase import create_client, Client
from fastapi import UploadFile, HTTPException
from app.core.config import settings
import uuid
import os


class SupabaseStorageService:
    def __init__(self):
        self.client: Client = create_client(
            settings.supabase_url,
            settings.supabase_service_key
        )
        self.bucket = settings.supabase_bucket
    
    async def upload_file(self, file: UploadFile, folder: str = "documents") -> dict:
        """Upload file to Supabase Storage"""
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")
        
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        key = f"{folder}/{unique_filename}"
        
        try:
            # Read file content
            content = await file.read()
            
            # Upload to Supabase Storage
            result = self.client.storage.from_(self.bucket).upload(
                key,
                content,
                file_options={
                    "content-type": file.content_type or "application/octet-stream"
                }
            )
            
            if result.error:
                raise HTTPException(status_code=500, detail=f"Upload failed: {result.error}")
            
            # Get public URL
            public_url = self.client.storage.from_(self.bucket).get_public_url(key)
            
            return {
                "file_url": public_url,
                "key": key,
                "file_name": file.filename,
                "content_type": file.content_type,
                "file_size": str(len(content)) if content else None
            }
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")
    
    def delete_file(self, key: str) -> bool:
        """Delete file from Supabase Storage"""
        try:
            result = self.client.storage.from_(self.bucket).remove([key])
            return not result.error
        except Exception:
            return False
    
    def get_file_url(self, key: str) -> str:
        """Get public URL for file"""
        return self.client.storage.from_(self.bucket).get_public_url(key)


# Global instance
storage_service = SupabaseStorageService()