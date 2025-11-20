import completedImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js'

export default function Summary({ userAnswers, onRestart }) {
  const skippedAnswers = userAnswers.filter((answer) => answer.answer === null)

  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect)

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  )

  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  )

  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare

  return (
    <div id="summary">
      <img src={completedImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>

      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>

      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer'

          if (answer.answer === null) {
            cssClass += ' skipped'
          } else if (answer.isCorrect) {
            cssClass += ' correct'
          } else {
            cssClass += ' wrong'
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer.answer ?? 'Skipped'}</p>
            </li>
          )
        })}
      </ol>

      <button onClick={onRestart}>Restart</button>
    </div>
  )
}
