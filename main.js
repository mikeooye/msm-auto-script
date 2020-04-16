var A = require("./action");
var C = require("./config");

// var width = 1024;
// var height = 640;

// setScreenMetrics(width, height);

A.prepare();


var type = dialogs.select("脚本类型", [
  "主线任务",
  "分解低级装备",
  "日常任务",
  "樱花活动奖励",
]);

switch (type) {
  case 0:
    A.goMainline();
    break;
  case 1:
    A.buyEquipment();
    break;
  case 2: {
    let level = C.getLevel();
    let attack = C.getAttack();
    A.missions.prepare();
    A.missions.gonghui();
    if (level >= 100) {
      A.missions.meiri();
    }
    A.missions.jinhuaxitong(level);
    A.missions.wulingdaoguan();
    A.missions.jingyingboss(attack);
    A.missions.jinzita(level);
    A.missions.haidao();
    A.missions.minirenwu();
    break;
  }
  case 3: {
    A.getYinghuaBonus();
    break;
  }
  default:
    break;
}
