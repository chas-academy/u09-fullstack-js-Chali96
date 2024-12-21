import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from './BookCard';
import'../css/book.css'


const Books = ({role}) => {
  const[books,setBooks]= useState([]);
  useEffect(()=>{
      axios.get('http://localhost:3001/book/books')
      .then((res)=>{
        setBooks(res.data)
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])
  return (
    <div className="books_page">
    <div className="book-list">
      {
        books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book._id} book={book} role={role} />
          ))
        ) : (
          <p>No books available</p> // Visa meddelande om inga böcker finns
        )
      }
    </div>
  </div>
    
  )
}

export default Books