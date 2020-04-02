var callbec = require('./callbec');
var player = require('./player');
var catu = require('./catu');
var ifufo = require('./ifufo');
var hotoo = require('./hotooo');
var masrify = require('./masriry');

module.exports = {
  base: player,
  callbec: callbec,
  catu: catu,
  ifufo: ifufo,
  hotooo: hotoo,
  masrify: masrify,
  all: [callbec, catu, ifufo, hotoo, masrify]
};