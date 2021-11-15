var express = require('express');
var router = express.Router();

var mongoose = require("mongoose")

var UserModel = mongoose.model("users")

/* GET users listing. */
router.post('/', function (req, res, next) {
  const UserData = {
    username: req.body.username,
    password: req.body.password,
    infoname: req.body.infoname,
    level: 1
  }

  UserModel.findOne({
    username: UserData.username,
    password: UserData.password
  }, function (err, data) {
    console.log(data)
    if (err) throw err
    if (data) {
      res.send({ code: 200, data: { infoname: data.infoname, level: data.level }, msg: "登录成功" });
    } else {
      res.send({ code: 201, data: {}, msg: "账号或密码错误" });
    }
  })
});

module.exports = router;
