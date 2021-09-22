import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { startSetClan } from "../store/actions/clan"
import { startSetMembers, setPvpStats, setPveStats } from "../store/actions/members"
import { startSetClanStat } from "../store/actions/trackedClans"

import styles from './styles/clan-leaderboard.module.scss'

import ClanDetails from './ClanDetails'
import MemberRow from './MemberRow'

const ClanLeaderboard = ({
  groupId,
  clan,
  members,
  startSetClan,
  startSetMembers,
  setPvpStats,
  setPveStats,
  startSetClanStat
}) => {
  const [error, setError] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const apiRoot = 'https://www.bungie.net/Platform'

  useEffect(() => {
    console.log(clan.groupId, groupId, dataLoaded)
    // Get clan and member info from bungie if not already set in store
    if (!clan.groupId || clan.groupId !== groupId) {
      console.log('different clan')
      startSetClan({ groupId }).then(() => {
        startSetMembers({ groupId }).then(() => {
          setDataLoaded(true)
        })
      })
    } else if (clan.groupId) {
      console.log('same clan')
      setDataLoaded(true)
    }
  }, [clan.groupId, groupId, startSetClan, startSetMembers])

  const clanTotalStatsDefaultState = {
    counted: 0,
    stats: {
      totalActivities: 0,
      totalKills: 0,
      totalAssists: 0,
      totalDeaths: 0,
      totalSecondsPlayed: 0
    }
  }
  const [clanTotalStats, setClanTotalStats] = useState(clanTotalStatsDefaultState)

  useEffect(() => {
    if (members.length === clan.memberCount) {
      setClanTotalStats(clanTotalStatsDefaultState)  // Reset clanTotalStats

      // get clan member stats
      members.forEach(member => {
        const apiEndpoint = `/Destiny2/${member.membershipType}/Account/${member.membershipId}/Stats/`
        axios.get(`${apiRoot}${apiEndpoint}`, {
            headers: {
              'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
            }
          })
          .then(response => {
            // Add this members PvP stats to Store
            const pvpAllTime = response.data.Response.mergedAllCharacters.results.allPvP.allTime
            if (pvpAllTime) {
              setPvpStats(member.membershipId, {
                activitiesEntered: pvpAllTime.activitiesEntered.basic.value,
                activitiesWon: pvpAllTime.activitiesWon.basic.value,
                assists: pvpAllTime.assists.basic.value,
                averageDeathDistance: pvpAllTime.averageDeathDistance.basic.value,
                averageKillDistance: pvpAllTime.averageKillDistance.basic.value,
                averageLifespan: pvpAllTime.averageLifespan.basic.value,
                bestSingleGameKills: pvpAllTime.bestSingleGameKills.basic.value,
                bestSingleGameScore: pvpAllTime.bestSingleGameScore.basic.value,
                combatRating: pvpAllTime.combatRating.basic.value,
                deaths: pvpAllTime.deaths.basic.value,
                efficiency: pvpAllTime.efficiency.basic.value,
                fireTeamActivities: pvpAllTime.fireTeamActivities.basic.value,
                kills: pvpAllTime.kills.basic.value,
                killsDeathsAssists: pvpAllTime.killsDeathsAssists.basic.value,
                killsDeathsRatio: pvpAllTime.killsDeathsRatio.basic.value,
                longestKillDistance: pvpAllTime.longestKillDistance.basic.value,
                longestKillSpree: pvpAllTime.longestKillSpree.basic.value,
                opponentsDefeated: pvpAllTime.opponentsDefeated.basic.value,
                precisionKills: pvpAllTime.precisionKills.basic.value,
                remainingTimeAfterQuitSeconds: pvpAllTime.remainingTimeAfterQuitSeconds.basic.value,
                resurrectionsPerformed: pvpAllTime.resurrectionsPerformed.basic.value,
                resurrectionsReceived: pvpAllTime.resurrectionsReceived.basic.value,
                score: pvpAllTime.score.basic.value,
                secondsPlayed: pvpAllTime.secondsPlayed.basic.value,
                suicides: pvpAllTime.suicides.basic.value,
                weaponBestType: pvpAllTime.weaponBestType.basic.displayValue,
                winLossRatio: pvpAllTime.winLossRatio.basic.value
              })

              // Add this members stats to clan totals
              setClanTotalStats(clanTotalStats => ({
                counted: clanTotalStats.counted + 1,
                stats: {
                  totalActivities: clanTotalStats.stats.totalActivities + pvpAllTime.activitiesEntered.basic.value,
                  totalKills: clanTotalStats.stats.totalKills + pvpAllTime.kills.basic.value,
                  totalAssists: clanTotalStats.stats.totalAssists + pvpAllTime.assists.basic.value,
                  totalDeaths: clanTotalStats.stats.totalDeaths + pvpAllTime.deaths.basic.value,
                  totalSecondsPlayed: clanTotalStats.stats.totalSecondsPlayed + pvpAllTime.secondsPlayed.basic.value
                }
              }))
            } else {
              setClanTotalStats(clanTotalStats => ({
                ...clanTotalStats,
                counted: clanTotalStats.counted + 1
              }))
            }

            setPveStats(member.membershipId, {
              ...response.data.Response.mergedAllCharacters.results.allPvE.allTime
            })
          })
          .catch(error => {
            console.log('Clan members error', error)
          })
      })
    }
  }, [members.length, clan.memberCount, setPvpStats, setPveStats])

  useEffect(() => {
    startSetClanStat(groupId, clanTotalStats.stats)
  }, [clanTotalStats.counted, startSetClanStat, groupId, clanTotalStats.stats])

  return (
    <div>
      {error && (
        <p>{error}</p>
      )}
      {dataLoaded && (
        <>
          <ClanDetails clan={clan} />
          {members.length && (
            <div className={styles.clanStats}>
              <div className={styles.header}>
                <div>Player</div>
                <div>Matches</div>
                <div>Wins</div>
                <div>Win %</div>
                <div>Kills</div>
                <div>Assists</div>
                <div>Deaths</div>
                <div>K/D</div>
                <div>Efficiency</div>
              </div>
              {members.map(member => (
                <MemberRow
                  key={member.membershipId}
                  membershipId={member.membershipId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  clan: state.clan,
  members: state.members
})

const mapDispatchToProps = {
  startSetClan,
  startSetMembers,
  setPvpStats,
  setPveStats,
  startSetClanStat
}

export default connect(mapStateToProps, mapDispatchToProps)(ClanLeaderboard)
