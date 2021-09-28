import React from 'react'

import styles from './styles/clan-leaders.module.scss'

const ClanLeaders = ({ members }) => {
  function formatWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function getLeaderByStatProperty(property) {
    return members.sort((a, b) => b.pvpStats[property] - a.pvpStats[property])[0]
  }

  const matchesLeader = getLeaderByStatProperty('activitiesEntered')
  const kdLeader = getLeaderByStatProperty('killsDeathsRatio')
  const killsLeader = getLeaderByStatProperty('kills')
  const timeLeader = getLeaderByStatProperty('secondsPlayed')
  const singleGameLeader = getLeaderByStatProperty('bestSingleGameKills')
  const suicidesLeader = getLeaderByStatProperty('suicides')

  return (
    <div className={styles.wrapper}>
      <div className={styles.leader}>
        <div className={styles.content}>
          <span className={styles.mainStatTitle}>Matches Played</span>
          <span className={styles.mainStat}>{formatWithCommas(matchesLeader.pvpStats.activitiesEntered)}</span>
          <span className={styles.mainStatLeader}>{matchesLeader.displayName}</span>
          <span className={styles.secondaryStat}>
            {(Math.round(parseInt(matchesLeader.pvpStats.activitiesWon) / parseInt(matchesLeader.pvpStats.activitiesEntered) * 100) / 100) * 100}%
          </span>
          <span className={styles.secondaryStatTitle}>Win %</span>
        </div>
      </div>
      <div className={styles.leader}>
        <div className={styles.content}>
          <span className={styles.mainStatTitle}>K/D</span>
          <span className={styles.mainStat}>{Math.round(kdLeader.pvpStats.killsDeathsRatio * 100) / 100}</span>
          <span className={styles.mainStatLeader}>{kdLeader.displayName}</span>
          <span className={styles.secondaryStat}>{Math.round(kdLeader.pvpStats.efficiency * 100) / 100}</span>
          <span className={styles.secondaryStatTitle}>Efficiency</span>
        </div>
      </div>
      <div className={styles.leader}>
        <div className={styles.content}>
          <span className={styles.mainStatTitle}>Single Game Kills</span>
          <span className={styles.mainStat}>{singleGameLeader.pvpStats.bestSingleGameKills}</span>
          <span className={styles.mainStatLeader}>{singleGameLeader.displayName}</span>
          <span className={styles.secondaryStat}>{killsLeader.pvpStats.bestSingleGameScore}</span>
          <span className={styles.secondaryStatTitle}>Single Game Score</span>
        </div>
      </div>
      <div className={styles.leader}>
        <div className={styles.content}>
          <span className={styles.mainStatTitle}>Kills</span>
          <span className={styles.mainStat}>{formatWithCommas(killsLeader.pvpStats.kills)}</span>
          <span className={styles.mainStatLeader}>{killsLeader.displayName}</span>
          <span className={styles.secondaryStat}>{formatWithCommas(killsLeader.pvpStats.assists)}</span>
          <span className={styles.secondaryStatTitle}>Assists</span>
        </div>
      </div>
      <div className={styles.leader}>
        <div className={styles.content}>
          <span className={styles.mainStatTitle}>Time Played (PvP)</span>
          <span className={styles.mainStat}>{formatWithCommas(Math.round(timeLeader.pvpStats.secondsPlayed / 60 / 60))} hours</span>
          <span className={styles.mainStatLeader}>{timeLeader.displayName}</span>
        </div>
      </div>
      <div className={styles.leader}>
        <div className={styles.content}>
          <span className={styles.mainStatTitle}>Suicides</span>
          <span className={styles.mainStat}>{formatWithCommas(suicidesLeader.pvpStats.suicides)}</span>
          <span className={styles.mainStatLeader}>{suicidesLeader.displayName}</span>
          <span className={styles.secondaryStat}>{formatWithCommas(suicidesLeader.pvpStats.deaths)}</span>
          <span className={styles.secondaryStatTitle}>Total Deaths</span>
        </div>
      </div>
    </div>
  )
}
 
export default ClanLeaders
