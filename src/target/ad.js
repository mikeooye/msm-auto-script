var Node = require("../node/node");

var ads = [
  // 组队经验翻倍广告
  Node._vNode(
    [
      Node._bNode({ x: 344, y: 397 }, "#ffffff"),
      Node._bNode({ x: 369, y: 368 }, "#fdec00"),
      Node._bNode({ x: 436, y: 374 }, "#fcdb48"),
      Node._bNode({ x: 939, y: 330 }, "#ffffff"),
    ],
    { x: 939, y: 330 }
  ),
  // 钻石广告
  Node._vNode(
    [
      Node._bNode({ x: 126, y: 47 }, "#5ad6f2"),
      Node._bNode({ x: 625, y: 58 }, "#056b93"),
      Node._bNode({ x: 1160, y: 77 }, "#1077a0"),
    ],
    { x: 1160, y: 77 }
  ),
  // hot & news
  Node._vNode(
    [
      Node._bNode({ x: 117, y: 154 }, "#1e2634"),
      Node._bNode({ x: 720, y: 130 }, "#fdcc00"),
      Node._bNode({ x: 1145, y: 112 }, "#a5a5a5"),
    ],
    { x: 1145, y: 112 }
  ),
  // 1+2
  Node._vNode(
    [
      Node._bNode({ x: 630, y: 573 }, "#e9be02"),
      Node._bNode({ x: 1128, y: 665 }, "#cc8703"),
    ],
    { x: 1140, y: 115 }
  ),
];

ads.go = function () {
  //截图
  var hasAds = true;
  while (hasAds) {
    var img = captureScreen();

    var ads = ads;
    for (var i = 0; i < ads.length; i++) {
      var ad = ads[i];
      if (ad.checkClick(img)) {
        console.log("clear an ad");
        sleep(500);
        break;
      }
      if (i === ads.length - 1) {
        console.log("no more ads");
        hasAds = false;
      }
    }
  }
  console.log("clear ads finished");
};

module.exports = ads;
