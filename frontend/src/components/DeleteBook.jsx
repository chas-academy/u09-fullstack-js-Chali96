
import React, { useEffect } from 'react'
import axios from 'axios'
import{useNavigate, useParams} from 'react-router-dom'

const DeleteBook = () => {
    const navigate= useNavigate()
    const{id} = useParams()

  useEffect(() => {
  const token = localStorage.getItem('token');
  axios.delete(`http://localhost:4002/book/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    if (res.data.deleted) {
      navigate('/books');
    }
  })
  .catch(err => console.log(err));
}, [id]);

}

export default DeleteBook