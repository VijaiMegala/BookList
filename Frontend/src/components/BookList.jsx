import React, { useState, useEffect } from "react";

export default function BookList({reloadBookList}) {
  const [books, setBooks] = useState([]);
  const [displayedBooksCount, setDisplayedBooksCount] = useState(2); 
  const apiUrl=import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(`${apiUrl}/books`)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Error fetching books:", error));
  }, [reloadBookList]);

  const deleteBook = (id) => {
    fetch(`${apiUrl}/books/${id}`, {
      method: "DELETE"
    })
      .then(() => setBooks(books.filter(book => book._id !== id)))
      .catch(error => console.error("Error deleting book:", error));
  };

  const handleLoadMore = () => {
    setDisplayedBooksCount(displayedBooksCount + 2);
  };

  return (
    <div className="mt-3">
      <div className="flex flex-col gap-3">
        {books.slice(0, displayedBooksCount).map((book, index) => (
          <div
            className="border-b py-2 bg-white rounded-md p-3 w-full md:w-[90%] lg:w-[80%] xl:w-[1024px] flex flex-col md:flex-row gap-4"
            key={index}
          >
            <div className="flex flex-col w-full md:w-3/4">
              <div>
                <label className="font-semibold">Title: </label>
                <span>{book.title}</span>
              </div>
              <div>
                <label className="font-semibold">Author: </label>
                <span>{book.author}</span>
              </div>
              <div>
                <label className="font-semibold">Description: </label>
                <span>{book.description}</span>
              </div>
            </div>
            <div className="w-full md:w-1/4 flex justify-center items-center">
              <button
                onClick={() => deleteBook(book._id)}
                className="text-white h-fit bg-red-600 p-2 rounded-md w-[90px]"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {displayedBooksCount < books.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="flex items-center text-white hover:opacity-80"
          >
            <span>Load More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
