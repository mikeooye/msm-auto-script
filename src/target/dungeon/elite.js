var Node = require("../../node/node_v2");
var Color = require("../../color");

module.exports = {
  statusBar: new Node.Point(409, 83, { color: "#515f6e", desc: "标题栏主色" }),
  blueButton: new Node.Point(755, 702, {
    color: "#548fba",
    desc: "右下角蓝色按钮",
  }),
  backButton: new Node.Point(43, 73, { desc: "返回按钮" }),
  bossOption: new Node.Point(50, 183, { desc: "boss 中间档位" }),
  hardOption: new Node.Point(103, 379, { desc: "困难级别" }),
  roomButton: new Node.Point(827, 699, {
    delay: 3000,
    timeout: 5000,
    desc: "进入待机室，超时无法进入待机室，则认为没有门票了",
  }),
  rootWindow: function () {
    return new Node.Window([this.statusBar, this.blueButton]);
  },
  roomStart: new Node.Point(199, 209, {
    color: "#ff7b50",
    delay: 3000,
    desc: "开始按钮",
  }),
  roomCancel: new Node.Point(124, 269, {
    color: "#59B0A8",
    desc: "取消按钮",
  }),
  roomWindow: function () {
    return new Node.Window([this.roomStart, this.roomCancel]);
  },
  settleContinue: new Node.Point(562, 485, {
    color: "#ff7b50",
    desc: "继续挑战",
  }),
  settleExit: new Node.Point(497, 621, { color: "#548fba", desc: "退出" }),
  settleBack: new Node.Point(634, 622, {
    color: "#59B0A8",
    desc: "返回菜单",
    delay: 4000,
  }),
  settleWindow: function () {
    return new Node.Window([
      this.settleContinue,
      this.settleExit,
      this.settleBack,
    ]);
  },

  exec: function (player, times) {
    var _times = times || 100;
    while (_times) {
      _times -= 1;
      this.rootWindow().wait();
      this.bossOption.click();
      this.hardOption.click();

      this.roomButton.click();
      if (this.rootWindow().wait(2000)) {
        break;
      }
      this.roomWindow().wait();
      this.roomStart.click();
      this.settleWindow().wait();
      this.settleBack.click();
    }

    this.rootWindow().wait();
    this.backButton.click();
  },
};
