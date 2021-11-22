var mongoose = require("mongoose")

const UserModel = mongoose.model("users", new mongoose.Schema({
  username: String,
  password: String,
  infoname: String,
  level: Number,
}))

const RoleModel = mongoose.model("roles", new mongoose.Schema({
  role_type: Number,
  role_name: String,
  menu: [String]
}))

const MenuModel = mongoose.model("menus", new mongoose.Schema({
  title: String,
  pagepermisson: Number,
  menu_id: Number,
  menu_key: String
}))

const MenuChildrenModel = mongoose.model("menu_childrens", new mongoose.Schema({
  title: String,
  menu_key: String,
  pagepermisson: Number,
  parent_id: Number
}))

module.exports = {
  UserModel,
  RoleModel,
  MenuModel,
  MenuChildrenModel
}