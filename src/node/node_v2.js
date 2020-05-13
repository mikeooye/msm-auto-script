var Action = require("../target/action");
var rate = 2;

var Point2 = function (x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;

  this.match = function (image) {
    if (!image) {
      image = images.captureScreen();
    }
    if (images.detectsColor(image, this.color, this.x * rate, this.y * rate)) {
      console.log("匹配颜色", this.x, this.y);
      return true;
    }

    let realColor = images.pixel(image, this.x * rate, this.y * rate);
    console.log("颜色不匹配", this.x, this.y, colors.toString(realColor));
    return false;
  };

  this.click = function () {
    Action.click(this.x, this.y);
  };
};

// var NullPoint = new Point(0, 0);
// NullPoint.match = function () {};
// NullPoint.click = function () {};

var Window2 = function (points) {
  this.points = points;

  this.wait = function (duration) {
    duration = duration || 10000000;
    duration += 100;
    var beginTime = new Date().getTime();
    var image = images.captureScreen();
    var ret = true;
    while (beginTime + duration >= new Date().getTime()) {
      ret = true;
      for (var i = 0; i < this.points.length; i++) {
        var aPoint = this.points[i];
        if (aPoint.match(image) === false) {
          ret = false;
          break;
        }
      }
      if (ret === true) {
        // window 匹配，返回成功
        return true;
      } else {
        // 匹配失败，继续下一轮循环
        sleep(2000);
        image = images.captureScreen();
      }
    }
    // 超时匹配失败
    return false;
  };

  this.waitClick = function (duration, point) {
    if (this.wait(duration)) {
      point.click();
    }
  };
};

module.exports = {
  Point: Point2,
  Window: Window2,
};
