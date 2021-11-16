var express = require('express');
var router = express.Router();

var { MenuModel } = require("./models")

router.get('/', function(req,res) {
  MenuModel.aggregate([
    {
      $lookup: {
        from: "menu_childrens",
        localField: "menu_id",
        foreignField: "parent_id",
        as: 'childrens'
      }
    }
  ],(err,docs)=>{
    if (err) throw err;
    res.send({code: 200, data: docs, msg: "ok"})
  })
});

module.exports = router;
