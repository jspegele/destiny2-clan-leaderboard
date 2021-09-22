import React from 'react'

import styles from './styles/clan-leaderboard-table.module.scss'

const ClanLeaderboardRow = ({ member }) => {
  return (
    <>
      {member.pvpStats && (
        member.pvpStats.hasOwnProperty('activitiesEntered') && (
          <div className={styles.row} key={member.membershipId}>
            <div className={styles.name}>
              {member.iconPath && <img src={`https://www.bungie.net/${member.iconPath}`} alt="" />}
              {member.displayName}
              {member.displayNameCode && `#${member.displayNameCode}`}
            </div>
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
          </div>
        )
      )}
    </>
  )
}
 
export default ClanLeaderboardRow
