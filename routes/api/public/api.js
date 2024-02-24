const express = require('express')
const router = express.Router()
const logger = require("../../../utils/logger.js");
const { init: initDB, Counter } = require("../../db/db");
const {wxGetIDKEY,wxLoginNumber,wxGetAppAvator} = require('../../../utils/wxLogin.js');
/**
 * 获取openid 用户唯一标识和session_key 秘钥
 * @route POST /auth
 * @group 用于小程序登录 - miniapp login
 * @param {string} code - uni.login 登录成功后的code 
 * @returns {object} 200 - 请求成功
 */

router.post('/auth', (req, res, next) => {
    // 登录接口
    console.log('/auth...........');
    wxGetIDKEY(req.body.code).then(response => {
        if (response.errcode) {
            res.send({
                code: -1, // -1 表示处理失败
                msg: '请求失败！' // 状态的描述
            })
        } else {
            let data = {...req.body,...response.data}
            res.send({
                code: 0, // 0 表示处理成功
                msg: '请求成功！', // 状态的描述
                data: data, // 需要响应给客户端的数据
            })
        }
    })
})

/**
 * 获取手机号
 * @route POST /auth
 * @group 用于小程序登录 - miniapp login
 * @param {string} code - uni.login 登录成功后的code 
 * @returns {object} 200 - 请求成功
 */

router.post('/auth2', (req, res, next) => {
    // 登录接口
    console.log('/auth2...........');
    wxLoginNumber(req.body.code).then(response => {
        if (response == -1) {
            res.send({
                code: -1, // -1 表示处理失败
                msg: '请求失败！' // 状态的描述
            })
        } else {
            res.send({
                code: 0, // 0 表示处理成功
                msg: '请求成功！', // 状态的描述
                data: response, // 需要响应给客户端的数据
            })
        }
    })
})

/**
 * 获取小程序头像
 * @route POST /auth
 * @group 用于小程序登录弹框展示 - miniapp login
 * @returns {object} 200 - 请求成功
 */

router.post('/appAvator', (req, res, next) => {
    console.log('/appAvator...........');
    wxGetAppAvator().then(response => {
        if (response == -1) {
            res.send({
                code: -1, // -1 表示处理失败
                msg: '请求失败！' // 状态的描述
            })
        } else {
            res.send({
                code: 0, // 0 表示处理成功
                msg: '请求成功！', // 状态的描述
                data: response, // 需要响应给客户端的数据
            })
        }
    })
})
module.exports = router;