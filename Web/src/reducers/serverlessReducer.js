function serverless(state = {}, action) {
  switch(action.type) {
    case 'SL_FETCH_LISTING':
      return {
        listing:['lol']
      }
    default:
      return state
  }
}

export default serverless;
