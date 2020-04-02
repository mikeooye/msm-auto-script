var Stage = require("./stage");
var Click = require("../click");

var misson = Stage.createNew("evalution");
misson.name = "进化系统";
misson.index = 1;
misson.timeCost = (5 * 60 + 30) * 1000;
misson.go = { x: 1964, y: 1344, width: 560, height: 130 };
// 确定按钮
misson.confirm = { x: 1300, y: 1298, width: 560, height: 130 };
// 继续按钮
misson.continue = { x: 1490, y: 1154, width: 360, height: 130 };
// 返回上级
misson.back = { x: 1110, y: 1154, width: 360, height: 130 };

misson.prepare = function() {
  Click.clickRect(this.options.bossTab);
  Click.clickRect(this.options.bossOptions[1]);
};

misson.options = {
  bossTab: { x: 915, y: 454, width: 268, height: 110 },
  // 选项
  bossOptions: [
    { x: 100, y: 610, width: 237, height: 270 },
    { x: 370, y: 610, width: 237, height: 270 },
    { x: 630, y: 610, width: 237, height: 270 },
    { x: 900, y: 610, width: 237, height: 270 }
  ]
};

module.exports = misson;
