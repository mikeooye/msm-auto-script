var Node = require("../../node/node_v2");
var Color = require("../../color");

module.exports = {
  desc: "进化系统",
  statusBar: new Node.Point(442, 79, {
    color: "#515f6e",
    desc: "标题栏背景色",
  }),
  quickStartButton: new Node.Point(1077, 705, {
    color: Color.orange,
    desc: "快速开始按钮",
    delay: 1000,
  }),
  backButton: new Node.Point(43, 73, { desc: "返回上级按钮" }),
  rootWindow: function () {
    return new Node.Window([this.statusBar, this.quickStartButton]);
  },
  secondOption: new Node.Point(236, 378, { desc: "第二个选项" }),
  monsterTab: new Node.Point(373, 249, { desc: "怪物等级 tab" }),
  bossTab: new Node.Point(510, 255, { desc: "boss tab" }),
  confirmStatusBar: new Node.Point(807, 452, {
    color: "#7f7f7f",
    desc: "确认窗口状态栏",
  }),
  confirmCancelButton: new Node.Point(520, 686, {
    color: "#548fba",
    desc: "确认窗口取消按钮",
    delay: 2000,
  }),
  confirmConfirmButton: new Node.Point(791, 686, {
    desc: "确认窗口确认按钮",
    delay: 3000,
  }),
  noTicketsPoint: new Node.Point(500, 171, {
    color: "#14181c",
    desc: "门票已经用完",
  }),
  confirmWindow: function () {
    return new Node.Window([this.confirmCancelButton, this.confirmStatusBar]);
  },
  settleExitButton: new Node.Point(486, 597, {
    color: "#548fba",
    desc: "结算退出按钮",
  }),
  settleMenuButton: new Node.Point(697, 609, {
    color: "#59b0a8",
    desc: "结算菜单按钮",
    delay: 4000,
  }),
  settleContinueButton: new Node.Point(878, 611, {
    desc: "返回菜单按钮",
    color: "#ff7b50",
    delay: 3000,
  }),
  settleWindow: function () {
    return new Node.Window([
      this.settleExitButton,
      this.settleMenuButton,
      this.settleContinueButton,
    ]);
  },

  exec: function (player, times) {
    console.log("正在进行副本", this.desc);
    var _times = times || 100;
    while (_times) {
      _times -= 1;
      this.rootWindow().wait();
      this.secondOption.click();
      this.monsterTab.click();
      this.secondOption.click();
      this.bossTab.click();
      this.secondOption.click();

      this.quickStartButton.click();
      if (this.noTicketsPoint.match(images.captureScreen())) {
        break;
      }

      this.confirmWindow().wait();
      this.confirmConfirmButton.click();

      this.settleWindow().wait();
      this.settleMenuButton.click();
    }

    this.rootWindow().wait();
    this.backButton.click();
  },
};
