import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// //COUNTER

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     case 'ZERO':
//       return 0;
//     default:
//       return state;
//   }
// };

// const store = createStore(counterReducer);

// const App = () => {
//   return (
//     <div>
//       <div>{store.getState()}</div>
//       <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>
//         plus
//       </button>
//       <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>reset</button>
//       <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>
//         minus
//       </button>
//     </div>
//   );
// };

// const renderApp = () => {
//   ReactDOM.render(<App />, document.getElementById('root'));
// };

// renderApp();
// store.subscribe(renderApp);
