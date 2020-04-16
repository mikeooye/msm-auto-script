var getLevel = function () {
    var level = dialogs.select("角色登记", [
      "<60",
      "<80",
      "<100",
      "<120",
      "<140",
      ">=140",
    ]);
  
    switch (level) {
      case 0:
        level = 59;
        break;
      case 1:
        level = 79;
        break;
      case 2:
        level = 99;
        break;
      case 3:
        level = 119;
        break;
      case 4:
        level = 139;
        break;
      default:
        level = 220;
        break;
    }
    return level;
  };
  
  var getAttack = function () {
    var attack = dialogs.select("攻击强度", ["很弱", "中等", "较强", "很强"]);
    switch (attack) {
      case 0: {
        attack = 2;
        break;
      }
      case 1: {
        attack = 5;
        break;
      }
      case 2: {
        attack = 8;
        break;
      }
      default: {
        attack = 10;
        break;
      }
    }
    return attack;
  };

  module.exports = {
      getLevel: getLevel,
      getAttack: getAttack
  };