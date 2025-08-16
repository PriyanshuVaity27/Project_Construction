import boto3
from botocore.client import Config
from botocore.exceptions import ClientError
from fastapi import UploadFile, HTTPException
from app.core.config import settings
import uuid
import os


class CloudflareR2Service:
    def __init__(self):
        self.client = boto3.client(
            's3',
            endpoint_url=settings.r2_endpoint,
            aws_access_key_id=settings.r2_access_key,
            aws_secret_access_key=settings.r2_secret_key,
            config=Config(signature_version='s3v4'),
            region_name='auto'
        )
        self.bucket = settings.r2_bucket
        self.account_id = settings.r2_account_id
    
    async def upload_file(self, file: UploadFile, folder: str = "documents") -> dict:
        """Upload file to Cloudflare R2"""
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")
        
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        key = f"{folder}/{unique_filename}"
        
        try:
            # Upload file
            self.client.upload_fileobj(
                file.file,
                self.bucket,
                key,
                ExtraArgs={
                    'ContentType': file.content_type or 'application/octet-stream'
                }
            )
            
            # Generate public URL
            file_url = f"https://{self.bucket}.{self.account_id}.r2.cloudflarestorage.com/{key}"
            
            return {
                "file_url": file_url,
                "key": key,
                "file_name": file.filename,
                "content_type": file.content_type,
                "file_size": str(file.size) if hasattr(file, 'size') else None
            }
        
        except ClientError as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")
    
    def delete_file(self, key: str) -> bool:
        """Delete file from Cloudflare R2"""
        try:
            self.client.delete_object(Bucket=self.bucket, Key=key)
            return True
        except ClientError:
            return False
    
    def generate_presigned_url(self, key: str, expires_in: int = 3600) -> str:
        """Generate presigned URL for file access"""
        try:
            url = self.client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket, 'Key': key},
                ExpiresIn=expires_in
            )
            return url
        except ClientError as e:
            raise HTTPException(status_code=500, detail=f"Failed to generate URL: {str(e)}")


# Global instance
r2_service = CloudflareR2Service()