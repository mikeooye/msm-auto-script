var Node = require("../../node/node_v2");
var Color = require("../../color");

// var identifiers = [
//   // 标题栏蓝灰色
//   new Node.BaseNode(374, 80, Color.blueGrey),
//   // options 黄色
//   new Node.BaseNode(1002, 629, Color.yellow),
// ];

// // 确认弹窗标识
// var goIdentifiers = [
//   // 门票底部的灰色
//   new Node.BaseNode(805, 479, Color.grey),
//   // 取消蓝色
//   new Node.BaseNode(582, 560, Color.blue),
//   // 确认橙色
//   new Node.BaseNode(872, 569, Color.orange),
// ];

// var continueIdentifiers = [
//   new Node.BaseNode(499, 542, Color.blue),
//   new Node.BaseNode(706, 543, Color.cyan),
//   new Node.BaseNode(892, 534, Color.orange),
// ];

module.exports = {
  // go: new Node.ViewNode(
  //   identifiers.concat([new Node.BaseNode(1198, 686, Color.orange)]),
  //   1131,
  //   706,
  //   true,
  //   5000
  // ),
  // // 返回按钮
  // back: new Node.ViewNode(identifiers, 38, 86, true, 5000),
  // // 退出按钮
  // quit: new Node.ViewNode(identifiers, 1238, 79),
  // // 经验宝石奖赏
  // expOption: new Node.ViewNode(identifiers, 895, 194),
  // // 进入确认
  // goConfirm: new Node.ViewNode(goIdentifiers, 787, 567, true, 5000),
  // // 取消进入
  // goCancel: new Node.ViewNode(
  //   // 没有门票时，标题栏会出现黑色阴影
  //   [new Node.BaseNode(728, 192, "#14181c")].concat(goIdentifiers),
  //   484,
  //   569,
  //   true,
  //   3000
  // ),
  // // 再来一次
  // continue: new Node.ViewNode(continueIdentifiers, 834, 543, true),
  // // 返回菜单
  // menu: new Node.ViewNode(continueIdentifiers, 643, 542, true),
  // // 离开
  // leave: new Node.ViewNode(continueIdentifiers, 456, 542, true),

  statusBar: new Node.Point(374, 80, "#515f6e"),
  optionBottom: new Node.Point(1002, 629, "#ff5741"),
  go: new Node.Point(1198, 686, "#ff7b50"),
  back: new Node.Point(38, 86),
  exit: new Node.Point(1238, 79),
  expOption: new Node.Point(895, 194),
  mainWindow: function () {
    return new Node.Window(this.statusBar, this.optionBottom, this.go);
  },
  confirmTicketBottom: new Node.Point(805, 479, "#747474"),
  confirmCancel: new Node.Point(582, 560, "#548fba"),
  confirmOk: new Node.Point(872, 569, "#ff7b50"),
  confirmNoTicketShadow: new Node.Point(728, 192, "#14181c"),
  confirmWindow: function () {
    return new Node.Window(
      this.confirmTicketBottom,
      this.confirmCancel,
      this.confirmOk
    );
  },
  settleContinue: new Node.Point(880, 543, Color.orange),
  settleMenu: new Node.Point(706, 543, Color.teal),
  settleExit: new Node.Point(499, 542, "#548fba"),
  settleWindow: function () {
    return new Node.Window([
      this.settleContinue,
      this.settleMenu,
      this.settleExit,
    ]);
  },

  exec: function () {
    while (1) {
      if (this.mainWindow().wait()) {
        // 韩国时间
        var now = new Date(+new Date() + 60 * 60 * 1000);
        if (now.getDay() === 0 || now.getDay() === 6) {
          // 周末，自主选择 boss，选择经验 boss
          this.expOption.click();
        }

        this.go.click();
        sleep(1000);

        if (this.confirmWindow().wait()) {
          this.confirmOk.click();
          sleep(1000);
          if (this.confirmNoTicketShadow.match(images.captureScreen())) {
            //没有门票，需返回
            this.confirmCancel.click();
            this.back.click();
            break;
          }
          sleep(2500);
          if (this.settleWindow().wait()) {
            this.settleMenu.click();
            sleep(4000);
          }
        }
      }
      // if (ret) {
      //   this.go.checkClick();
      //   this.goConfirm.checkClick();
      //   // 捕捉没有门票提醒，如果命中，则关闭弹窗并返回
      //   if (this.goCancel.checkClick()) {
      //     this.back.checkClick();
      //     break;
      //   }
      //   this.menu.checkClick();
      // }
    }
  },
};
