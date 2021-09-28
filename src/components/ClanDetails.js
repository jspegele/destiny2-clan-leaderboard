import React from 'react'

import styles from './styles/clan-details.module.scss'

const ClanDetails = ({ clan: { name, clanCallsign, motto, about, memberCount } }) => {
  return (
    <div>
      <h2 className={styles.name}>{name} [{clanCallsign}] Leaderboard</h2>
      <h3 className={styles.motto}>"{motto}"</h3>
      <p className={styles.about}>
        <span className={styles.label}>About {name}:</span>{" "}
        {about}
      </p>
      <p className={styles.count}>
        <span className={styles.label}>Member Count:</span>{" "}
        {memberCount}
      </p>
    </div>
  )
}
 
export default ClanDetails
