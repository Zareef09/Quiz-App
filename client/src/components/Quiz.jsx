import { useState, useEffect } from 'react'
import QUESTIONS from '../questions.js'
import QuestionTimer from './QuestionTimer.jsx'
import Summary from './Summary.jsx'

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])
  const [answerState, setAnswerState] = useState('') 
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [shuffledAnswers, setShuffledAnswers] = useState([])

  const activeQuestionIndex = userAnswers.length
  const quizCompleted = activeQuestionIndex === QUESTIONS.length

  useEffect(() => {
    if (!quizCompleted) {
      const answers = [...QUESTIONS[activeQuestionIndex].answers]
      answers.sort(() => Math.random() - 0.5)
      setShuffledAnswers(answers)
    }
  }, [activeQuestionIndex, quizCompleted])

  function handleSelectAnswer(selectedAnswer) {
    setSelectedAnswer(selectedAnswer)
    setAnswerState('selected')

    setTimeout(() => {
      if (selectedAnswer === null) {
        setAnswerState('skipped')

        setTimeout(() => {
          setUserAnswers((prevUserAnswers) => {
            return [
              ...prevUserAnswers,
              {
                answer: null,
                isCorrect: false,
              },
            ]
          })

          setAnswerState('')
          setSelectedAnswer(null)
        }, 2000)
      } else {
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
      }
    }, 1000)
  }

  function handleRestart() {
    setUserAnswers([])
    setAnswerState('')
    setSelectedAnswer(null)
  }

  if (quizCompleted) {
    return <Summary userAnswers={userAnswers} onRestart={handleRestart} />
  }

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
