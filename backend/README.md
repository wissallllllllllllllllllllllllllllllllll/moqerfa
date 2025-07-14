# Smart Knowledge Base Backend

## Overview
This backend powers the Smart Knowledge Base platform, providing:
- Vector-based content storage and search
- Personalized student tracking
- AI-powered quiz and summary generation
- Teacher dashboard APIs
- Content recommendation
- Secure authentication (Firebase Auth, OAuth2)
- Data visualization endpoints

## Tech Stack
- FastAPI, SQLAlchemy, PostgreSQL, Redis, Celery, FAISS, Firebase, OpenAI

## Structure
- `app/` - Main application code
- `tests/` - Unit/integration tests

## Getting Started
1. Install dependencies: `pip install -r requirements.txt`
2. Set up environment variables (see `.env.example`)
3. Run the app: `uvicorn app.main:app --reload`

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
