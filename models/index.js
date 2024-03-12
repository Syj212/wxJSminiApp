const fs = require("fs");
const Sequelize = require("sequelize");
const {Op} = require("sequelize");
require('dotenv').config()
// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql"
});

const db = {}

db.Sequelize = Sequelize;//引入
db.sequelize = sequelize;//实例
db.Op = Op; //操作符

//用户
db.users = require("./users.model.js")(sequelize, Sequelize);
db.sends = require("./sends.model")(sequelize, Sequelize);
// const createTableSQL = db.users.sync({ force: false }).toString();
// const createTableSQL = db.sends.sync({ force: false }).toString();
// console.log(createTableSQL,'----');
//各个表的应用关系
module.exports = db;