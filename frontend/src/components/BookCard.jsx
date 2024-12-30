import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Book.css';


const BookCard = ({ book, role, handleRemoveFromList, handleAddToList }) => {
  const { name, author, imageUrl, _id } = book;

  return (
    <div className="book-card">
      <img src={imageUrl || '/default-image.jpg'} alt={name} className="book-image" />
      <div className="book-details">
        <h3>{name}</h3>
        <p>{author}</p>
      </div>

      {/* Om användaren är admin, visa knappar för CRUD på böcker */}
      {role === 'admin' && (
        <div className="book-actions">
          <button className="edit-btn">
            <Link to={`/edit/${_id}`} className="editlink-btn">Edit</Link>
          </button>
          <button className="delete-btn">
            <Link to={`/delete/${_id}`} className="deletelink-btn">Delete</Link>
          </button>
        </div>
      )}

      {/* För alla användare, visa knapp för att lägga till boken till deras läslista */}
      {role !== '' && (
        <div className="book-actions">
          <button className='addtolist-btn' onClick={() => handleAddToList(_id)}>Add to My List</button>
        </div>
      )}
      

    </div>
  );
};

export default BookCard;
