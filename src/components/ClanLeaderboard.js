import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ClanDetails from './ClanDetails'
import ClanLeaderboardTable from './ClanLeaderboardTable'

const ClanLeaderboard = ({ groupId }) => {
  const [clan, setClan] = useState({})
  const [members, setMembers] = useState([])
  const [filters, setFilters] = useState({
    sortBy: "nameAsc",
    text: "",
    hoursPlayed: 0
  })
  const [error, setError] = useState(null)

  // Fetch Clan Details
  useEffect(() => {
    function fetchClanDetails() {
      axios.get(`https://www.bungie.net/Platform/GroupV2/${groupId}/`, {
        headers: {
          'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
        }
      })
      .then(response => {
        const detail = response.data.Response.detail
        return setClan({
          about: detail.about,
          avatarPath: detail.avatarPath,
          capabilities: detail.capabilities,
          clanCallsign: detail.clanInfo.clanCallsign,
          creationDate: detail.creationDate,
          groupId: detail.groupId,
          groupType: detail.groupType,
          locale: detail.locale,
          memberCount: detail.memberCount,
          membershipOption: detail.membershipOption,
          motto: detail.motto,
          name: detail.name
        })
      })
      .catch(error => console.log('Error fetching Group details', error.response))
    }

    fetchClanDetails()
  }, [groupId])

  // Fetch Clan Members
  useEffect(() => {
    async function fetchClanMemberStats(membershipType, membershipId) {
      let pvpStats = {}, pveStats = {}

      const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Stats/`, {
        headers: {
          'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
        }
      })
      .catch(error => console.log('Error fetching clan member stats', error.response))

      const pvpAllTime = response.data.Response.mergedAllCharacters.results.allPvP.allTime
      if (pvpAllTime) {
        pvpStats = {
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
        }
      }

      // const pveAllTime = response.data.Response.mergedAllCharacters.results.allPvE.allTime
      // pveStats = {
      //   ...response.data.Response.mergedAllCharacters.results.allPvE.allTime
      // }

      return ({
        pvpStats,
        pveStats
      })
    }

    function fetchClanMembers() {
      axios.get(`https://www.bungie.net/Platform/GroupV2/${groupId}/Members`, {
        headers: {
          'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
        }
      })
      .then(response => {
        const results = response.data.Response.results

        results.forEach(async member => {
          const memberStats = await fetchClanMemberStats(member.destinyUserInfo.membershipType, member.destinyUserInfo.membershipId)
          
          setMembers(members => [
            ...members,
            {
              displayName: member.destinyUserInfo.bungieGlobalDisplayName || (member.bungieNetUserInfo ? member.bungieNetUserInfo.displayName : member.destinyUserInfo.displayName),
              displayNameCode: member.destinyUserInfo.bungieGlobalDisplayNameCode || "",
              membershipId: member.destinyUserInfo.membershipId,
              membershipType: member.destinyUserInfo.membershipType,
              bungieNetMembershipId: member.bungieNetUserInfo ? member.bungieNetUserInfo.membershipId : "",
              bungieNetMembershipType: member.bungieNetUserInfo ? member.bungieNetUserInfo.membershipType : "",
              iconPath: member.bungieNetUserInfo ? member.bungieNetUserInfo.iconPath : member.destinyUserInfo.iconPath,
              groupId: member.groupId,
              isOnline: member.isOnline,
              joinDate: member.joinDate,
              lastOnlineStatusChange: member.lastOnlineStatusChange,
              memberType: 3,
              pvpStats: memberStats.pvpStats,
              pveStats: memberStats.pveStats
            }
          ])
        })
      })
      .catch(error => console.log('Error fetching clan members', error.response))
    }

    fetchClanMembers()
  }, [groupId])

  // CLAN TOTAL STATS
  // const clanTotalStatsDefaultState = {
  //   counted: 0,
  //   stats: {
  //     totalActivities: 0,
  //     totalKills: 0,
  //     totalAssists: 0,
  //     totalDeaths: 0,
  //     totalSecondsPlayed: 0
  //   }
  // }
  // const [clanTotalStats, setClanTotalStats] = useState(clanTotalStatsDefaultState)

  // useEffect(() => {
  //   if (members.length === clan.memberCount) {
  //     setClanTotalStats(clanTotalStatsDefaultState)  // Reset clanTotalStats

  //     // get clan member stats
  //     members.forEach(member => {
  //       const apiEndpoint = `/Destiny2/${member.membershipType}/Account/${member.membershipId}/Stats/`
  //       axios.get(`${apiRoot}${apiEndpoint}`, {
  //           headers: {
  //             'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
  //           }
  //         })
  //         .then(response => {
  //           // Add this members PvP stats to Store
  //           const pvpAllTime = response.data.Response.mergedAllCharacters.results.allPvP.allTime
  //           if (pvpAllTime) {
  //             setPvpStats(member.membershipId, {
  //               activitiesEntered: pvpAllTime.activitiesEntered.basic.value,
  //               activitiesWon: pvpAllTime.activitiesWon.basic.value,
  //               assists: pvpAllTime.assists.basic.value,
  //               averageDeathDistance: pvpAllTime.averageDeathDistance.basic.value,
  //               averageKillDistance: pvpAllTime.averageKillDistance.basic.value,
  //               averageLifespan: pvpAllTime.averageLifespan.basic.value,
  //               bestSingleGameKills: pvpAllTime.bestSingleGameKills.basic.value,
  //               bestSingleGameScore: pvpAllTime.bestSingleGameScore.basic.value,
  //               combatRating: pvpAllTime.combatRating.basic.value,
  //               deaths: pvpAllTime.deaths.basic.value,
  //               efficiency: pvpAllTime.efficiency.basic.value,
  //               fireTeamActivities: pvpAllTime.fireTeamActivities.basic.value,
  //               kills: pvpAllTime.kills.basic.value,
  //               killsDeathsAssists: pvpAllTime.killsDeathsAssists.basic.value,
  //               killsDeathsRatio: pvpAllTime.killsDeathsRatio.basic.value,
  //               longestKillDistance: pvpAllTime.longestKillDistance.basic.value,
  //               longestKillSpree: pvpAllTime.longestKillSpree.basic.value,
  //               opponentsDefeated: pvpAllTime.opponentsDefeated.basic.value,
  //               precisionKills: pvpAllTime.precisionKills.basic.value,
  //               remainingTimeAfterQuitSeconds: pvpAllTime.remainingTimeAfterQuitSeconds.basic.value,
  //               resurrectionsPerformed: pvpAllTime.resurrectionsPerformed.basic.value,
  //               resurrectionsReceived: pvpAllTime.resurrectionsReceived.basic.value,
  //               score: pvpAllTime.score.basic.value,
  //               secondsPlayed: pvpAllTime.secondsPlayed.basic.value,
  //               suicides: pvpAllTime.suicides.basic.value,
  //               weaponBestType: pvpAllTime.weaponBestType.basic.displayValue,
  //               winLossRatio: pvpAllTime.winLossRatio.basic.value
  //             })

  //             // Add this members stats to clan totals
  //             setClanTotalStats(clanTotalStats => ({
  //               counted: clanTotalStats.counted + 1,
  //               stats: {
  //                 totalActivities: clanTotalStats.stats.totalActivities + pvpAllTime.activitiesEntered.basic.value,
  //                 totalKills: clanTotalStats.stats.totalKills + pvpAllTime.kills.basic.value,
  //                 totalAssists: clanTotalStats.stats.totalAssists + pvpAllTime.assists.basic.value,
  //                 totalDeaths: clanTotalStats.stats.totalDeaths + pvpAllTime.deaths.basic.value,
  //                 totalSecondsPlayed: clanTotalStats.stats.totalSecondsPlayed + pvpAllTime.secondsPlayed.basic.value
  //               }
  //             }))
  //           } else {
  //             setClanTotalStats(clanTotalStats => ({
  //               ...clanTotalStats,
  //               counted: clanTotalStats.counted + 1
  //             }))
  //           }

  //           setPveStats(member.membershipId, {
  //             ...response.data.Response.mergedAllCharacters.results.allPvE.allTime
  //           })
  //         })
  //         .catch(error => {
  //           console.log('Clan members error', error)
  //         })
  //     })
  //   }
  // }, [members.length, clan.memberCount, setPvpStats, setPveStats])

  // useEffect(() => {
  //   startSetClanStat(groupId, clanTotalStats.stats)
  // }, [clanTotalStats.counted, startSetClanStat, groupId, clanTotalStats.stats])

  const selectVisibleMembers = (members, { sortBy, text, hoursPlayed }) => {
    return members.filter(member => {
      const textMatch = member.displayName.toLowerCase().includes(text.toLowerCase()) || member.displayNameCode.includes(text.toLowerCase())
      const hoursPlayedMatch = hoursPlayed ? (member.pvpStats.secondsPlayed / 60 / 60) >= hoursPlayed : true
      return textMatch && hoursPlayedMatch
    }).sort((a, b) => {
      if (sortBy === 'nameAsc') {
        return a.displayName.toLowerCase() < b.displayName.toLowerCase() ? -1 : 1
      } else if (sortBy === 'nameDesc') {
        return a.displayName.toLowerCase() > b.displayName.toLowerCase() ? -1 : 1
      } else if (sortBy === 'pvpMatchesDesc') {
        return a.pvpStats.activitiesEntered < b.pvpStats.activitiesEntered ? 1 : -1;
      } else if (sortBy === 'pvpMatchesAsc') {
        return a.pvpStats.activitiesEntered > b.pvpStats.activitiesEntered ? 1 : -1;
      } else if (sortBy === 'pvpWinsDesc') {
        return a.pvpStats.activitiesWon < b.pvpStats.activitiesWon ? 1 : -1;
      } else if (sortBy === 'pvpWinsAsc') {
        return a.pvpStats.activitiesWon > b.pvpStats.activitiesWon ? 1 : -1;
      } else if (sortBy === 'pvpWinRatioDesc') {
        return a.pvpStats.winLossRatio < b.pvpStats.winLossRatio ? 1 : -1;
      } else if (sortBy === 'pvpWinRatioAsc') {
        return a.pvpStats.winLossRatio > b.pvpStats.winLossRatio ? 1 : -1;
      } else if (sortBy === 'pvpKillsDesc') {
        return a.pvpStats.kills < b.pvpStats.kills ? 1 : -1;
      } else if (sortBy === 'pvpKillsAsc') {
        return a.pvpStats.kills > b.pvpStats.kills ? 1 : -1;
      } else if (sortBy === 'pvpAssistsDesc') {
        return a.pvpStats.assists < b.pvpStats.assists ? 1 : -1;
      } else if (sortBy === 'pvpAssistsAsc') {
        return a.pvpStats.assists > b.pvpStats.assists ? 1 : -1;
      } else if (sortBy === 'pvpDeathsDesc') {
        return a.pvpStats.deaths < b.pvpStats.deaths ? 1 : -1;
      } else if (sortBy === 'pvpDeathsAsc') {
        return a.pvpStats.deaths > b.pvpStats.deaths ? 1 : -1;
      } else if (sortBy === 'pvpKdrDesc') {
        return a.pvpStats.killsDeathsRatio < b.pvpStats.killsDeathsRatio ? 1 : -1;
      } else if (sortBy === 'pvpKdrAsc') {
        return a.pvpStats.killsDeathsRatio > b.pvpStats.killsDeathsRatio ? 1 : -1;
      } else if (sortBy === 'pvpEfficiencyDesc') {
        return a.pvpStats.efficiency < b.pvpStats.efficiency ? 1 : -1;
      } else if (sortBy === 'pvpEfficiencyAsc') {
        return a.pvpStats.efficiency > b.pvpStats.efficiency ? 1 : -1;
      } else {
        return a < b
      }
    })
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {clan.hasOwnProperty('name') && <ClanDetails clan={clan} />}
      <ClanLeaderboardTable
        visibleMembers={selectVisibleMembers(members, filters)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  )
}

export default ClanLeaderboard
