import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import './App.css'
import { useState } from "react";

function App() {
  const [reloadBookList, setReloadBookList] = useState(false)
  const reload=()=>{
    setReloadBookList(!reloadBookList)
  }

  return (
    <div className="bg-green-400  min-h-screen">
      <div className="bg-black w-full p-6 flex justify-center items-center">
         <h1 className="text-4xl h-full font-bold text-center text-green-400">Book Management App</h1>
      </div>
      <div className="flex justify-center flex-col items-center p-6 gap-3">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-bold">Add a New Book</h2>
          <AddBook reload={reload} />
        </div>
        
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-2xl font-bold">Book List</h2>
          <BookList reloadBookList={reloadBookList}/>
        </div>
      </div>
    </div>
  );
}

export default App;
