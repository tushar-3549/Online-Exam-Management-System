from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone, timedelta

from app.api.deps import get_current_active_user, get_current_admin
from app.db.session import get_db
from app.models.exam import Exam
from app.models.submission import Submission
from app.schemas.submission import SubmissionCreate, SubmissionUpdate, SubmissionRead
from app.services.grading import grade_submission

router = APIRouter()

@router.post("/start", response_model=SubmissionRead)
def start_exam(
    payload: SubmissionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    exam = db.query(Exam).get(payload.exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    # now = datetime.utcnow()
    # BD_TZ = timezone(timedelta(hours=6))
    # now = datetime.now(BD_TZ)
    now = datetime.now(timezone.utc)
    print("=========== DEBUG ===========")
    print("EXAM START:", exam.start_time)
    print("EXAM END:", exam.end_time)
    print("NOW:", now)
    print("=============================")
    if not (exam.start_time <= now <= exam.end_time):
        raise HTTPException(status_code=400, detail="Exam is not active")
    submission = (
        db.query(Submission)
        .filter(Submission.exam_id == exam.id, Submission.student_id == current_user.id)
        .first()
    )
    if submission and submission.status == "submitted":
        raise HTTPException(status_code=400, detail="Exam already submitted")
    if not submission:
        submission = Submission(exam_id=exam.id, student_id=current_user.id, answers={})
        db.add(submission)
        db.commit()
        db.refresh(submission)
    return submission

@router.patch("/{submission_id}", response_model=SubmissionRead)
def autosave_submission(
    submission_id: UUID,
    payload: SubmissionUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    submission = db.query(Submission).get(submission_id)
    if not submission or submission.student_id != current_user.id:
        raise HTTPException(status_code=404, detail="Submission not found")
    if submission.status == "submitted":
        raise HTTPException(status_code=400, detail="Already submitted")
    if payload.answers is not None:
        submission.answers = payload.answers
    if payload.status:
        submission.status = payload.status
    db.commit()
    db.refresh(submission)
    return submission

@router.post("/{submission_id}/submit", response_model=SubmissionRead)
def submit_exam(
    submission_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    submission = db.query(Submission).get(submission_id)
    if not submission or submission.student_id != current_user.id:
        raise HTTPException(status_code=404, detail="Submission not found")
    if submission.status == "submitted":
        raise HTTPException(status_code=400, detail="Already submitted")
    total_score = grade_submission(db, submission)
    submission.status = "submitted"
    submission.total_score = total_score
    db.commit()
    db.refresh(submission)
    return submission

@router.get("/{submission_id}", response_model=SubmissionRead)
def get_submission(
    submission_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    submission = db.query(Submission).get(submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    if current_user.role == "student" and submission.student_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")
    return submission

@router.get("/exam/{exam_id}", response_model=list[SubmissionRead])
def list_exam_submissions(
    exam_id: UUID,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    submissions = db.query(Submission).filter(Submission.exam_id == exam_id).all()
    return submissions

