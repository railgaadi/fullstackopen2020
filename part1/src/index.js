import React, { useState } from "react";
import ReactDOM from "react-dom";

// EVENT HANDLING REVISTED

// //COMPLEX STATE

// const Button = ({ onClick, text }) => (
//   <button onClick={onClick}>{text}</button>
// )

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         The app is used by clickiing buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const App = (props) => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text='left' />
//       <Button onClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   )
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )

// SIMPLE STATE

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => setCounter(counter - 1);
//   const resetCount = () => setCounter(0);
//   return (
//     <div>
//       <Display counter={counter} />
//       <Button handleClick={increaseByOne} text="+" />
//       <Button handleClick={resetCount} text="Reset" />
//       <Button handleClick={decreaseByOne} text="-" />
//     </div>
//   )
// }

// const Display = ({ counter }) => <p>{counter}</p>

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>{text}</button>
// )

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )

// FIRST APP

// const Hello = (props) => (
//   <div>
//     <h1>Hello {props.name}, you are {props.age} years old</h1>
//   </div>
// )

// const App = () => {
//   const name = "Peter";
//   const age = 20;
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Georgy" age={age} />
//       <Hello name="Mary" age={age + 10} />
//     </div>
//   )
// }

// const App = (props) => {
//   const { counter } = props
//   return (
//     <div>{counter}</div>
//   )
// }

// let counter = 1

// const refresh = () => {
//   ReactDOM.render(<App counter={counter} />,
//     document.getElementById('root'));
// }

// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000)
