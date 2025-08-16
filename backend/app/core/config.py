from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    database_url: str
    
    # JWT
    jwt_secret: str
    access_token_expire_minutes: int = 30
    
    # Cloudflare R2
    r2_access_key: str
    r2_secret_key: str
    r2_endpoint: str
    r2_bucket: str
    r2_account_id: str
    
    # Environment
    environment: str = "development"
    debug: bool = True
    frontend_url: str = "http://localhost:5173"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()