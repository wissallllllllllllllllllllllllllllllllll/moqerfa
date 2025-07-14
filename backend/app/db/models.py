from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, Enum, TIMESTAMP, func
from sqlalchemy.orm import relationship, declarative_base
import enum

Base = declarative_base()

class UserRole(enum.Enum):
    student = "student"
    teacher = "teacher"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    # Relationships
    subjects = relationship("Subject", back_populates="teacher")
    progress = relationship("StudentProgress", back_populates="student")
    test_results = relationship("TestResult", back_populates="student")
    chat_history = relationship("ChatHistory", back_populates="student")

class Subject(Base):
    __tablename__ = "subjects"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    teacher_id = Column(Integer, ForeignKey("users.id"))
    teacher = relationship("User", back_populates="subjects")
    courses = relationship("Course", back_populates="subject")
    progress = relationship("StudentProgress", back_populates="subject")
    tests = relationship("Test", back_populates="subject")

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True)
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    chapter = Column(Integer, nullable=False)
    subject = relationship("Subject", back_populates="courses")
    tests = relationship("Test", back_populates="course")

class StudentProgress(Base):
    __tablename__ = "student_progress"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    time_spent = Column(Integer)
    score = Column(Float)
    updated_at = Column(TIMESTAMP, server_default=func.now())
    student = relationship("User", back_populates="progress")
    subject = relationship("Subject", back_populates="progress")

class Test(Base):
    __tablename__ = "tests"
    id = Column(Integer, primary_key=True)
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String(255), nullable=False)
    generated_by = Column(String(255), default="LLM")
    subject = relationship("Subject", back_populates="tests")
    course = relationship("Course", back_populates="tests")
    results = relationship("TestResult", back_populates="test")

class TestResult(Base):
    __tablename__ = "test_results"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    test_id = Column(Integer, ForeignKey("tests.id"))
    score = Column(Float, nullable=False)
    submitted_at = Column(TIMESTAMP, server_default=func.now())
    student = relationship("User", back_populates="test_results")
    test = relationship("Test", back_populates="results")

class ChatHistory(Base):
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    student = relationship("User", back_populates="chat_history")
