var express = require('express');
var router = express.Router();

var { UserModel } = require("./models")

/* 注册接口 */
router.post('/', function (req, res, next) {
  const UserData = {
    username: req.body.username,
    password: req.body.password,
    infoname: req.body.infoname,
    level: 1
  }
  
  UserModel.findOne({ username: UserData.username }, function (err, data) {
    if (data) {
      res.send({ code: 201, data: {}, msg: "该用户已注册" });
    } else {
      UserModel.findOne({ infoname: UserData.infoname }, function (err, data) {
        if (data) {
          res.send({ code: 201, data: {}, msg: "昵称已被占用" });
        } else {
          // 保存到数据库
          UserModel.create(UserData, function (err, data) {
            if (err) throw err;
            res.send({ code: 200, data: {}, msg: "success" });
          })
        }
      })
    }
  })
})

module.exports = router;
