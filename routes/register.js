var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var { UserModel } = require("./models")

/* 注册接口 */
router.post('/', function (req, res) {
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
          UserModel.create({username: UserData.username,password: crypto.createHash('SHA256').update(UserData.password).digest('hex'),infoname: UserData.infoname,level: UserData.level}, function (err, data) {
            if (err) throw err;
            res.send({ code: 200, data: {}, msg: "success" });
          })
        }
      })
    }
  })
})

module.exports = router;
