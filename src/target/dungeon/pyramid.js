var Node = require("../../node/node_v2");
var Color = require("../../color");

module.exports = {
  desc: "奈特的金字塔",
  leftLightWhite: new Node.Point(158, 689, {
    color: Color.lightWhite,
    desc: "左侧背景白色",
  }),
  roomButton: new Node.Point(919, 703, {
    color: "#548fba",
    desc: "创建房间按钮背景色",
  }),
  rootWindow: function () {
    return new Node.Window([this.leftLightWhite, this.roomButton]);
  },
  backButton: new Node.Point(43, 73, { desc: "返回按钮", delay: 4000 }),
  normalLevel: new Node.Point(104, 176, { desc: "普通级别" }),
  hardLevel: new Node.Point(99, 245, { desc: "hard 级别" }),
  chaosLevel: new Node.Point(98, 316, { desc: "chaos 级别" }),
  hellLevel: new Node.Point(98, 385, { desc: "hell 级别" }),
  quickStartButton: new Node.Point(1123, 703, {
    desc: "快速匹配按钮",
    delay: 3000,
  }),
  settleExitButton: new Node.Point(497, 630, {
    color: "#548fba",
    desc: "结算退出按钮",
  }),
  settleMenuButton: new Node.Point(706, 630, {
    color: Color.teal,
    desc: "结算菜单按钮",
    delay: 4000,
  }),
  settleWindow: function () {
    return new Node.Window([this.settleExitButton, this.settleMenuButton]);
  },
  pickLevel: function (level) {
    if (level < 60) {
      return false;
    }
    if (level < 80) {
      this.normalLevel.click();
      return true;
    }
    if (level < 100) {
      this.hardLevel.click();
      return true;
    }
    if (level < 140) {
      this.chaosLevel.click();
      return true;
    }
    this.hellLevel.click();
    return true;
  },

  exec: function (player, times) {
    console.log("当前进行", this.desc);

    var _times = times || 100;
    while (_times) {
      this.rootWindow().wait();

      if (!this.pickLevel(player.level)) {
        break;
      }

      this.quickStartButton.click();
      // 点击了进入，如果过了一段时间还是在主窗口，则认为没有门票
      if (this.rootWindow().wait(2000)) {
        break;
      }

      this.settleWindow().wait();
      this.settleMenuButton.click();

      _times -= 1;
    }

    this.rootWindow().wait();
    this.backButton.click();
  },
};
