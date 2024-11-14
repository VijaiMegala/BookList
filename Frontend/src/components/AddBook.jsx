import React, { useState } from "react";

export default function AddBook({reload}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const addBook = async(e) => {
    e.preventDefault();
    if (!title || !author || !description) {
      alert("All fields are required!");
      return;
    }

    await fetch(`${apiUrl}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, author, description })
    })
      .then(response => response.json())
      .then(data => {
        setTitle("");
        setAuthor("");
        setDescription("");
        alert("Book added successfully");
      })
      .catch(error => console.error("Error adding book:", error));
      reload();
  };

  return (
    <form onSubmit={addBook} className="flex w-full flex-col md:flex-row gap-4 md:gap-6 ">
      <div className="flex justify-center w-full gap-2">
        <input
          className="w-full md:w-[200px] lg:w-[300px] rounded-md p-2 outline-none hover:outline-green-800"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          className="w-full md:w-[200px] lg:w-[300px] rounded-md p-2 outline-none hover:outline-green-800"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <textarea
          className="w-full md:w-[200px] lg:w-[300px] rounded-md p-2 outline-none hover:outline-green-800"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
      </div>
      <div className="flex justify-center md:justify-start items-center w-full">
        <button type="submit" className="bg-blue-500 text-white w-full md:w-[120px] h-full rounded-md px-4 py-2">
          Add Book
        </button>
      </div>
    </form>
  );
}
