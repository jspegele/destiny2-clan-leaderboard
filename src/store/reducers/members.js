import * as actionTypes from '../actions/types'

const membersReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_MEMBERS:
      return action.payload.members
    case actionTypes.SET_PVP_STATS:
      return state.map(member => {
        if (member.destinyUserInfo.membershipId === action.payload.membershipId) {
          return {
            ...member,
            pvpStats: action.payload.stats
          }
        } else {
          return member
        }
      })
    case actionTypes.SET_PVE_STATS:
      return state.map(member => {
        if (member.destinyUserInfo.membershipId === action.payload.membershipId) {
          return {
            ...member,
            pveStats: action.payload.stats
          }
        } else {
          return member
        }
      })
    default:
      return state
  }
}

export default membersReducer
