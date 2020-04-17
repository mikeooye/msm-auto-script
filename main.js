var A = require("./action");
var C = require("./config");

// var width = 1024;
// var height = 640;

// setScreenMetrics(width, height);

A.prepare();


var type = C.getType();

switch (type) {
  case "主线任务":
    A.goMainline();
    break;
  case "分解低级装备":
    A.buyEquipment();
    break;
  case '日常任务全票': {
    let player = C.getPlayer(null, null, 3);
    A.missions.prepare();
    A.missions.gonghui(player);
    if (level >= 100) {
      A.missions.meiri(player);
    }
    A.missions.jinhuaxitong(player);
    A.missions.wulingdaoguan(player);
    A.missions.jingyingboss(player);
    A.missions.jinzita(player);
    A.missions.haidao(player);
    A.missions.minirenwu(player);
    break;
  }
  case "樱花活动奖励": {
    A.getYinghuaBonus();
    break;
  }
  case "日常任务单项": {
    var missionType = C.getMissionType();
    var player = C.getPlayer();
    switch (missionType) {
      case "每日任务":{
        A.missions.meiri(player);
        break;
      }
      case "进化系统": {
        A.missions.jinhuaxitong(player);
        break;
      }
      case "精英Boss": {
        A.missions.jingyingboss(player);
        break;
      }
      case "武陵道馆": {
        A.missions.wulingdaoguan(player);
        break;
      }
      case "迷你地图": {
        A.missions.minirenwu(player);
        break;
      }
      default:
        break;
    }
    break;
  }
  default:
    break;
}
