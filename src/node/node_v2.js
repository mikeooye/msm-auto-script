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
      return true;
    }
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
      sleep(1000);
    }
    return ret;
  };
};

module.exports = {
  Point: Point2,
  Window: Window2,
};
