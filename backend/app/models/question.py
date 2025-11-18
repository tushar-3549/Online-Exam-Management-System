import uuid
from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.dialects.postgresql import UUID, JSON

from app.db.session import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    complexity = Column(String, nullable=True)  # Class 1, Class 2...
    type = Column(String, nullable=False)       # single_choice, multi_choice, text, image_upload
    options = Column(JSON, nullable=True)       # list of strings
    correct_answers = Column(JSON, nullable=True)  # single value or list
    max_score = Column(Integer, default=1)
    tags = Column(JSON, nullable=True)          # list of tags
