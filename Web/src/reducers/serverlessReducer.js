function serverlessReducer(state = {}, payload) {
  switch(payload.type) {
    case 'FETCH_OPENTABLE_LIST':    
      return Object.assign({}, state, {
        restaurants: addDateNightFilters(payload.data.items)
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

const categories = [
  'Italian',
  'Korean', 
  'American',
  'Californian',
  'Japanese',
  'Chinese',
  'Spanish Tapas',
  'French',
  'Mexican',
  'Mediterranean',
  'Seafood',
  'Peruvian',
  'Moroccan'
];

const dollars = [
  '$',
  '$$',
  '$$$',
  '$$$$',
  '$$$$$'
];

const vibes = [
  "Trending spots only",
  "Keep it chill",
  "Sporty or dive bars",
  "I dig cocktails",
  "Keep it close to home",
  "Romantic only",
  "With live music"
];

function addDateNightFilters(data) {
  data.map((restaurant) => {
    restaurant.options = categories[Math.floor(Math.random()*categories.length)];
    restaurant.dollars = dollars[Math.floor(Math.random()*dollars.length)];
    restaurant.vibe = vibes[Math.floor(Math.random()*vibes.length)];
    if (restaurant.name === 'Thirsty Bear') {
      restaurant.options = 'American';
      restaurant.dollars = '$$$';
      restaurant.vibe = 'chill';
    }
  })

  return data;
}



export default serverlessReducer;
