import anecdoteService from '../services/anecdotes';

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const vote = (id) => {
  return async (dispatch) => {
    const upvotedAnecdote = await anecdoteService.upvote(id);
    dispatch({
      type: 'ADD_VOTE',
      data: { id: upvotedAnecdote.id },
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE': {
      const id = action.data.id;
      const anecdoteToUpvote = state.find((anecdote) => anecdote.id === id);
      const upvotedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : upvotedAnecdote
      );
    }
    case 'INIT_ANECDOTES': {
      return action.data;
    }

    case 'ADD_ANECDOTE': {
      return [...state, action.data];
    }

    default:
      return state;
  }
};

export default reducer;
