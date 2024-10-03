import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizPage.css';

function QuizPage({ endQuiz }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        'https://opentdb.com/api.php?amount=10&type=multiple'
      );
      const formattedQuestions = res.data.results.map((q) => ({
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        answers: shuffleAnswers([
          ...q.incorrect_answers.map((a) => decodeHTML(a)),
          decodeHTML(q.correct_answer),
        ]),
      }));
      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowNextButton(true);
    setUserAnswers([...userAnswers, answer]);
    if (answer === questions[currentQuestionIdx].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedAnswer('');
      setShowNextButton(false);
    } else {
      endQuiz(score, userAnswers, questions);
    }
  };

  if (loading) {
    return <div className="loading">Loading Questions...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="question-count">
        Question {currentQuestionIdx + 1} of {questions.length}
      </div>
      <div className="question-text">
        {questions[currentQuestionIdx].question}
      </div>
      <div className="answer-options">
        {questions[currentQuestionIdx].answers.map((answer, idx) => {
          const isCorrect =
            answer === questions[currentQuestionIdx].correct_answer;
          const isSelected = answer === selectedAnswer;
          const answerClass = isSelected
            ? isCorrect
              ? 'correct'
              : 'incorrect'
            : '';

          return (
            <button
              key={idx}
              className={`answer-button ${answerClass}`}
              onClick={() => handleAnswerClick(answer)}
              disabled={selectedAnswer !== ''}
            >
              {answer}
            </button>
          );
        })}
      </div>
      {showNextButton && (
        <button className="next-button" onClick={handleNextQuestion}>
          {currentQuestionIdx + 1 === questions.length
            ? 'See Results'
            : 'Next Question'}
        </button>
      )}
    </div>
  );
}

export default QuizPage;
