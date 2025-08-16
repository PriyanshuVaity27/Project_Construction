from sqlalchemy import Column, String, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True)
    file_name = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    file_size = Column(String)
    content_type = Column(String)
    uploaded_by = Column(String, ForeignKey("users.id"), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    uploader = relationship("User", foreign_keys=[uploaded_by])