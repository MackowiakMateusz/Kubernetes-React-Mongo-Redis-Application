import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { animeReducer } from './animes/reducers';
import { voiceActorReducer } from './voiceActors/reducers'
import logger from 'redux-logger';
import { createMiddleware } from 'redux-api-middleware';
import { commentReducer } from './comments/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    comments: commentReducer,
    animes: animeReducer,
    voiceActors: voiceActorReducer,
  });

const store = createStore(combinedReducers, 
  composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger)),
  );

  export default store;