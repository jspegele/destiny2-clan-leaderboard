import React from 'react'

import { history } from '../routers/AppRouter'

import Container from '../components/Container'
import ClanLeaderboard from '../components/ClanLeaderboard'

const LeaderboardPage = ({ match }) => {
  const clanId = match.params.clanId
  
  if (!clanId) history.push('/')

  return (
    <Container>
      {clanId && <ClanLeaderboard clanId={clanId} />}
    </Container>
  )
}

export default LeaderboardPage
