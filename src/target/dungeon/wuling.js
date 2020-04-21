var Node = require("../../node/node");
var Color = require("../../color");

var identifier = [
  // 窗口蓝灰色标题栏
  new Node.BaseNode(409, 83, Color.blueGrey),
  // 右下角蓝色按钮
  new Node.BaseNode(755, 702, Color.blue),
];

var confirmIdentifier = [new Node.BaseNode(521, 515, "#7f7f7f"), new Node.BaseNode(532, 680, Color.blue)];

var settleIdentifier = [new Node.BaseNode(727, 168, "#FFFFDE"), new Node.BaseNode(494, 677, Color.blue)];

module.exports = {
  // 主窗口
  mainWindow: new Node.ViewNode(identifier, 0, 0, true, 10000),
  // 返回
  back: new Node.BaseNode(43, 73),
  // 进入
  go: new Node.BaseNode(1108, 708),
  // 确认弹窗
  confirmWindow: new Node.ViewNode(confirmIdentifier, 0, 0, true, 10000),
  // 确认按钮
  confirm: new Node.BaseNode(791, 686),
  cancel: new Node.ViewNode([new Node.BaseNode(785, 184, "#3d3d3d")].concat(confirmIdentifier), 477, 684, true, 5000),
  // 结算窗口
  settlementWindow: new Node.ViewNode(settleIdentifier, 0, 0, true),
  // 结算窗口返回到主窗口
  backToMainWindow: new Node.BaseNode(623, 677),

  exec: function (player) {
    while (1) {
      if (!this.mainWindow.wait()) {
        break;
      }
      // 进入
      this.go.click();
      // 确认弹窗
      if (!this.confirmWindow.wait()) {
        break;
      }
      // 确认进入，此时会出现没有票无法进入的情况
      this.confirm.click();

      if (this.cancel.checkClick()) {
        // 没有票，退出循环
        break;
      }
      // 等待结算
      this.settlementWindow.wait();
      this.backToMainWindow.click();
    }

    this.back.click();
  },
};
