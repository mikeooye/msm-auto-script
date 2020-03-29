var windowWidth = 2560;
var windowHeight = 1600;
var missionMarginV = 78;

Object.prototype.centerX = function() {
  return this.width * 0.5 + this.x;
};
Object.prototype.centerY = function() {
  return this.y + this.height * 0.5;
};

var rect = {
  missionMainBounds: function(index) {
    var top = 400;
    var left = 30;
    var spaceH = 8;
    var spaceV = 14;
    var width = 436;
    var height = 540;

    var row = index % 2;
    var column = parseInt(index / 2);

    return {
      x: left + column * (width + spaceH),
      y: top + row * (height + spaceV),
      width: width,
      height: height
    };
  },
  // 任务返回按钮
  missionBackBounds: { x: 40, y: 124, width: 80, height: 80 },
  // 任务关闭按钮
  missionCloseBounds: { x: 2560 - 38 - 76, y: 120, width: 76, height: 76 },

  // 每日任务
  dayMission: {
    // 奖励按钮范围
    bonusItemBounds: function(index) {
      var top = 295;
      var left = 20;
      var width = 503;
      var height = 180;
      return { x: left + index * width, y: top, width: width, height: height };
    },
    // 进入按钮
    goBounds: { x: 1964, y: 1344, width: 560, height: 130 }
  }
};

module.exports = rect;