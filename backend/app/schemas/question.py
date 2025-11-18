from pydantic import BaseModel
from typing import List, Any
from uuid import UUID

class QuestionBase(BaseModel):
    title: str
    description: str | None = None
    complexity: str | None = None
    type: str
    options: List[str] | None = None
    correct_answers: Any | None = None
    max_score: int = 1
    tags: List[str] | None = None

class QuestionCreate(QuestionBase):
    pass

class QuestionRead(QuestionBase):
    id: UUID

    class Config:
        orm_mode = True
