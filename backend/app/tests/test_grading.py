from types import SimpleNamespace
from app.services.grading import grade_submission

class DummyQuestion:
    def __init__(self, id_, type_, correct_answers, max_score=1):
        self.id = id_
        self.type = type_
        self.correct_answers = correct_answers
        self.max_score = max_score

class DummyExam:
    def __init__(self, questions):
        self.questions = questions

class DummySubmission:
    def __init__(self, exam, answers):
        self.exam = exam
        self.answers = answers

def test_grade_single_choice():
    q = DummyQuestion("1", "single_choice", "A", 1)
    exam = DummyExam([q])
    sub = DummySubmission(exam, {"1": "A"})
    score = grade_submission(None, sub)  # db not used
    assert score == 1

def test_grade_multi_choice_exact_match():
    q = DummyQuestion("1", "multi_choice", ["A", "B"], 2)
    exam = DummyExam([q])
    sub = DummySubmission(exam, {"1": ["B", "A"]})
    score = grade_submission(None, sub)
    assert score == 2

def test_grade_incorrect():
    q = DummyQuestion("1", "single_choice", "A", 1)
    exam = DummyExam([q])
    sub = DummySubmission(exam, {"1": "B"})
    score = grade_submission(None, sub)
    assert score == 0
