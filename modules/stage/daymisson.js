var Stage = require("./stage");
var Click = require("../click");

var misson = Stage.createNew("daymission");
misson.name = "每日任务";
misson.index = 0;
misson.timeCost = 40 * 1000;

misson.prepare = function() {
  // 如果是周末，则选择经验奖励
  var now = new Date();
  if (now.getDay() === 0 || now.getDay() === 6) {
    Click.clickRect(this.getBonusItem(3));
  }
};

misson.getBonusItem = function(index) {
  var top = 295;
  var left = 20;
  var width = 503;
  var height = 180;
  return { x: left + index * width, y: top, width: width, height: height };
};

module.exports = misson;
