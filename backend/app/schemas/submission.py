from pydantic import BaseModel
from typing import Dict, Any
from uuid import UUID
from datetime import datetime

class SubmissionBase(BaseModel):
    answers: Dict[str, Any] | None = None

class SubmissionCreate(SubmissionBase):
    exam_id: UUID

class SubmissionUpdate(SubmissionBase):
    status: str | None = None

class SubmissionRead(SubmissionBase):
    id: UUID
    exam_id: UUID
    student_id: UUID
    status: str
    total_score: int | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
