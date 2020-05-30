var Node = require("./src/node/node_v2");
var Color = require("./src/color");
var A = require("./action");
var Player = require("./src/player/player");
var Ads = require("./src/ads");

A.prepare();

var player = new Player("any", "none", 10, 100, false);

var Mainline = {
  getNew: function () {
    player.walkLeft(333);
    player.walkRight(444);
    new Node.Point(62, 241).click();
  },
  talkSkip: new Node.Point(1211, 582, {
    color: Color.white,
    desc: "对话跳过1",
  }),
  talkWindow: function () {
    return new Node.Window([
      this.talkSkip,
      new Node.Point(1222, 582, { color: Color.white, desc: "对话跳过2" }),
      new Node.Point(1215, 614, { color: "#020201", desc: "对话跳过3" }),
    ]);
  },
  finish: new Node.Point(1047, 491, { color: Color.orange, desc: "任务完成1" }),
  finishWindow: function () {
    return new Node.Window([
      this.finish,
      new Node.Point(1169, 499, { color: Color.orange, desc: "任务完成2" }),
    ]);
  },
  settleConfirm: new Node.Point(709, 684, {
    color: Color.orange,
    desc: "任务奖励确认按钮1",
  }),
  settleWindow: function () {
    return new Node.Window([
      this.settleConfirm,
      new Node.Point(558, 681, {
        color: Color.orange,
        desc: "任务奖励确认按钮2",
      }),
    ]);
  },
  levelPointAutoSet: new Node.Point(1061, 310, {
    color: Color.cyan_59b0a8,
    desc: "自动设置技能点",
  }),
  levelPointClose: new Node.Point(1037, 355, {
    color: Color.blue_548fba,
    desc: "技能点关闭",
  }),
  levelPointSet: new Node.Point(1126, 357, {
    color: Color.orange_ff7b50,
    desc: "技能点手动设置",
  }),
  levelPointWindow: function () {
    return new Node.Window([
      this.levelPointAutoSet,
      this.levelPointClose,
      this.levelPointSet,
    ]);
  },
  quipBackground: new Node.Point(1012, 295, {
    color: "#dcdee1",
    desc: "装备背景白色",
  }),
  quipClose: new Node.Point(1038, 355, {
    color: Color.blue_548fba,
    desc: "装备关闭",
  }),
  quipWear: new Node.Point(1128, 352, {
    color: Color.orange_ff7b50,
    desc: "穿上装备",
  }),
  quipWindow: function () {
    return new Node.Window([
      this.quipBackground,
      this.quipClose,
      this.quipWear,
    ]);
  },
  tipNpcFace: new Node.Point(356, 668, {
    color: "#fff0e7",
    desc: "提示精灵脸的颜色",
  }),
  tipNpcHair: new Node.Point(354, 620, {
    color: "#ffb2a1",
    desc: "提示精灵头发颜色",
  }),
  tipNpcTalk: new Node.Point(471, 638, { desc: "精灵说的话" }),
  tipNpcTaklClose: new Node.Point(1249, 186, { desc: "精灵对话关闭" }),
  tipNpcWindow: function () {
    return new Node.Window([this.tipNpcFace, this.tipNpcHair]);
  },

  guildClose: new Node.Point(562, 637, {
    color: Color.blue_548fba,
    desc: "公会加入提示关闭按钮",
  }),
  guildGo: new Node.Point(874, 638, {
    color: Color.orange_ff7b50,
    desc: "公会加入提示快速前往按钮",
  }),
  guildWindow: function () {
    return new Node.Window([this.guildClose, this.guildGo]);
  },

  talkPick1Btn: new Node.Point(356, 657, {
    color: Color.orange_ff7b50,
    desc: "任务对话选择1",
  }),
  talkPick2Btn: new Node.Point(356, 657, {
    color: Color.cyan_59b0a8,
    desc: "任务对话选择1，可完成",
  }),
  talkPick1Window: function () {
    return new Node.Window([
      this.talkPick1Btn,
      new Node.Point(1228, 598, {
        color: "#1b1a1a",
        desc: "任务对话框背景色",
      }),
    ]);
  },
  talkPick2Window: function () {
    return new Node.Window([
      this.talkPick2Btn,
      new Node.Point(1228, 598, {
        color: "#1b1a1a",
        desc: "任务对话框背景色",
      }),
    ]);
  },

  exec: function () {
    // this.tipNpcTaklClose.click();
    // 领取新任务
    this.getNew();
    while (true) {
      sleep(2000);
      Ads.exec();
      image = images.captureScreen();
      // 25 级左右，对话提示
      if (this.tipNpcWindow().matchClick(image, this.tipNpcTalk)) {
        sleep(1000);
        this.tipNpcTaklClose.click();
        continue;
      }
      // 30级公会加入提示
      if (this.guildWindow().matchClick(image, this.guildClose)) {
        continue;
      }
      // 自动加技能点
      if (this.levelPointWindow().matchClick(image, this.levelPointAutoSet)) {
        continue;
      }
      // 自动穿装备
      if (this.quipWindow().matchClick(image, this.quipWear)) {
        continue;
      }
      // 一个 npc，出现2条任务线的情况
      if (this.talkPick1Window().matchClick(image, this.talkPick1Btn)) {
        continue;
      }
      if (this.talkPick2Window().matchClick(image, this.talkPick2Btn)) {
        continue;
      }
      // 接任务对话
      if (this.talkWindow().matchClick(image, this.talkSkip)) {
        continue;
      }
      // 任务完成
      if (this.finishWindow().matchClick(image, this.finish)) {
        continue;
      }
      // 任务奖励
      if (this.settleWindow().matchClick(image, this.settleConfirm)) {
        sleep(2000);
        // 领取新任务
        this.getNew();
      }
    }
  },
};

Mainline.exec();
