import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import MemberRow from '../components/MemberRow'
import { setClan } from "../store/actions/clan"
import { setMembers } from "../store/actions/members"

import styles from './styles/leaderboard-page.module.scss'

import Container from '../components/Container'
import ClanDetails from '../components/ClanDetails'

const LeaderboardPage = ({ match, clan, members, setClan, setMembers }) => {
  const [error, setError] = useState(null)

  const clanId = match.params.clanId
  const apiRoot = 'https://www.bungie.net/Platform'

  // Additional clan info
  useEffect(() => {
    if (match.params.hasOwnProperty('clanId')) {

      // clan details lookup
      if (!clan.groupId) {
        axios.get(`${apiRoot}/GroupV2/${clanId}/`, {
            headers: {
              'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
            }
          })
          .then(response => {
            const clanInfo = response.data.Response.detail
            setClan({
              about: clanInfo.about,
              avatarPath: clanInfo.avatarPath,
              capabilities: clanInfo.capabilities,
              clanCallsign: clanInfo.clanInfo.clanCallsign,
              creationDate: clanInfo.creationDate,
              groupId: clanInfo.groupId,
              groupType: clanInfo.groupType,
              locale: clanInfo.locale,
              memberCount: clanInfo.memberCount,
              membershipOption: clanInfo.membershipOption,
              motto: clanInfo.motto,
              name: clanInfo.name
            })
          })
          .catch(error => {
            console.log('Clan details error', error.response)
          })
      }

      // clan members lookup
      axios.get(`${apiRoot}/GroupV2/${clanId}/Members`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
          }
        })
        .then(response => {
          setMembers(response.data.Response.results)
        })
        .catch(error => {
          console.log('Clan members error', error.response)
          setError('Error retreiving clan roster')
        })
    }
  }, [match.params, clan.groupId, clanId, setClan, setMembers])

  return (
    <Container>
      {error && (
        <p>{error}</p>
      )}
      {clan.groupId && (
        <>
          <ClanDetails clan={clan} />
          {members.length && (
            <div className={styles.clanStats}>
              <div className={styles.header}>
                <div>Player</div>
                <div>Matches</div>
                <div>Wins</div>
                <div>Win %</div>
                <div>Kills</div>
                <div>Assists</div>
                <div>Deaths</div>
                <div>K/D</div>
                <div>Efficiency</div>
              </div>
              {members.map((member, i) => (
                <MemberRow key={member.destinyUserInfo.membershipId} member={member} />
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  )
}

const mapStateToProps = state => ({
  clan: state.clan,
  members: state.members
})

const mapDispatchToProps = {
  setClan,
  setMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPage)
