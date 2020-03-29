var windowWidth = 2560;
var windowHeight = 1600;
var missionMarginV = 78;

Object.prototype.centerX = function() {
  return this.width * 0.5 + this.x;
};
Object.prototype.centerY = function() {
  return this.y + this.height * 0.5;
};

// minx, miny, maxx, maxy
function CreateRect(desc) {
  var points = desc.split(" ");
  var x = parseInt(points[0]);
  var y = parseInt(points[1]);
  var width = points[2] - x;
  var height = points[3] - y;

  return { x: x, y: y, width: width, height: height };
}

var rect = {
  missionMainBounds: function(index) {
    var top = 400;
    var left = 30;
    var spaceH = 8;
    var spaceV = 14;
    var width = 436;
    var height = 540;

    var row = index % 2;
    var column = parseInt(index / 2);

    return {
      x: left + column * (width + spaceH),
      y: top + row * (height + spaceV),
      width: width,
      height: height
    };
  },
  // 任务返回按钮
  missionBackBounds: { x: 40, y: 124, width: 80, height: 80 },
  // 任务关闭按钮
  missionCloseBounds: { x: 2560 - 38 - 76, y: 120, width: 76, height: 76 },

  // 每日任务
  dayMission: {
    // 奖励按钮范围
    bonusItemBounds: function(index) {
      var top = 295;
      var left = 20;
      var width = 503;
      var height = 180;
      return { x: left + index * width, y: top, width: width, height: height };
    },
    // 进入按钮
    go: { x: 1964, y: 1344, width: 560, height: 130 },
    // 确定按钮
    confirm: { x: 1300, y: 1070, width: 560, height: 130 },
    // 继续按钮
    continue: { x: 1490, y: 1020, width: 360, height: 130 },
    // 返回上级
    back: { x: 1110, y: 1020, width: 360, height: 130 }
  },
  // 进化系统
  evalotion: {
    // boss 级别
    bossTab: { x: 915, y: 454, width: 268, height: 110 },
    // 选项
    bossOptions: [
      { x: 100, y: 610, width: 237, height: 270 },
      { x: 370, y: 610, width: 237, height: 270 },
      { x: 630, y: 610, width: 237, height: 270 },
      { x: 900, y: 610, width: 237, height: 270 }
    ],
    // 进入按钮
    go: { x: 1964, y: 1344, width: 560, height: 130 },
    // 确定按钮
    confirm: { x: 1300, y: 1298, width: 560, height: 130 },
    // 继续按钮
    continue: { x: 1490, y: 1154, width: 360, height: 130 },
    // 返回上级
    back: { x: 1110, y: 1154, width: 360, height: 130 }
  },
  // 精英地下城
  masterBoss: {
    snowQueue: { x: 700, y: 280, width: 240, height: 183 },
    hard: { x: 40, y: 695, width: 320, height: 120 },
    // 进入按钮
    go: { x: 1964, y: 1344, width: 560, height: 141 },
    // 确定按钮
    confirm: { x: 550, y: 710, width: 192, height: 70 },
    // 继续按钮
    continue: { x: 1495, y: 1172, width: 360, height: 140 },
    // 返回上级
    back: { x: 1110, y: 1172, width: 360, height: 140 }
  },
  // 武陵道场
  kongFu: {
    // 进入按钮
    go: { x: 1964, y: 1344, width: 560, height: 141 },
    // 确定按钮
    confirm: { x: 1293, y: 1293, width: 563, height: 145 },
    // 继续按钮
    continue: { x: 1490, y: 1290, width: 366, height: 146 },
    // 返回上级
    back: { x: 1100, y: 1290, width: 360, height: 130 }
  },
  miniMap: {
    // 15 分钟选项
    option: CreateRect("1836 512 2078 832"),
    // 准备进入
    go: CreateRect("1958 1336 2521 1480"),
    // 确认进入
    confirm: CreateRect("1296 1297 1857 1440"),
    // 开启自动攻击
    auto: CreateRect("688 1429 812 1555"),
    // 获取自动时间
    autoTimeGet: CreateRect("1758 850 1975 946"),
    // 确认自动攻击
    autoStart: CreateRect("998 1160 1561 1302"),
    // 经验确认
    expConfirm: CreateRect("1000 1079 1562 1219"),
    // 再次
    continue: CreateRect("1518 1298 1919 1441"),
    // 返回
    back: CreateRect("1080 1299 1480 1441")
  }
};

console.log(rect.miniMap);

var players = {
  Mamair: {
    tickets: {
      dayMission: 3,
      evalotion: 3,
      masterBoss: 3,
      kongFu: 3
    },
    timeCost: {
      dayMission: 40 * 1000,
      evalotion: 310 * 1000,
      masterBoss: 7 * 60 * 1000,
      kongFu: 12 * 60 * 1000
    },
    // 雪女
    masterBossPrefered: { x: 700, y: 280, width: 240, height: 183 }
  },
  calbeec: {
    tickets: {
      dayMission: 0,
      evalotion: 0,
      masterBoss: 0,
      kongFu: 1
    },
    timeCost: {
      dayMission: 40 * 1000,
      evalotion: 310 * 1000,
      masterBoss: 5 * 60 * 1000,
      kongFu: (9 * 60 + 40) * 1000
    },
    // 小鬼
    masterBossPrefered: { x: 705, y: 280, width: 240, height: 183 }
  },
  CatU: {
    tickets: {
      dayMission: 2,
      evalotion: 2,
      masterBoss: 3,
      kongFu: 2
    },
    timeCost: {
      dayMission: 40 * 1000,
      evalotion: 310 * 1000,
      masterBoss: (5 * 60 + 30) * 1000,
      // 40层
      kongFu: (10 * 60 + 40) * 1000
    },
    // 雪女
    masterBossPrefered: { x: 700, y: 280, width: 240, height: 183 }
  },
  ifufo: {
    tickets: {
      dayMission: 1,
      evalotion: 1,
      masterBoss: 1,
      kongFu: 1,
      miniMap: 1
    },
    timeCost: {
      dayMission: 40 * 1000,
      evalotion: 310 * 1000,
      masterBoss: (10 * 60 + 30) * 1000,
      // 40层
      kongFu: (6 * 60 + 40) * 1000
    },
    // 大鸟 2264 286 2506 467
    masterBossPrefered: { x: 2264, y: 286, width: 240, height: 183 }
  }
};

// 是否调试
var DEBUG = false;

// console.show();

// 调整窗口大小
setScreenMetrics(windowWidth, windowHeight);

// 显示悬浮窗，模拟目标点击区域
var w = floaty.rawWindow(<frame gravity="center" bg="#44ffcc00" />);
w.setTouchable(false);

var player = players.ifufo;

goDayMission(player);
goEvolutionSystem(player);
gotMasterBoss(player);
goPandaKongfu(player);
goMiniMap(player);

// 关闭悬浮指示器
setTimeout(() => {
  w.close();
}, 1000);

// 点击屏幕区域
function zTap(rect, sleepTime) {
  console.log(rect);
  w.setPosition(rect.x, rect.y);
  w.setSize(rect.width, rect.height);

  if (!DEBUG) {
    Tap(rect.centerX(), rect.centerY());
  }

  sleep(sleepTime || 1000);
}

function goMiniMap(player) {
  if (player.tickets.miniMap === 0) {
    return;
  }

  zTap(rect.missionMainBounds(4), 3000);
  zTap(rect.miniMap.option, 2000),
  zTap(rect.miniMap.go, 2000);
  zTap(rect.miniMap.confirm, 5000);


  function prepare() {
    zTap(rect.miniMap.auto, 4000),
    zTap(rect.miniMap.autoTimeGet, 3000),
    zTap(rect.miniMap.autoStart, 3000);
  }

  prepare();

  var timeCost = (15 * 60) * 1000;
  for (var index = 0; index < player.tickets.miniMap - 1; index++) {
    sleep(timeCost);
    zTap(rect.miniMap.expConfirm, 3000);
    zTap(rect.miniMap.continue, 4000);
    zTap(rect.miniMap.confirm, 5000);
    prepare();
  }

  sleep(timeCost);
  zTap(rect.miniMap.expConfirm, 3000);
  zTap(rect.miniMap.back, 5000);
  zTap(rect.missionBackBounds, 3000);
}

// 正题
// 执行每日任务
function goDayMission(player) {
  var ticket = player.tickets.dayMission;
  if (ticket === 0) {
    return;
  }
  zTap(rect.missionMainBounds(0));
  sleep(3000);

  // 如果是周末，则选择经验奖励
  var now = new Date();
  if (now.getDay() === 0 || now.getDay() === 6) {
    zTap(rect.dayMission.bonusItemBounds(3));
  }

  zTap(rect.dayMission.go);
  zTap(rect.dayMission.confirm);

  var times = ticket - 1;
  for (var index = 0; index < times; index++) {
    sleep(player.timeCost.dayMission);
    zTap(rect.dayMission.continue);
    zTap(rect.dayMission.confirm);
  }

  sleep(player.timeCost.dayMission);
  // 回到上级
  zTap(rect.dayMission.back);
  sleep(4000);

  // 返回
  zTap(rect.missionBackBounds);
  sleep(3000);
}

// 进化系统
function goEvolutionSystem(player) {
  var ticket = player.tickets.evalotion;
  if (ticket === 0) {
    return;
  }
  var time = player.timeCost.evalotion;

  zTap(rect.missionMainBounds(1), 3000);

  zTap(rect.evalotion.bossTab);
  zTap(rect.evalotion.bossOptions[1]);
  zTap(rect.evalotion.go);
  zTap(rect.evalotion.confirm);

  var times = ticket - 1;
  for (var index = 0; index < times; index++) {
    sleep(time);
    zTap(rect.evalotion.continue);
    zTap(rect.evalotion.confirm);
  }

  sleep(time);
  // 回到上级
  zTap(rect.evalotion.back);
  sleep(4000);

  // 返回
  zTap(rect.missionBackBounds);
  sleep(3000);
}

// 精英boss
function gotMasterBoss(player) {
  var ticket = player.tickets.masterBoss;
  if (ticket === 0) {
    return;
  }
  var timeCost = player.timeCost.masterBoss;

  zTap(rect.missionMainBounds(2), 3000);

  zTap(player.masterBossPrefered);
  zTap(rect.masterBoss.hard);
  zTap(rect.masterBoss.go, 4000);
  zTap(rect.masterBoss.confirm);

  var times = ticket - 1;
  for (var index = 0; index < times; index++) {
    sleep(timeCost);
    zTap(rect.masterBoss.continue, 9000);
    zTap(rect.masterBoss.confirm);
  }

  sleep(timeCost);
  // 回到上级
  zTap(rect.masterBoss.back);
  sleep(9000);

  // 返回
  zTap(rect.missionBackBounds);
  sleep(3000);
}

// 武陵道场
function goPandaKongfu(player) {
  var ticket = player.tickets.kongFu;
  if (ticket === 0) {
    return;
  }
  var timeCost = player.timeCost.kongFu;

  zTap(rect.missionMainBounds(3), 3000);

  zTap(rect.kongFu.go, 4000);
  zTap(rect.kongFu.confirm);

  var times = ticket - 1;
  for (var index = 0; index < times; index++) {
    sleep(timeCost);
    zTap(rect.kongFu.continue, 4000);
    zTap(rect.kongFu.confirm);
  }

  sleep(timeCost);
  // 回到上级
  zTap(rect.kongFu.back);
  sleep(4000);

  // 返回
  zTap(rect.missionBackBounds);
  sleep(3000);
}

// test

function testClickMissionItem(count) {
  // 测试点击任务窗口前12个
  for (var index = 0; index < count; index++) {
    var obj = rect.missionMainBounds(index);
    zTap(obj);
    sleep(1000);
  }
}

function testClickDayMissionBonus() {
  // 测试点击每日任务奖励
  for (var index = 0; index < 5; index++) {
    var obj = rect.dayMission.bonusItemBounds(index);
    zTap(obj);
    sleep(1000);
  }
}
