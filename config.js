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

var getTickets = function () {
  return (
    dialogs.select("门票", [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ]) + 1
  );
};

var createPlayer = function (iLevel, iAttack, iTickets) {
  let level = iLevel || getLevel();
  let attack = iAttack || getAttack();
  let tickets = iTickets || getTickets();

  return {
    level: level,
    attack: attack,
    tickets: tickets,
  };
};

var getMissionType = function() {
  var options = ["每日任务", "进化系统", "精英Boss", "武陵道馆", "迷你地图"];
  var selection = dialogs.select("脚本类型", options);
  return options[selection];
}

var getScriptType = function () {
  var options = ["主线任务", "分解低级装备", "日常任务全票", "日常任务单项", "樱花活动奖励"];
  var selection = dialogs.select("脚本类型", options);
  return options[selection];
};

module.exports = {
  getLevel: getLevel,
  getAttack: getAttack,
  getPlayer: createPlayer,
  getType: getScriptType,
  getMissionType: getMissionType
};
