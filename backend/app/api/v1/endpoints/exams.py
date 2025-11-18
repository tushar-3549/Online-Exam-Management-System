from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_current_active_user
from app.db.session import get_db
from app.models.exam import Exam
from app.models.question import Question
from app.schemas.exam import ExamCreate, ExamRead, ExamUpdate

router = APIRouter()

# @router.post("/", response_model=ExamRead)
# def create_exam(exam_in: ExamCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
#     questions = db.query(Question).filter(Question.id.in_(exam_in.question_ids)).all()
#     if not questions:
#         raise HTTPException(status_code=400, detail="No valid questions selected")
#     exam = Exam(
#         title=exam_in.title,
#         description=exam_in.description,
#         start_time=exam_in.start_time,
#         end_time=exam_in.end_time,
#         duration_minutes=exam_in.duration_minutes,
#         is_published=exam_in.is_published,
#         questions=questions,
#     )
#     db.add(exam)
#     db.commit()
#     db.refresh(exam)
#     return exam


@router.post("/", response_model=ExamRead)
def create_exam(exam_in: ExamCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    from datetime import timezone, timedelta

    BD_TZ = timezone(timedelta(hours=6))

    def normalize(dt):
        # if dt is naive -> assign BD timezone
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=BD_TZ)
        # convert to UTC
        return dt.astimezone(timezone.utc)

    start_utc = normalize(exam_in.start_time)
    end_utc   = normalize(exam_in.end_time)

    questions = db.query(Question).filter(Question.id.in_(exam_in.question_ids)).all()
    if not questions:
        raise HTTPException(status_code=400, detail="No valid questions selected")

    exam = Exam(
        title=exam_in.title,
        description=exam_in.description,
        start_time=start_utc,
        end_time=end_utc,
        duration_minutes=exam_in.duration_minutes,
        is_published=exam_in.is_published,
        questions=questions,
    )

    db.add(exam)
    db.commit()
    db.refresh(exam)
    return exam



@router.get("/", response_model=List[ExamRead])
def list_exams(db: Session = Depends(get_db), current_user=Depends(get_current_active_user)):
    # students only see published
    query = db.query(Exam)
    if current_user.role == "student":
        query = query.filter(Exam.is_published == True)
    return query.all()

@router.get("/{exam_id}", response_model=ExamRead)
def get_exam(exam_id: UUID, db: Session = Depends(get_db), current_user=Depends(get_current_active_user)):
    exam = db.query(Exam).get(exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    if current_user.role == "student" and not exam.is_published:
        raise HTTPException(status_code=403, detail="Exam not published")
    return exam

@router.put("/{exam_id}", response_model=ExamRead)
def update_exam(exam_id: UUID, exam_in: ExamUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    exam = db.query(Exam).get(exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    for field, value in exam_in.dict(exclude_unset=True).items():
        if field == "question_ids":
            questions = db.query(Question).filter(Question.id.in_(value)).all()
            exam.questions = questions
        else:
            setattr(exam, field, value)
    db.commit()
    db.refresh(exam)
    return exam
