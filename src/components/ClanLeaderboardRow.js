import React from 'react'

import styles from './styles/clan-leaderboard-table.module.scss'

const ClanLeaderboardRow = ({ member }) => {
  return (
    <>
      {member.pvpStats && (
        member.pvpStats.hasOwnProperty('activitiesEntered') && (
          <tr key={member.membershipId}>
            <td className={styles.name}>
              {member.iconPath && <img src={`https://www.bungie.net/${member.iconPath}`} alt="" />}
              {member.displayName}
              {member.displayNameCode && `#${member.displayNameCode}`}
            </td>
            <td>{member.pvpStats.activitiesEntered}</td>
            <td>{member.pvpStats.activitiesWon}</td>
            <td>
              {Math.round(parseInt(member.pvpStats.activitiesWon) / parseInt(member.pvpStats.activitiesEntered) * 100) / 100}
            </td>
            <td>{member.pvpStats.kills}</td>
            <td>{member.pvpStats.assists}</td>
            <td>{member.pvpStats.deaths}</td>
            <td>{Math.round(member.pvpStats.killsDeathsRatio * 100) / 100}</td>
            <td>{Math.round(member.pvpStats.efficiency * 100) / 100}</td>
          </tr>
        )
      )}
    </>
  )
}
 
export default ClanLeaderboardRow
