from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    database_url: str
    
    # JWT
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Supabase Storage
    supabase_url: str
    supabase_anon_key: str
    supabase_service_key: str
    supabase_bucket: str = "greenearthspaces"
    
    # Environment
    environment: str = "development"
    debug: bool = True
    frontend_url: str = "http://localhost:5173"
    
    # Admin credentials
    admin_password: str = "admin123"
    employee1_password: str = "emp123"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()