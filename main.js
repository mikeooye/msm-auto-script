var A = require("./action");

// var width = 1024;
// var height = 640;

// setScreenMetrics(width, height);

A.prepare();
// A.clearAds();
// A.goMainline();

// A.buyEquipment();

var type = dialogs.select("脚本类型", ["主线任务", "分解低级装备", "日常任务"]);
var level = dialogs.select("角色登记", ["<60", "<80", "<100", "<120", "<140", ">=140"]);

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

switch (type) {
  case 0:
    A.goMainline();
    break;
  case 1:
    A.buyEquipment();
    break;
  case 2: {
    A.missions.prepare();
    A.missions.gonghui();
    A.missions.meiri();
    A.missions.jinhuaxitong(level);
    A.missions.wulingdaoguan();
    A.missions.jingyingboss();
    A.missions.jinzita(level);
    A.missions.haidao();
    A.missions.minirenwu();
    break;
  }
  default:
    break;
}

// var C = require("./click");
// var E = require("./element");
// var P = require("./player");

// auto();

// var simulator = dialogs.select("设备类型？", ["是模拟器", "是真机"]) === 0;
// C.init(simulator);

// var mode = dialogs.select("运行模式", [
//   "主线任务",
//   "全票每日任务",
//   "快速每日任务"
// ]);

// function selectPlayer() {
//   var selection = dialogs.select("玩家", [
//     "calbeec",
//     "marair",
//     "ifufo",
//     "ocma"
//   ]);

//   switch (selection) {
//     case 0:
//       return P.calbeec;
//     case 1:
//       return P.marair;
//     case 2:
//       return P.ifufo;
//     default:
//       return P.ocma;
//   }
// }

// var stages = null;
// if (mode > 0) {
//   var choice = [
//     "工会",
//     "每日任务",
//     "进化系统",
//     "精英boss",
//     "熊猫道馆",
//     "金字塔任务",
//     "mini地图"
//   ];
//   stages = dialogs.multiChoice("选择关卡", choice, [0, 1, 2, 3, 4, 5, 6]);
// }

// Array.prototype.contains = function(e) {
//   return this.indexOf(e) !== -1;
// }

// // 等待5秒钟，并清空一轮广告
// function waitAndClearAds() {
//   loopAds();
//   sleep(5000);
// }

// var player = selectPlayer();
// toast(player.name);

// //请求截图
// if (!requestScreenCapture()) {
//   toast("请求截图失败");
//   exit();
// }

// sleep(2000);

// if (mode === 0) {
//   doMainMission();
// } else {
//   if ((!stages || stages.contains(0)) && player.hasClub) {
//     toast('工会日常');
//     doClub();
//     waitAndClearAds();
//   }

//   if (!stages || stages.contains(1)) {
//     toast('每日任务');
//     doMeiriRenwu();
//     waitAndClearAds();
//   }

//   if (!stages || stages.contains(2)) {
//     toast('进化系统');
//     doJinhuaRenwu();
//     waitAndClearAds();
//   }

//   if (!stages || stages.contains(3)) {
//     toast('精英boss');
//     doJingyingRenwu();
//     waitAndClearAds();
//   }

//   if (!stages || stages.contains(4)) {
//     toast('熊猫道馆');
//     doDaoguanRenwu();
//     waitAndClearAds();
//   }

//   if (!stages || stages.contains(5)) {
//     toast('金字塔任务');
//     doJinzitaRenwu();
//     waitAndClearAds();
//   }

//   if (!stages || stages.contains(6)) {
//     toast('迷你任务');
//     doMiniRenwu();
//     waitAndClearAds();
//   }
// }

// // ------------------
// // 每日任务
// function doMeiriRenwu() {
//   var ticket = mode === 1 ? 3 : 1;

//   E.children.caidan.autoClick();
//   E.children.caidan.children.renwu.autoClick();

//   var task = E.children.caidan.children.renwu.children.meiri;
//   task.autoClick();

//   var now = new Date();
//   if (now.getDay() === 0 || now.getDay() === 6) {
//     // 周末，自主选择 boss，选择经验 boss
//     task.children.exp.autoClick();
//   }

//   task.children.go.autoClick(2000);

//   task.children.confirm.autoClick();

//   for (var cost = 1; cost < ticket; cost++) {
//     task.children.continue.autoClick();
//     task.children.confirm.autoClick();
//   }

//   task.children.quit.autoClick();
// }

// // 进化系统，限制 level >= 100
// function doJinhuaRenwu() {
//   if (player.level < 100) {
//     return;
//   }
//   var ticket = mode === 1 ? 3 : 1;

//   E.children.caidan.autoClick();
//   E.children.caidan.children.renwu.autoClick();

//   var task = E.children.caidan.children.renwu.children.jinhua;
//   task.autoClick();

//   task.children.tabs.children.level.autoClick();
//   task.children.tabItems.children.second.autoClick();
//   task.children.tabs.children.boss.autoClick();
//   task.children.tabItems.children.second.autoClick();

//   task.children.go.autoClick();
//   task.children.confirm.autoClick();

//   for (var cost = 1; cost < ticket; cost++) {
//     task.children.continue.autoClick();
//     task.children.confirm.autoClick();
//   }

//   task.children.quit.autoClick();
// }

// function doJingyingRenwu() {
//   var ticket = mode === 1 ? 3 : 1;

//   E.children.caidan.autoClick();
//   E.children.caidan.children.renwu.autoClick();

//   var task = E.children.caidan.children.renwu.children.jingying;
//   task.autoClick();

//   if (player.masterPoint) {
//     traceClickPoint(player.masterPoint);
//   } else {
//     // traceClickPoint(item.children.options.minus(5));
//     task.children.options.minus(5).autoClick();
//   }
//   // traceClickPoint(item.children.options.hard);
//   task.children.options.hard.autoClick();

//   task.children.go.autoClick();

//   task.children.confirm.autoClick();

//   for (var cost = 1; cost < ticket; cost++) {
//     task.children.continue.autoClick();
//     task.children.confirm.autoClick();
//   }

//   task.children.quit.autoClick();
// }

// function doDaoguanRenwu() {
//   var ticket = mode === 1 ? 3 : 1;

//   E.children.caidan.autoClick();
//   E.children.caidan.children.renwu.autoClick();

//   var task = E.children.caidan.children.renwu.children.daoguan;
//   task.autoClick();

//   task.children.go.autoClick();
//   task.children.confirm.autoClick();

//   for (var cost = 1; cost < ticket; cost++) {
//     task.children.continue.autoClick();
//     task.children.confirm.autoClick();
//   }

//   task.children.quit.autoClick();
// }

// function doClub() {
//   E.children.caidan.click(1000);
//   E.children.caidan.children.renwu.click(1000);
//   var club = E.children.caidan.children.renwu.children.club;
//   club.click(1000);
//   club.children.tabMember.click(1000);
//   club.children.sign.click(1000);
//   club.children.tabMission.click(1000);
//   club.children.mission.click(1000);
//   club.children.bonus.click(1000);
//   club.children.go.click(1000);
//   sleep(2000);
//   club.children.continue.waitToClick();
//   sleep(5000);
//   club.children.back.waitToClick();
//   sleep(5000);
//   club.children.back2.click(1000);
//   club.children.tabGive.click(1000);
//   club.children.give.click(1000);
//   club.children.back3.click(1000);
// }

// function doMiniRenwu() {
//   E.children.caidan.autoClick();
//   E.children.caidan.children.renwu.autoClick();

//   var mini = E.children.caidan.children.renwu.children.mini;
//   mini.autoClick();
//   mini.children.fifteenMinutes.autoClick();
//   mini.children.go.autoClick();
//   mini.children.confirm.autoClick();
//   mini.children.auto.autoClick(5000);
//   mini.children.autoTimePlus.autoClick(2000);
//   mini.children.autoStart.autoClick();
//   mini.children.exp.autoClick();
//   mini.children.quit.autoClick();
// }

// function doJinzitaRenwu() {
//   if (player.level < 60) {
//     return;
//   }
//   E.children.caidan.autoClick();
//   E.children.caidan.children.renwu.autoClick();

//   var jinzita = E.children.caidan.children.renwu.children.jinzita;
//   jinzita.autoClick();

//   if (player.level >= 140) {
//     jinzita.children.hell.autoClick();
//   } else if (player.level >= 100) {
//     jinzita.children.chaos.autoClick();
//   } else if (player.level >= 80) {
//     jinzita.children.hard.autoClick();
//   } else if (player.level >= 60) {
//     jinzita.children.normal.autoClick();
//   }

//   jinzita.children.go.autoClick();
//   jinzita.children.quit.autoClick();
// }

// // 主线任务
// function doMainMission() {
//   E.children.mainline.getNew.click(1500);
//   while (true) {
//     // 任务npc同时可以选择两个任务情况下，选择下面那个
//     var screen = captureScreen();
//     E.children.mainline.pick.matchToClick(screen);
//     E.children.mainline.skip.matchToClick(screen);
//     E.children.mainline.done.matchToClick(screen);
//     if (E.children.mainline.exp.matchToClick(screen)) {
//       E.children.mainline.getNew.click(1500);
//     }

//     if (E.children.talkTip.matchToClick(screen)) {
//       E.children.talkTipClose.autoClick();
//     }

//     if (player.level < 100) {
//       if (!E.children.skillpoint.matchToClick(screen)) {
//         if (player.level < 80) {
//           // wearNewSet();
//           E.children.equipment.matchToClick(screen);
//         }
//       }
//     }

//     sleep(1000);
//   }
// }

// // 遍历广告关闭按钮
// function loopAds() {
//   var ads = E.children.ads;
//   if (ads.length === 0) {
//     return;
//   }

//   var screen = captureScreen();
//   for (var i = 0; i < ads.length; i++) {
//     var _ad = ads[i];
//     // _ad.check(screen, true);
//     var checkResult = false;
//     if (_ad.children.length > 0) {
//       checkResult = true;
//       for (var j = 0; j < _ad.children.length; j++) {
//         var element = _ad.children[j];
//         if (!element.check(screen)) {
//           checkResult = false;
//           break;
//         }
//       }
//     }

//     if (checkResult) {
//       _ad.click();
//     }
//   }
// }

// function traceClickPoint(p, delay) {
//   console.log(p);
//   traceClick(p.x, p.y, delay);
// }

// function traceClick(x, y, delay) {

//   var delay = delay || 500;
//   sleep(delay);

//   C.click(x, y);

//   sleep(300);
// }
