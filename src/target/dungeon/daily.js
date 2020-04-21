var Node = require("../../node/node");
var Color = require("../../color");

var identifiers = [
  // 标题栏蓝灰色
  new Node.BaseNode(374, 80, Color.blueGrey),
  // options 黄色
  new Node.BaseNode(1002, 629, Color.yellow),
];

// 确认弹窗标识
var goIdentifiers = [
  // 门票底部的灰色
  new Node.BaseNode(805, 479, Color.grey),
  // 取消蓝色
  new Node.BaseNode(582, 560, Color.blue),
  // 确认橙色
  new Node.BaseNode(872, 569, Color.orange),
];

var continueIdentifiers = [new Node.BaseNode(499, 542, Color.blue), new Node.BaseNode(706, 543, Color.cyan), new Node.BaseNode(892, 534, Color.orange)];

module.exports = {
  // 进入按钮，如果按钮颜色不正确，表示没有门票不可进入，此时应该返回到上级菜单
  go: new Node.ViewNode(identifiers.concat([new Node.BaseNode(1198, 686, Color.orange)]), 1131, 706, true, 5000),
  // 返回按钮
  back: new Node.ViewNode(identifiers, 38, 86, true, 5000),
  // 退出按钮
  quit: new Node.ViewNode(identifiers, 1238, 79),
  // 经验宝石奖赏
  expOption: new Node.ViewNode(identifiers, 895, 194),
  // 进入确认
  goConfirm: new Node.ViewNode(goIdentifiers, 787, 567, true, 5000),
  // 取消进入
  goCancel: new Node.ViewNode(
    // 没有门票时，标题栏会出现黑色阴影
    [new Node.BaseNode(728, 192, "#14181c")].concat(goIdentifiers),
    484,
    569,
    true,
    3000
  ),
  // 再来一次
  continue: new Node.ViewNode(continueIdentifiers, 834, 543, true),
  // 返回菜单
  menu: new Node.ViewNode(continueIdentifiers, 643, 542, true),
  // 离开
  leave: new Node.ViewNode(continueIdentifiers, 456, 542, true),

  exec: function () {
    while (1) {
      var ret = this.back.wait();
      if (ret) {
        this.go.checkClick();

        // 韩国时间
        var now = new Date(+new Date() + 60 * 60 * 1000);
        if (now.getDay() === 0 || now.getDay() === 6) {
          // 周末，自主选择 boss，选择经验 boss
          this.expOption.click();
        }
        this.goConfirm.checkClick();
        // 捕捉没有门票提醒，如果命中，则关闭弹窗并返回
        if (this.goCancel.checkClick()) {
          this.back.checkClick();
          break;
        }

        this.menu.checkClick();
      }
    }
  },
};
