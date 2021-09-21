import * as actionTypes from './types'

export const setMembers = members => ({
  type: actionTypes.SET_MEMBERS,
  payload: {
    members
  }
})

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
