var Node = require("./node/node_v2");
var Color = require("./color");

var AdWindow = function (points, closePoint) {
  this.window = new Node.Window(points);
  this.closePoint = closePoint;

  this.matchClick = function (image) {
    if (this.window.match(image)) {
      this.closePoint.click();
      return true;
    }
    return false;
  };
};

var Ads = {
  ad_1plus2: new AdWindow(
    [
      new Node.Point(354, 112, { color: Color.white, desc: "2 白色" }),
      new Node.Point(650, 559, { color: "#ebc002", desc: "按钮黄色" }),
    ],
    new Node.Point(1140, 119, { desc: "关闭按钮" })
  ),
  allAds: function () {
    return [this.ad_1plus2];
  },
  exec: function (times) {
    let image = images.captureScreen();
    var adCount = this.allAds().length;
    while (true) {
      // 标记
      var match = false;

      // 遍历所有广告
      for (var i = 0; i < adCount; i++) {
        let anAd = this.allAds()[i];
        if (anAd.matchClick(image)) {
          // 如果命中广告，跳出遍历
          match = true;
          break;
        }
      }

      if (match) {
        // 更新截图
        image = images.captureScreen();
      } else {
        // 一个广告都没有命中，跳转循环
        break;
      }
    }
  },
};

module.exports = Ads;
