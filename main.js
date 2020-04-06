var C = require("./click");
var E = require("./element");
var P = require("./player");
var Config = require('./config');


//请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

// var appName = "메이플스토리M";
// var pkgName = "com.nexon.nsc.maplem";

// app.launchPackage(pkgName);
// console.log("launching");
// waitForPackage(pkgName);

// console.log("finish launch");

sleep(2000);

// var players = P.all();
// [this.calbeec, this.marair, this.ifufo, this.ocma];

var _player = P[Config.CURRENT_PLAYER];

if (Config.MODE === 0) {
  doMainMission(_player);
} else {
  if (_player.hasClub) {
    doClub();
    sleep(5000);
    loopAds();
  }

  doMeiriRenwu();
  loopAds();
  sleep(5000);
  doJinhuaRenwu(_player);
  loopAds();
  sleep(5000);
  doJingyingRenwu(_player);
  loopAds();
  sleep(5000);
  doDaoguanRenwu();
  loopAds();
  sleep(5000);
  doJinzitaRenwu(_player);
  loopAds();
  sleep(5000);
  doMiniRenwu();
}

// ------------------
// 每日任务
function doMeiriRenwu() {
  var ticket = Config.MODE === 1 ? 3: 1;

  E.children.caidan.autoClick();
  E.children.caidan.children.renwu.autoClick();

  var task = E.children.caidan.children.renwu.children.meiri;
  task.autoClick();

  var now = new Date();
  if (now.getDay() === 0 || now.getDay() === 6) {
    // 周末，自主选择 boss，选择经验 boss
    task.children.exp.autoClick();
  }

  task.children.go.autoClick(2000);

  task.children.confirm.autoClick();

  for (var cost = 1; cost < ticket; cost++) {
    task.children.continue.autoClick();
    task.children.confirm.autoClick();
  }

  task.children.quit.autoClick();
}

// 进化系统，限制 level >= 100
function doJinhuaRenwu(player) {
  if (player.level < 100) {
    return;
  }
  var ticket = Config.MODE === 1 ? 3: 1;

  E.children.caidan.autoClick();
  E.children.caidan.children.renwu.autoClick();

  var task = E.children.caidan.children.renwu.children.jinhua;
  task.autoClick();

  task.children.tabs.children.level.autoClick();
  task.children.tabItems.children.second.autoClick();
  task.children.tabs.children.boss.autoClick();
  task.children.tabItems.children.second.autoClick();

  task.children.go.autoClick();
  task.children.confirm.autoClick();

  for (var cost = 1; cost < ticket; cost++) {
    task.children.continue.autoClick();
    task.children.confirm.autoClick();
  }

  task.children.quit.autoClick();
}

function doJingyingRenwu(player) {
  var ticket = Config.MODE === 1 ? 3: 1;

  E.children.caidan.autoClick();
  E.children.caidan.children.renwu.autoClick();

  var task = E.children.caidan.children.renwu.children.jingying;
  task.autoClick();

  if (player.masterPoint) {
    traceClickPoint(player.masterPoint);
  } else {
    // traceClickPoint(item.children.options.minus(5));
    task.children.options.minus(5).autoClick();
  }
  // traceClickPoint(item.children.options.hard);
  task.children.options.hard.autoClick();

  task.children.go.autoClick();

  task.children.confirm.autoClick();

  for (var cost = 1; cost < ticket; cost++) {
    task.children.continue.autoClick();
    task.children.confirm.autoClick();
  }

  task.children.quit.autoClick();
}

function doDaoguanRenwu() {
  var ticket = Config.MODE === 1 ? 3: 1;

  E.children.caidan.autoClick();
  E.children.caidan.children.renwu.autoClick();

  var task = E.children.caidan.children.renwu.children.daoguan;
  task.autoClick();

  task.children.go.autoClick();
  task.children.confirm.autoClick();

  for (var cost = 1; cost < ticket; cost++) {
    task.children.continue.autoClick();
    task.children.confirm.autoClick();
  }

  task.children.quit.autoClick();
}

function doClub() {
  E.children.caidan.click(1000);
  E.children.caidan.children.renwu.click(1000);
  var club = E.children.caidan.children.renwu.children.club;
  club.click(1000);
  club.children.tabMember.click(1000);
  club.children.sign.click(1000);
  club.children.tabMission.click(1000);
  club.children.mission.click(1000);
  club.children.bonus.click(1000);
  club.children.go.click(1000);
  sleep(2000);
  club.children.continue.waitToClick();
  sleep(5000);
  club.children.back.waitToClick();
  sleep(5000);
  club.children.back2.click(1000);
  club.children.tabGive.click(1000);
  club.children.give.click(1000);
  club.children.back3.click(1000);
}

function doMiniRenwu() {
  E.children.caidan.autoClick();
  E.children.caidan.children.renwu.autoClick();

  var mini = E.children.caidan.children.renwu.children.mini;
  mini.autoClick();
  mini.children.fifteenMinutes.autoClick();
  mini.children.go.autoClick();
  mini.children.confirm.autoClick();
  mini.children.auto.autoClick(5000);
  mini.children.autoTimePlus.autoClick(2000);
  mini.children.autoStart.autoClick();
  mini.children.exp.autoClick();
  mini.children.quit.autoClick();
}

function doJinzitaRenwu(player) {
  if (player.level < 60) {
    return;
  }
  E.children.caidan.autoClick();
  E.children.caidan.children.renwu.autoClick();

  var jinzita = E.children.caidan.children.renwu.children.jinzita;
  jinzita.autoClick();

  if (player.level >= 140) {
    jinzita.children.hell.autoClick();
  } else if (player.level >= 100) {
    jinzita.children.chaos.autoClick();
  } else if (player.level >= 80) {
    jinzita.children.hard.autoClick();
  } else if (player.level >= 60) {
    jinzita.children.normal.autoClick();
  }

  jinzita.children.go.autoClick();
  jinzita.children.quit.autoClick();
}

// 主线任务
function doMainMission(player) {
  E.children.mainline.getNew.click(1500);
  while (true) {
    // 任务npc同时可以选择两个任务情况下，选择下面那个
    var screen = captureScreen();
    E.children.mainline.pick.matchToClick(screen);
    E.children.mainline.skip.matchToClick(screen);
    E.children.mainline.done.matchToClick(screen);
    if (E.children.mainline.exp.matchToClick(screen)) {
      E.children.mainline.getNew.click(1500);
    }

    if (E.children.talkTip.matchToClick(screen)) {
      E.children.talkTipClose.autoClick();
    }

    if (player.level < 100) {
      if (!E.children.skillpoint.matchToClick(screen)) {
        if (player.level < 80) {
          // wearNewSet();
          E.children.equipment.matchToClick(screen);
        }
      }
    }

    sleep(1000);
  }
}

// 穿新装备
function wearNewSet() {
  var screen = captureScreen();
  var skillPointCheck = detectColorAndClick(CYAN, 2330, 611, screen);
  if (skillPointCheck) {
    return;
  }
  var firstCheck = detectColorAndClick("#548fba", 2094, 712, screen, true);
  if (firstCheck) {
    detectColorAndClick("#ff7b50", 2360, 725, screen);
  }
}

function detectColorAndClick(color, x, y, screen, noclick) {
  var colorsArray = color;
  if (typeof color === "string") {
    colorsArray = [color];
  }

  if (!screen) {
    screen = captureScreen();
  }

  for (var index = 0; index < colorsArray.length; index++) {
    var tcolor = colorsArray[index];
    if (images.detectsColor(screen, tcolor, x, y)) {
      // 检测到颜色
      if (!noclick) {
        traceClick(x, y);
        sleep(500);
      }
      return true;
    }
  }

  var pixel = images.pixel(screen, x, y);
  console.log("point pixel", x, y, colors.toString(pixel), "target", color);

  sleep(500);
  return false;
}

// 遍历广告关闭按钮
function loopAds() {
  var ads = E.children.ads;
  if (ads.length === 0) {
    return;
  }

  var screen = captureScreen();
  for (var i = 0; i < ads.length; i++) {
    var _ad = ads[i];
    // _ad.check(screen, true);
    var checkResult = false;
    if (_ad.children.length > 0) {
      checkResult = true;
      for (var j = 0; j < _ad.children.length; j++) {
        var element = _ad.children[j];
        if (!element.check(screen)) {
          checkResult = false;
          break;
        }
      }
    }

    if (checkResult) {
      _ad.click();
    }
  }
}

function waitColorAndClick(tcolor, x, y) {
  sleep(500);
  var notFind = true;
  while (notFind) {
    var screen = captureScreen();

    var pixel = images.pixel(screen, x, y);
    console.log("point pixel", x, y, colors.toString(pixel), "target", tcolor);
    if (images.detectsColor(screen, tcolor, x, y)) {
      // 检测到颜色
      notFind = false;
      traceClick(x, y);
    }

    if (notFind) {
      // 没有检测到
      sleep(1000);
    }
  }
}

function traceClickPoint(p, delay) {
  console.log(p);
  traceClick(p.x, p.y, delay);
}

function traceClick(x, y, delay) {
  // var window = floaty.rawWindow(<frame gravity="center" bg="#88ff0000" />);
  // window.touchable = false;

  // window.setSize(40, 40);
  // window.setPosition(x - 20, y - 20);

  var delay = delay || 500;
  sleep(delay);

  C.click(x, y);

  sleep(300);

  // setTimeout(() => {
  //   w.close();
  // }, 500);
}
