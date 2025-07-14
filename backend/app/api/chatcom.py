from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from app.db.models import Test, TestResult, Course, Subject, User, ChatHistory, StudentProgress
from app.db.session import get_db
from pydantic import BaseModel
from typing import List, Dict
import random
import tempfile

router = APIRouter(prefix="/chatcom", tags=["chatcom"])

# Placeholder for LLM-based QCM generation
def generate_mcq(subject_id, course_id):
    # In production, call OpenAI or similar here
    return {
        "questions": [
            {"question": "What is Python?", "choices": ["A snake", "A language", "A car", "A fruit"], "answer": 1},
            {"question": "2+2?", "choices": ["3", "4", "5", "6"], "answer": 1}
        ]
    }

class GenerateTestRequest(BaseModel):
    subject_id: int
    course_id: int

class SubmitTestRequest(BaseModel):
    student_id: int
    test_id: int
    answers: List[int]  # Indexes of selected answers

class FileSummaryResponse(BaseModel):
    summary: str

class SaveChatRequest(BaseModel):
    student_id: int
    message: str
    response: str

@router.post("/generate_test", response_model=dict)
def generate_test(data: GenerateTestRequest, db: Session = Depends(get_db)):
    # Generate test using LLM (placeholder)
    mcq = generate_mcq(data.subject_id, data.course_id)
    test = Test(subject_id=data.subject_id, course_id=data.course_id, title="Auto-generated QCM")
    db.add(test)
    db.commit()
    db.refresh(test)
    # In production, store questions/answers in DB or vectorstore
    return {"test_id": test.id, "questions": mcq["questions"]}

@router.post("/submit_test", response_model=dict)
def submit_test(data: SubmitTestRequest, db: Session = Depends(get_db)):
    # In production, fetch correct answers from DB/vectorstore
    # Here, we use a static answer key for demo
    answer_key = [1, 1]  # Should match generate_mcq
    score = sum([1 for i, a in enumerate(data.answers) if i < len(answer_key) and a == answer_key[i]]) / len(answer_key) * 100
    result = TestResult(student_id=data.student_id, test_id=data.test_id, score=score)
    db.add(result)
    db.commit()
    return {"score": score}

@router.get("/test_results/{student_id}", response_model=List[dict])
def get_test_results(student_id: int, db: Session = Depends(get_db)):
    results = db.query(TestResult).filter_by(student_id=student_id).all()
    return [{"test_id": r.test_id, "score": r.score, "submitted_at": r.submitted_at} for r in results]

@router.post("/upload_and_summarize", response_model=FileSummaryResponse)
def upload_and_summarize(file: UploadFile = File(...)):
    # Save file temporarily
    with tempfile.NamedTemporaryFile(delete=True) as tmp:
        tmp.write(file.file.read())
        tmp.flush()
        # In production, send file content to LLM for summarization
        # Here, we return a placeholder summary
        summary = f"Résumé du fichier {file.filename} (démo)."
    return {"summary": summary}

@router.post("/save_chat", response_model=dict)
def save_chat(data: SaveChatRequest, db: Session = Depends(get_db)):
    chat = ChatHistory(student_id=data.student_id, message=data.message, response=data.response)
    db.add(chat)
    db.commit()
    return {"msg": "Chat saved"}

@router.get("/chat_history/{student_id}", response_model=List[dict])
def get_chat_history(student_id: int, db: Session = Depends(get_db)):
    chats = db.query(ChatHistory).filter_by(student_id=student_id).order_by(ChatHistory.created_at).all()
    return [{"message": c.message, "response": c.response, "created_at": c.created_at} for c in chats]

@router.get("/student_dashboard/{student_id}", response_model=dict)
def get_student_dashboard(student_id: int, db: Session = Depends(get_db)):
    # Progression globale
    progresses = db.query(StudentProgress).filter_by(student_id=student_id).all()
    progress_data = [{"subject_id": p.subject_id, "time_spent": p.time_spent, "score": p.score, "updated_at": p.updated_at} for p in progresses]
    # Tests
    test_results = db.query(TestResult).filter_by(student_id=student_id).all()
    tests_data = [{"test_id": r.test_id, "score": r.score, "submitted_at": r.submitted_at} for r in test_results]
    # Chat history
    chats = db.query(ChatHistory).filter_by(student_id=student_id).order_by(ChatHistory.created_at).all()
    chat_data = [{"message": c.message, "response": c.response, "created_at": c.created_at} for c in chats]
    return {
        "progress": progress_data,
        "tests": tests_data,
        "chat_history": chat_data
    }

@router.get("/teacher_dashboard/{teacher_id}", response_model=dict)
def get_teacher_dashboard(teacher_id: int, db: Session = Depends(get_db)):
    # Progression par classe
    subjects = db.query(Subject).filter_by(teacher_id=teacher_id).all()
    subject_ids = [s.id for s in subjects]
    progresses = db.query(StudentProgress).filter(StudentProgress.subject_id.in_(subject_ids)).all()
    # Liste des étudiants
    student_ids = list(set([p.student_id for p in progresses]))
    students = db.query(User).filter(User.id.in_(student_ids)).all()
    students_data = [{"id": s.id, "full_name": s.full_name, "email": s.email} for s in students]
    # Progression individuelle
    progress_by_student = {}
    for p in progresses:
        if p.student_id not in progress_by_student:
            progress_by_student[p.student_id] = []
        progress_by_student[p.student_id].append({"subject_id": p.subject_id, "score": p.score, "time_spent": p.time_spent, "updated_at": p.updated_at})
    return {
        "subjects": [{"id": s.id, "name": s.name} for s in subjects],
        "students": students_data,
        "progress_by_student": progress_by_student
    }
