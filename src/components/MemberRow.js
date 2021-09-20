import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './styles/member.module.scss'

const MemberRow = ({ member }) => {
  const apiRoot = 'https://www.bungie.net/Platform'
  const [pvpStats, setPvpStats]  = useState(null)
  const [pveStats, setPveStats]  = useState(null)

  useEffect(() => {
    // console.log(member.bungieNetUserInfo.displayName)
    
    const apiEnpoint = `/Destiny2/${member.destinyUserInfo.membershipType}/Account/${member.destinyUserInfo.membershipId}/Stats/`
    axios.get(`${apiRoot}${apiEnpoint}`, {
        headers: {
          'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
        }
      })
      .then(response => {
        // console.log(member.bungieNetUserInfo.displayName, response)
        setPvpStats({
          ...response.data.Response.mergedAllCharacters.results.allPvP.allTime
        })
        setPveStats({
          ...response.data.Response.mergedAllCharacters.results.allPvE.allTime
        })
      })
      .catch(error => {
        console.log('Clan members error', error.response)
      })
  }, [])

  return (
    <div className={styles.member} key={member.destinyUserInfo.membershipId}>
      <div className={styles.name}>
        {member.bungieNetUserInfo ? (
          <>
            <img src={`https://www.bungie.net/${member.bungieNetUserInfo.iconPath}`} alt="" />
            {member.bungieNetUserInfo.bungieGlobalDisplayName ? (
              `${member.bungieNetUserInfo.bungieGlobalDisplayName}#${member.bungieNetUserInfo.bungieGlobalDisplayNameCode}`
            ) : (
              member.bungieNetUserInfo.displayName
            )}
          </>
        ) : (
          <>
            <img src={`https://www.bungie.net/${member.destinyUserInfo.iconPath}`} alt="" />
            {member.destinyUserInfo.displayName}
          </>
        )}
      </div>
      {pvpStats && (
        pvpStats.hasOwnProperty('activitiesEntered') && (
          <>
          <div>{pvpStats.activitiesEntered.basic.value}</div>
          <div>{pvpStats.activitiesWon.basic.value}</div>
          <div>
            {Math.round(parseInt(pvpStats.activitiesWon.basic.value) / parseInt(pvpStats.activitiesEntered.basic.value) * 100) / 100}
          </div>
          <div>{pvpStats.kills.basic.value}</div>
          <div>{pvpStats.assists.basic.value}</div>
          <div>{pvpStats.deaths.basic.value}</div>
          <div>{Math.round(pvpStats.killsDeathsRatio.basic.value * 100) / 100}</div>
          <div>{Math.round(pvpStats.efficiency.basic.value * 100) / 100}</div>
          </>
        )
      )}
    </div>
  )
}
 
export default MemberRow
