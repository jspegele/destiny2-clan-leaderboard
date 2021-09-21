import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Header from '../components/Header'
import HomePage from '../pages/HomePage'
import LeaderboardPage from '../pages/LeaderboardPage'
import Footer from '../components/Footer'

export const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history}>
    <Header />
    <Switch>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/leaderboard/:groupId" component={LeaderboardPage}  />
      <Route path="/leaderboard" component={LeaderboardPage}  />
    </Switch>
    <Footer />
  </Router>
)

export default AppRouter
