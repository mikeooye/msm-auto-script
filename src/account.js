var Node = require("./node/node");
var Color = require("./color");
var Root = require("./target/root");
var Player = require("./player/index");

var Account = {
  google: [Player.ifufo],
  apple: [Player.calbeec, Player.Mamair],
  node: {
    channelWindow: new Node.ViewNode([new Node.BaseNode(706, 688, Color.orange), new Node.BaseNode(900, 89, Color.blueGrey)], 0, 0, true),
    pickAccount: new Node.BaseNode(631, 673),
    accountWindow: new Node.ViewNode([new Node.BaseNode(526, 501, Color.black), new Node.BaseNode(523, 399, "#3b579d")]),
    google: new Node.BaseNode(639, 444),
    apple: new Node.BaseNode(625, 496),
    setting: new Node.BaseNode(1123, 719),
    settingWindow: new Node.ViewNode([new Node.BaseNode(203, 81, Color.blueGrey), new Node.BaseNode(49, 618, "#4e4e4e")], 0, 0, true),
    settingAccountTab: new Node.BaseNode(77, 256),
    logout: new Node.BaseNode(510, 722),
    settingInfoTab: new Node.BaseNode(71, 437),
    changePlayer: new Node.BaseNode(636, 280),
    playerWindow: new Node.ViewNode([new Node.BaseNode(1218, 173, "#f7e7c6"), new Node.BaseNode(1187, 172, "#e6c58c")], 0, 0, true),
    pickPlayer: new Node.BaseNode(1074, 657),
  },
  changePlayer: function (player) {
    Root.missionMenu.checkClick();
    this.node.setting.click();
    this.node.settingWindow.wait();
    this.node.settingInfoTab.click();
    this.node.changePlayer.click();
    this.node.playerWindow.wait();
    if (player.playerNode) {
      player.playerNode.click();
      this.node.pickPlayer.click();
    }
  },
  exit: function () {},
};

module.exports = Account;
