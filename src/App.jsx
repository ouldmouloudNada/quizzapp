import { useState } from 'react';
import './App.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';

function App() {
  const [step, setStep] = useState(1); 
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const value = 0.66;

<CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />;

  const startQuiz = (total) => {
    setTotalQuestions(total);
    setStep(2);
  };

  const endQuiz = (finalScore, userAnswers, questions) => {
    setScore(finalScore);
    setUserAnswers(userAnswers);
    setQuestions(questions);
    setStep(3);
  };

  const resetQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    setUserAnswers([]);
    setQuestions([]);
    setStep(1);
  };
  
  return (
    <div className="App">
      {step === 1 && <HomePage startQuiz={startQuiz} />}
      {step === 2 && <QuizPage endQuiz={endQuiz} />}
      {step === 3 && (
        <ResultPage 
          score={score} 
          totalQuestions={totalQuestions} 
          questions={questions}
          userAnswers={userAnswers}
          resetQuiz={resetQuiz} 
        />
      )}
    </div>
  );
}

export default App;
