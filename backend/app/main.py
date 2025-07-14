# FastAPI entrypoint
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, subjects, progress, chatcom

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(subjects.router)
app.include_router(progress.router)
app.include_router(chatcom.router)

# Include routers here
# from .api import ...

@app.get("/")
def read_root():
    return {"message": "Smart Knowledge Base Backend"}
