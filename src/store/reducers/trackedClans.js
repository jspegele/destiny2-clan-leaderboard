import * as actionTypes from '../actions/types'

const trackedClansReducerDefaultState = []

const trackedClansReducer = (state = trackedClansReducerDefaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRACKED_CLANS:
      return action.payload.trackedClans
    case actionTypes.SET_CLAN_STATS:
      return state.map(clan => {
        if (clan.groupId === action.payload.groupId) {
          return {
            ...clan,
            stats: action.payload.stats
          }
        } else {
          return clan
        }
      })
    default:
      return state
  }
}

export default trackedClansReducer
