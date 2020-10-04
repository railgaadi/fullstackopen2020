import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notesReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({ notes: notesReducer, filter: filterReducer });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
