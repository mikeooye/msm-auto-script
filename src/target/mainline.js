var Node = require("../node/node_v2");
var Action = require("./action");
var Color = require("../color");

var Mainline = {
  messageBox: new Node.Point(1034, 44, Color.white),
  bag: new Node.Point(1167, 30, Color.white),
  rootWindow: function () {
    return new Node.Window([this.messageBox, this.bag]);
  },
  firstMission: new Node.Point(38, 242),
  finishButton: new Node.Point(1164, 496, Color.orange),
  finishCloseButton: new Node.Point(1224, 46, Color.white),
  finishWindow: function () {
    return new Node.Window([this.finishButton, this.finishCloseButton]);
  },
  bonusConfirmButton: new Node.Point(696, 684, Color.orange),
  bonusWindowBackground: new Node.Point(811, 680, "#f2f2f2"),
  bonusWindow: function () {
    return new Node.Window(this.bonusConfirmButton, this.bonusWindowBackground);
  },
  getNewMission: function (player) {
    if (this.rootWindow().wait(2000)) {
      player.walkLeft(320);
      player.walkRight(500);
      this.firstMission.click();
    }
  },
  exec: function (player) {
    this.getNewMission(player);
    if (this.finishWindow().wait(2000)) {
      this.finishButton.click();
    }
    if (this.bonusWindow().wait(2000)) {
      this.bonusConfirmButton.click();
      this.getNewMission(player);
    }
  },
};

module.exports = Mainline;
