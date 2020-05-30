var Node = require("../../node/node_v2");
var Color = require("../../color");

module.exports = {
  desc: "武陵道场",
  mondayStatusBar: new Node.Point(774, 96, {
    color: "#515f6e",
    desc: "周一奖励标题栏",
  }),
  mondayConfirmButton: new Node.Point(684, 681, {
    color: Color.orange,
    desc: "周一奖励确认按钮",
  }),
  mondayWindow: function () {
    return new Node.Window([this.mondayStatusBar, this.mondayConfirmButton]);
  },
  statusBar: new Node.Point(409, 83, {
    color: "#515f6e",
    desc: "标题栏背景色",
  }),
  shopButton: new Node.Point(755, 702, { color: "#548fba", desc: "商店按钮" }),
  rootWindow: function () {
    return new Node.Window([this.statusBar, this.shopButton]);
  },
  backButton: new Node.Point(43, 73, { desc: "返回按钮" }),
  goButton: new Node.Point(1108, 708, { desc: "入场", delay: 2000 }),
  confirmStatusBar: new Node.Point(735, 100, {
    color: "#515f6e",
    desc: "确认标题栏",
  }),
  confirmCancelButton: new Node.Point(530, 680, {
    color: "#548fba",
    desc: "取消按钮",
  }),
  confirmOkButton: new Node.Point(820, 680, { desc: "确认按钮" }),
  noTicketPoint: new Node.Point(516, 171, {
    color: "#3d3d3d",
    desc: "无门票点色",
  }),
  confirmWindow: function () {
    return new Node.Window([this.confirmStatusBar, this.confirmCancelButton]);
  },
  settleStatusBar: new Node.Point(727, 168, {
    color: "#ffffde",
    desc: "结算标题栏",
  }),
  settleBack: new Node.Point(494, 677, {
    color: "#548fba",
    desc: "结算退出按钮",
  }),
  settleMenu: new Node.Point(623, 677, { desc: "结算菜单按钮", delay: 3000 }),
  settleWindow: function () {
    return new Node.Window([this.settleStatusBar, this.settleBack]);
  },

  exec: function (player, times) {
    console.log("当前进行", this.desc);
    if (this.mondayWindow().wait(2000)) {
      this.mondayConfirmButton.click();
    }
    var _times = times || 100;
    while (_times) {
      this.rootWindow().wait();
      // 进入
      this.goButton.click();
      // 确认弹窗
      this.confirmWindow().wait();
      // 确认进入，此时会出现没有票无法进入的情况
      this.confirmOkButton.click();

      if (this.noTicketPoint.match(images.captureScreen())) {
        // 没有票，退出循环
        this.confirmCancelButton.click();
        break;
      }
      // 等待结算
      this.settleWindow().wait();
      this.settleMenu.click();
      _times -= 1;
    }

    this.rootWindow().wait();
    this.backButton.click();
  },
};
