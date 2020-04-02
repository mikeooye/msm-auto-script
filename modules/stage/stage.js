var Rect = require("../rect");

var mainItems = function(index) {
  var top = 400;
  var left = 30;
  var spaceH = 8;
  var spaceV = 14;
  var width = 436;
  var height = 540;

  var row = index % 2;
  var column = parseInt(index / 2);

  return new Rect.raw(
    left + column * (width + spaceH),
    top + row * (height + spaceV),
    width,
    height
  );
};

var back = new Rect.raw(40, 124, 80, 80);
var close = new Rect.raw(2560 - 38 - 76, 120, 76, 76);

var Stage = {
  createNew: function(identifier) {
    var _stage = {
      // 开始前的准备
      prepare: function() {},
      // 确认前
      beforeConfirm: function() {},
      // 确认后的操作
      afterConfirm: function() {},
      // 结束前的操作
      beforeFinish: function() {}
    };
    // go, confirm, continue, back
    _stage.go = { x: 1964, y: 1344, width: 560, height: 130 };
    _stage.confirm = { x: 1300, y: 1070, width: 560, height: 130 };
    _stage.continue = { x: 1490, y: 1020, width: 360, height: 130 };
    _stage.back = { x: 1110, y: 1020, width: 360, height: 130 };
    _stage.identifier = identifier;
    return _stage;
  },
  getMainItem: mainItems,
  mainBack: back,
  mainClose: close
};

module.exports = Stage;
