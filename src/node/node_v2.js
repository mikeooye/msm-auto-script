var Action = require("../target/action");
var rate = 2;

var Point2 = function (x, y, option) {
  this.x = x;
  this.y = y;
  if (option) {
    if (typeof option === "string") {
      this.color = option;
    } else {
      this.desc = option.desc;
      this.color = option.color;
      this.timeout = option.timeout;
      this.delay = option.delay;
    }
  }

  this.match = function (image) {
    if (!image) {
      image = images.captureScreen();
    }
    if (images.detectsColor(image, this.color, this.x * rate, this.y * rate)) {
      console.log("匹配颜色", this.x, this.y, this.desc);
      return true;
    }

    let realColor = images.pixel(image, this.x * rate, this.y * rate);
    console.log(
      "颜色不匹配",
      this.x,
      this.y,
      colors.toString(realColor),
      this.desc
    );
    return false;
  };

  this.click = function () {
    Action.click(this.x, this.y);
    if (this.desc) {
      console.log("点击了", this.desc);
    }
    if (this.delay) {
      sleep(this.delay);
    }
  };
};

// var NullPoint = new Point(0, 0);
// NullPoint.match = function () {};
// NullPoint.click = function () {};

var Window2 = function (points) {
  this.points = points;

  this.match = function (image) {
    var ret = true;
    for (var i = 0; i < this.points.length; i++) {
      var aPoint = this.points[i];
      if (aPoint.match(image) === false) {
        ret = false;
        break;
      }
    }
    return ret;
  };

  /**
   * WINDOW 匹配则点击按钮，匹配成功情况下
   */
  this.matchClick = function (image, point) {
    var result = this.match(image);
    if (result) {
      point.click();
    }
    return result;
  };

  this.wait = function (duration) {
    // beginTime == 0 表示一直等待
    var beginTime = 0;
    if (duration) {
      beginTime = new Date().getTime();
    }

    var ret = true;
    function shouldContinue() {
      if (!beginTime) {
        return true;
      }

      let now = new Date().getTime();
      return beginTime + duration + 100 > now;
    }
    while (shouldContinue()) {
      var image = images.captureScreen();
      ret = this.match(image);
      if (ret === true) {
        console.log("window 匹配，返回成功");
        return true;
      } else {
        sleep(2000);
      }
    }
    console.log("超时匹配失败");
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
