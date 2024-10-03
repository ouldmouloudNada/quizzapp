// src/components/HomePage.js

import React from 'react';
import './HomePage.css';
import quizImage from '../assets/Logo.svg';

function HomePage({ startQuiz }) {
  const handleStart = () => {
    startQuiz(10); 
  };

  return (
    <div className="home-container">
      <img src={quizImage}  className="home-image" />
      <h1 className="home-title">Test your Knowledge!</h1>
      <p className="home-description">
        Challenge your self with randomly generated quizzes
      </p>
      <button className="start-button" onClick={handleStart}>
        Let's Get Started
      </button>
    </div>
  );
}

export default HomePage;
