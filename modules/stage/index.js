var daymisson = require('./daymisson.js');
var evalution = require('./evalution.js');
var kongfu = require('./kongfu.js');
var master = require('./master.js');
var minimap = require('./minimap');

module.exports = {
  daymisson: daymisson,
  evalution: evalution,
  kongfu: kongfu,
  master: master,
  minimap: minimap,
  all: [daymisson, evalution, master, kongfu, minimap]
};