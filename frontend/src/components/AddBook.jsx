import React from 'react'
import "../css/Login.css"
import { useState } from 'react'
import axios from 'axios'
import{useNavigate} from 'react-router-dom'
import { useSnackbar } from "notistack";

const AddBook = () => {
    const[name,setName]=useState('')
    const[author,setAuthor]=useState('')
    const[imageUrl,setImageUrl]=useState('')
  const navigate= useNavigate()
  const { enqueueSnackbar } = useSnackbar();


  const  handleSubmit =(e)=>{
    e.preventDefault()
    const data = {
        name,
        author,
        imageUrl,
    };
axios.post('http://localhost:3000/book/add',data)
.then((res) => {
    if(res.data.added)
    {
      enqueueSnackbar("book created", { variant: "success" });
  navigate('/books')
    }
    else{
        console.log(res )
    }
  
 
  
})
.catch((error) => {
  console.log(error);
});
}
  return (
    <div className='student-form-container'>
        <form className='student-form' onSubmit={handleSubmit}>
            <h2 className='stu-title' >Add Book</h2>
            <div className='form-group'>
          <label htmlFor='book'>Book Name:</label>
          <input type='text' id='book' placeholder='Enter Book Name' name='book' onChange={(e)=> setName(e.target.value)}/> 
        </div>
        <div className='form-group'>
          <label htmlFor='author'>Author Name:</label>
          <input type='text' id='author' placeholder='Enter Author Name' name='author' onChange={(e)=> setAuthor(e.target.value)}/> 
        </div>
        <div className='form-group'>
          <label htmlFor='image'>image Url:</label>
          <input type='text' id='image'placeholder='Paste ImageUrl' name='image' onChange={(e)=> setImageUrl(e.target.value)}/> 
        </div>
       
        <button type='submit'>Add Book</button>
             </form>
    </div>
  )
}

export default AddBook