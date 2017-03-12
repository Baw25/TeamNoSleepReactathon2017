'use-strict';

var fs = require('fs');
var axios = require('axios');
var leftPad = require('left-pad');
var qs = require('querystring');
var token;
var fake = JSON.parse(fs.readFileSync('./fake.json'));
var gFetch = require('graphql-fetch')('https://www.opentable.com/graphql');
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyDtVF-t3CztPSr_Oymp5SlM9vuxtVnEyTk",
  authDomain: "reactathon-d75ec.firebaseapp.com",
  databaseURL: "https://reactathon-d75ec.firebaseio.com",
  storageBucket: "reactathon-d75ec.appspot.com",
  messagingSenderId: "240328496149"
};
var app = firebase.initializeApp(config);
var striptags = require('striptags');
var imgs = fs.readFileSync('./images.txt').toString().split('\n');
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
  return date.getYear() + 1900 + '-' + leftPad(date.getMonth()+1, 2, 0) + '-' + leftPad(date.getDay()+1, 2, 0) + 'T' + leftPad(date.getHours(), 2, 0) + ':' + leftPad(date.getMinutes(), 2, 0);
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

var fixPhoneNumber = (phony) => {
  while(phony.endsWith('x')) {
    phony = phony.slice(0,-1);
  }
  if (phony.length === 9) {
    return '(' + phony.slice(0,3) + ')-' + phony.slice(3,6) + '-' + phony.slice(6);
  } else {
    return phony[0] + '(' + phony.slice(1,4) + ')-' + phony.slice(4,7) + '-' + phony.slice(7);
  }
}
module.exports.listings = (event, context, callback) => {
  axios.get('https://platform.otqa.com/sync/listings')
  .then(response => {
    response.data.items = response.data.items.map((item,index) => {
      item.phone_number = fixPhoneNumber(item.phone_number);
      if (item.name !== 'Thirsty Bear') {
        item.src = imgs[index];
      } else {
        item.src = "http://openforbusiness.opentable.com/wp-content/uploads/2016/08/EWP2016_ThirstyBear-0366.jpg"
      }
      item.points = ~~(Math.random()*10);
      return item;
    });
    var customResponse =  constructResponse(response);
    callback(null, customResponse);
  })
  .catch(error => {
    callback(error);
  });
};

var availableIds = [334879, 334882, 334885, 334888, 334891, 334894, 334897, 334900, 334903];

/*

post to reserve

axios.post('SERVERLESS URL', {
  firstName, lastName, reservationToken, restaurantId, emailAddress
}).then(()=>{}).catch(()=>{});

*/
var requiredAvailabilityParams = [] || ["restaurantId", "startDateTime", "partySize"]
var constructAvailibilityParameterError = () => new Error(`Body with ${requiredAvailabilityParams} is required for checking availability`);
module.exports.availability = (event, context, callback) => {
  var vars = event || {};
  vars.startDateTime = constructFromUTC(Date.now() + 9000000000);
  vars.partySize = 2;
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
  //region otqa ids
  vars.restaurantId = availableIds[~~(Math.random() * availableIds.length)];
  //endregion otqa ids
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

var requiredProvisionParams = ['partySize', 'dateTime', 'restaurantId'];
var constructProvisionParameterError = () => new Error(`Body with ${requiredProvisionParams} is required for provisioning a token`);
module.exports.provision = (event, context, callback) => {
  module.exports.availability(event, context, (error, response) => {
    if (error) return callback(error);
    var vars = event || {};
    var resp = JSON.parse(response.body);
    vars.restaurantId = resp.rid;
    vars.partySize = resp.party_size;
    vars.dateTime = resp.times[~~(Math.random() * resp.times.length)];
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
      response.data.restaurant_id = vars.restaurantId
      var customResponse = constructResponse(response);
      callback(null, customResponse);
    })
    .catch(error => {
      callback(error);
    });
  });
};

var requiredReserveParams = ['firstName', 'emailAddress', 'lastName', 'reservationToken', 'restaurantId']
var constructReserveParameterError = () => new Error(`Body with ${requiredReserveParams} are required for reservations`);
module.exports.reserve = (event, context, callback) => {
  module.exports.provision(event, context, (error, response) => {
    if (error) return callback(error);
    var vars = event || {};
    vars.firstName = vars.firstName || 'react';
    vars.lastName = vars.lastName || 'athon';
    vars.emailAddress = 'faker@fake.com';
    vars.phone = {
      number: "8008880000",
      country_code: "UK",
      phone_type: "Mobile",
      extension: "124"
    };
    var resp = JSON.parse(response.body);
    vars.reservationToken = resp.reservation_token;
    vars.restaurantId = resp.restaurant_id;
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
      first_name: vars.firstName,
      email_address: vars.emailAddress,
      last_name: vars.lastName,
      reservation_token: vars.reservationToken,
      phone: vars.phone,
      restaurant_id: vars.restaurantId,
      is_third_party: true,
      diner_info: {
      first_name: "John",
      last_name: "Smith",
      phone: {
          phone_type: "Mobile",
          country_code: "US",
          number: "8285552233",
          extension: "124"
      }
  }
    })
    .then(response => {
      var customResponse = constructResponse(response)
      callback(null, customResponse);
      console.log(response);
    })
    .catch(error => {
      callback(error);
    });
  });
}

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

//d69927c7ea5c770fa2ce9a2f1e3589bd896454f7068f689d8e41a25b54fa6042
var getPictures = (number) => {
  axios.get('https://unsplash.com/search/photos/restaurant')
  .then(result => {
    console.log(result.data);
  }).catch(e => {
    console.log(e);
  })
}

// getPictures();

