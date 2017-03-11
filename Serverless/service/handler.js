'use-strict';

var fs = require('fs');
var axios = require('axios');
var token;
try {
  token = JSON.parse(fs.readFileSync('./accessToken.json'));
  axios.defaults.headers.authorization = "Bearer " + token.access_token;
} catch (e) {
  axios.defaults.headers.authorization = "Bearer " + "27037c67-f394-4cfd-ab51-069ac71132fb";
  console.log('Configure accessToken.json in service folder');
}

var ensureProps = function(obj, props) {
  for (var i = 0; i < props.length; i++) {
    if (obj[props[i]] === undefined) {
      return false;
    }
  }
  return true;
}

var constructResponse = (response) => ({statusCode: response.status, body: JSON.stringify(response.data)});
var findMissing = function(obj, props) {
  var missing = [];
  for (var i = 0; i < props.length; i ++) {
    if (obj[props[i]] === undefined) {
      missing.push(props[i]);
    }
  }
  return missing;
}

module.exports.listings = (event, context, callback) => {
  axios.get('https://platform.otqa.com/sync/listings')
  .then(response => {
    var customResponse =  constructResponse(response);
    callback(null, customResponse);
  })
  .catch(error => {
    callback(error);
  });
};


var requiredReserveParams = ['firstName', 'emailAddress', 'lastName', 'reservationToken', 'restaurantId']
var constructReserveParameterError = () => new Error(`Body with ${requiredReserveParams} are required for reservations`);
module.exports.reserve = (event, context, callback) => {
  var vars = event;
  if (typeof vars === 'string') {
    try {
      vars = JSON.parse(vars);
    } catch (e) {
      return callback(constructReserveParameterError());
    }
  } else if (vars === undefined || vars === null) {
    return callback(constructReserveParameterError());
  }
  if(!ensureProps(vars, requiredReserveParams)) {
    return callback(new Error(`Missing Parameters: ${findMissing(vars, requiredReserveParams)}`))
  }
  axios.post("https://platform.otqa.com/booking/reservations", {
    first_name: event.firstName,
    email_address: event.emailAddress,
    last_name: event.lastName,
    reservation_token: event.reservationToken,
    restaurant_id: event.restaurantId,
    is_third_party: true
  })
  .then(response => {
    var customResponse = constructResponse(response)
    callback(null, customResponse);
  })
  .catch(error => {
    callback(error);
  });
}

/*

post to reserve

axios.post('SERVERLESS URL', {
  firstName, lastName, reservationToken, restaurantId, emailAddress
}).then(()=>{}).catch(()=>{});

*/
var requiredProvisionParams = ['partySize', 'dateTime', 'restaurantId'];
var constructProvisionParameterError = () => new Error(`Body with ${requiredProvisionParams} is required for provisioning a token`);
module.exports.provision = (event, context, callback) => {
  var vars = event;
  if (typeof vars === 'string') {
    try {
      vars = JSON.parse(vars);
    } catch (e) {
      return callback(constructProvisionParameterError());
    }
  } else if (vars === undefined || vars === null) {
    return callback(constructProvisionParameterError());
  }
  if (!ensureProps(vars, requiredProvisionParams)) {
    return callback(new Error(`Missing Parameters: ${findMissing(vars, requiredProvisionParams)}`));
  }
  axios.post("https://platform.otqa.com/booking/slot_locks", {
    party_size: vars.partySize,
    date_time: vars.dateTime,
    restaurant_id: vars.restaurantId
  })
  .then(response => {
    var customResponse = constructResponse(response);
    callback(null, customResponse);
  })
  .catch(error => {
    callback(error);
  });
};

var requiredAvailabilityParams = ["restaurantId", "startDateTime", "partySize"]
var constructAvailibilityParameterError = () => new Error(`Body with ${requiredAvailabilityParams} is required for checking availability`);
module.exports.availability = (event, context, callback) => {
  var vars = event;
  if (typeof vars === 'string') {
    try {
      vars = JSON.parse(vars);
    } catch (e) {
      return callback(constructAvailibilityParameterError());
    }
  } else if (vars === undefined || vars === null) {
    return callback(constructAvailibilityParameterError());
  }
  if (!ensureProps(vars, requiredAvailabilityParams)) {
    return callback(new Error(`Missing Parameters: ${findMissing(vars, requiredAvailabilityParams)}`));
  }
  axios.get(`https://platform.otqa.com/availability/${vars.restaurantId}`, {
    start_date_time: vars.startDateTime,
    party_size: vars.partySize
  })
  .then(response => {
    var customResponse = constructResponse(response);
    callback(null, customResponse);
  })
  .catch(callback);
}

// module.exports.
