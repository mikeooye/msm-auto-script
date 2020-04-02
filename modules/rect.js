

var _rect = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
}

// Object 增加 center 方法
Object.prototype.center = function () {
  return { x: this.x + this.width * 0.5, y: this.y + this.height * 0.5};
};

// 分解字符串，转化为 _rect，要求格式 "minx miny maxx maxy"
var rect = function(desc) {
  var points = desc.split(" ");
  var x = parseInt(points[0]);
  var y = parseInt(points[1]);
  var width = points[2] - x;
  var height = points[3] - y;

  var rectObj = new _rect(x, y, width, height);

  return rectObj;
}



module.exports = { raw: _rect, make: rect };