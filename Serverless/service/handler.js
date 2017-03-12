'use-strict';

var fs = require('fs');
var axios = require('axios');
var leftPad = require('left-pad');
var qs = require('querystring');
var token;
var fake = JSON.parse(fs.readFileSync('./fake.json'));
var gFetch = require('graphql-fetch')('https://www.opentable.com/graphql');

try {
  token = JSON.parse(fs.readFileSync('./accessToken.json'));
  axios.defaults.headers.authorization = "Bearer " + token.access_token;
} catch (e) {
  axios.defaults.headers.authorization = "Bearer " + "27037c67-f394-4cfd-ab51-069ac71132fb";
  console.log('Configure accessToken.json in service folder');
}

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
var ensureProps = function(obj, props) {
  for (var i = 0; i < props.length; i++) {
    if (obj[props[i]] === undefined) {
      return false;
    }
  }
  return true;
}

var dayToMS = (days) => 24 * 60 * 60 * 1000 * days;
var oneDay = dayToMS(1);
var constructResponse = (response) => ({statusCode: response.status, body: JSON.stringify(response.data)});
var constructFromUTC = (epoch) => {
  var date = new Date(epoch);
  return date.getYear() + 1900 + '-' + leftPad(date.getMonth(), 2, 0) + '-' + leftPad(date.getDay()+1, 2, 0) + 'T' + leftPad(date.getHours(), 2, 0) + ':' + leftPad(date.getMinutes(), 2, 0);
}
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
    console.log(response);
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


// module.exports.provision({partySize: 3, dateTime: constructFromUTC(Date.now()+389120302343984), restaurantId: 440}, null, console.log);
// module.exports.reserve({firstName: 'me', emailAddress: 'g@gmail.com', lastName: 'hi', reservationToken: '123', restaurantId: 440}, null, console.log);

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
  axios.get(`https://platform.otqa.com/availability/${vars.restaurantId}?`+ qs.stringify({
    start_date_time: vars.startDateTime,
    party_size: vars.partySize,
    forward_minutes: 90,
    backward_minutes: 90
  }))
  .then(response => {
    var customResponse = constructResponse(response);
    callback(null, customResponse);
  })
  .catch(callback);
};

module.exports.locationAvailability = (event, context, callback) => {
  var vars = event;
  if (typeof event === 'string') {
    vars = JSON.parse(vars);
  }
  axios.get(`https://platform.otqa.com/availability?` + qs.stringify({
    latitude: 37.7749,
    longitude: 122.4194,
    radius: 100000,
    party_size: vars.partySize || 2,
    start_date_time: vars.startDateTime,
    forward_minutes: 90,
    backward_minutes: 90,
    include_unavailable: false
  })).then(response => callback(null, response))
  .catch(error => callback(error));
}

// module.exports.locationAvailability({startDateTime: constructFromUTC(Date.now() + oneDay * 30 * 30), partySize: 2}, null, (e, r) => {
//   console.log(e, r);
//   if (e) {
//     console.log(e.response.data);
//   }
// });


module.exports.fetchEveningDates = (event, context, callback) => {
  var vars = event;
  vars = JSON.parse(vars);
  var partySize = vars !== null && vars !== undefined && typeof vars === 'object' ? vars.partySize : 2;
  var howFar = vars !== null && vars !== undefined && typeof vars === 'object' ? dayToMS(vars.days) : oneDay;
  var available = [];
  var constructChain = () => {
    var rid = ~~(Math.random() * 100000);
    console.log(rid);
    module.exports.availability({restaurantId:rid, partySize: partySize, startDateTime: constructFromUTC(Date.now() + howFar)}, null, (error, resp) => {
      if (!error) {
        console.log(resp);
      } else {
        console.log(error.response.data);
      }
      constructChain();
    });
  }
  constructChain();
};


var getSample = () => {
  var randomIndex = ~~(Math.random() * fake.length);
  return fake.slice(randomIndex, randomIndex + (~~(Math.random() * 3)+3)).sort((a,b) => a.startTime - b.startTime);
}

var fakeItinerary = JSON.parse(fs.readFileSync('./fakeItinerary.json'));

module.exports.itinerary = (event, context, callback) => {
  // var items = getSample();
  // items = items.sort((a,b) => {
  //   a.startTime - b.startTime;
  // });
  // var itinerary = [];
  // items.forEach((item, index, arr) => {
  //   itinerary.push(item);
  //   if (index !== arr.length -1) {
  //     const random = Math.random() > .25;
  //     var travel = {
  //       name: random ? 'Travel' : 'Train',
  //       icon: random ? 'walking' : 'car',
  //       img: 'https://source.unsplash.com/random',
  //       startTime: item.endTime,
  //       endTime: arr[index + 1].startTime
  //     }
  //     itinerary.push(travel);
  //   }
  // });
  callback(null, {statusCode: 200, body: JSON.stringify(fakeItinerary)});
}

module.exports.lyft = (event, context, callback) => {
  callback(null, {statusCode: 201, body: "LYFT OK "});
}

var retrieveRandomRestaurant = (rid) => {
  var query = `
  query {
    restaurant (restaurantId: ${rid || ~~(Math.random() * 10000)}){
      name
      description
      coordinates {
        latitude
        longitude
      }
    }
  }
  `;
  return gFetch(query, {}, {});
}

module.exports.restaurantDetails = (event, context, callback) => {
  var vars = event;
  if (typeof vars === 'string') {
    vars = JSON.parse(vars);
  }
  if (!vars) {
    vars = {};
  }
  retrieveRandomRestaurant(vars.rid)
  .then(result => {
      // items.forEach((item, index, arr) => {
  //   itinerary.push(item);
  //   if (index !== arr.length -1) {
  //     const random = Math.random() > .25;
  //     var travel = {
  //       name: random ? 'Travel' : 'Train',
  //       icon: random ? 'walking' : 'car',
  //       img: 'https://source.unsplash.com/random',
  //       startTime: item.endTime,
  //       endTime: arr[index + 1].startTime
  //     }
  //     itinerary.push(travel);
  //   }
  // });
    callback(null, {statusCode: 200, body: JSON.stringify(result)});
  })
  .catch(e => callback(e));
}

var makeMealTypes = (num) => ['Dessert', 'Dinner', 'Coffee', 'Lunch', 'Breakfast'].slice(0, num);
module.exports.fetchRestaurantItinerary = (event, context, callback) => {
  var vars = event || {};
  if (typeof vars === 'string') {
    vars = JSON.parse(vars);
  }

  var num = vars.count || 5;
  var result = {
    user: vars.user || "You",
    pair: vars.friend || "Friend",
    schedule: []
  }
  var checkComplete = (count) => {
    if (result.length > num || count === num) {
      var items = result.schedule;
      var itinerary = [];
      items.forEach((item, index, arr) => {
        itinerary.push(item);
        if (index !== arr.length -1) {
          const random = Math.random() > .25;
          var travel = {
            name: random ? 'Travel' : 'Walk',
            icon: random ? 'car' : 'walking',
            img: 'https://source.unsplash.com/random',
            startTime: item.endTime,
            endTime: arr[index + 1].startTime
          }
          itinerary.push(travel);
        }
      });
      result.schedule = itinerary;
      callback(null, {statusCode: 200, body: JSON.stringify(result)});
    }
  }
  var runCount = 0;
  var mealTypes = makeMealTypes(num + 1);
  var currentTime = new Date();
  currentTime.setHours(10);
  currentTime.setMinutes(0);
  currentTime.setSeconds(0);
  currentTime.setMilliseconds(0);
  for (var i = 0; i < num; i++) {
    retrieveRandomRestaurant().then(response => {
      if (mealTypes.length > 0 && response.data.restaurant) { 
        var scheduleItem = {};
        scheduleItem.name = mealTypes.pop();
        scheduleItem.desc = response.data.restaurant.name;
        scheduleItem.icon = 'dish';
        scheduleItem.img = "http://openforbusiness.opentable.com/wp-content/uploads/2016/08/EWP2016_ThirstyBear-0366.jpg";
        scheduleItem.startTime = currentTime.getTime();
        currentTime.setHours(currentTime.getHours() + ~~((Math.random() * 1) + 1));
        currentTime.setMinutes(currentTime.getMinutes() + ~~((Math.random() * 2) * 30));
        scheduleItem.endTime = currentTime.getTime();
        currentTime.setHours(currentTime.getHours() + ~~((Math.random() * 1) + 1));
        currentTime.setMinutes(currentTime.getMinutes() + ~~((Math.random() * 2) * 30));
        result.schedule.push(scheduleItem);
        checkComplete(++runCount);
      } else {
        checkComplete(++runCount);
      }
    }).catch(callback);
  }
}
