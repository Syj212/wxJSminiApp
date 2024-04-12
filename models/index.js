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
db.losts = require("./losts.model.js")(sequelize, Sequelize);
db.comments = require("./comments.model.js")(sequelize, Sequelize);

//关联表
db.comments.belongsTo(db.users, {  
  foreignKey: 'userid', // 确保外键名称与模型定义中的一致  
  targetKey: 'id', // 这是关联的目标模型的主键字段名，通常可以省略  
});
db.losts.belongsTo(db.users, {  
  foreignKey: 'userid', // 确保外键名称与模型定义中的一致  
  targetKey: 'id', // 这是关联的目标模型的主键字段名，通常可以省略  
});
// const createTableSQL = db.users.sync({ force: false }).toString();
// const createTableSQL = db.losts.sync({ force: false }).toString();
// const createTableSQL = db.comments.sync({ force: false }).toString();
// console.log(createTableSQL,'----');
//各个表的应用关系
module.exports = db;