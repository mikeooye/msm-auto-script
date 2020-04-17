var N = require("./node");

var prepare = function () {
  auto();
  if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
  }
  sleep(2000);
};

var clearAds = function () {
  //截图
  var hasAds = true;
  while (hasAds) {
    var img = captureScreen();

    var ads = N.ads;
    for (var i = 0; i < ads.length; i++) {
      var ad = ads[i];
      if (ad.checkClick(img)) {
        console.log("clear an ad");
        sleep(500);
        break;
      }
      if (i === ads.length - 1) {
        console.log("no more ads");
        hasAds = false;
      }
    }
  }
  console.log("clear ads finished");
};

var clearTalkTip = function () {
  if (N.mainline.talkTip.checkClick(captureScreen())) {
    sleep(1000);
    N.mainline.talkTipClose.checkClick(captureScreen());
  }
};

var goMainline = function () {
  var getNewMission = function () {
    swipe(145 * 2, 625 * 2, 221 * 2, 625 * 2, 500);
    swipe(145 * 2, 625 * 2, 70 * 2, 625 * 2, 400);
    var img = captureScreen();
    N.mainline.menu.checkClick(img);
    sleep(500);
    img = captureScreen();
    N.mainline.mission.checkClick(img);
    sleep(500);
    var ret = N.mainline.missionGo.checkClick(img);
    if (!ret) {
      console.log("没有新任务，退出");
      N.mainline.missionClose.checkClick(img);
      return false;
    }
    console.log("领取新任务");
    return true;
  };

  var skipTalk = function (img) {
    return N.mainline.missionTalkSkip.checkClick(img);
  };

  var completeTalk = function (img) {
    return N.mainline.missionTalkComplete.checkClick(img);
  };

  var getBonus = function (img) {
    return N.mainline.missionBonus.checkClick(img);
  };

  var pick = function (img) {
    return N.mainline.missionTalkPick.checkClick(img);
  };

  // swipe(145 * 2, 627 * 2, 221 * 2, 624 * 2, 250);
  // return;

  if (!getNewMission()) {
    return;
  }

  // skipTalk(captureScreen());

  // pick(captureScreen());

  while (1) {
    var img = captureScreen();

    skipTalk(img);
    pick(img);
    completeTalk(img);

    if (!N.mainline.autoSpUp.checkClick(img)) {
      N.mainline.clearSpUp.checkClick(img);
    }
    N.mainline.wearEquipment.checkClick(img);
    if (getBonus(img)) {
      sleep(1000);
      clearAds();
      clearTalkTip();
      if (!getNewMission()) {
        return;
      }
    }

    sleep(500);
  }
};

var buyEquipment = function () {
  var count = 20;
  N.carts.menu.checkClick(captureScreen());
  sleep(500);
  N.carts.cart.checkClick(captureScreen());
  sleep(500);
  N.carts.cartPop.checkClick(captureScreen());
  sleep(500);
  N.carts.cartEquipmentTab.checkClick(captureScreen());
  sleep(500);
  N.carts.cartEquipmentFeixiaTab.checkClick(captureScreen());
  sleep(500);

  for (var i = 0; i < count; i++) {
    N.carts.cartEquipmentFeixiaMaozi.checkClick(captureScreen());
    sleep(500);
    N.carts.cartEquipmentBuy.checkClick(captureScreen());
    sleep(500);
    N.carts.cartEquipmentBuyConfirm.checkClick(captureScreen());
    sleep(500);
  }

  N.carts.cartPopClose.checkClick(captureScreen());
  sleep(500);
  N.carts.cart.checkClick(captureScreen());
  sleep(500);
  N.carts.bag.checkClick(captureScreen());
  sleep(500);

  for (i = 0; i < count; i++) {
    N.carts.bagItem(i).checkClick(captureScreen());
    sleep(500);
    N.carts.bagItemJianding.checkClick(captureScreen());
    sleep(500);
    N.carts.bagItemJiandingConfirm.checkClick(captureScreen());
    sleep(500);
    N.carts.bagItemClose.checkClick(captureScreen());
    sleep(500);
  }
};

var missions = {
  prepare: function () {
    N.missions.menu.click();
    sleep(1500);
    N.missions.mission.click();
    sleep(1500);
  },
  meiri: function (player) {
    var ticket = player.tickets;
    N.missions.meirirenwu.checkClick(captureScreen());
    sleep(500);

    var now = new Date();
    if (now.getDay() === 0 || now.getDay() === 6) {
      // 周末，自主选择 boss，选择经验 boss
      N.missions.meiriBonusExp.checkClick(captureScreen());
      sleep(500);
    }
    N.missions.meiriGo.checkClick(captureScreen());
    sleep(500);
    N.missions.meiriConfirm.checkClick(captureScreen());
    sleep(500);

    for (var cost = 1; cost < ticket; cost++) {
      N.missions.meiriContinue.checkClick(captureScreen());
      sleep(500);
      N.missions.meiriConfirm.checkClick(captureScreen());
      sleep(500);
    }

    N.missions.meiriMenu.checkClick(captureScreen());
    sleep(500);
    N.missions.meiriBack.checkClick(captureScreen());
    sleep(500);
  },
  jinhuaxitong: function (player) {
    var ticket = player.tickets;
    var level = player.level;
    N.missions.jinhuaxitong.checkClick(captureScreen());
    sleep(500);
    // N.missions.jinhuaxitongBonusExpTab.checkClick(captureScreen());
    // sleep(500);
    N.missions.jinhuaxitongBonusExpOp.checkClick(captureScreen());
    sleep(500);
    N.missions.jinhuaxitongBonusLevelTab.checkClick(captureScreen());
    sleep(500);
    N.missions.jinhuaxitongBonusLevelOp.checkClick(captureScreen());
    sleep(500);
    if (level >= 120) {
      //等级过低可能会打不动boss，造成任务失败
      N.missions.jinhuaxitongBonusBossTab.checkClick(captureScreen());
      sleep(500);
      N.missions.jinhuaxitongBonusBossOp.checkClick(captureScreen());
      sleep(500);
    }
    toast("手动调整时间");
    sleep(5000);

    N.missions.jinhuaxitongGo.checkClick(captureScreen());
    sleep(500);
    N.missions.jinhuaxitongConfirm.checkClick(captureScreen());
    sleep(500);

    for (var cost = 1; cost < ticket; cost++) {
      N.missions.jinhuaxitongContinue.checkClick(captureScreen());
      sleep(500);
      N.missions.jinhuaxitongConfirm.checkClick(captureScreen());
      sleep(500);
    }

    N.missions.jinhuaxitongMenu.checkClick(captureScreen());
    sleep(500);
    N.missions.jinhuaxitongBack.checkClick(captureScreen());
    sleep(500);
  },
  wulingdaoguan: function (player) {
    var ticket = player.tickets;
    N.missions.wulingdaoguan.checkClick(captureScreen());
    sleep(500);
    N.missions.wulingdaoguanGo.checkClick(captureScreen());
    sleep(500);
    N.missions.wulingdaoguanConfirm.checkClick(captureScreen());
    sleep(500);

    for (var cost = 1; cost < ticket; cost++) {
      N.missions.wulingdaoguanContinue.checkClick(captureScreen());
      sleep(500);
      N.missions.wulingdaoguanConfirm.checkClick(captureScreen());
      sleep(500);
    }

    N.missions.wulingdaoguanMenu.checkClick(captureScreen());
    sleep(500);
    N.missions.wulingdaoguanBack.checkClick(captureScreen());
    sleep(500);
  },
  gonghui: function () {
    N.missions.gonghui.checkClick(captureScreen());
    sleep(500);
    N.missions.gonghuirenwu.checkClick(captureScreen());
    sleep(500);
    N.missions.gonghuirenwuGo.checkClick(captureScreen());
    sleep(500);
    N.missions.gonghuirenwuContinue.checkClick(captureScreen());
    sleep(500);
    N.missions.gonghuirenwuMenu.checkClick(captureScreen());
    sleep(500);
    N.missions.gonghuirenwuBonus.checkClick(captureScreen());
    sleep(500);
    N.missions.gonghuirenwuBack.checkClick(captureScreen());
    sleep(2500);
    N.missions.gonghuiSign.click();
    sleep(500);
    N.missions.gonghuiGiveTab.checkClick(captureScreen());
    sleep(500);
    N.missions.gonghuiGive.checkClick(captureScreen());
    sleep(500);
    N.missions.gonghuiBack.checkClick(captureScreen());
    sleep(500);
    missions.prepare();
    sleep(500);
  },
  jingyingboss: function (player) {
    var ticket = player.tickets;
    var attack = player.attack;
    N.missions.jingyingboss.checkClick(captureScreen());
    sleep(500);
    var opMinus = 0;
    switch (attack) {
      case 10: {
        opMinus = 0;
        break;
      }
      case 8: {
        opMinus = 2;
        break;
      }
      case 6: {
        opMinus = 4;
        break;
      }
      default: {
        opMinus = 6;
        break;
      }
    }
    for (var cost = 0; cost < ticket; cost++) {
      N.missions.jingyingbossOp(opMinus).checkClick(captureScreen());
      sleep(2500);
      N.missions.jingyingbossHard.checkClick(captureScreen());
      sleep(500);
      N.missions.jingyingbossGo.checkClick(captureScreen());
      sleep(500);
      N.missions.jingyingbossConfirm.checkClick(captureScreen());
      sleep(500);
      N.missions.jingyingbossMenu.checkClick(captureScreen());
      sleep(500);
    }
    N.missions.jingyingbossBack.checkClick(captureScreen());
    sleep(500);
  },
  jinzita: function (player) {
    var level = player.level;
    var tickets = player.tickets;
    N.missions.jinzita.checkClick(captureScreen());

    for (var cost = 0; cost < tickets; cost++) {
      sleep(500);
      if (level < 80) {
        N.missions.jinzitaNormal.checkClick(captureScreen());
        sleep(500);
      } else if (level < 100) {
        N.missions.jinzitaHard.checkClick(captureScreen());
        sleep(500);
      } else if (level < 140) {
        N.missions.jinzitaChaos.checkClick(captureScreen());
        sleep(500);
      } else {
        N.missions.jinzitaHell.checkClick(captureScreen());
        sleep(500);
      }
      N.missions.jinzitaGo.checkClick(captureScreen());
      sleep(500);
      N.missions.jinzitaMenu.checkClick(captureScreen());
      sleep(500);
    }

    N.missions.jinzitaBack.checkClick(captureScreen());
    sleep(500);
  },
  haidao: function () {
    N.missions.haidao.checkClick(captureScreen());
    sleep(500);
    N.missions.haidaoGo.checkClick(captureScreen());
    sleep(500);
    N.missions.haidaoConfirm.checkClick(captureScreen());
    sleep(3500);
    N.missions.haidaoQuit.checkClick(captureScreen());
    sleep(500);
    N.missions.haidaoMenu.checkClick(captureScreen());
    sleep(500);
    N.missions.haidaoBack.checkClick(captureScreen());
    sleep(500);
  },
  minirenwu: function (player) {
    var level = player.level;
    var tickets = player.tickets;
    if (tickets > 4) {
      // 最多4次
      tickets = 4;
    }
    N.missions.minirenwu.checkClick(captureScreen());
    sleep(500);

    var delta = 198;

    // player < 140, 全部都是 0
    // player > 140 0:-1, 1:0, 2:1, 3:2 4:2
    for (var cost = 0; cost < tickets; cost++) {
      N.missions.minirenwu15.checkClick(captureScreen());
      sleep(500);

      var index = cost;
      // index = 0, 当前同级怪物； index = 1，越2级怪物；index = 2，越4级怪物；index = -1，低2级怪物
      if (index === 3) {
        index = -1;
      }
      // 滑动距离选择怪物等级
      var newDelta = 665 - delta * index;
      swipe(155 * 2, 665 * 2, 155 * 2, newDelta * 2, 1000);
      sleep(500);

      N.missions.minirenwuGo.checkClick(captureScreen());
      sleep(500);
      N.missions.minirenwuConfirm.checkClick(captureScreen());
      sleep(500);
      N.missions.minirenwuAuto.checkClick(captureScreen());
      sleep(500);
      N.missions.minirenwuAutoTimeGet.checkClick(captureScreen());
      sleep(500);
      N.missions.minirenwuAutoStart.checkClick(captureScreen());
      sleep(500);
      N.missions.minirenwuExp.checkClick(captureScreen());
      sleep(500);
      N.missions.minirenwuMenu.checkClick(captureScreen());
      sleep(500);
    }

    N.missions.minirenwuBack.checkClick(captureScreen());
    sleep(500);
  },
};

// 领取樱花奖励
var getYinghuaBonus = function () {
  let items = N.huodong.yinghua;
  console.log(items);

  let confirm = N.huodong.confirm;
  for (var index = 0; index < items.length; index++) {
    var element = items[index];
    console.log(element);
    sleep(1000);
    element.click();
    sleep(500);
    confirm.checkClick(captureScreen());
  }
  confirm.checkClick(captureScreen());
};

module.exports = {
  prepare: prepare,
  clearAds: clearAds,
  goMainline: goMainline,
  buyEquipment: buyEquipment,
  missions: missions,
  getYinghuaBonus: getYinghuaBonus,
};
