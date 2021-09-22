import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import trackedClansReducer from './reducers/trackedClans'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Store creation

const configureStore = () => {
  const store = createStore(
    combineReducers({
      trackedClans: trackedClansReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}

export default configureStore
