import { types } from './actionConstants';
import axios from 'axios';
const serverlessActions = {
  fetchOpenTableListing: () => {
    return {
      type: types.FETCH_OPENTABLE_LIST,
      request: axios.get('https://x0u64jkdmd.execute-api.us-east-1.amazonaws.com/dev/listings')
    };
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

export default serverlessActions;