import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/dashboard.css'; // Ny eller uppdaterad CSS-fil

const Dashboard = () => {
  const [userBooks, setUserBooks] = useState([]);

  // Hämta din token (om du använder JWT)
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Hämta användarens böcker vid mount
    axios.get('http://localhost:4002/user-books', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUserBooks(res.data.books);
      })
      .catch((err) => {
        console.error('Error fetching user books:', err);
      });
  }, [token]);

  // Ta bort bok från listan
  const handleRemoveFromList = (bookId) => {
    axios.delete(`http://localhost:4002/user-books/remove-from-list/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.removed) {
          alert('Book removed from your list!');
          // Uppdatera state så att boken direkt försvinner från vyn
          setUserBooks((prevBooks) => prevBooks.filter((b) => b._id !== bookId));
        }
      })
      .catch((err) => {
        console.error('Error removing book from list:', err);
      });
  };

  return (
    <div className="dashboard">
      <h2>Your Books</h2>
      {userBooks && userBooks.length > 0 ? (
        <div className="dashboard-book-list">
          {userBooks.map((book) => (
            <div className="dashboard-book-card" key={book._id}>
              <img
                src={book.imageUrl || '/default-image.jpg'}
                alt={book.name}
                className="dashboard-book-image"
              />
              <div className="dashboard-book-details">
                <h3>{book.name}</h3>
                <p>{book.author}</p>
              </div>
              <div className="dashboard-book-actions">
                <button
                  className="dashboard-remove-btn"
                  onClick={() => handleRemoveFromList(book._id)}
                >
                  Remove from My List
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default Dashboard;

