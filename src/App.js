import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import AppRouter from './routers/AppRouter'

// configure redux store
const store = configureStore()

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

export default App
