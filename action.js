var prepare = function () {
  auto();
  if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
  }
  sleep(2000);
};

module.exports = {
  prepare: prepare,
};
