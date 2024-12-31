import React, { useEffect } from 'react'
import "../css/Login.css"
import { useState } from 'react'
import axios from 'axios'
import{useNavigate, useParams} from 'react-router-dom'

const EditBook = () => {
    const[name,setName]=useState('')
    const[author,setAuthor]=useState('')
    const[imageUrl,setImageUrl]=useState('')
  const navigate= useNavigate()
  const{id} = useParams()

  useEffect(() => {
    axios.get(`https://u09-fullstack-js-chali96.onrender.com/book/edit/${id}`)
      .then(res => {
        setName(res.data.name);
        setAuthor(res.data.author);
        setImageUrl(res.data.imageUrl);
      })
      .catch(err => console.log(err));
  }, [id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`https://u09-fullstack-js-chali96.onrender.com/book/edit/${id}`, 
      { name, author, imageUrl }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      if (res.data.updated) {
        navigate('/books');
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='student-form-container'>
        <form className='student-form' onSubmit={handleSubmit}>
            <h2 className='stu-title' >Edit Book</h2>
            <div className='form-group'>
          <label htmlFor='book'>Book Name:</label>
          <input type='text' id='book' placeholder='Enter Book Name' name='book' value={name} onChange={(e)=> setName(e.target.value)}/> 
        </div>
        <div className='form-group'>
          <label htmlFor='author'>Author Name:</label>
          <input type='text' id='author' placeholder='Enter Author Name' name='author'value={author}  onChange={(e)=> setAuthor(e.target.value)}/> 
        </div>
        <div className='form-group'>
          <label htmlFor='image'>image Url:</label>
          <input type='text' id='image'placeholder='Paste ImageUrl' name='image' value={imageUrl}  onChange={(e)=> setImageUrl(e.target.value)}/> 
        </div>
       
        <button type='submit'>Update</button>
             </form>
    </div>
  )
}

export default EditBook