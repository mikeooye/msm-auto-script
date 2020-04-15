var A = require("./action");

// var width = 1024;
// var height = 640;

// setScreenMetrics(width, height);

A.prepare();
// A.clearAds();
// A.goMainline();

// A.buyEquipment();

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
    getLevel();
    getAttack();
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

var getLevel = function () {
  var level = dialogs.select("角色登记", [
    "<60",
    "<80",
    "<100",
    "<120",
    "<140",
    ">=140",
  ]);

  switch (level) {
    case 0:
      level = 59;
      break;
    case 1:
      level = 79;
      break;
    case 2:
      level = 99;
      break;
    case 3:
      level = 119;
      break;
    case 4:
      level = 139;
      break;
    default:
      level = 220;
      break;
  }
  return level;
};

var getAttack = function () {
  var attack = dialogs.select("攻击强度", ["很弱", "中等", "较强", "很强"]);
  switch (attack) {
    case 0: {
      attack = 2;
      break;
    }
    case 1: {
      attack = 5;
      break;
    }
    case 2: {
      attack = 8;
      break;
    }
    default: {
      attack = 10;
      break;
    }
  }
  return attack;
};
