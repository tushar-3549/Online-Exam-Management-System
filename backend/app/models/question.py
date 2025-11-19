import uuid
from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.dialects.postgresql import UUID, JSON

from app.db.session import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    complexity = Column(String, nullable=True)  
    type = Column(String, nullable=False)       
    options = Column(JSON, nullable=True)      
    correct_answers = Column(JSON, nullable=True)  
    max_score = Column(Integer, default=1)
    tags = Column(JSON, nullable=True)      
