import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { setClan } from '../store/actions/clan'
import { setMembers } from '../store/actions/members'
import selectVisibleMembers from '../utilities/selectVisibleMembers'

import ClanDetails from './ClanDetails'
import ClanLeaderboardTable from './ClanLeaderboardTable'
import ClanLeaderboardSkeleton from './ClanLeaderboardSkeleton'

import styles from './styles/clan-leaderboard.module.scss'

const ClanLeaderboard = ({ groupId, clan, members, setClan, setMembers }) => {
  const [fetchNewData, setFetchNewData] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    sortBy: "nameAsc",
    text: "",
    hoursPlayed: 0
  })

  // if clan data is not already in store, fetch new clan data
  useEffect(() => {
    if (groupId !== clan.groupId) {
      setMembers([])
      setFetchNewData(true)
    } else {
      setLoading(false)
    }
  }, [])

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
        setClan({
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

    if (fetchNewData) {
      fetchClanDetails()
    }

  }, [groupId, setClan, fetchNewData])

  // Fetch Clan Members
  useEffect(() => {
    async function fetchClanMemberStats(membershipType, membershipId) {
      let pvpStats = {}, pveStats = {}

      const fetchUrl = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Stats/`
      const response = await axios.get(fetchUrl, {
        headers: {
          'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
        }
      })
      .catch(error => console.log('Error fetching clan member stats', membershipId, error.response))

      if (response && response.status === 200) {
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

    async function createClanMember(member) {
      const memberStats = await fetchClanMemberStats(member.destinyUserInfo.membershipType, member.destinyUserInfo.membershipId)

      return ({
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
        
        Promise.all(results.map(member =>
          createClanMember(member)
        ))
        .then(membersArray => {
          setMembers(membersArray)
          setLoading(false)
        })
        
        // const membersArray = []
        // results.forEach(async member => {
        //   const memberStats = await fetchClanMemberStats(member.destinyUserInfo.membershipType, member.destinyUserInfo.membershipId)
          
        //   membersArray.push({
        //     displayName: member.destinyUserInfo.bungieGlobalDisplayName || (member.bungieNetUserInfo ? member.bungieNetUserInfo.displayName : member.destinyUserInfo.displayName),
        //     displayNameCode: member.destinyUserInfo.bungieGlobalDisplayNameCode || "",
        //     membershipId: member.destinyUserInfo.membershipId,
        //     membershipType: member.destinyUserInfo.membershipType,
        //     bungieNetMembershipId: member.bungieNetUserInfo ? member.bungieNetUserInfo.membershipId : "",
        //     bungieNetMembershipType: member.bungieNetUserInfo ? member.bungieNetUserInfo.membershipType : "",
        //     iconPath: member.bungieNetUserInfo ? member.bungieNetUserInfo.iconPath : member.destinyUserInfo.iconPath,
        //     groupId: member.groupId,
        //     isOnline: member.isOnline,
        //     joinDate: member.joinDate,
        //     lastOnlineStatusChange: member.lastOnlineStatusChange,
        //     memberType: 3,
        //     pvpStats: memberStats.pvpStats,
        //     pveStats: memberStats.pveStats
        //   })
        // })
        // setMembers(membersArray)

      })
      .catch(error => console.log('Error fetching clan members', error.response))
    }

    if (fetchNewData) {
      fetchClanMembers()
    }

  }, [groupId, setMembers, fetchNewData])

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

  const selectMembersWithNoPvpStats = members => {
    return members.filter(member => !member.pvpStats.hasOwnProperty('activitiesEntered'))
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {(!loading && members.length) ? (
        <>
          {clan.hasOwnProperty('name') && <ClanDetails clan={clan} />}
          <ClanLeaderboardTable
            visibleMembers={selectVisibleMembers(members, filters)}
            membersWithNoPvpStats={selectMembersWithNoPvpStats(members)}
            filters={filters}
            setFilters={setFilters}
          />
        </>
      ) : (
        <div className={styles.loading}>
          <div className={styles.overlay}>
            <div className={styles.overlayText}>
              Fetching data
            </div>
          </div>
          <ClanLeaderboardSkeleton />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  clan: state.clan,
  members: state.members
})

const mapDispatchToProps = {
  setClan,
  setMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(ClanLeaderboard)
