var rate = 2;

module.exports = {
  click: function (x, y) {
    sleep(300);
    click(x * rate, y * rate);
    sleep(500);
  },
  swipe: function (startX, startY, endX, endY, duration) {
    sleep(300);
    swipe(startX * rate, startY * rate, endX * rate, endY * rate, duration);
    sleep(500);
  },
};