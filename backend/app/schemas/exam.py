from pydantic import BaseModel
from datetime import datetime
from typing import List
from uuid import UUID

from app.schemas.question import QuestionRead

class ExamBase(BaseModel):
    title: str
    description: str | None = None
    start_time: datetime
    end_time: datetime
    duration_minutes: int
    is_published: bool = False

class ExamCreate(ExamBase):
    question_ids: List[UUID]

class ExamUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    start_time: datetime | None = None
    end_time: datetime | None = None
    duration_minutes: int | None = None
    is_published: bool | None = None
    question_ids: List[UUID] | None = None

class ExamRead(ExamBase):
    id: UUID
    questions: List[QuestionRead]

    class Config:
        orm_mode = True
