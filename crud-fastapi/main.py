from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model.books import Book

books_db = [
    {
        "id": 0,
        "title": "The Vampire Diaries",
        "year": "2005",
        "score": 5
    },
    {
        "id": 1,
        "title": "A Song of Ice and Fire: A Game of Thrones",
        "year": "1996",
        "score": 4.8
    },
    {
        "id": 2,
        "title": "True Blood",
        "year": "2008",
        "score": 4.7
    },
    {
        "id": 3,
        "title": "Shadowhunters: City of Bones",
        "year": "2007",
        "score": 4.6
    },
    {
        "id": 4,
        "title": "The Witcher: The Last Wish",
        "year": "1993",
        "score": 4.9
    }
]

origins = [
    "http://localhost:5173"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return{
        "message": "Hi, this is my app."
    }

@app.get("/api/v1/books", response_model=list[Book])
def get_books():
    return books_db

@app.get("/api/v1/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    for book in books_db:
        if book["id"] == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

@app.post("/api/v1/books", response_model=Book)
def create_book(book_data: Book):
    new_book = book_data.model_dump()
    books_db.append(new_book)
    return new_book

@app.delete("/api/v1/books/{book_id}", response_model=Book)
def delete_book(book_id: int):
    for book in books_db:
        if book["id"] == book_id:
            book_deleted = book
            books_db.remove(book)
            return book_deleted
    raise HTTPException(status_code=404, detail="Book not found")