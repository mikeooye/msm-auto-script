var Action = require("../target/action");
var DEBUG = true;

var rate = 2;

// var console.log = function (firstArg, ...args) {
//   if (DEBUG) {
//     console.log(firstArg, args);
//   }
// };

var Point = function (x, y) {
  this.x = x;
  this.y = y;
  this.click = function () {
    Action.click(this.x, this.y);
  };
};

var BaseNode = function (x, y, color) {
  this.point = new Point(x, y);
  this.color = color;
  this.click = function () {
    this.point.click();
  };
  this.check = function (image) {
    var _image = image || images.captureScreen();
    var _color = this.color;
    if (typeof this.color === "string") {
      _color = [this.color];
    }

    for (var i = 0; i < _color.length; i++) {
      var aColor = _color[i];
      if (!images.detectsColor(_image, aColor, this.point.x * rate, this.point.y * rate)) {
        // 未检测到颜色
        if (DEBUG) {
          var realColor = images.pixel(_image, this.point.x, this.point.y);
          console.log("不匹配颜色", this.point, colors.toString(realColor));
        }
        return false;
      }
    }
    return true;
  };

  this.checkClick = function (image) {
    var _image = image || images.captureScreen();
    if (this.check(_image)) {
      this.click();
      return true;
    }
    return false;
  };
};

var ViewNode = function (identifies, x, y, isWait, timeout) {
  this.identifies = identifies;
  this.point = new Point(x, y);
  this.isWait = isWait;
  this.timeout = timeout || 0;

  this.click = function () {
    this.point.click();
  };

  this.check = function (image) {
    var _image = image || images.captureScreen();
    for (var i = 0; i < this.identifies.length; i++) {
      var _node = this.identifies[i];
      if (!_node.check(_image)) {
        return false;
      }
    }
    return true;
  };

  this.wait = function (image) {
    var _image = image || images.captureScreen();
    console.log("等待窗口..");
    var beginTime = new Date().getTime();
    while (1) {
      if (this.check(_image)) {
        console.log("检测到窗口");
        return true;
      }

      if (this.timeout > 0 && new Date().getTime() - beginTime > this.timeout) {
        console.log("等待窗口超时");
        return false;
      }

      sleep(1000);
      _image = images.captureScreen();
    }
  };

  this.checkClick = function (image) {
    var _image = image || images.captureScreen();
    if (this.isWait) {
      var ret = this.wait(_image);
      if (ret) {
        this.click();
      }
      return ret;
    } else if (this.check(_image)) {
      this.click();
      return true;
    }
  };
};

module.exports = {
  BaseNode: BaseNode,
  ViewNode: ViewNode,
};
