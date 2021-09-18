import * as actionTypes from '../actions/types'

const clanReducerDefaultState = {
  about: "",
  avatarPath: "",
  capabilities: 31,
  clanCallsign: "",
  creationDate: "",
  groupId: "",
  groupType: 1,
  locale: "en",
  memberCount: 0,
  membershipOption: 0,
  motto: "",
  name: ""
}

const clanReducer = (state = clanReducerDefaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CLAN:
      return action.payload.clan
    default:
      return state
  }
}

export default clanReducer
