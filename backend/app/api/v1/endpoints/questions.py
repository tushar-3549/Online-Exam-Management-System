import json
from typing import List

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.db.session import get_db
from app.models.question import Question
from app.schemas.question import QuestionRead
from app.services.excel_import import parse_questions_excel

router = APIRouter()

@router.post("/import", response_model=dict)
async def import_questions_from_excel(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    if not file.filename.endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="Only .xlsx files are supported")
    contents = await file.read()
    valid_rows, errors = parse_questions_excel(contents)
    for row in valid_rows:
        q = Question(
            title=row["title"],
            description=row.get("description"),
            complexity=row.get("complexity"),
            type=row["type"],
            options=row.get("options"),
            correct_answers=row.get("correct_answers"),
            max_score=row.get("max_score", 1),
            tags=row.get("tags"),
        )
        db.add(q)
    db.commit()
    return {"inserted": len(valid_rows), "errors": errors}

@router.get("/", response_model=List[QuestionRead])
def list_questions(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
    search: str | None = None,
    complexity: str | None = None,
):
    query = db.query(Question)
    if search:
        query = query.filter(Question.title.ilike(f"%{search}%"))
    if complexity:
        query = query.filter(Question.complexity == complexity)
    return query.all()

@router.get("/{question_id}", response_model=QuestionRead)
def get_question(question_id: str, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    question = db.query(Question).get(question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question
