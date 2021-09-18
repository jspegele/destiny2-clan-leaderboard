import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import clanReducer from './reducers/clan'
import membersReducer from './reducers/members'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Store creation

const configureStore = () => {
  const store = createStore(
    combineReducers({
      clan: clanReducer,
      members: membersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}

export default configureStore
