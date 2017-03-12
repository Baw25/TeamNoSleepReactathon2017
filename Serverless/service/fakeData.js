//macro for creating a fake json file.

var fs = require('fs');

const icons = [
  'bench',
  'calendar',
  'coffee',
  'dish',
  'fireworks',
  'location',
  'meat',
  'movie',
  'muffin',
  'park',
  'table',
  'tickets',
];

const randomIcon = () => icons[Math.floor(Math.random() * icons.length)];

let a = fs.readFileSync('./fakeNames.txt');
a = a.toString().split('\n');
a = a.map(item => {
  const startMs = Date.now() + ~~(Math.random() * 100000000);
  const endMs = startMs + ~~(Math.random() * 3 * 60 * 60 * 1000);
  return {
    name: item,
    icon: randomIcon(),
    startTime: startMs,
    endTime: endMs,
    img: "https://source.unsplash.com/random"
  }
});

let w = fs.createWriteStream('./fake.json');
w.write(JSON.stringify(a));