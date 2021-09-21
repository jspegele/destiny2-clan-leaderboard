import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { setPvpStats, setPveStats } from '../store/actions/members'

import styles from './styles/member.module.scss'

const MemberRow = ({ membershipId, members, setPvpStats, setPveStats }) => {
  const member = members.filter(item => item.membershipId === membershipId)[0]
  const apiRoot = 'https://www.bungie.net/Platform'
  // const [pvpStats, setPvpStats]  = useState(null)
  // const [pveStats, setPveStats]  = useState(null)

  useEffect(() => {
    const apiEndpoint = `/Destiny2/${member.membershipType}/Account/${member.membershipId}/Stats/`
    axios.get(`${apiRoot}${apiEndpoint}`, {
        headers: {
          'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
        }
      })
      .then(response => {
        console.log(response.data.Response.mergedAllCharacters.results.allPvP.allTime)
        const pvpAllTime = response.data.Response.mergedAllCharacters.results.allPvP.allTime
        setPvpStats(member.membershipId, {
          activitiesEntered: pvpAllTime.activitiesEntered.basic.value,
          activitiesWon: pvpAllTime.activitiesWon.basic.value,
          assists: pvpAllTime.assists.basic.value,
          averageDeathDistance: pvpAllTime.averageDeathDistance.basic.value,
          averageKillDistance: pvpAllTime.averageKillDistance.basic.value,
          averageLifespan: pvpAllTime.averageLifespan.basic.value,
          bestSingleGameKills: pvpAllTime.bestSingleGameKills.basic.value,
          bestSingleGameScore: pvpAllTime.bestSingleGameScore.basic.value,
          combatRating: pvpAllTime.combatRating.basic.value,
          deaths: pvpAllTime.deaths.basic.value,
          efficiency: pvpAllTime.efficiency.basic.value,
          fireTeamActivities: pvpAllTime.fireTeamActivities.basic.value,
          kills: pvpAllTime.kills.basic.value,
          killsDeathsAssists: pvpAllTime.killsDeathsAssists.basic.value,
          killsDeathsRatio: pvpAllTime.killsDeathsRatio.basic.value,
          longestKillDistance: pvpAllTime.longestKillDistance.basic.value,
          longestKillSpree: pvpAllTime.longestKillSpree.basic.value,
          opponentsDefeated: pvpAllTime.opponentsDefeated.basic.value,
          precisionKills: pvpAllTime.precisionKills.basic.value,
          remainingTimeAfterQuitSeconds: pvpAllTime.remainingTimeAfterQuitSeconds.basic.value,
          resurrectionsPerformed: pvpAllTime.resurrectionsPerformed.basic.value,
          resurrectionsReceived: pvpAllTime.resurrectionsReceived.basic.value,
          score: pvpAllTime.score.basic.value,
          secondsPlayed: pvpAllTime.secondsPlayed.basic.value,
          suicides: pvpAllTime.suicides.basic.value,
          weaponBestType: pvpAllTime.weaponBestType.basic.displayValue,
          winLossRatio: pvpAllTime.winLossRatio.basic.value
        })
        setPveStats(member.membershipId, {
          ...response.data.Response.mergedAllCharacters.results.allPvE.allTime
        })
      })
      .catch(error => {
        console.log('Clan members error', error)
      })
  }, [])

  return (
    <div className={styles.member} key={member.membershipId}>
      <div className={styles.name}>
        {member.iconPath && <img src={`https://www.bungie.net/${member.iconPath}`} alt="" />}
        {member.displayName}
        {member.displayNameCode && `#${member.displayNameCode}`}
      </div>
      {member.pvpStats && (
        member.pvpStats.hasOwnProperty('activitiesEntered') && (
          <>
          <div>{member.pvpStats.activitiesEntered}</div>
          <div>{member.pvpStats.activitiesWon}</div>
          <div>
            {Math.round(parseInt(member.pvpStats.activitiesWon) / parseInt(member.pvpStats.activitiesEntered) * 100) / 100}
          </div>
          <div>{member.pvpStats.kills}</div>
          <div>{member.pvpStats.assists}</div>
          <div>{member.pvpStats.deaths}</div>
          <div>{Math.round(member.pvpStats.killsDeathsRatio * 100) / 100}</div>
          <div>{Math.round(member.pvpStats.efficiency * 100) / 100}</div>
          </>
        )
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  members: state.members
})

const mapDispatchToProps = {
  setPvpStats,
  setPveStats
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MemberRow)
