
/**
 * 玩家
 * name: 名字
 * role: 角色
 * level: 级别
 * attack: 战斗力
 * hasClub: 是否有公会
 */
var Player = function(name, role, level, attack, hasClub) {
  this.name = name;
  this.role = role;
  this.level = level;
  this.attack = attack;
  this.hasClub = hasClub;
};

module.exports = Player;