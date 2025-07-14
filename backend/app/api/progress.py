from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.models import StudentProgress, User, Subject
from app.db.session import get_db
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/progress", tags=["progress"])

class TrackTimeRequest(BaseModel):
    student_id: int
    subject_id: int
    duration: int  # minutes

class UpdateScoreRequest(BaseModel):
    student_id: int
    subject_id: int
    score: float

@router.post("/track_time_spent")
def track_time_spent(data: TrackTimeRequest, db: Session = Depends(get_db)):
    progress = db.query(StudentProgress).filter_by(student_id=data.student_id, subject_id=data.subject_id).first()
    if not progress:
        progress = StudentProgress(student_id=data.student_id, subject_id=data.subject_id, time_spent=data.duration)
        db.add(progress)
    else:
        progress.time_spent = (progress.time_spent or 0) + data.duration
    db.commit()
    return {"msg": "Time tracked"}

@router.post("/update_test_score")
def update_test_score(data: UpdateScoreRequest, db: Session = Depends(get_db)):
    progress = db.query(StudentProgress).filter_by(student_id=data.student_id, subject_id=data.subject_id).first()
    if not progress:
        progress = StudentProgress(student_id=data.student_id, subject_id=data.subject_id, score=data.score)
        db.add(progress)
    else:
        progress.score = data.score
    db.commit()
    return {"msg": "Score updated"}

@router.get("/student/{student_id}")
def get_student_progress(student_id: int, db: Session = Depends(get_db)):
    progresses = db.query(StudentProgress).filter_by(student_id=student_id).all()
    return [{"subject_id": p.subject_id, "time_spent": p.time_spent, "score": p.score, "updated_at": p.updated_at} for p in progresses]

@router.get("/student/{student_id}/subject/{subject_id}")
def get_student_progress_by_subject(student_id: int, subject_id: int, db: Session = Depends(get_db)):
    progress = db.query(StudentProgress).filter_by(student_id=student_id, subject_id=subject_id).first()
    if not progress:
        raise HTTPException(404, "Progress not found")
    return {"subject_id": progress.subject_id, "time_spent": progress.time_spent, "score": progress.score, "updated_at": progress.updated_at}

# Professor endpoints
@router.get("/class/{subject_id}")
def get_class_progress(subject_id: int, db: Session = Depends(get_db)):
    progresses = db.query(StudentProgress).filter_by(subject_id=subject_id).all()
    if not progresses:
        return {"average_score": None, "average_time_spent": None}
    avg_score = sum([p.score or 0 for p in progresses]) / len(progresses)
    avg_time = sum([p.time_spent or 0 for p in progresses]) / len(progresses)
    return {"average_score": avg_score, "average_time_spent": avg_time}

@router.get("/teacher/{teacher_id}/students")
def get_all_students_progress_for_teacher(teacher_id: int, db: Session = Depends(get_db)):
    subjects = db.query(Subject).filter_by(teacher_id=teacher_id).all()
    subject_ids = [s.id for s in subjects]
    progresses = db.query(StudentProgress).filter(StudentProgress.subject_id.in_(subject_ids)).all()
    result = {}
    for p in progresses:
        if p.student_id not in result:
            result[p.student_id] = []
        result[p.student_id].append({"subject_id": p.subject_id, "score": p.score, "time_spent": p.time_spent, "updated_at": p.updated_at})
    return result
