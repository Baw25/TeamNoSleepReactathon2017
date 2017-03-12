//macro for creating a fake json file.

var fs = require('fs');
let a = fs.readFileSync('./fakeNames.txt');
a = a.toString().split('\n');
a = a.map(item => {
  const startMs = Date.now() + ~~(Math.random() * 100000000);
  const endMs = startMs + ~~(Math.random() * 3 * 60 * 60 * 1000);
  return {
    name: item,
    startTime: startMs,
    endTime: endMs,
    img: "https://source.unsplash.com/random"
  }
});

let w = fs.createWriteStream('./fake.json');
w.write(JSON.stringify(a));