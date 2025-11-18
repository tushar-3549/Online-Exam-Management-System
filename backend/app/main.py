from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine, Base
from app.api.v1.endpoints import auth, questions, exams, submissions

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Online Exam Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(questions.router, prefix="/api/v1/questions", tags=["questions"])
app.include_router(exams.router, prefix="/api/v1/exams", tags=["exams"])
app.include_router(submissions.router, prefix="/api/v1/submissions", tags=["submissions"])

@app.get("/")
def read_root():
    return {"message": "Online Exam Management System API"}
