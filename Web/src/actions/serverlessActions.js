import { types } from './actionConstants';
import axios from 'axios';

const serverlessActions = {
  fetchOpenTableListing: () => {
    return function (dispatch) {
    dispatch(requestTransactions())  
      const type = types.FETCH_OPENTABLE_LIST;
      const instance = axios.get('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/listings')
      .then(function(res) {
        dispatch(receiveTransactions(res, type))
      })
      .catch(function(err) {
        //TODO do awesome error handling
      })
    }
  },
  provisionOpenTable: ({restaurantId, dateTime, partySize}) => {
    return {
      type: types.PROVISION_OPENTABLE,
      request: axios.post('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/provision', {
        restaurantId, dateTime, partySize
      })
    }
  },
  reserveOpenTable: ({restaurantId, reservationToken, firstName, lastName, emailAddress, phoneNumber, countryCode}) => {
    return {
      type: types.RESERVE_OPENTABLE,
      request: axios.post('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/reserve', {
        restaurantId, reservationToken, firstName, lastName, emailAddress, phoneNumber, countryCode: countryCode || 'USA'
      })
    }
  },
  availabilityOpenTables: ({restaurantId, startDateTime, timeBetween}) => {
    return {
      type: types.AVAILABILITY_OPENTABLE,
      request: axios.get('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/availability', {
        restaurantId, startDateTime, timeBetween: timeBetween || 30
      })
    }
  }
}

// set data and loaded status
function receiveTransactions(res, type) {
  return {
    type: type,
    data: res.data.items,
    loaded: true
  }
}

function requestTransactions() {
  return {
    type: 'REQUEST_TRANSACTION',
  }
}

export default serverlessActions;