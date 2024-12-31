// src/components/Books.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import '../css/Book.css'; // Korrigera importen till Books.css

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // För inmatning
  const [searchQuery, setSearchQuery] = useState(''); // För filtrering

  useEffect(() => {
    axios.get('http://localhost:4002/book/books')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
      });
  }, []);

  const handleAddToList = (bookId) => {
    const token = localStorage.getItem('token');
    console.log('handleAddToList token =', token); // <-- logga

    axios.post('http://localhost:4002/user-books/add-to-list',
      { bookId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => {
      if (res.data.added) {
        alert('Book added to your list!');
      }
    })
    .catch(err => console.error('Error adding book to list:', err));
  };

  const handleRemoveFromList = (bookId) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:4002/user-books/remove-from-list/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.data.removed) {
          alert('Book removed from your list!');
        }
      })
      .catch(err => console.error('Error removing book from list:', err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  // Filtrera böcker baserat på sökfrågan
  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="books_page">
      <h1>Books</h1>
      
      {/* Sökformulär */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for books or authors..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">SEARCH</button>
      </form>

      {/* Visa alla böcker eller filtrerade böcker */}
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              role={role}
              handleAddToList={handleAddToList}
              handleRemoveFromList={handleRemoveFromList}
            />
          ))
        ) : (
          <p>Inga böcker hittades.</p>
        )}
      </div>
    </div>
  );
};

export default Books;

