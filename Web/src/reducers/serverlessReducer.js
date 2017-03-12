function serverlessReducer(state = {}, payload) {
  switch(payload.type) {
    case 'FETCH_OPENTABLE_LIST':    
      return Object.assign({}, state, {
        restaurants: payload.data.items
      });
    case 'MOCK_ITINERARY':
       return Object.assign({}, state, {
        itinerary: payload.data
       });
    case 'RESERVE_OPENTABLE':
      return {
        openTableList:['res']
      }
    case 'AVAILABILITY_OPENTABLE':
      return {
        openTableList:['ava']
      }
    default:
      return state
  }
}

export default serverlessReducer;
