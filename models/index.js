const fs = require("fs");
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const {Op} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    timezone: '+08:00', //东八时区
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {}

db.Sequelize = Sequelize;//引入
db.sequelize = sequelize;//实例
db.Op = Op; //操作符

//用户
db.users = require("./users.model.js")(sequelize, Sequelize);

//各个表的应用关系

module.exports = db;