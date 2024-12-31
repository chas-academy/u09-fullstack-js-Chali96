import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = ({setRole}) => {
    const navigate = useNavigate()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`)
    .then(res=>{
        if(res.data.logout){
            setRole('')
            navigate('/')

        }
    }).catch((err)=>{
        console.log(err)
    })
  },[])
}

export default Logout