var Node = require("../../node/node");
var Color = require("../../color");

// 海贼
var identifier = [
  // 背景白色
  new Node.BaseNode(37, 477, Color.teal),
  // 等候室按钮
  new Node.BaseNode(919, 703, Color.blue),
];

var settleIdentifier = [new Node.BaseNode(372, 120, Color.blueGrey), new Node.BaseNode(538, 655, Color.orange)];

module.exports = {
  // 主窗口
  mainWindow: new Node.ViewNode(identifier, 0, 0, true, 10000),
  // 返回
  back: new Node.BaseNode(43, 73),
  // 进入
  go: new Node.BaseNode(1123, 703),
  // 结算窗口
  settlementWindow: new Node.ViewNode(settleIdentifier, 0, 0, true),
  // 结算窗口返回到主窗口
  confirm: new Node.BaseNode(645, 654),
  shopClose: new Node.BaseNode(1237, 82),
  exit: new Node.BaseNode(1239, 293),
  backToMainWindow: new Node.BaseNode(641, 573),

  exec: function (player) {
    while (1) {
      if (!this.mainWindow.wait()) {
        break;
      }

      this.go.click();

      sleep(5000);
      if (this.mainWindow.check()) {
        break;
      }

      this.settlementWindow.wait();
      this.confirm.click();
      sleep(1000);
      this.shopClose.click();
      sleep(1000);
      this.exit.click();
      sleep(1000);
      this.backToMainWindow.click();
      sleep(1000);
    }

    this.back.click();
    sleep(1000);
  },
};
