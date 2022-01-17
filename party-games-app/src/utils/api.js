import { shuffleArray } from './utils';

export const fetchQuizQuestions = async (amount, difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();

  return data.results.map((question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }));
};