import React, { useEffect } from 'react'
import '../css/Home.css'


const Home = () => {
  
  return (
    <div className='hero'>
        <div className="hero-content">
            <h1 className='hero-text'>Welcome to Book Verse</h1>
            <p className='hero-description'>
            Browse our top collection of books. The next adventure in your reading journey is waiting!
            </p>
        </div>
        <div className='hero-image'></div>
    </div>
  )
}

export default Home