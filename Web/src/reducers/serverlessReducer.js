function serverlessReducer(state = {}, action) {
  switch(action.type) {
    case 'SL_FETCH_LISTING':
      return {
        openTableList:['lol']
      }
    default:
      return state
  }
}

export default serverlessReducer;
