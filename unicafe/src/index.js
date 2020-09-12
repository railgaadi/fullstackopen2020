import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);
  const total = good + neutral + bad;
  const avgScore = (good - bad) / total
  const positivePercent = good / total * 100
  if (total) return (
    <div>
      <Heading name="Give Feedback" />
      <Button handleClick={handleGoodClick} name="Good" />
      <Button handleClick={handleNeutralClick} name="Neutral" />
      <Button handleClick={handleBadClick} name="Bad" />
      <Heading name="Stats" />
      <table>
        <tbody>
          <Statistics name="Total Good" number={good} />
          <Statistics name="Total Neutral" number={neutral} />
          <Statistics name="Total Bad" number={bad} />
          <Statistics name="Total Votes" number={total} />
          <Statistics name="Average Score" number={avgScore.toFixed(1)} />
          <Statistics name="Positive Percentage Score" number={positivePercent.toFixed(1)} />
        </tbody>
      </table>

    </div>
  )
  else return (
    <div>
      <Heading name="Give Feedback" />
      <Button handleClick={handleGoodClick} name="Good" />
      <Button handleClick={handleNeutralClick} name="Neutral" />
      <Button handleClick={handleBadClick} name="Bad" />
      <Heading name="Stats" />
      <p>No Feedback yet</p>
    </div>
  )
}

const Heading = ({ name }) => <h1>{name}</h1>

const Button = ({ handleClick, name }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Statistics = ({ name, number }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

