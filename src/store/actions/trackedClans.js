import database from '../../firebase/firebase'

import * as actionTypes from './types'

export const setTrackedClans = trackedClans => ({
  type: actionTypes.SET_TRACKED_CLANS,
  payload: {
    trackedClans
  }
})

export const setClanStat = (groupId, statsObj) => ({
  type: actionTypes.SET_CLAN_STAT,
  payload: {
    groupId,
    statsObj
  }
})

export const startSetClanStat = (groupId, statsObj) => {
  return (dispatch) => {
    return database
      .ref(`tracked_clans/${groupId}/stats/`)
      .set(statsObj)
      .then(() => {
        dispatch(setClanStat(groupId, statsObj))
      }).catch((e) => {
        console.log('Error saving clan stats', e);
      })
  }
}
