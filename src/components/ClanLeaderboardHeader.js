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
    <tr className={styles.rowHeader}>
      <th
        className={`${styles.name} ${styles.sortable} ${filters.sortBy === "nameDesc" ? styles.sorthesc : filters.sortBy === "nameAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("nameAsc", "nameDesc")}
      >
        Player
      </th>
      <th
        className={`${styles.sortable} ${filters.sortBy === "pvpMatchesDesc" ? styles.sorthesc : filters.sortBy === "pvpMatchesAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpMatchesDesc", "pvpMatchesAsc")}
      >
        Matches
      </th>
      <th
        className={`${styles.sortable} ${filters.sortBy === "pvpWinsDesc" ? styles.sorthesc : filters.sortBy === "pvpWinsAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpWinsDesc", "pvpWinsAsc")}
      >
        Wins
      </th>
      <th
        className={`${styles.sortable} ${filters.sortBy === "pvpWinRatioDesc" ? styles.sorthesc : filters.sortBy === "pvpWinRatioAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpWinRatioDesc", "pvpWinRatioAsc")}
      >
        Win %
      </th>
      <th
        className={`${styles.sortable} ${filters.sortBy === "pvpKillsDesc" ? styles.sorthesc : filters.sortBy === "pvpKillsAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpKillsDesc", "pvpKillsAsc")}
      >
        Kills
      </th>
      <th
        className={`${styles.sortable} ${filters.sortBy === "pvpAssistsDesc" ? styles.sorthesc : filters.sortBy === "pvpAssistsAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpAssistsDesc", "pvpAssistsAsc")}
      >
        Assists
      </th>
      <th
        className={`${styles.sortable} ${filters.sortBy === "pvpDeathsDesc" ? styles.sorthesc : filters.sortBy === "pvpDeathsAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpDeathsDesc", "pvpDeathsAsc")}
      >
        Deaths
      </th>
      <th
        className={`${styles.sortable} ${filters.sortBy === "pvpKdrDesc" ? styles.sorthesc : filters.sortBy === "pvpKdrAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpKdrDesc", "pvpKdrAsc")}
      >
        K/D
      </th>
      <th
        className={`${styles.sortable} ${filters.sortBy === "pvpEfficiencyDesc" ? styles.sorthesc : filters.sortBy === "pvpEfficiencyAsc" ? styles.sortAsc : ""}`}
        onClick={() => handleSort("pvpEfficiencyDesc", "pvpEfficiencyAsc")}
      >
        Efficiency
      </th>
    </tr>
  )
}
 
export default ClanLeaderboardHeader
