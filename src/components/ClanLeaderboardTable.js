import React from 'react'

import styles from './styles/clan-leaderboard-table.module.scss'

import ClanLeaderboardRow from './ClanLeaderboardRow'
import ClanLeaderboardHeader from './ClanLeaderboardHeader'

const ClanLeaderboardTable = ({ visibleMembers, filters, setFilters }) => {

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <ClanLeaderboardHeader
            filters={filters}
            setFilters={setFilters}
          />
        </thead>
        <tbody>
          {visibleMembers.map(member => (
            <ClanLeaderboardRow
              key={member.membershipId}
              member={member}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
 
export default ClanLeaderboardTable
