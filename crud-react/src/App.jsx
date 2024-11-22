import { useState, useEffect } from "react"

function App() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const allBooks = await fetch("http://localhost:8000/api/v1/books");
    const booksJson = await allBooks.json();
    console.log(booksJson);
  };

  // una vez que se haya renderizado el front, que nos ejecute el getBooks
  useEffect(() => {
    getBooks();
  });

  return (
    <>
      <h1 className="text-red-600" >this is my app</h1>
    </>
  )
}

export default App
