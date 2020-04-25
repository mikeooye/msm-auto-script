var Action = require("../target/action");

/**
 * 玩家
 *
 * @param {*} name 名字
 * @param {*} role 角色
 * @param {*} level 级别
 * @param {*} attack 战斗力
 * @param {*} hasGuild 是否有公会
 */
var Player = function (name, role, level, attack, hasGuild) {
  /**
   * 姓名
   */

  this.name = name;
  /** 角色 */
  this.role = role;
  /** 级别 */
  this.level = level;
  /**
   * 攻击力
   */
  this.attack = attack;
  /**
   * 是否有公会
   */
  this.hasGuild = hasGuild;

  this.walkLeft = function (duration) {
    Action.swipe(147, 625, 75, 625, duration);
  };

  this.walkRight = function (duration) {
    Action.swipe(147, 625, 219, 625, duration);
  };
};

module.exports = Player;
