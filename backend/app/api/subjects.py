from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.models import Subject, Course, User, UserRole
from app.db.session import get_db
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/subjects", tags=["subjects"])

class SubjectCreate(BaseModel):
    name: str
    teacher_id: int

class SubjectUpdate(BaseModel):
    name: Optional[str] = None
    teacher_id: Optional[int] = None

class CourseCreate(BaseModel):
    subject_id: int
    title: str
    content: str
    chapter: int

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    chapter: Optional[int] = None

# Professor endpoints
@router.post("/", response_model=dict)
def create_subject(subject: SubjectCreate, db: Session = Depends(get_db)):
    db_subject = Subject(**subject.dict())
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return {"id": db_subject.id}

@router.get("/", response_model=List[dict])
def get_all_subjects(db: Session = Depends(get_db)):
    subjects = db.query(Subject).all()
    return [{"id": s.id, "name": s.name, "teacher_id": s.teacher_id} for s in subjects]

@router.get("/{subject_id}", response_model=dict)
def get_subject_by_id(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(404, "Subject not found")
    return {"id": subject.id, "name": subject.name, "teacher_id": subject.teacher_id}

@router.put("/{subject_id}", response_model=dict)
def update_subject(subject_id: int, update: SubjectUpdate, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(404, "Subject not found")
    for k, v in update.dict(exclude_unset=True).items():
        setattr(subject, k, v)
    db.commit()
    db.refresh(subject)
    return {"id": subject.id, "name": subject.name, "teacher_id": subject.teacher_id}

@router.delete("/{subject_id}", response_model=dict)
def delete_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(404, "Subject not found")
    db.delete(subject)
    db.commit()
    return {"msg": "Subject deleted"}

# Courses endpoints
@router.post("/{subject_id}/courses", response_model=dict)
def create_course(subject_id: int, course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return {"id": db_course.id}

@router.get("/{subject_id}/courses", response_model=List[dict])
def get_courses_by_subject(subject_id: int, db: Session = Depends(get_db)):
    courses = db.query(Course).filter(Course.subject_id == subject_id).all()
    return [{"id": c.id, "title": c.title, "content": c.content, "chapter": c.chapter} for c in courses]

@router.get("/courses/{course_id}", response_model=dict)
def get_course_by_id(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(404, "Course not found")
    return {"id": course.id, "title": course.title, "content": course.content, "chapter": course.chapter, "subject_id": course.subject_id}

@router.put("/courses/{course_id}", response_model=dict)
def update_course(course_id: int, update: CourseUpdate, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(404, "Course not found")
    for k, v in update.dict(exclude_unset=True).items():
        setattr(course, k, v)
    db.commit()
    db.refresh(course)
    return {"id": course.id, "title": course.title, "content": course.content, "chapter": course.chapter, "subject_id": course.subject_id}

@router.delete("/courses/{course_id}", response_model=dict)
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(404, "Course not found")
    db.delete(course)
    db.commit()
    return {"msg": "Course deleted"}
