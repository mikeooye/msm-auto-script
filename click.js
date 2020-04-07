
var window;
var SIMULATOR = false;

var _click = function(x, y) {

  if (SIMULATOR === 1) {
    Tap(x, y);
  } else {
    click(x, y);
  }
}

var _clickRect = function(rect, delay) {

  var center = rect.center();
  
  if (!window) {
    window = floaty.rawWindow(<frame gravity="center" bg="#44ffcc00" />);
    window.touchable = false;
  }
  window.setPosition(rect.x, rect.y);
  window.setSize(rect.width, rect.height);

  var _delay = delay || 5000;
  sleep(_delay);


  _click(center.x, center.y);
}

var Click = {
  click: _click,
  clickRect: _clickRect,
  init: function(simulator) {
    SIMULATOR = simulator;
  }
};

module.exports = Click;