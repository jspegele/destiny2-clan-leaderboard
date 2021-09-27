import * as actionTypes from '../actions/types'

const membersReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_MEMBERS:
      return action.payload.members
    default:
      return state
  }
}

export default membersReducer
