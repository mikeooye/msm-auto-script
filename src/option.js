var Key = require("./key");

var options = [
  { label: "每日副本", value: Key.daily, sort: 2 },
  { label: "公会", value: Key.guild, sort: 3 },
  { label: "武陵", value: Key.wuling, sort: 5 },
  { label: "海盗", value: Key.pirate, sort: 1 },
  { label: "金字塔", value: Key.pyramid, sort: 0 },
  { label: "精英boss", value: Key.elite, sort: 6 },
  { label: "进化系统", value: Key.evolution, sort: 7 },
  { label: "迷你", value: Key.mini, sort: 4 },
];

var optionsSorted = options.sort(function (e1, e2) {
  return e1.sort > e2.sort;
});

var labels = optionsSorted.map(function (e) {
  return e.label;
});

var indexs = optionsSorted.map(function (e) {
  return e.sort;
});

var indexSelected = dialogs.multiChoice("请选择", labels, indexs);

var matchOptions = [];

indexSelected.forEach((index) => {
  matchOptions.push(optionsSorted[index]);
});

module.exports = {
  getMatchOption: matchOptions,
};
