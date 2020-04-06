var Player = function (name, level, hasClub, masterPoint) {
  this.name = name;
  this.level = level;
  this.hasClub = hasClub;
  this.masterPoint = masterPoint;
};

module.exports = {
  calbeec: new Player("calbeec", 145, true, { x: 1860, y: 400 }),
  marair: new Player("Marair", 130, true),
  ifufo: new Player("ifufo", 172, true, { x: 2380, y: 380 }),
  ocma: new Player("Ocma", 81, true),
  all: function() {
    return [this.calbeec, this.marair, this.ifufo, this.ocma];
  }
};
