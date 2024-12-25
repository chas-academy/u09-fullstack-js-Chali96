import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/book/books')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
      });
  }, []);

  const handleAddToList = (bookId) => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:4001/user-books/add-to-list', { bookId }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      if (res.data.added) {
        alert('Book added to your list!');
      }
    })
    .catch((err) => {
      console.error('Error adding book to list:', err);
    });
  };

  const handleRemoveFromList = (bookId) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:4001/user-books/remove-from-list/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      if (res.data.removed) {
        alert('Book removed from your list!');
      }
    })
    .catch((err) => {
      console.error('Error removing book from list:', err);
    });
  };

  return (
    <div className="books_page">
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard 
              key={book._id} 
              book={book} 
              role={role} 
              handleAddToList={handleAddToList}
              handleRemoveFromList={handleRemoveFromList}
            />
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default Books;
