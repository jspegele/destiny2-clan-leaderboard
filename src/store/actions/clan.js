import axios from 'axios'

import * as actionTypes from './types'

export const setClan = clan => ({
  type: actionTypes.SET_CLAN,
  payload: {
    clan
  }
})

export const startSetClan = (groupId) => {
  return async dispatch => {
    axios.get(`https://www.bungie.net/Platform/GroupV2/${groupId}/`, {
      headers: {
        'X-API-Key': process.env.REACT_APP_BUNGIE_API_KEY
      }
    })
    .then(response => {
      const detail = response.data.Response.detail
      return dispatch(setClan({
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
      }))
    })
    .catch(error => error)
  }
}
