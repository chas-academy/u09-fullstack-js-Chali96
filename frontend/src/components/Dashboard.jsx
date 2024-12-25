import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userBooks, setUserBooks] = useState([]);

  const token = localStorage.getItem('token'); // Hämta token från localStorage

  axios.get('http://localhost:4001/user-books', {
    headers: {
      Authorization: `Bearer ${token}`  // Skicka med token i headers
    }
  })
  .then((res) => {
    setUserBooks(res.data.books);
  })
  .catch((err) => {
    console.error('Error fetching user books:', err);
  });

  return (
    <div className="dashboard">
      <h2>Your Books</h2>
      <ul>
        {userBooks.length > 0 ? (
          userBooks.map((book) => (
            <li key={book._id}>
              <h3>{book.name}</h3>
              <p>{book.author}</p>
            </li>
          ))
        ) : (
          <p>No books available</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
