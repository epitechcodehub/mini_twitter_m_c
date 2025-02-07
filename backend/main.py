from os import getenv
from typing import List, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends
from sqlmodel import SQLModel, Field, Session, create_engine, select
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

DATABASE_URL = "sqlite:///database.db"


class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content: str

class Comment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    post_id: int
    content: str

engine = create_engine(DATABASE_URL, echo=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware, allow_origins = origins, allow_credentials = True, allow_methods = ["*"], allow_headers = ["*"]
)

def get_session():
    with Session(engine) as session:
        yield session

class CreatePostModel(BaseModel):
    title: str
    content: str

@app.post("/posts", response_model=CreatePostModel)
@app.put("/posts", response_model=CreatePostModel)
def create_post(post: CreatePostModel, session: Session = Depends(get_session)):
    post = Post(title=post.title, content=post.content)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@app.get("/posts", response_model=List[Post])
def read_posts(session: Session = Depends(get_session)):
    posts = session.exec(select(Post)).all()
    return posts

if __name__ == "__main__":
    import uvicorn

    host = getenv("HOST", "127.0.0.1")
    port = getenv("PORT", "8000")

    try:
        port = int(port)
    except ValueError:
        port = 8000

    uvicorn.run(app, host="127.0.0.1", port=8000)