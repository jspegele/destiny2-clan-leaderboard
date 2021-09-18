import * as actionTypes from './types'

export const setClan = clan => ({
  type: actionTypes.SET_CLAN,
  payload: {
    clan
  }
})
