import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import SearchPage from '../pages/SearchPage'
import LeaderboardPage from '../pages/LeaderboardPage'

export const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={SearchPage} exact={true} />
      <Route path="/leaderboard/:clanId" component={LeaderboardPage}  />
      <Route path="/leaderboard" component={LeaderboardPage}  />
    </Switch>
  </Router>
)

export default AppRouter
