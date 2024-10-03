import React from 'react';
import './ResultPage.css';
/* import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
 */
function ResultPage({ score, totalQuestions, questions, userAnswers, resetQuiz }) {
  return (
    <div className="result-container">
      <div className="result-summary">
        {/* <div className="score-circle"> */}
          <div className="score-text">
            {score}/{totalQuestions}
          </div>
        {/* </div> */}
        <p>You answered {score} out of {totalQuestions} questions correctly.</p>
      </div>
      <div className="answers-list">
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index] === question.correct_answer;
          return (
            <div key={index} className={`answer-item ${isCorrect ? 'correct-answer' : 'incorrect-answer'}`}>
              <p className="question">{index + 1}. {question.question}</p>
              <p className={`user-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                {userAnswers[index]}
              </p>
              {!isCorrect && (
                <p className="correct-answer-text">Correct answer: <span className="correct">{question.correct_answer}</span></p>
              )}
            </div>
          );
        })}
      </div>
      <button className="restart-button" onClick={resetQuiz}>
        Restart Quiz
      </button>
    </div>
  );
}

export default ResultPage;
