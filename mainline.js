var Node = require("./src/node/node_v2");
var Color = require('./src/color');
var A = require('./action');
var Player = require('./src/player/player');

A.prepare();

var player = new Player("any", 'none', 10, 100, false);

var Mainline = {

  getNew: function() {
    player.walkLeft(333);
    player.walkRight(444);
    new Node.Point(62, 241).click();
  },
  talkSkip: new Node.Point(1211, 582, Color.white),
  talkWindow: function() {
    return new Node.Window([this.talkSkip, new Node.Point(1222, 582, Color.white)]);
  },
  finish: new Node.Point(1047, 491, Color.orange),
  finishWindow: function() {
    return new Node.Window([this.finish, new Node.Point(1169, 499, Color.orange)]);
  },
  settleConfirm: new Node.Point(709, 684, Color.orange),
  settleWindow: function() {
    return new Node.Window([this.settleConfirm, new Node.Point(558, 681, Color.orange)]);
  },
  exec: function() {
    this.getNew();

    while(true) {
      this.talkWindow().waitClick(500, this.talkSkip);
      this.finishWindow().waitClick(500, this.finish);
      if (this.settleWindow().wait(500)) {
        this.settleConfirm.click();
        sleep(2000);
        this.getNew();
      }
    }
  }
};

Mainline.exec();

Mainline.exec();