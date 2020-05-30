var Node = require("../../node/node_v2");
var Color = require("../../color");
var Root = require("../root");
var MissionMenu = require("../missionMenu");

module.exports = {
  desc: "公会任务",
  delay: 3000,
  statusBar: new Node.Point(97, 79, { color: "#515f6e", desc: "标题栏" }),
  signStatusBar: new Node.Point(734, 163, {
    color: "#515f6e",
    desc: "签到状态栏",
  }),
  rootWindow: function () {
    return new Node.Window([this.statusBar, this.signStatusBar]);
  },
  backButton: new Node.Point(43, 73, { desc: "返回按钮" }),
  exitButton: new Node.Point(1243, 80, { desc: "关闭按钮" }),
  signButton: new Node.Point(1180, 283, { desc: "签到按钮", delay: 1000 }),
  dungeonButton: new Node.Point(798, 532, { desc: "副本任务按钮" }),
  giftButon: new Node.Point(1178, 698, {
    desc: "捐献公会积分按钮",
    delay: 3000,
  }),
  dungeonStatusBar: new Node.Point(400, 82, {
    color: "#515f6e",
    desc: "公会任务窗口状态栏",
  }),
  dungeonBlueButton: new Node.Point(923, 712, {
    color: "#548fba",
    desc: "公会任务右下角蓝色按钮",
  }),
  dungeonWindow: function () {
    return new Node.Window([this.dungeonStatusBar, this.dungeonBlueButton]);
  },
  dungeonBonusButton: new Node.Point(1181, 712, {
    desc: "公会任务领取奖励",
    delay: 1000,
  }),
  dungeonStartButon: new Node.Point(559, 699, {
    color: Color.orange,
    desc: "公会任务进入按钮",
  }),
  dungeonSettleExitButton: new Node.Point(518, 600, {
    color: "#548fba",
    desc: "公会任务结算退出",
  }),
  dungeonSettleMenuButton: new Node.Point(716, 600, {
    color: "#59b0a8",
    desc: "公会任务结算菜单",
    delay: 3000,
  }),
  dungeonSettleContinueButton: new Node.Point(887, 600, {
    color: Color.orange,
    desc: "公会任务结算继续按钮",
  }),
  dungeonSettleWindow: function () {
    return new Node.Window([
      this.dungeonSettleExitButton,
      this.dungeonSettleMenuButton,
      this.dungeonSettleContinueButton,
    ]);
  },
  giveGiftButton: new Node.Point(1054, 592, { desc: "提交 150 积分" }),

  exec: function (player) {
    console.log("进行任务", this.desc);
    this.rootWindow().wait();
    sleep(this.delay);
    // 签到
    this.signButton.click();

    // 公会任务
    this.dungeonButton.click();
    this.dungeonWindow().wait();
    this.dungeonBonusButton.click();
    while (1) {
      if (!this.dungeonStartButon.match(images.captureScreen())) {
        break;
      }
      this.dungeonStartButon.click();
      this.dungeonSettleWindow().wait();
      this.dungeonSettleMenuButton.click();
    }

    this.backButton.click();

    this.rootWindow().wait();
    // 捐献积分
    this.giftButon.click();
    this.giveGiftButton.click();
    this.exitButton.click();

    Root.missionMenu.checkClick();
    MissionMenu.quickDungeon.checkClick();
  },
};
