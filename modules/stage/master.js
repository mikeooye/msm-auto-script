var Stage = require("./stage");
var Click = require("../click");

var misson = Stage.createNew("master");
misson.name = "精英任务";
misson.index = 2;
misson.timeCost = (10 * 60 + 30) * 1000;
misson.beforeConfirm = function() {
  sleep(10000);
}

misson.prepare = function(player) {
  Click.clickRect(player.preferedMaster);
  Click.clickRect(this.options.hard);
};

Object.assign(misson, {
  // 进入按钮
  go: { x: 1964, y: 1344, width: 560, height: 141 },
  // 确定按钮
  confirm: { x: 550, y: 710, width: 192, height: 70 },
  // 继续按钮
  continue: { x: 1495, y: 1172, width: 360, height: 140 },
  // 返回上级
  back: { x: 1110, y: 1172, width: 360, height: 140 }
});

misson.options = {
  hard: { x: 40, y: 695, width: 320, height: 120 }
};

module.exports = misson;
