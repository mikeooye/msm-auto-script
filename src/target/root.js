var Node = require("../node/node");
var Color = require("../color");

var identifier = [
  new Node.BaseNode(1033, 44, Color.white), // 信封上的白点
  new Node.BaseNode(1168, 30, Color.white), // 背包上的白点
];

module.exports = {
  // 邮件
  messageBoxMenu: new Node.ViewNode(identifier, 1049, 36, true, 5000),
  // 背包
  bagMenu: new Node.ViewNode(identifier, 1168, 33, true, 5000),
  // 任务
  missionMenu: new Node.ViewNode(identifier, 1234, 37, true, 5000),
};
