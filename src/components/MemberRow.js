import React, { useState, useEffect } from 'react'
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
        // console.log(member.bungieNetUserInfo.displayName, response)
        setPvpStats(member.membershipId, {
          ...response.data.Response.mergedAllCharacters.results.allPvP.allTime
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
          <div>{member.pvpStats.activitiesEntered.basic.value}</div>
          <div>{member.pvpStats.activitiesWon.basic.value}</div>
          <div>
            {Math.round(parseInt(member.pvpStats.activitiesWon.basic.value) / parseInt(member.pvpStats.activitiesEntered.basic.value) * 100) / 100}
          </div>
          <div>{member.pvpStats.kills.basic.value}</div>
          <div>{member.pvpStats.assists.basic.value}</div>
          <div>{member.pvpStats.deaths.basic.value}</div>
          <div>{Math.round(member.pvpStats.killsDeathsRatio.basic.value * 100) / 100}</div>
          <div>{Math.round(member.pvpStats.efficiency.basic.value * 100) / 100}</div>
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
