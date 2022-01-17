import React from 'react';
import './question-card.css';

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
  isPlayer
}) => (
    <>
        <p className='number'>Question: {questionNr} / {totalQuestions}</p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div className='answers-container'>
            {answers.map((answer) => (
                <button className='answer' disabled={userAnswer ? true : false} value={answer} onClick={isPlayer ? callback : null}>
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
            ))}
        </div>
    </>
);

export default QuestionCard;