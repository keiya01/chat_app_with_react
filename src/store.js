import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import room from './modules/room'

function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      room
    }),
    applyMiddleware(
      thunk,
      logger,
    )
  );
  
  return store;
}

export default createStore()