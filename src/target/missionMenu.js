var Node = require("../node/node");
var Color = require("../color");

var identifier = [
  // 背包
  new Node.BaseNode(713, 37, Color.white),
  // 邮件
  new Node.BaseNode(976, 56, Color.white),
];

module.exports = {
  // 任务领取卷轴
  questMenu: new Node.ViewNode(identifier, 284, 45, true, 5000),
  // 快速副本
  quickDungeon: new Node.ViewNode(identifier, 1136, 53, true, 5000),
  // 商店
  shop: new Node.ViewNode(identifier, 148, 717, true, 5000),
};
