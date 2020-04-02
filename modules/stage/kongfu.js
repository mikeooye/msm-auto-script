var Stage = require('./stage');

var misson = Stage.createNew('kongfu');
misson.name = '熊猫道场';
misson.index = 3;
misson.timeCost = (15 * 60 + 40) * 1000;

Object.assign(misson, {
  go: { x: 1964, y: 1344, width: 560, height: 141 },
  // 确定按钮
  confirm: { x: 1293, y: 1293, width: 563, height: 145 },
  // 继续按钮
  continue: { x: 1490, y: 1290, width: 366, height: 146 },
  // 返回上级
  back: { x: 1100, y: 1290, width: 360, height: 130 }
});

module.exports = misson;