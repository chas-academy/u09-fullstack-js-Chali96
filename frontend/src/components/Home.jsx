import React from 'react';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-text">Welcome to Book Verse</h1>
          <p className="hero-description">
            Browse our top collection of books. The next adventure in your reading journey is waiting!
          </p>
          <button className="hero-button">Explore Now</button>
        </div>
        <div className="hero-image"></div>
      </div>

      {/* Section about reading */}
      <section className="reading-benefits">
        <h2>Why Reading Matters</h2>
        <p>
          Reading opens doors to new worlds, improves focus and critical thinking, <br /> and helps you 
          unwind. Discover the transformative power of a good book!
        </p>
        <ul className="benefits-list">
          <li>🌟 Enhances creativity and imagination</li>
          <li>📚 Improves vocabulary and language skills</li>
          <li>🧘‍♂️ Reduces stress and boosts mental well-being</li>
        </ul>
      </section>

      {/* Featured Authors */}
      <section className="featured-authors">
        <h2>Meet the Masters of Literature</h2>
        <div className="author-list">
          <div className="author-card">
            <h3>Jane Austen</h3>
            <p>Known for classics like "Pride and Prejudice" and "Emma."</p>
          </div>
          <div className="author-card">
            <h3>J.K. Rowling</h3>
            <p>Famous for the magical "Harry Potter" series.</p>
          </div>
          <div className="author-card">
            <h3>George Orwell</h3>
            <p>Renowned for his thought-provoking "1984" and "Animal Farm."</p>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="inspirational-quote">
        <blockquote>
          "A reader lives a thousand lives before he dies . . . The man who never reads lives only one."
        </blockquote>
        <cite>— George R.R. Martin</cite>
      </section>
    </div>
  );
};

export default Home;
