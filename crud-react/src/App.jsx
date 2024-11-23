import { useState, useEffect } from "react";

function BooksItems({ title, id, year, score }) {
  return (
    <article className="bg-gray-100 rounded-xl shadow-md p-6 transform transition-all hover:scale-105 hover:shadow-xl">
      <h3 className="text-center text-xl font-semibold text-gray-800 mb-4">
        {title}
      </h3>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <span className="font-medium">ID:</span> {id}
        </p>
        <p>
          <span className="font-medium">Year:</span> {year}
        </p>
        <p>
          <span className="font-medium">Score:</span> {score}
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-red-600 text-white w-full rounded-lg py-2 font-medium hover:bg-red-700 transition-colors">
          Delete
        </button>
      </div>
    </article>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [dataForm, setDataForm] = useState({}); // para manejar el formulario

  const getBooks = async () => {
    const allBooks = await fetch("http://localhost:8000/api/v1/books");
    const booksJson = await allBooks.json();
    setBooks(booksJson);
  };

  const handlerFormInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  // este para controlar lo que pasa cuando presionamos el botón de enviar al formulario
  const handlerFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(dataForm); // este para comprobar si estpa recibiendo los datos

    // para que funcione, mandamos una petición fetch
    await fetch("http://localhost:8000/api/v1/books", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(dataForm),
    });

    // llamar a la función para que la modificación en backend se vea reflejada en frontend
    getBooks();
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <main className="w-full min-h-screen bg-gray-300 text-gray-800 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">This is my app</h1>
      {/* formulario para pasar al backend para que se cree el nuevo libro */}
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mx-auto space-y-4 mb-6"
        onSubmit={handlerFormSubmit}
        action=""
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Add a New Book
        </h2>

        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ID
          </label>
          <input
            onChange={handlerFormInput}
            value={dataForm.id}
            id="id"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="id"
            required
            placeholder="Enter book ID"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            onChange={handlerFormInput}
            value={dataForm.title}
            id="title"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="title"
            required
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Year
          </label>
          <input
            onChange={handlerFormInput}
            value={dataForm.year}
            id="year"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            name="year"
            required
            placeholder="Enter publication year"
          />
        </div>

        <div>
          <label
            htmlFor="score"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Score
          </label>
          <input
            onChange={handlerFormInput}
            value={dataForm.score}
            id="score"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            step="0.1"
            name="score"
            required
            placeholder="Enter book score"
          />
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          type="submit"
        >
          Create Book
        </button>
      </form>

      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.length === 0 ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          books.map((book) => (
            <BooksItems
              key={book.id}
              title={book.title}
              id={book.id}
              year={book.year}
              score={book.score}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default App;
