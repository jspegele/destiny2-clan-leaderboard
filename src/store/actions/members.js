import axios from 'axios'

import * as actionTypes from './types'

export const setMembers = members => ({
  type: actionTypes.SET_MEMBERS,
  payload: {
    members
  }
})

// export const startSetMembers = ({ groupId }) => {
//   return async (dispatch) => {
//     await axios.get(`https://www.bungie.net/Platform/GroupV2/${groupId}/Members`, {
//       headers: {
//         'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
//       }
//     })
//     .then(response => {
//       const results = response.data.Response.results
//       const membersArray = []
//       results.forEach(item => {
//         membersArray.push({
//           displayName: item.destinyUserInfo.bungieGlobalDisplayName || (item.bungieNetUserInfo ? item.bungieNetUserInfo.displayName : item.destinyUserInfo.displayName),
//           displayNameCode: item.destinyUserInfo.bungieGlobalDisplayNameCode || "",
//           membershipId: item.destinyUserInfo.membershipId,
//           membershipType: item.destinyUserInfo.membershipType,
//           bungieNetMembershipId: item.bungieNetUserInfo ? item.bungieNetUserInfo.membershipId : "",
//           bungieNetMembershipType: item.bungieNetUserInfo ? item.bungieNetUserInfo.membershipType : "",
//           iconPath: item.bungieNetUserInfo ? item.bungieNetUserInfo.iconPath : item.destinyUserInfo.iconPath,
//           groupId: item.groupId,
//           isOnline: item.isOnline,
//           joinDate: item.joinDate,
//           lastOnlineStatusChange: item.lastOnlineStatusChange,
//           memberType: 3
//         })
//       })
//       return dispatch(setMembers(membersArray))
//     })
//     .catch(error => console.log('Clan members error', error.response))
//   }
// }

export const setPvpStats = (membershipId, stats) => ({
  type: actionTypes.SET_PVP_STATS,
  payload: {
    membershipId,
    stats
  }
})

export const setPveStats = (membershipId, stats) => ({
  type: actionTypes.SET_PVE_STATS,
  payload: {
    membershipId,
    stats
  }
})
