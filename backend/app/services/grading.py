from sqlalchemy.orm import Session
from typing import Any, Dict

from app.models.submission import Submission
from app.models.question import Question

def normalize_answer(ans: Any):
    if isinstance(ans, list):
        return sorted(ans)
    return ans

def grade_submission(db: Session, submission: Submission) -> int:
    total_score = 0
    answers: Dict[str, Any] = submission.answers or {}
    for question in submission.exam.questions:
        qid = str(question.id)
        if qid not in answers:
            continue
        student_answer = answers[qid]
        if question.type in ("single_choice", "multi_choice"):
            if normalize_answer(student_answer) == normalize_answer(question.correct_answers):
                total_score += question.max_score or 1
    return total_score
