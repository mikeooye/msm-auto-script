var Node = require("../../node/node");
var Color = require("../../color");

var identifier = [
  // 窗口蓝灰色标题栏
  new Node.BaseNode(342, 90, Color.blueGrey),
  // 右上角橙色按钮
  new Node.BaseNode(1033, 142, Color.orange),
];

module.exports = {
  // 每日副本
  daily: new Node.ViewNode(identifier, 121, 346, true, 5000),
  // 迷你副本
  mini: new Node.ViewNode(identifier, 126, 605, true, 5000),
  // 精英副本
  elite: new Node.ViewNode(identifier, 344, 340, true, 5000),
  // 公会
  guild: new Node.ViewNode(identifier, 343, 617, true, 5000),
  // 武陵道场
  wuling: new Node.ViewNode(identifier, 563, 338, true, 5000),
  // 奈特金字塔
  pyramid: new Node.ViewNode(identifier, 786, 337, true, 5000),
  // 海贼
  pirate: new Node.ViewNode(identifier, 1013, 331, true, 5000),
  // 进化系统
  evolution: new Node.ViewNode(identifier, 1195, 621, true, 5000),
};
