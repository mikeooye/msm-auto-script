var rect = require('./rect');

for (var index = 0; index < 12; index++) {
  console.log(rect.missionMainBounds(index));
}

var newRect = rect.missionMainBounds(0);
console.log(newRect.centerX());

