var Node = require("../../node/node_v2");
var Color = require("../../color");

module.exports = {
  statusBar: new Node.Point(374, 80, { color: "#515f6e", desc: "标题栏" }),
  optionBottom: new Node.Point(946, 627, {
    color: "#ffd741",
    desc: "选择项底部颜色",
  }),
  go: new Node.Point(1198, 686, {
    color: "#ff7b50",
    desc: "进入按钮",
    delay: 1000,
  }),
  back: new Node.Point(38, 86, { desc: "返回按钮", delay: 4000 }),
  exit: new Node.Point(1238, 79, { desc: "退出按钮" }),
  // expOption: new Node.Point(895, 194, { desc: "经验选择按钮" }),
  expOption: new Node.Point(895, 194, { desc: "经验选项按钮" }),
  mainWindow: function () {
    return new Node.Window([this.statusBar, this.optionBottom, this.go]);
  },
  confirmTicketBottom: new Node.Point(805, 479, {
    color: "#747474",
    desc: "确认门票底色",
  }),
  confirmCancel: new Node.Point(582, 560, {
    color: "#548fba",
    desc: "确认取消按钮",
    delay: 2000,
  }),
  confirmOk: new Node.Point(872, 569, {
    color: "#ff7b50",
    desc: "确认ok按钮",
    delay: 2000,
  }),
  confirmWindow: function () {
    return new Node.Window([this.confirmCancel, this.confirmOk]);
  },
  settleContinue: new Node.Point(880, 543, {
    color: Color.orange,
    desc: "结算继续按钮",
    delay: 2000,
  }),
  settleMenu: new Node.Point(706, 543, {
    color: Color.teal,
    desc: "结算菜单按钮",
  }),
  settleWindow: function () {
    return new Node.Window([this.settleContinue, this.settleMenu]);
  },
  pickOption: function () {
    // 韩国时间
    var now = new Date(+new Date() + 60 * 60 * 1000);
    if (now.getDay() === 0 || now.getDay() === 6) {
      // 周末，自主选择 boss，选择经验 boss
      this.expOption.click();
    }
  },

  exec: function () {
    while (1) {
      if (this.mainWindow().wait()) {
        this.pickOption();

        this.go.click();

        this.confirmWindow().wait();
        this.confirmOk.click();
        sleep(2000);
        if (this.confirmWindow().wait(2000)) {
          //没有门票，需返回
          this.confirmCancel.click();
          break;
        }

        this.settleWindow().wait();
        this.settleMenu.click();
      }
    }
    this.mainWindow().wait();
    this.back.click();
  },
};
