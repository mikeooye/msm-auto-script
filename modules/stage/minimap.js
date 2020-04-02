var Stage = require("./stage");
var Click = require("../click");
var Rect = require("../rect");

var misson = Stage.createNew("minimap");
misson.name = "迷你地图";
misson.index = 4;
misson.timeCost = (15 * 60 + 40) * 1000;

misson.prepare = function() {
  Click.clickRect(this.options.fifteen);
};

misson.afterConfirm = function() {
  Click.clickRect(this.options.auto);
  Click.clickRect(this.options.autoTimeGet);
  Click.clickRect(this.options.autoStart);
};

misson.beforeFinish = function() {
  Click.clickRect(this.options.expConfirm);
};

Object.assign(misson, {
  // 准备进入
  go: Rect.make("1958 1336 2521 1480"),
  // 确认进入
  confirm: Rect.make("1296 1297 1857 1440"),
  // 再次
  continue: Rect.make("1518 1298 1919 1441"),
  // 返回
  back: Rect.make("1080 1299 1480 1441")
});

misson.options = {
  // 15 分钟选项
  fifteen: Rect.make("1836 512 2078 832"),
  // 准备进入
  go: Rect.make("1958 1336 2521 1480"),
  // 确认进入
  confirm: Rect.make("1296 1297 1857 1440"),
  // 开启自动攻击
  auto: Rect.make("688 1429 812 1555"),
  // 获取自动时间
  autoTimeGet: Rect.make("1758 850 1975 946"),
  // 确认自动攻击
  autoStart: Rect.make("998 1160 1561 1302"),
  // 经验确认
  expConfirm: Rect.make("1000 1079 1562 1219")
};

module.exports = misson;
