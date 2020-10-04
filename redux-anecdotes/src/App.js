import React, { useEffect } from 'react';
import AnecdotesForm from './components/AnecdotesForm';
import Anecdotes from './components/Anecdotes';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { useDispatch } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <Notification />
      <AnecdotesForm />
    </div>
  );
};

export default App;
