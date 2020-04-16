var rate = 2;

var cWhite = "#ffffff";
var cOrange = "#ff7b50";
var cYellow = "#ffd741";
var cCyan = "#59b0a8";

var _clickPoint = function (point) {
  sleep(500);
  console.log("点击了", point);
  click(point.x * rate, point.y * rate);
};

var BaseNode = function (point, color) {
  this.point = point;
  this.color = color;
};

var _bNode = function (point, color) {
  return new BaseNode(point, color);
};

BaseNode.prototype.click = function () {
  _clickPoint(this.point);
};

BaseNode.prototype.check = function (image) {
  var x = this.point.x * rate;
  var y = this.point.y * rate;
  var _colors = this.color;
  if (typeof this.color === "string") {
    _colors = [this.color];
  }

  var ret = false;
  for (var i = 0; i < _colors.length; i++) {
    var _color = _colors[i];
    if (images.detectsColor(image, _color, x, y)) {
      ret = true;
      break;
    }
  }

  if (!ret) {
    var detectsColor = images.pixel(image, x, y);
    var colorDesc = colors.toString(detectsColor);
    console.log(
      "unmatch",
      this.point,
      "设定颜色",
      this.color,
      "实际颜色",
      colorDesc
    );
  }
  return ret;
};

BaseNode.prototype.checkClick = function (image) {
  if (this.check(image)) {
    _clickPoint(this.point);
    return true;
  }
  return false;
};

var ViewNode = function (identifies, point, wait, timeout) {
  this.identifies = identifies;
  this.point = point;
  this.wait = wait;
  this.timeout = timeout || 0;
};

var _vNode = function (identifies, point, wait, timeout) {
  return new ViewNode(identifies, point, wait, timeout);
};

ViewNode.prototype.check = function (image) {
  var ret = true;
  for (var i = 0; i < this.identifies.length; i++) {
    var bNode = this.identifies[i];
    if (bNode.check(image) === false) {
      ret = false;
      break;
    }
  }
  return ret;
};

ViewNode.prototype.checkClick = function (image) {
  if (this.wait) {
    console.log("等待窗口..");
    var begin = new Date();
    var beginTime = begin.getTime();
    var goon = true;
    while (goon) {
      if (this.check(image)) {
        console.log("出现窗口，点击");
        _clickPoint(this.point);
        return true;
      }

      if (this.timeout > 0 && new Date().getTime() - beginTime > this.timeout) {
        console.log("检测窗口超时", this.timeout);
        return true;
      }

      console.log("等待出现窗口");
      sleep(1000);
      image = captureScreen();
    }
  } else if (this.check(image)) {
    console.log("非等待窗口");
    _clickPoint(this.point);
    return true;
  }

  return false;
};

var ChainNode = function (vnods) {
  this.vnods = vnods;
};

var _cNode = function (vnodes) {
  return new ChainNode(vnodes);
};

ChainNode.prototype.checkClick = function () {
  for (var i = 0; i < this.vnods.length; i++) {
    var img = captureScreen();
    var currentNode = this.vnods[i];
    currentNode.checkClick(img);
    sleep(500);
  }
};

module.exports = {
  cNode: _cNode,
  ads: [
    // 组队经验翻倍广告
    _vNode(
      [
        _bNode({ x: 344, y: 397 }, "#ffffff"),
        _bNode({ x: 369, y: 368 }, "#fdec00"),
        _bNode({ x: 436, y: 374 }, "#fcdb48"),
        _bNode({ x: 939, y: 330 }, "#ffffff"),
      ],
      { x: 939, y: 330 }
    ),
    // 钻石广告
    _vNode(
      [
        _bNode({ x: 126, y: 47 }, "#5ad6f2"),
        _bNode({ x: 625, y: 58 }, "#056b93"),
        _bNode({ x: 1160, y: 77 }, "#1077a0"),
      ],
      { x: 1160, y: 77 }
    ),
    // hot & news
    _vNode(
      [
        _bNode({ x: 117, y: 154 }, "#1e2634"),
        _bNode({ x: 720, y: 130 }, "#fdcc00"),
        _bNode({ x: 1145, y: 112 }, "#a5a5a5"),
      ],
      { x: 1145, y: 112 }
    ),
    // 1+2
    _vNode(
      [
        _bNode({ x: 630, y: 573 }, "#e9be02"),
        _bNode({ x: 1128, y: 665 }, "#cc8703"),
      ],
      { x: 1140, y: 115 }
    ),
  ],
  carts: {
    menu: _vNode(
      [
        _bNode({ x: 1239, y: 21 }, "#ffffff"),
        _bNode({ x: 1241, y: 34 }, "#ffffff"),
        _bNode({ x: 1239, y: 48 }, "#ffffff"),
      ],
      { x: 1241, y: 34 },
      true
    ),
    // 购物车
    cart: _vNode(
      [
        _bNode({ x: 121, y: 699 }, "#ffffff"),
        _bNode({ x: 154, y: 735 }, "#ffffff"),
      ],
      { x: 146, y: 710 },
      true
    ),
    // 购物车
    cartPop: _vNode(
      [
        _bNode({ x: 121, y: 699 }, "#ffffff"),
        _bNode({ x: 126, y: 585 }, "#ffffff"),
      ],
      { x: 147, y: 595 },
      true
    ),
    cartPopClose: _vNode(
      [_bNode({ x: 1242, y: 83 }, "#ffffff")],
      { x: 1242, y: 83 },
      true
    ),
    // 武器栏
    cartEquipmentTab: _vNode(
      [_bNode({ x: 127, y: 350 }, "#4e4e4e")],
      { x: 127, y: 350 },
      true
    ),
    // 飞侠武器
    cartEquipmentFeixiaTab: _vNode(
      [_bNode({ x: 429, y: 155 }, "#f2f2f2")],
      { x: 429, y: 155 },
      true
    ),
    // 飞侠帽子 10级
    cartEquipmentFeixiaMaozi: _vNode(
      [_bNode({ x: 941, y: 273 }, "#ffffff")],
      { x: 941, y: 273 },
      true
    ),
    // 武器购买
    cartEquipmentBuy: _vNode(
      [_bNode({ x: 1022, y: 668 }, "#ff7b50")],
      { x: 1022, y: 668 },
      true
    ),
    // 武器购买确认
    cartEquipmentBuyConfirm: _vNode(
      [_bNode({ x: 837, y: 574 }, "#ff7b50")],
      { x: 837, y: 574 },
      true
    ),
    // 背包
    bag: _vNode(
      [
        _bNode({ x: 712, y: 36 }, "#ffffff"),
        _bNode({ x: 728, y: 54 }, "#ffffff"),
      ],
      { x: 712, y: 36 },
      true
    ),
    bagItem: function (index) {
      var firstX = 791;
      var firstY = 302;

      var row = Math.floor(index / 5);
      var column = Math.floor(index % 5);

      var size = 106;
      var point = { x: firstX + size * column, y: firstY + size * row };
      return _vNode([_bNode(point, "#6e6f70")], point, true);
    },
    bagItemJianding: _vNode(
      [_bNode({ x: 988, y: 680 }, "#fd7a4f")],
      { x: 988, y: 680 },
      true
    ),
    bagItemJiandingConfirm: _vNode(
      [_bNode({ x: 831, y: 575 }, "#ff7b50")],
      { x: 831, y: 575 },
      true
    ),
    bagItemClose: _vNode(
      [_bNode({ x: 1224, y: 95 }, "#ffffff")],
      { x: 1224, y: 95 },
      true
    ),
  },
  mainline: {
    menu: _vNode(
      [
        _bNode({ x: 1239, y: 21 }, "#ffffff"),
        _bNode({ x: 1241, y: 34 }, "#ffffff"),
        _bNode({ x: 1239, y: 48 }, "#ffffff"),
      ],
      { x: 1241, y: 34 },
      true
    ),
    mission: _vNode(
      [
        _bNode({ x: 279, y: 29 }, "#ffffff"),
        _bNode({ x: 290, y: 53 }, "#ffffff"),
      ],
      { x: 290, y: 53 },
      true
    ),
    missionGo: _vNode(
      [
        _bNode({ x: 22, y: 141 }, cOrange),
        _bNode({ x: 1080, y: 698 }, cOrange),
      ],
      { x: 1080, y: 698 },
      true
    ),
    missionClose: _vNode(
      [_bNode({ x: 22, y: 141 }, cOrange), _bNode({ x: 241, y: 153 }, cYellow)],
      { x: 1245, y: 78 },
      true
    ),
    missionTalkSkip: _vNode(
      [
        _bNode({ x: 50, y: 46 }, ["#100301", "#060a0c", "#000000", "#050503"]),
        _bNode({ x: 515, y: 559 }, "#000000"),
        _bNode({ x: 1224, y: 47 }, cWhite),
      ],
      { x: 116, y: 55 }
    ),
    missionTalkPick: _vNode(
      [
        _bNode({ x: 462, y: 632 }, [cCyan, cOrange]),
        _bNode({ x: 515, y: 559 }, "#000000"),
      ],
      { x: 412, y: 627 }
    ),
    missionTalkComplete: _vNode(
      [
        _bNode({ x: 1169, y: 499 }, cOrange),
        _bNode({ x: 515, y: 559 }, "#000000"),
        _bNode({ x: 1224, y: 47 }, cWhite),
      ],
      { x: 1103, y: 497 }
    ),
    // 任务奖励
    missionBonus: _vNode(
      [
        _bNode({ x: 474, y: 104 }, "#515f6e"),
        _bNode({ x: 389, y: 168 }, "#f2f2f2"),
        _bNode({ x: 530, y: 681 }, cOrange),
      ],
      { x: 640, y: 683 }
    ),
    // 自动升级加点提醒
    autoSpUp: _vNode(
      [
        _bNode({ x: 1172, y: 311 }, "#59b0a8"),
        _bNode({ x: 974, y: 319 }, "#f03030"),
        _bNode({ x: 1094, y: 355 }, "#548fba"),
        _bNode({ x: 1184, y: 354 }, cOrange),
      ],
      { x: 1172, y: 311 }
    ),
    // 清除升级提醒
    clearSpUp: _vNode(
      [
        _bNode({ x: 974, y: 319 }, "#f03030"),
        _bNode({ x: 1094, y: 355 }, "#548fba"),
        _bNode({ x: 1184, y: 354 }, cOrange),
      ],
      { x: 1069, y: 354 }
    ),
    // 穿新装备
    wearEquipment: _vNode(
      [
        _bNode({ x: 1014, y: 294 }, "#dcdee1"),
        _bNode({ x: 1096, y: 354 }, "#548fba"),
        _bNode({ x: 1182, y: 354 }, cOrange),
      ],
      { x: 1182, y: 354 }
    ),
    // 聊天提醒
    talkTip: _vNode(
      [
        _bNode({ x: 355, y: 621 }, "#ffb2a1"),
        _bNode({ x: 354, y: 673 }, "#fff0e7"),
        _bNode({ x: 417, y: 611 }, "#d99989"),
      ],
      { x: 480, y: 635 }
    ),
    // 关闭聊天提醒
    talkTipClose: _bNode({ x: 1247, y: 184 }, "#ffffff"),
  },
  missions: {
    menu: _bNode(
      { x: 1241, y: 34 }
    ),
    mission: _bNode(
      { x: 1137, y: 45 }
    ),
    meirirenwu: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1196, y: 177 }, "#59b0a8"),
      ],
      { x: 126, y: 351 },
      true
    ),
    meiriBack: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
      ],
      { x: 44, y: 84 },
      true
    ),
    meiriBonusExp: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 800, y: 136 }, "#f2f2f2"),
      ],
      { x: 892, y: 192 },
      true
    ),
    meiriGo: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1175, y: 683 }, "#ff7b50"),
      ],
      { x: 1017, y: 683 },
      true
    ),
    meiriConfirm: _vNode(
      [
        _bNode({ x: 752, y: 226 }, "#515f6e"),
        _bNode({ x: 561, y: 556 }, "#548fba"),
        _bNode({ x: 867, y: 567 }, "#ff7b50"),
      ],
      { x: 867, y: 567 },
      true
    ),
    meiriExit: _vNode(
      [
        _bNode({ x: 494, y: 531 }, "#548fba"),
        _bNode({ x: 704, y: 537 }, "#59b0a8"),
        _bNode({ x: 881, y: 539 }, "#ff7b50"),
      ],
      { x: 494, y: 531 },
      true
    ),
    meiriMenu: _vNode(
      [
        _bNode({ x: 494, y: 531 }, "#548fba"),
        _bNode({ x: 704, y: 537 }, "#59b0a8"),
        _bNode({ x: 881, y: 539 }, "#ff7b50"),
      ],
      { x: 704, y: 537 },
      true
    ),
    meiriContinue: _vNode(
      [
        _bNode({ x: 494, y: 531 }, "#548fba"),
        _bNode({ x: 704, y: 537 }, "#59b0a8"),
        _bNode({ x: 881, y: 539 }, "#ff7b50"),
      ],
      { x: 881, y: 539 },
      true
    ),
    jinhuaxitong: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1196, y: 177 }, "#59b0a8"),
      ],
      { x: 1200, y: 625 },
      true
    ),
    jinhuaxitongBack: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 93, y: 162 }, "#515f6e"),
      ],
      { x: 44, y: 84 },
      true
    ),
    jinhuaxitongBonusExpTab: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 93, y: 162 }, "#515f6e"),
        _bNode({ x: 94, y: 280 }, "#e5e6e9"),
      ],
      { x: 94, y: 247 },
      true
    ),
    jinhuaxitongBonusExpOp: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 93, y: 162 }, "#515f6e"),
        _bNode({ x: 94, y: 280 }, "#ff7b50"),
      ],
      { x: 286, y: 355 },
      true
    ),
    jinhuaxitongBonusLevelTab: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 93, y: 162 }, "#515f6e"),
        _bNode({ x: 378, y: 280 }, "#e5e6e9"),
      ],
      { x: 378, y: 247 },
      true
    ),
    jinhuaxitongBonusLevelOp: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 93, y: 162 }, "#515f6e"),
        _bNode({ x: 378, y: 280 }, "#ff7b50"),
      ],
      { x: 245, y: 355 },
      true
    ),
    jinhuaxitongBonusBossTab: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 93, y: 162 }, "#515f6e"),
        _bNode({ x: 516, y: 280 }, "#e5e6e9"),
      ],
      { x: 516, y: 247 },
      true
    ),
    jinhuaxitongBonusBossOp: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 93, y: 162 }, "#515f6e"),
        _bNode({ x: 516, y: 280 }, "#ff7b50"),
      ],
      { x: 286, y: 355 },
      true
    ),
    jinhuaxitongGo: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 93, y: 162 }, "#515f6e"),
        _bNode({ x: 1159, y: 701 }, "#ff7b50"),
      ],
      { x: 1120, y: 702 },
      true
    ),
    jinhuaxitongConfirm: _vNode(
      [
        _bNode({ x: 709, y: 105 }, "#515f6e"),
        _bNode({ x: 542, y: 686 }, "#548fba"),
        _bNode({ x: 854, y: 693 }, "#ff7b50"),
      ],
      { x: 795, y: 678 },
      true
    ),
    jinhuaxitongExit: _vNode(
      [
        _bNode({ x: 503, y: 608 }, "#548fba"),
        _bNode({ x: 704, y: 610 }, "#59b0a8"),
        _bNode({ x: 885, y: 607 }, "#ff7b50"),
      ],
      { x: 503, y: 608 },
      true
    ),
    jinhuaxitongMenu: _vNode(
      [
        _bNode({ x: 503, y: 608 }, "#548fba"),
        _bNode({ x: 704, y: 610 }, "#59b0a8"),
        _bNode({ x: 885, y: 607 }, "#ff7b50"),
      ],
      { x: 704, y: 610 },
      true
    ),
    jinhuaxitongContinue: _vNode(
      [
        _bNode({ x: 503, y: 608 }, "#548fba"),
        _bNode({ x: 704, y: 610 }, "#59b0a8"),
        _bNode({ x: 885, y: 607 }, "#ff7b50"),
      ],
      { x: 885, y: 607 },
      true
    ),
    jingyingboss: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1196, y: 177 }, "#59b0a8"),
      ],
      { x: 350, y: 344 },
      true
    ),
    jingyingbossOp: function (minus) {
      var x = 1198;
      var y = 198;
      var delta = 130;
      return _vNode(
        [
          _bNode({ x: 673, y: 81 }, "#515f6e"),
          _bNode({ x: 58, y: 533 }, "#f2f2f2"),
        ],
        { x: 1198 - delta * minus, y: y },
        true
      );
    },
    jingyingbossHard: _vNode(
      [
        _bNode({ x: 673, y: 81 }, "#515f6e"),
        _bNode({ x: 58, y: 533 }, "#f2f2f2"),
      ],
      { x: 97, y: 373 },
      true
    ),
    jingyingbossGo: _vNode(
      [
        _bNode({ x: 673, y: 81 }, "#515f6e"),
        _bNode({ x: 58, y: 533 }, "#f2f2f2"),
        _bNode({ x: 906, y: 700 }, "#548fba"),
      ],
      { x: 906, y: 700 },
      true
    ),
    jingyingbossConfirm: _vNode(
      [
        _bNode({ x: 223, y: 218 }, "#ff7b50"),
        _bNode({ x: 125, y: 265 }, "#59b0a8"),
      ],
      { x: 223, y: 218 },
      true
    ),
    jingyingbossExit: _vNode(
      [
        _bNode({ x: 503, y: 616 }, "#548fba"),
        _bNode({ x: 704, y: 616 }, "#59b0a8"),
        _bNode({ x: 885, y: 616 }, "#ff7b50"),
      ],
      { x: 503, y: 616 },
      true
    ),
    jingyingbossMenu: _vNode(
      [
        _bNode({ x: 503, y: 616 }, "#548fba"),
        _bNode({ x: 704, y: 616 }, "#59b0a8"),
        _bNode({ x: 885, y: 616 }, "#ff7b50"),
      ],
      { x: 704, y: 616 },
      true
    ),
    jingyingbossContinue: _vNode(
      [
        _bNode({ x: 503, y: 616 }, "#548fba"),
        _bNode({ x: 704, y: 616 }, "#59b0a8"),
        _bNode({ x: 885, y: 616 }, "#ff7b50"),
      ],
      { x: 885, y: 616 },
      true
    ),
    jingyingbossBack: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 600, y: 60 }, "#515f6e"),
      ],
      { x: 44, y: 84 },
      true
    ),
    wulingdaoguan: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1196, y: 177 }, "#59b0a8"),
      ],
      { x: 567, y: 344 },
      true
    ),
    wulingdaoguanBack: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 600, y: 60 }, "#515f6e"),
      ],
      { x: 44, y: 84 },
      true
    ),
    wulingdaoguanGo: _vNode(
      [
        _bNode({ x: 507, y: 60 }, "#515f6e"),
        _bNode({ x: 600, y: 60 }, "#515f6e"),
        _bNode({ x: 1190, y: 701 }, "#ff7b50"),
      ],
      { x: 1120, y: 702 },
      true
    ),
    wulingdaoguanConfirm: _vNode(
      [
        _bNode({ x: 709, y: 105 }, "#515f6e"),
        _bNode({ x: 542, y: 682 }, "#548fba"),
        _bNode({ x: 854, y: 682 }, "#ff7b50"),
      ],
      { x: 795, y: 682 },
      true
    ),
    wulingdaoguanExit: _vNode(
      [
        _bNode({ x: 503, y: 678 }, "#548fba"),
        _bNode({ x: 704, y: 678 }, "#59b0a8"),
        _bNode({ x: 885, y: 678 }, "#ff7b50"),
      ],
      { x: 503, y: 678 },
      true
    ),
    wulingdaoguanMenu: _vNode(
      [
        _bNode({ x: 503, y: 678 }, "#548fba"),
        _bNode({ x: 704, y: 678 }, "#59b0a8"),
        _bNode({ x: 885, y: 678 }, "#ff7b50"),
      ],
      { x: 704, y: 678 },
      true
    ),
    wulingdaoguanContinue: _vNode(
      [
        _bNode({ x: 503, y: 678 }, "#548fba"),
        _bNode({ x: 704, y: 678 }, "#59b0a8"),
        _bNode({ x: 885, y: 678 }, "#ff7b50"),
      ],
      { x: 885, y: 678 },
      true
    ),
    jinzita: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1196, y: 177 }, "#59b0a8"),
      ],
      { x: 792, y: 351 },
      true
    ),
    jinzitaNormal: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 6, y: 756 }, "#f2f2f2"),
      ],
      { x: 95, y: 173 },
      true
    ),
    jinzitaHard: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 6, y: 756 }, "#f2f2f2"),
      ],
      { x: 95, y: 248 },
      true
    ),
    jinzitaChaos: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 6, y: 756 }, "#f2f2f2"),
      ],
      { x: 95, y: 318 },
      true
    ),
    jinzitaHell: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 6, y: 756 }, "#f2f2f2"),
      ],
      { x: 95, y: 387 },
      true
    ),
    jinzitaGo: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 6, y: 756 }, "#f2f2f2"),
      ],
      { x: 1132, y: 705 },
      true
    ),
    jinzitaMenu: _vNode(
      [
        _bNode({ x: 503, y: 624 }, "#548fba"),
        _bNode({ x: 704, y: 624 }, "#59b0a8"),
        _bNode({ x: 885, y: 624 }, "#ff7b50"),
      ],
      { x: 704, y: 624 },
      true
    ),
    jinzitaBack: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 6, y: 756 }, "#f2f2f2"),
      ],
      { x: 40, y: 80 },
      true
    ),
    haidao: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1196, y: 177 }, "#59b0a8"),
      ],
      { x: 1015, y: 351 },
      true
    ),
    haidaoGo: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1246, y: 708 }, "#ff7b50"),
      ],
      { x: 805, y: 706 },
      true
    ),
    haidaoConfirm: _vNode(
      [
        _bNode({ x: 230, y: 212 }, "#ff7b50"),
        _bNode({ x: 115, y: 267 }, "#59b0a8"),
      ],
      { x: 230, y: 212 },
      true
    ),
    haidaoQuit: _vNode(
      [
        _bNode({ x: 1245, y: 288 }, "#ffec35"),
        _bNode({ x: 1233, y: 287 }, "#ffe821"),
      ],
      { x: 1233, y: 287 },
      true
    ),
    haidaoMenu: _vNode(
      [
        _bNode({ x: 503, y: 572 }, "#548fba"),
        _bNode({ x: 704, y: 572 }, "#59b0a8"),
        _bNode({ x: 885, y: 572 }, "#ff7b50"),
      ],
      { x: 704, y: 572 },
      true
    ),
    haidaoBack: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
      ],
      { x: 40, y: 80 },
      true
    ),
    minirenwu: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1196, y: 177 }, "#59b0a8"),
      ],
      { x: 126, y: 620 },
      true
    ),
    minirenwu15: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 932, y: 390 }, "#ffd741"),
      ],
      { x: 975, y: 335 },
      true
    ),
    minirenwuGo: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1158, y: 705 }, "#ff7b50"),
      ],
      { x: 1158, y: 705 },
      true
    ),
    minirenwuConfirm: _vNode(
      [
        _bNode({ x: 736, y: 97 }, "#515f6e"),
        _bNode({ x: 569, y: 685 }, "#548fba"),
        _bNode({ x: 829, y: 685 }, "#ff7b50"),
      ],
      { x: 787, y: 678 },
      true
    ),
    minirenwuAuto: _vNode(
      [
        _bNode({ x: 93, y: 177 }, "#f46c3f"),
        _bNode({ x: 150, y: 367 }, "#59b0a8"),
      ],
      { x: 374, y: 743 },
      true
    ),
    minirenwuAutoTimeGet: _vNode(
      [
        _bNode({ x: 430, y: 184 }, "#515f6e"),
        _bNode({ x: 522, y: 251 }, "#ffd741"),
      ],
      { x: 917, y: 448 },
      true
    ),
    minirenwuAutoStart: _vNode(
      [
        _bNode({ x: 430, y: 184 }, "#515f6e"),
        _bNode({ x: 522, y: 251 }, "#ffd741"),
      ],
      { x: 630, y: 614 },
      true
    ),
    // exp: new Element({ x: 1433, y: 1150 }, Color.orange),
    // back: new Element({ x: 1410, y: 1350 }, Color.cyan),
    minirenwuExp: _vNode(
      [_bNode({ x: 717, y: 575 }, "#ff7b50")],
      { x: 717, y: 575 },
      true
    ),
    minirenwuMenu: _vNode(
      [
        _bNode({ x: 464, y: 682 }, "#548fba"),
        _bNode({ x: 718, y: 682 }, "#59b0a8"),
        _bNode({ x: 923, y: 682 }, "#ff7b50"),
      ],
      { x: 633, y: 682 },
      true
    ),
    minirenwuBack: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 800, y: 81 }, "#515f6e"),
        _bNode({ x: 1158, y: 705 }, "#ff7b50"),
      ],
      { x: 44, y: 84 },
      true
    ),
    gonghui: _vNode(
      [
        _bNode({ x: 761, y: 81 }, "#515f6e"),
        _bNode({ x: 1007, y: 81 }, "#515f6e"),
        _bNode({ x: 1196, y: 177 }, "#59b0a8"),
      ],
      { x: 352, y: 615 },
      true
    ),
    gonghuirenwu: _vNode(
      [
        _bNode({ x: 720, y: 90 }, "#515f6e"),
        _bNode({ x: 761, y: 164 }, "#515f6e")
      ],
      { x: 824, y: 527 },
      true
    ),
    gonghuirenwuGo: _vNode(
      [
        _bNode({ x: 581, y: 85 }, "#515f6e"),
        _bNode({ x: 168, y: 292 }, "#f2f2f2"),
        _bNode({ x: 568, y: 704 }, "#ff7b50"),
      ],
      { x: 523, y: 704 },
      true
    ),
    gonghuirenwuBonus: _vNode(
      [
        _bNode({ x: 581, y: 85 }, "#515f6e"),
        _bNode({ x: 168, y: 292 }, "#f2f2f2"),
        _bNode({ x: 1202, y: 715 }, "#ff7b50"),
      ],
      { x: 1202, y: 715 },
      true
    ),
    gonghuirenwuExit: _vNode(
      [
        _bNode({ x: 503, y: 600 }, "#548fba"),
        _bNode({ x: 704, y: 600 }, "#59b0a8"),
        _bNode({ x: 885, y: 600 }, "#ff7b50"),
      ],
      { x: 503, y: 600 },
      true
    ),
    gonghuirenwuMenu: _vNode(
      [
        _bNode({ x: 503, y: 600 }, "#548fba"),
        _bNode({ x: 704, y: 600 }, "#59b0a8"),
        _bNode({ x: 885, y: 600 }, "#ff7b50"),
      ],
      { x: 704, y: 600 },
      true
    ),
    gonghuirenwuContinue: _vNode(
      [
        _bNode({ x: 503, y: 600 }, "#548fba"),
        _bNode({ x: 704, y: 600 }, "#59b0a8"),
        _bNode({ x: 885, y: 600 }, "#ff7b50"),
      ],
      { x: 885, y: 600 },
      true
    ),
    gonghuirenwuBack: _vNode(
      [
        _bNode({ x: 581, y: 85 }, "#515f6e"),
        _bNode({ x: 168, y: 292 }, "#f2f2f2"),
      ],
      { x: 44, y: 84 },
      true
    ),
    gonghuiSign: _bNode(
      { x: 1177, y: 284 }, "#"
    ),
    gonghuiGiveTab: _vNode(
      [
        _bNode({ x: 534, y: 66 }, "#515f6e"),
        _bNode({ x: 76, y: 710 }, "#4e4e4e"),
      ],
      { x: 76, y: 710 },
      true
    ),
    gonghuiGive: _vNode(
      [
        _bNode({ x: 534, y: 66 }, "#515f6e"),
        _bNode({ x: 1130, y: 567 }, "#ff7b50"),
      ],
      { x: 1060, y: 594 },
      true, 10
    ),
    gonghuiBack: _vNode(
      [
        _bNode({ x: 534, y: 66 }, "#515f6e"),
        _bNode({ x: 887, y: 78 }, "#515f6e"),
      ],
      { x: 1244, y: 80 },
      true
    ),
  },
  // 活动 events
  huodong: {
    yinghua: [
      _bNode({ x: 340, y: 500 }, "#f9f2f2"),
      _bNode({ x: 558, y: 422 }, "#f9f2f2"),
      _bNode({ x: 523, y: 587 }, "#f9f2f2"),
      _bNode({ x: 710, y: 537 }, "#f9f2f2"),
      _bNode({ x: 893, y: 480 }, "#f9f2f2"),
      _bNode({ x: 990, y: 608 }, "#f9f2f2"),
      _bNode({ x: 1056, y: 435 }, "#f9f2f2"),
      _bNode({ x: 1167, y: 548 }, "#f9f2f2"),
    ],
    confirm: _vNode(
      [
        _bNode({ x: 565, y: 570 }, "#ff7b50"),
        _bNode({ x: 734, y: 565 }, "#ff7b50"),
      ],
      { x: 636, y: 566 },
      true,
      10000
    ),
  },
};
