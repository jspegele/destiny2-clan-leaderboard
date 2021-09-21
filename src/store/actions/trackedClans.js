import * as actionTypes from './types'

export const setTrackedClans = trackedClans => ({
  type: actionTypes.SET_TRACKED_CLANS,
  payload: {
    trackedClans
  }
})

export const setClanStats = (groupId, stats) => ({
  type: actionTypes.SET_CLAN_STATS,
  payload: {
    groupId,
    stats
  }
})
