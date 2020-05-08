var Node = require("./src/node/node_v2");
var Color = require('./src/color');
var A = require('./action');

A.prepare();

var Tower = {
  // 进入按钮
  go: new Node.Point(1100, 700, Color.orange),
  // 工会玩家选择按钮
  guild: new Node.Point(964, 455, Color.teal),
  // 主窗口
  mainWindow: function() {
    return new Node.Window([
      this.go, 
      // 角色上方的橙色状态条
      new Node.Point(629, 139, Color.orange)]);
  },
  // 奖励确认
  confirm: new Node.Point(577, 675, Color.orange),
  // 奖励窗口状态栏
  settleStatusBar: new Node.Point(822, 96, Color.blueGrey),
  // 奖励窗口
  settleWindow: function() {
    return new Node.Window([this.confirm, this.settleStatusBar])
  },
  exec: function() {
    while (1) {
      if (this.mainWindow().wait(2000)) {
        this.go.click();
      }
      sleep(500);
      if (this.settleWindow().wait(2000)) {
        this.confirm.click();
      }
    }
  }
}

Tower.exec();