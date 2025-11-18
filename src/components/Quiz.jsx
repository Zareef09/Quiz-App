import { useState } from 'react'
import QUESTIONS from '../questions.js'
import QuestionTimer from './QuestionTimer.jsx'
import completedImg from '../assets/quiz-complete.png'

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])
  const [answerState, setAnswerState] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const activeQuestionIndex = userAnswers.length
  const quizCompleted = activeQuestionIndex === QUESTIONS.length

  function handleSelectAnswer(selectedAnswer) {
    setSelectedAnswer(selectedAnswer)
    setAnswerState('selected')

    setTimeout(() => {
      const isCorrect =
        selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]

      setAnswerState(isCorrect ? 'correct' : 'wrong')

      setTimeout(() => {
        setUserAnswers((prevUserAnswers) => {
          return [
            ...prevUserAnswers,
            {
              answer: selectedAnswer,
              isCorrect: isCorrect,
            },
          ]
        })

        setAnswerState('')
        setSelectedAnswer(null)
      }, 2000)
    }, 1000)
  }

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={completedImg} alt="Trophy icon" />
        <h2>Quiz Completed</h2>
      </div>
    )
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
  shuffledAnswers.sort(() => Math.random() - 0.5)

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={() => handleSelectAnswer(null)}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button
                onClick={() => handleSelectAnswer(answer)}
                className={selectedAnswer === answer ? answerState : ''}
                disabled={answerState !== ''}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
