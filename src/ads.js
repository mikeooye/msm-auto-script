var Node = require("./node/node");
var Color = require("./color");
var Root = require("./target/root");
var Player = require("./player/index");

var Ads = {
  ad_20200416: {
    id: new Node.ViewNode(
      [
        new Node.BaseNode(766, 91, "#3a8222"),
        new Node.BaseNode(1115, 285, "#ecf6fd"),
        new Node.BaseNode(113, 712, "#161515"),
      ],
      0,
      0
    ),
    check: new Node.BaseNode(116, 718),
    close: new Node.BaseNode(1154, 87),
  },
  exec: function (times) {
    for (var i = 0; i < times; i++) {
      sleep(times * 1000 + 1000);
      let ads = [this.ad_20200416];
      for (var j = 0; j < ads.length; j++) {
        var element = ads[j];
        if (element.id.check()) {
          if (element.check) {
            element.check.click();
          }
          element.close.click();
        }
      }
    }
  },
};

module.exports = Ads;
