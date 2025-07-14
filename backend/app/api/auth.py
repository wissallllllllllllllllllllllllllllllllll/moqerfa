from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.db.models import User, UserRole
from app.core.security import (
    verify_password, get_password_hash, create_access_token, create_refresh_token,
    send_reset_code_email, get_current_user, blacklist_token, oauth2_scheme, SECRET_KEY, ALGORITHM
)
from jose import jwt, JWTError
from app.db.session import get_db
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Request
import random, string
import asyncio

router = APIRouter(prefix="/auth", tags=["auth"])

# In-memory store for reset codes (for demo; use Redis/DB in prod)
reset_codes = {}

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: UserRole

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetVerify(BaseModel):
    email: EmailStr
    code: str

class PasswordResetConfirm(BaseModel):
    email: EmailStr
    code: str
    new_password: str

class PasswordChange(BaseModel):
    old_password: str
    new_password: str

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # ...existing code for user creation...
    pass

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token({"sub": user.id})
    refresh_token = create_refresh_token({"sub": user.id})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

@router.post("/refresh_token")
async def refresh_token(request: Request):
    data = await request.json()
    refresh_token_str = data.get("refresh_token")
    try:
        payload = jwt.decode(refresh_token_str, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    new_access_token = create_access_token({"sub": user_id})
    return {"access_token": new_access_token, "token_type": "bearer"}

@router.post("/logout")
def logout(token: str = Depends(oauth2_scheme)):
    blacklist_token(token)
    return {"msg": "Logged out"}

@router.post("/password/forgot")
def forgot_password(request: PasswordResetRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # Generate code, store, and send email
    code = ''.join(random.choices(string.digits, k=6))
    reset_codes[request.email] = code
    background_tasks.add_task(send_reset_code_email, request.email, code)
    return {"msg": "Reset code sent"}

@router.post("/password/verify")
def verify_code(data: PasswordResetVerify):
    if reset_codes.get(data.email) == data.code:
        return {"msg": "Code verified"}
    raise HTTPException(status_code=400, detail="Invalid code")

@router.post("/password/reset")
def reset_password(data: PasswordResetConfirm, db: Session = Depends(get_db)):
    if reset_codes.get(data.email) != data.code:
        raise HTTPException(status_code=400, detail="Invalid code")
    # ...existing code to update password...
    pass

@router.post("/password/change")
def change_password(data: PasswordChange, db: Session = Depends(get_db), current_user: User = Depends()):
    # ...existing code to change password for logged-in user...
    pass
