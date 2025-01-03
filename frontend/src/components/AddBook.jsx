// src/components/AddBook.jsx
import React, { useState } from 'react';
import "../css/Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";

const AddBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            author,
            imageUrl,
        };
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('https://u09-fullstack-js-chali96.onrender.com/book/add', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.added) {
                enqueueSnackbar("Book created successfully", { variant: "success" });
                navigate('/books');
            } else {
                console.log(response);
                enqueueSnackbar("Failed to create book", { variant: "error" });
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar("Error adding book", { variant: "error" });
        }
    }

    return (
        <div className='student-form-container'>
            <form className='student-form' onSubmit={handleSubmit}>
                <h2 className='stu-title'>Add Book</h2>
                <div className='form-group'>
                    <label htmlFor='book'>Book Name:</label>
                    <input 
                        type='text' 
                        id='book' 
                        placeholder='Enter Book Name' 
                        name='book' 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    /> 
                </div>
                <div className='form-group'>
                    <label htmlFor='author'>Author Name:</label>
                    <input 
                        type='text' 
                        id='author' 
                        placeholder='Enter Author Name' 
                        name='author' 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} 
                        required 
                    /> 
                </div>
                <div className='form-group'>
                    <label htmlFor='image'>Image Url:</label>
                    <input 
                        type='text' 
                        id='image'
                        placeholder='Paste ImageUrl' 
                        name='image' 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} 
                    /> 
                </div>
                <button type='submit'>Add Book</button>
            </form>
        </div>
    )
}

export default AddBook;
