import React from 'react'

import { history } from '../routers/AppRouter'

import Container from '../components/Container'
import ClanLeaderboard from '../components/ClanLeaderboard'

const LeaderboardPage = ({ match }) => {
  const groupId = match.params.groupId
  
  if (!groupId) history.push('/')

  return (
    <Container>
      {groupId && <ClanLeaderboard groupId={groupId} />}
    </Container>
  )
}

export default LeaderboardPage
