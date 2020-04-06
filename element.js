var R = require("./rect");
var C = require("./click");

var Color = {
  orange: "#ff7b50",
  cyan: "#59b0a8",
  blue: "#548fba",
  brown: "#5a5239",
};

var Element = function (point, color, children) {
  this.point = point;
  this.color = color;
  this.children = children;

  this.click = function (delay) {
    if (delay) {
      sleep(delay);
    }
    C.click(this.point.x, this.point.y);
  };

  this.matchToClick = function (screen, delay) {
    screen = screen || captureScreen();
    if (this.check(screen)) {
      this.click(delay);
      return true;
    }
    return false;
  };

  this.waitToClick = function (delay) {
    var notFind = true;
    while (notFind) {
      sleep(1000);
      var screen = captureScreen();

      if (this.check(screen)) {
        notFind = false;
        this.click(delay);
      }
    }
  };

  /** 检测点颜色，
   * screen 当前页面截图，
   * detects 是否检测全部点，如果false 则遇到不匹配点就返回
   */
  this.check = function (screen, detects) {
    if (this.color) {
      if (detects) {
        var pixel = images.pixel(screen, this.point.x, this.point.y);
        console.log(
          "point pixel",
          this.point,
          colors.toString(pixel),
          "target",
          this.color
        );
      }

      if (typeof this.color === "string") {
        return images.detectsColor(
          screen,
          this.color,
          this.point.x,
          this.point.y
        );
      } else if (this.color instanceof Array) {
        for (var index = 0; index < this.color.length; index++) {
          var _color = this.color[index];
          if (images.detectsColor(screen, _color, this.point.x, this.point.y)) {
            return true;
          }
        }
        return false;
      }
    }

    if (this.children instanceof Array) {
      var ret = true;
      for (var index = 0; index < this.children.length; index++) {
        var element = this.children[index];

        if (!element.check(screen, detects)) {
          ret = false;

          if (!detects) {
            break;
          }
        }
      }

      return ret;
    }

    return false;
  };

  this.autoClick = function (delay) {
    delay = delay || 1000;
    if (this.color) {
      this.waitToClick(delay);
    } else {
      this.click(delay);
    }
  };
};

var game = new Element(null, null, {
  caidan: new Element({ x: 2480, y: 88 }, null, {
    renwu: new Element({ x: 2265, y: 135 }, null, {
      // 每日任务
      meiri: new Element({ x: 244, y: 680 }, null, {
        exp: new Element({ x: 1785, y: 400 }),
        go: new Element({ x: 2130, y: 1385 }, Color.orange),
        confirm: new Element({ x: 1700, y: 1135 }, Color.orange),
        continue: new Element({ x: 1800, y: 1100 }, Color.orange),
        back: new Element({ x: 1400, y: 1100 }, Color.cyan),
        quit: new Element({ x: 1022, y: 1100 }, Color.blue),
      }),
      // 进化系统
      jinhua: new Element({ x: 260, y: 1245 }, null, {
        tabs: new Element(null, null, {
          exp: new Element({ x: 190, y: 520 }),
          coin: new Element({ x: 470, y: 520 }),
          level: new Element({ x: 760, y: 520 }),
          boss: new Element({ x: 1040, y: 520 }),
        }),
        tabItems: new Element(null, null, {
          first: new Element({ x: 220, y: 750 }),
          second: new Element({ x: 470, y: 750 }),
          third: new Element({ x: 760, y: 750 }),
          forth: new Element({ x: 1040, y: 750 }),
        }),
        go: new Element({ x: 2400, y: 1400 }, Color.orange),
        confirm: new Element({ x: 1740, y: 1370 }, Color.orange),
        continue: new Element({ x: 1780, y: 1222 }, Color.orange),
        back: new Element({ x: 1410, y: 1222 }, Color.cyan),
        quit: new Element({ x: 1022, y: 1222 }, Color.blue),
      }),
      // 精英boss
      jingying: new Element({ x: 700, y: 700 }, null, {
        options: {
          current: new Element({ x: 2380, y: 380 }),
          minus: function (minus) {
            return new Element({ x: 2380 - 260 * minus, y: 380 });
          },
          hard: new Element({ x: 200, y: 765 }),
        },
        go: new Element({ x: 2450, y: 1416 }, Color.orange),
        confirm: new Element({ x: 565, y: 745 }, Color.brown),
        continue: new Element({ x: 1800, y: 1240 }, Color.orange),
        back: new Element({ x: 1420, y: 1240 }, Color.cyan),
        quit: new Element({ x: 1020, y: 1240 }, Color.blue),
      }),
      // 功夫道馆
      daoguan: new Element({ x: 700, y: 1200 }, null, {
        go: new Element({ x: 2400, y: 1400 }, Color.orange),
        confirm: new Element({ x: 1740, y: 1370 }, Color.orange),
        continue: new Element({ x: 1780, y: 1350 }, Color.orange),
        back: new Element({ x: 1410, y: 1350 }, Color.cyan),
        quit: new Element({ x: 1022, y: 1350 }, Color.blue),
      }),
      // 迷你地图
      mini: new Element({ x: 1140, y: 680 }, null, {
        fifteenMinutes: new Element({ x: 1962, y: 680 }),
        go: new Element({ x: 2400, y: 1400 }, Color.orange),
        confirm: new Element({ x: 1720, y: 1370 }, Color.orange),
        auto: new Element({ x: 745, y: 1500 }),
        autoTimePlus: new Element({ x: 1862, y: 900 }),
        autoStart: new Element({ x: 1280, y: 1233 }),
        exp: new Element({ x: 1433, y: 1150 }, Color.orange),
        back: new Element({ x: 1410, y: 1350 }, Color.cyan),
        quit: new Element({ x: 965, y: 1372 }, Color.blue),
      }),
      // 工会
      club: new Element({ x: 1145, y: 1240 }, null, {
        tabMember: new Element({ x: 166, y: 706 }),
        sign: new Element({ x: 2360, y: 1400 }),
        tabMission: new Element({ x: 158, y: 345 }),
        mission: new Element({ x: 1920, y: 740 }),
        // 2360,1430
        bonus: new Element({ x: 2360, y: 1430 }),
        // 1175 1400
        go: new Element({ x: 1175, y: 1400 }, Color.orange),
        continue: new Element({ x: 1800, y: 1200 }, Color.orange),
        back: new Element({ x: 1420, y: 1200 }, Color.cyan),
        quit: new Element({ x: 1020, y: 1200 }, Color.blue),
        back2: new Element({ x: 82, y: 176 }),
        tabGive: new Element({ x: 120, y: 1240 }),
        give: new Element({ x: 2100, y: 1200 }),
        back3: new Element({ x: 2486, y: 175 }),
      }),
      jinzita: new Element({ x: 1600, y: 700 }, null, {
        normal: new Element({ x: 200, y: 364 }),
        hard: new Element({ x: 200, y: 500 }),
        chaos: new Element({ x: 200, y: 635 }),
        hell: new Element({ x: 200, y: 765 }),
        go: new Element({ x: 2245, y: 1420 }),
        quit: new Element({ x: 1000, y: 1250 }, Color.blue),
      }),
    }),
  }),
  ads: [
    new Element({ x: 1870, y: 660 }, null, [
      new Element({ x: 838, y: 867 }, "#d3a191"),
      new Element({ x: 1034, y: 862 }, "#eeffee"),
      new Element({ x: 865, y: 755 }, "#fad945"),
    ]),
    new Element({ x: 2320, y: 160 }, null, [
      new Element({ x: 485, y: 620 }, "#046848"),
      new Element({ x: 1360, y: 650 }, "#c61144"),
      new Element({ x: 2300, y: 630 }, "#e49c00"),
    ]),
  ],
  mainline: {
    getNew: new Element({ x: 245, y: 485 }),
    pick: new Element({ x: 730, y: 1400 }, Color.orange),
    skip: new Element({ x: 100, y: 125 }, ["#000b13", "#01060a"]),
    done: new Element({ x: 2100, y: 1000 }, Color.orange),
    exp: new Element({ x: 1045, y: 1319 }, Color.orange),
  },
  talkTip: new Element({ x: 945, y: 1245 }, "#090701"),
  talkTipClose: new Element({ x: 2500, y: 375 }),
  skillpoint: new Element({ x: 2335, y: 625 }, null, [
    new Element({ x: 2335, y: 625 }, Color.cyan),
    new Element({ x: 2188, y: 714 }, Color.blue),
    new Element({ x: 2365, y: 714 }, Color.orange),
  ]),
  equipment: new Element({ x: 2364, y: 714 }, null, [
    new Element({ x: 2364, y: 714 }, Color.orange),
    new Element({ x: 2188, y: 714 }, Color.blue),
  ]),
});

module.exports = game;
