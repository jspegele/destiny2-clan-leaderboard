import React from 'react'

import styles from './styles/clan-leaderboard-table.module.scss'

import ClanLeaderboardRow from './ClanLeaderboardRow'

const ClanLeaderboardTable = ({ visibleMembers, filters, setFilters }) => {
  const handleSortByWins = () => {
    const sortBy = filters.sortBy === "pvpWinsDesc" ? "pvpWinsAsc" : "pvpWinsDesc"
    setFilters({
      ...filters,
      sortBy
    })
  }

  return (
    <div className={styles.table}>
      <div className={`${styles.row} ${styles.rowHeader}`}>
        <div className={styles.name}>Player</div>
        <div>Matches</div>
        <div
          className={`${styles.sortable} ${filters.sortBy === "pvpWinsDesc" ? styles.sortDesc : filters.sortBy === "pvpWinsAsc" ? styles.sortAsc : ""}`}
          onClick={handleSortByWins}
        >
          Wins
        </div>
        <div>Win %</div>
        <div>Kills</div>
        <div>Assists</div>
        <div>Deaths</div>
        <div>K/D</div>
        <div>Efficiency</div>
      </div>
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
