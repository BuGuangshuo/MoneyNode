var express = require('express');
var router = express.Router();

var { UserModel } = require("./models")

router.get('/', function(req, res, next) {
  const username = req.query.user
  UserModel.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "level",
        foreignField: "role_type",
        as: 'roles'
      }
    },{ $match: { username } }
  ],(err,docs)=>{
    if (err) throw err;
    res.send({code: 200, data: docs[0].roles[0], msg: "ok"})
  })
});

module.exports = router;
