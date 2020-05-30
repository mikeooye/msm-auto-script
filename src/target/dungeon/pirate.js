var Node = require("../../node/node_v2");
var Color = require("../../color");

module.exports = {
  desc: "海盗副本",
  statusBar: new Node.Point(460, 80, { color: "#515f6e", desc: "标题栏" }),
  bonusButton: new Node.Point(120, 474, { color: "#59b0a8", desc: "奖励按钮" }),
  rootWindow: function () {
    return new Node.Window([this.statusBar, this.bonusButton]);
  },
  startButton: new Node.Point(1018, 703, {
    color: Color.orange,
    desc: "快速开始按钮",
    delay: 2000,
  }),
  backButton: new Node.Point(43, 73, { desc: "返回按钮", delay: 4000 }),

  settleStatusBar: new Node.Point(742, 123, {
    color: "#515f6e",
    desc: "奖励标题栏",
  }),
  settleButton: new Node.Point(668, 659, {
    color: "#ff7b50",
    desc: "奖励按钮",
    delay: 3000,
  }),
  settleWindow: function () {
    return new Node.Window([this.settleStatusBar, this.settleButton]);
  },
  shopCloseButton: new Node.Point(1241, 81, {
    desc: "商店关闭按钮",
    delay: 2000,
  }),
  returnButton: new Node.Point(1243, 292, { desc: "退出按钮", delay: 2000 }),
  returnConfirm: new Node.Point(700, 571, {
    color: "#59b0a8",
    desc: "确认退出按钮",
    delay: 4000,
  }),

  exec: function (player, times) {
    var _times = times || 100;
    while (_times) {
      this.rootWindow().wait();
      this.startButton.click();

      if (this.rootWindow().wait(2000)) {
        break;
      }

      this.settleWindow().wait();
      this.settleButton.click();
      this.shopCloseButton.click();
      this.returnButton.click();
      this.returnConfirm.click();

      _times -= 1;
    }

    this.rootWindow().wait();
    this.backButton.click();
  },
};
