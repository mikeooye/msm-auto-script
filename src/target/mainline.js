var Node = require("../node/node");
var Action = require("./action");
var Ad = require("./ad");

var mainline = {
  menu: Node._vNode(
    [
      Node._bNode({ x: 1035, y: 43 }, "#ffffff"),
      Node._bNode({ x: 1166, y: 32 }, "#ffffff"),
    ],
    { x: 1241, y: 34 },
    true
  ),
  mission: Node._vNode(
    [
      Node._bNode({ x: 279, y: 29 }, "#ffffff"),
      Node._bNode({ x: 290, y: 53 }, "#ffffff"),
    ],
    { x: 290, y: 53 },
    true
  ),
  missionGo: Node._vNode(
    [
      Node._bNode({ x: 22, y: 141 }, cOrange),
      Node._bNode({ x: 1080, y: 698 }, cOrange),
    ],
    { x: 1080, y: 698 },
    true
  ),
  missionClose: Node._vNode(
    [
      Node._bNode({ x: 22, y: 141 }, cOrange),
      Node._bNode({ x: 241, y: 153 }, cYellow),
    ],
    { x: 1245, y: 78 },
    true
  ),
  missionTalkSkip: Node._vNode(
    [
      Node._bNode({ x: 50, y: 46 }, [
        "#100301",
        "#060a0c",
        "#000000",
        "#050503",
      ]),
      Node._bNode({ x: 515, y: 559 }, "#000000"),
      Node._bNode({ x: 1224, y: 47 }, cWhite),
    ],
    { x: 116, y: 55 }
  ),
  missionTalkPick: Node._vNode(
    [
      Node._bNode({ x: 462, y: 632 }, [cCyan, cOrange]),
      Node._bNode({ x: 515, y: 559 }, "#000000"),
    ],
    { x: 412, y: 627 }
  ),
  missionTalkComplete: Node._vNode(
    [
      Node._bNode({ x: 1169, y: 499 }, cOrange),
      Node._bNode({ x: 515, y: 559 }, "#000000"),
      Node._bNode({ x: 1224, y: 47 }, cWhite),
    ],
    { x: 1103, y: 497 }
  ),
  // 任务奖励
  missionBonus: Node._vNode(
    [
      Node._bNode({ x: 474, y: 104 }, "#515f6e"),
      Node._bNode({ x: 389, y: 168 }, "#f2f2f2"),
      Node._bNode({ x: 530, y: 681 }, cOrange),
    ],
    { x: 640, y: 683 }
  ),
  // 自动升级加点提醒
  autoSpUp: Node._vNode(
    [
      Node._bNode({ x: 1172, y: 311 }, "#59b0a8"),
      Node._bNode({ x: 974, y: 319 }, "#f03030"),
      Node._bNode({ x: 1094, y: 355 }, "#548fba"),
      Node._bNode({ x: 1184, y: 354 }, cOrange),
    ],
    { x: 1172, y: 311 }
  ),
  // 清除升级提醒
  clearSpUp: Node._vNode(
    [
      Node._bNode({ x: 974, y: 319 }, "#f03030"),
      Node._bNode({ x: 1094, y: 355 }, "#548fba"),
      Node._bNode({ x: 1184, y: 354 }, cOrange),
    ],
    { x: 1069, y: 354 }
  ),
  // 穿新装备
  wearEquipment: Node._vNode(
    [
      Node._bNode({ x: 1014, y: 294 }, "#dcdee1"),
      Node._bNode({ x: 1096, y: 354 }, "#548fba"),
      Node._bNode({ x: 1182, y: 354 }, cOrange),
    ],
    { x: 1182, y: 354 }
  ),
  // 聊天提醒
  talkTip: Node._vNode(
    [
      Node._bNode({ x: 355, y: 621 }, "#ffb2a1"),
      Node._bNode({ x: 354, y: 673 }, "#fff0e7"),
      Node._bNode({ x: 417, y: 611 }, "#d99989"),
    ],
    { x: 480, y: 635 }
  ),
  // 关闭聊天提醒
  talkTipClose: Node._bNode({ x: 1247, y: 184 }, "#ffffff"),
};

mainline.go = function () {
  var getNewMission = function () {
    Action.swipe({ x: 145, y: 625 }, { x: 221, y: 625 }, 500);
    Action.swipe({ x: 145, y: 625 }, { x: 70, y: 625 }, 400);

    var img = captureScreen();
    mainline.menu.checkClick(img);
    sleep(500);
    img = captureScreen();
    mainline.mission.checkClick(img);
    sleep(500);
    var ret = mainline.missionGo.checkClick(img);
    if (!ret) {
      console.log("没有新任务，退出");
      mainline.missionClose.checkClick(img);
      return false;
    }
    console.log("领取新任务");
    return true;
  };

  var skipTalk = function (img) {
    return mainline.missionTalkSkip.checkClick(img);
  };

  var completeTalk = function (img) {
    return mainline.missionTalkComplete.checkClick(img);
  };

  var getBonus = function (img) {
    return mainline.missionBonus.checkClick(img);
  };

  var pick = function (img) {
    return mainline.missionTalkPick.checkClick(img);
  };

  if (!getNewMission()) {
    return;
  }

  while (1) {
    var img = captureScreen();

    skipTalk(img);
    pick(img);
    completeTalk(img);

    if (!mainline.autoSpUp.checkClick(img)) {
      mainline.clearSpUp.checkClick(img);
    }
    mainline.wearEquipment.checkClick(img);
    if (getBonus(img)) {
      sleep(1000);
      Ad.go();
      clearTalkTip();
      if (!getNewMission()) {
        return;
      }
    }

    sleep(500);
  }
};

mainline.talkTipClear = function () {
  if (mainline.talkTip.checkClick(captureScreen())) {
    sleep(1000);
    mainline.talkTipClose.checkClick(captureScreen());
  }
};

module.exports = mainline;
