import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { setClan } from "../store/actions/clan"
import { setMembers, setPvpStats, setPveStats } from "../store/actions/members"
import { startSetClanStat } from "../store/actions/trackedClans"

import styles from './styles/clan-leaderboard.module.scss'

import ClanDetails from './ClanDetails'
import MemberRow from './MemberRow'

const ClanLeaderboard = ({
  groupId,
  clan,
  members,
  setClan,
  setMembers,
  setPvpStats,
  setPveStats,
  startSetClanStat
}) => {
  const [error, setError] = useState(null)
  const apiRoot = 'https://www.bungie.net/Platform'

  useEffect(() => {
    // Get clan and member info from bungie if not set in store
    if (clan.groupId !== groupId) {
      // clan details lookup
      axios.get(`${apiRoot}/GroupV2/${groupId}/`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
          }
        })
        .then(response => {
          const clanInfo = response.data.Response.detail
          setClan({
            about: clanInfo.about,
            avatarPath: clanInfo.avatarPath,
            capabilities: clanInfo.capabilities,
            clanCallsign: clanInfo.clanInfo.clanCallsign,
            creationDate: clanInfo.creationDate,
            groupId: clanInfo.groupId,
            groupType: clanInfo.groupType,
            locale: clanInfo.locale,
            memberCount: clanInfo.memberCount,
            membershipOption: clanInfo.membershipOption,
            motto: clanInfo.motto,
            name: clanInfo.name
          })
        })
        .catch(error => {
          console.log('Clan details error', error.response)
        })

      // get clan members
      axios.get(`${apiRoot}/GroupV2/${groupId}/Members`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
          }
        })
        .then(response => {
          const results = response.data.Response.results
          const membersArray = []
          results.forEach(item => {
            membersArray.push({
              displayName: item.destinyUserInfo.bungieGlobalDisplayName || item.bungieNetUserInfo.displayName || item.destinyUserInfo.displayName,
              displayNameCode: item.destinyUserInfo.bungieGlobalDisplayNameCode || "",
              membershipId: item.destinyUserInfo.membershipId,
              membershipType: item.destinyUserInfo.membershipType,
              bungieNetMembershipId: item.bungieNetUserInfo ? item.bungieNetUserInfo.membershipId : "",
              bungieNetMembershipType: item.bungieNetUserInfo ? item.bungieNetUserInfo.membershipType : "",
              iconPath: item.bungieNetUserInfo ? item.bungieNetUserInfo.iconPath : item.destinyUserInfo.iconPath,
              groupId: item.groupId,
              isOnline: item.isOnline,
              joinDate: item.joinDate,
              lastOnlineStatusChange: item.lastOnlineStatusChange,
              memberType: 3
            })
          })
          setMembers(membersArray)
        })
        .catch(error => {
          console.log('Clan members errorx', error.response)
          setError('Error retreiving clan roster')
        })

    }
  }, [clan.groupId, groupId, setClan, setMembers])

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
    if (clanTotalStats.counted === clan.memberCount) {
      startSetClanStat(groupId, clanTotalStats.stats)
    }
  }, [clanTotalStats.counted, clan.memberCount, startSetClanStat, groupId, clanTotalStats.stats])

  // useEffect(() => {
  //   if (members.length) {
  //     // Clan Total stats
  //     let totalActivities = 0,
  //         totalWins = 0,
  //         totalKills = 0,
  //         totalAssists = 0,
  //         totalDeaths = 0

  //     members.forEach(member => {
  //       // Get Member Stats from Bungie
  //       const apiEnpoint = `/Destiny2/${member.destinyUserInfo.membershipType}/Account/${member.destinyUserInfo.membershipId}/Stats/`
  //       axios.get(`${apiRoot}${apiEnpoint}`, {
  //           headers: {
  //             'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
  //           }
  //         })
  //         .then(response => {
  //           // Handle PVP Values
  //           const pvpAllTime = response.data.Response.mergedAllCharacters.results.allPvP.allTime
  //           // add stats to member object in store
  //           setPvpStats(member.destinyUserInfo.membershipId, {
  //             ...pvpAllTime
  //           })

  //           // Add member stats to totals
  //           totalActivities += pvpAllTime.activitiesEntered.basic.value
  //           totalWins += pvpAllTime.activitiesWon.basic.value
  //           totalKills += pvpAllTime.kills.basic.value
  //           totalAssists += pvpAllTime.assists.basic.value
  //           totalDeaths += pvpAllTime.deaths.basic.value

  //           // setPveStats({
  //           //   ...response.data.Response.mergedAllCharacters.results.allPvE.allTime
  //           // })
  //         })
  //         .catch(error => {
  //           console.log('Clan members error', error.response)
  //         })
  //     })

  //     setClanStats({
  //       totalActivities,
  //       totalWins,
  //       totalKills,
  //       totalAssists,
  //       totalDeaths
  //     })

  //     // calculate clan total stats
  //     // let totalActiviites = 0,
  //     //     totalWins = 0,
  //     //     totalKills = 0,
  //     //     totalAssists = 0,
  //     //     totalDeaths = 0
  //     // for (let i = 0; i < members.length; i++) {
  
  //     // }
  //   }
  // }, [members.length])

  return (
    <div>
      {error && (
        <p>{error}</p>
      )}
      {(clan.groupId && clan.groupId === groupId) && (
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
      <p>Counted: {clanTotalStats.counted}</p>
      <p>Total Activities: {clanTotalStats.stats.totalActivities}</p>
      <p>Total Kills: {clanTotalStats.stats.totalKills}</p>
    </div>
  )
}

const mapStateToProps = state => ({
  clan: state.clan,
  members: state.members
})

const mapDispatchToProps = {
  setClan,
  setMembers,
  setPvpStats,
  setPveStats,
  startSetClanStat
}

export default connect(mapStateToProps, mapDispatchToProps)(ClanLeaderboard)
