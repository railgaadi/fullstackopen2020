import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdotes = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return anecdotes;
    } else {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
  });
  const dispatch = useDispatch();

  const handleVote = (id, content) => {
    dispatch(vote(id));
    dispatch(setNotification(`You upvoted for ${content}`, 3)); //in seconds
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <b>
              <div>{anecdote.content}</div>
            </b>
            <div>
              <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
                vote: {anecdote.votes}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Anecdotes;
