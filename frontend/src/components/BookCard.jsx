import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({book, role}) => {
    const{name,author,imageUrl}=book
  return (
    <div className='book-card'>
        <img src={imageUrl}alt={name} className='book-image'/>
        <div className='book-details'>
            <h3>{name}</h3>
            <p>{author}</p>
        </div>
        {role==='admin' && <div className=' book-actions'>
            <button className='edit-btn'><Link to={`/edit/${book._id}`}className='editlink-btn'>edit</Link></button>
            <button className='delete-btn'><Link to={`/delete/${book._id}`}className='deletelink-btn'>delete</Link></button>
            
        </div> }
        
    </div>
  )
}

export default BookCard