var A = require("./action");
var C = require("./config");
var Root = require("./src/target/root");
var MissionMenu = require("./src/target/missionMenu");
var QuickDungeon = require("./src/target/dungeon/quick");
var ifufo = require("./src/player/ifufo");
var Dungeon = require("./src/target/dungeon/index");

// var width = 1024;
// var height = 640;

// setScreenMetrics(width, height);

A.prepare();

Root.missionMenu.checkClick();
MissionMenu.quickDungeon.checkClick();
// QuickDungeon.daily.checkClick();

// DailyDungeon.exec();
// Elite.exec(ifufo);
// Wuling.exec(ifufo);
// Evolution.exec(ifufo);
// Guild.exec(ifufo);

// Dungeon.quick.daily.checkClick();
// Dungeon.daily.exec();

// Dungeon.quick.mini.checkClick();
Dungeon.quick.daily.checkClick();
Dungeon.daily.exec(ifufo);
// Dungeon.mini.exec();
Dungeon.quick.elite.checkClick();
Dungeon.elite.exec(ifufo);
Dungeon.quick.guild.checkClick();
Dungeon.guild.exec(ifufo);
Dungeon.quick.wuling.checkClick();
Dungeon.wuling.exec(ifufo);
Dungeon.quick.evolution.checkClick();
Dungeon.evolution.exec(ifufo);

// var type = C.getType();

// switch (type) {
//   case "主线任务":
//     A.goMainline();
//     break;
//   case "分解低级装备":
//     A.buyEquipment();
//     // A.fenjie(59, 0);
//     break;
//   case '日常任务全票': {
//     let player = C.getPlayer(null, null, 1);
//     A.missions.prepare();
//     A.missions.gonghui(player);
//     if (player.level >= 100) {
//       A.missions.meiri(player);
//     }
//     A.missions.jinhuaxitong(player);
//     A.missions.wulingdaoguan(player);
//     A.missions.jingyingboss(player);
//     A.missions.jinzita(player);
//     A.missions.haidao(player);
//     A.missions.minirenwu(player);
//     break;
//   }
//   case "樱花活动奖励": {
//     A.getYinghuaBonus();
//     break;
//   }
//   case "日常任务单项": {
//     var missionType = C.getMissionType();
//     var player = C.getPlayer();
//     switch (missionType) {
//       case "每日任务":{
//         A.missions.meiri(player);
//         break;
//       }
//       case "进化系统": {
//         A.missions.jinhuaxitong(player);
//         break;
//       }
//       case "精英Boss": {
//         A.missions.jingyingboss(player);
//         break;
//       }
//       case "武陵道馆": {
//         A.missions.wulingdaoguan(player);
//         break;
//       }
//       case "迷你地图": {
//         A.missions.minirenwu(player);
//         break;
//       }
//       default:
//         break;
//     }
//     break;
//   }
//   default:
//     break;
// }
