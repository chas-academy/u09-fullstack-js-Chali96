
import React, { useEffect } from 'react'
import axios from 'axios'
import{useNavigate, useParams} from 'react-router-dom'

const DeleteBook = () => {
    const navigate= useNavigate()
    const{id} = useParams()
    useEffect(()=>{
        axios.delete('http://localhost:4001/book/delete/'+id)
        .then(res=>{
            if(res.data.deleted){
                navigate('/books')
    
            }
        }).catch((err)=>{
            console.log(err)
        })
      },[])
}

export default DeleteBook