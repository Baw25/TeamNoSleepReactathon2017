function userReducer(state = {}, action) {
  switch(action.type) {
    case 'GET_USER_LOCATION':
      return {
        userLocation: 'San Francisco'
      }
    default:
      return state
  }
}

export default userReducer;
