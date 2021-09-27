import axios from 'axios'

import * as actionTypes from './types'

export const setMembers = members => ({
  type: actionTypes.SET_MEMBERS,
  payload: {
    members
  }
})

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

export const startSetMembers = (groupId) => {
  return async dispatch => {
    await axios.get(`https://www.bungie.net/Platform/GroupV2/${groupId}/Members`, {
      headers: {
        'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
      }
    })
    .then(async response => {
      const results = response.data.Response.results
      
      await Promise.all(results.map(member =>
        createClanMember(member)
      ))
      .then(membersArray => {
        return dispatch(setMembers(membersArray))
      })
    })
    .catch(error => console.log('Error fetching clan members', error.response))
  }
}
