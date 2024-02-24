const express = require("express");
const cors = require("cors");
const router = require('./routes/api/public/api.js');
const logger = require("./utils/logger");
const mount = require('mount-routes')
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk

require('dotenv').config()
const app = express();
app.use(express.urlencoded({extended: false})); 
app.use(express.json());
app.use('/api',router)
app.use(express.json());
app.use(cors());
// app.use(logger);

// 使用swagger API 文档
// const expressSwagger = require('express-swagger-generator')(app)
// const options = require('./utils/swagger') //配置信息
// expressSwagger(options)
// app.use(expressSwagger)

const port = process.env.PORT || 8888;

async function bootstrap() {
  // await initDB();
  app.listen(port, () => {
    console.log(`项目启动成功: ${process.env.DEV_URL}:${process.env.DEV_PORT}`);
    console.log(`接口文档地址: ${process.env.DEV_URL}:${process.env.DEV_PORT}/swagger`);
  });
}
bootstrap();
