import * as actionTypes from './types'

export const setMembers = members => ({
  type: actionTypes.SET_MEMBERS,
  payload: {
    members
  }
})
