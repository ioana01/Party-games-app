import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../../utils/api';
import QuestionCard from '../trivia/question-card/question-card';
import { auth, database } from "../../firebase";
import './trivia.css';
  
const TOTAL_QUESTIONS = 10;

const TriviaGame = (props) => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [isPlayer, setPlayer] = useState(false);
    const [checkOnce, setCheck] = useState(false);

    useEffect(async () => {
        if(!checkOnce) {
            const roomsRefs = database.ref('rooms');
    
            await roomsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
    
                    if(childId === props.match.params.id) {
                        const players = childData.players;
    
                        players.map(player => {
                            if(player.name === auth.currentUser.email) {
                                setPlayer(true);
                            }
                        })
                    }
                });
            });

            setCheck(true);
        }
    });

    const startTrivia = async () => {
        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, 'easy');

        setLoading(true);
        setGameOver(false); 
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    const checkAnswer = (e) => {
        if (!gameOver) {
            const buttons = Array.prototype.slice.call(document.getElementsByClassName('answer'));

            buttons.map(button => {
                if(button.value === questions[number].correct_answer) {
                    button.classList.add('green-answer');
                } else {
                    button.classList.add('red-answer');
                }
            })

            const answer = e.currentTarget.value;
            const correct = questions[number].correct_answer === answer;
        
            if (correct) {
                setScore((prev) => prev + 1);
            }
            
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers((prev) => [...prev, answerObject]);
        }
    };

    const exitTrivia = () => {
        window.location = '/';
    }

    const nextQuestion = () => {
        const nextQ = number + 1;
        const buttons = Array.prototype.slice.call(document.getElementsByClassName('answer'));

        buttons.map(button => {
            if(button.value === questions[number].correct_answer) {
                button.classList.remove('green-answer');
            } else {
                button.classList.remove('red-answer');
            }
        })

        if (nextQ === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQ);
        }
    };

    return (
        <div className='trivia-container'>
            <h1>QUIZ</h1>
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <>
                <button className='start' onClick={startTrivia}> Start </button>
                <button onClick={exitTrivia}> Exit </button>
            </>
            ) : null}

            {!gameOver ? 
            <p className='score'>Score: {score}</p> 
            : null}

            {loading ? 
            <p>Loading Questions...</p> 
            : null}

            {!loading && !gameOver && (
            <QuestionCard
                questionNr={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
                isPlayer={isPlayer}
            />)}

            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
            <button className='next' onClick={nextQuestion}>
                Next Question
            </button>
            ) : null}
        </div>
    );
}

export default TriviaGame;