import React from 'react'

import styles from './styles/clan-leaderboard-table.module.scss'

import ClanLeaderboardRow from './ClanLeaderboardRow'
import ClanLeaderboardHeader from './ClanLeaderboardHeader'

const ClanLeaderboardTable = ({ visibleMembers, filters, setFilters }) => {

  return (
    <div className={styles.table}>
      <ClanLeaderboardHeader
        filters={filters}
        setFilters={setFilters}
      />
      {visibleMembers.map(member => (
        <ClanLeaderboardRow
          key={member.membershipId}
          member={member}
        />
      ))}
    </div>
  )
}
 
export default ClanLeaderboardTable
