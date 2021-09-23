import React from 'react'

import styles from './styles/clan-leaderboard-table.module.scss'

const ClanLeaderboardHeader = ({ filters, setFilters }) => {
  
  const handleSort = (defaultSort, secondarySort) => {
    const sortBy = filters.sortBy === defaultSort ? secondarySort : defaultSort
    setFilters({
      ...filters,
      sortBy
    })
  }

  return (
    <div className={`${styles.row} ${styles.rowHeader}`}>
      <div
        className={`${styles.name} ${styles.sortable} ${filters.sortBy === "nameDesc" ? styles.sortDesc : filters.sortBy === "nameAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("nameAsc", "nameDesc")}
      >
        Player
      </div>
      <div
        className={`${styles.sortable} ${filters.sortBy === "pvpMatchesDesc" ? styles.sortDesc : filters.sortBy === "pvpMatchesAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpMatchesDesc", "pvpMatchesAsc")}
      >
        Matches
      </div>
      <div
        className={`${styles.sortable} ${filters.sortBy === "pvpWinsDesc" ? styles.sortDesc : filters.sortBy === "pvpWinsAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpWinsDesc", "pvpWinsAsc")}
      >
        Wins
      </div>
      <div
        className={`${styles.sortable} ${filters.sortBy === "pvpWinRatioDesc" ? styles.sortDesc : filters.sortBy === "pvpWinRatioAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpWinRatioDesc", "pvpWinRatioAsc")}
      >
        Win %
      </div>
      <div
        className={`${styles.sortable} ${filters.sortBy === "pvpKillsDesc" ? styles.sortDesc : filters.sortBy === "pvpKillsAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpKillsDesc", "pvpKillsAsc")}
      >
        Kills
      </div>
      <div
        className={`${styles.sortable} ${filters.sortBy === "pvpAssistsDesc" ? styles.sortDesc : filters.sortBy === "pvpAssistsAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpAssistsDesc", "pvpAssistsAsc")}
      >
        Assists
      </div>
      <div
        className={`${styles.sortable} ${filters.sortBy === "pvpDeathsDesc" ? styles.sortDesc : filters.sortBy === "pvpDeathsAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpDeathsDesc", "pvpDeathsAsc")}
      >
        Deaths
      </div>
      <div
        className={`${styles.sortable} ${filters.sortBy === "pvpKdrDesc" ? styles.sortDesc : filters.sortBy === "pvpKdrAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpKdrDesc", "pvpKdrAsc")}
      >
        K/D
      </div>
      <div
        className={`${styles.sortable} ${filters.sortBy === "pvpEfficiencyDesc" ? styles.sortDesc : filters.sortBy === "pvpEfficiencyAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpEfficiencyDesc", "pvpEfficiencyAsc")}
      >
        Efficiency
      </div>
    </div>
  )
}
 
export default ClanLeaderboardHeader
