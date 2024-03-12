const express = require('express')
const router = express.Router()
const logger = require("../../../utils/logger.js");
const { wxGetIDKEY, wxLoginNumber, wxGetAppAvator } = require('../../../utils/wxLogin.js');
/**
 * 获取openid 用户唯一标识和session_key 秘钥
 * @route POST /auth
 * @group 获取openid-用于小程序登录
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
                msg: '请求失败！', // 状态的描述
                data: response.errcode
            })
        } else {
            let data = { ...req.body, ...response.data }
            res.send({
                code: 0, // 0 表示处理成功
                msg: '请求成功！', // 状态的描述
                data: data, // 需要响应给客户端的数据
            })
        }
    })
})

/**
 * 获取手机号-用于小程序登录 - miniapp login
 * @route POST /auth2
 * @group 获取手机号-用于小程序登录
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
                msg: '请求失败！', // 状态的描述
                data: response
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
 * 获取小程序头像-用于小程序登录弹框展示 - miniapp login
 * @route POST /appAvator
 * @group 获取小程序头像-用于小程序登录弹框展示
 * @returns {object} 200 - 请求成功
 */

router.post('/appAvator', (req, res, next) => {
    wxGetAppAvator().then(response => {
        if (response == -1) {
            res.send({
                code: -1, // -1 表示处理失败
                msg: '请求失败！', // 状态的描述
                data: response
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

const Login = require("../../../controllers/login.controller.js");
/**
 * 登录
 * @route POST /login
 * @group 登录
 * @param {string} nickName - 昵称
 * @param {string} avatarUrl - 头像路径
 * @returns {object} 200 - 请求成功
 */

router.post('/login', (req, res, next) => {
    // 登录接口
    wxGetIDKEY(req.body.code).then(response => {
        if (response.errcode) {
            res.send({
                code: -1, // -1 表示处理失败
                msg: '请求失败！', // 状态的描述
                data: response.errcode
            })
        } else {
            let reqBody = { ...req.body, ...response.data }
            Login.login(reqBody, (data, err) => {
                if (err) {
                    res.send({
                        code: -1, // -1 表示处理失败
                        msg: '请求失败！', // 状态的描述
                        data: err
                    })
                } else {
                    let datas = {
                        openid: data.dataValues.openid,
                        nickName: data.dataValues.nickName,
                        avatarUrl: data.dataValues.avatarUrl,
                        roleId: data.dataValues.roleId
                    }
                    res.send({
                        code: 0, // 0 表示处理成功
                        msg: '请求成功！', // 状态的描述
                        data: datas, // 需要响应给客户端的数据
                    })
                }
            })
        }
    })
})

// /**
//  * 上传图片
//  * @route POST /login
//  * @group 上传图片
//  * @param {string} image - 图片
//  * @returns {object} 200 - 请求成功
//  */
// const multer = require('multer');
// const aws = require('aws-sdk');
// // 配置AWS
// aws.config.update({
//     secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
//     accessKeyId: 'YOUR_ACCESS_KEY_ID',
//     region: 'ap-shanghai' // 例如：'us-west-2'
// });
// // 创建S3服务
// const s3 = new aws.S3();
// // 使用Multer来处理文件上传
// const upload = multer({
//     storage: multer.memoryStorage(), // 使用内存存储（也可以自定义存储）
//     limits: {
//         fileSize: 1024 * 1024 * 10 // 限制文件大小为5MB
//     },
//     fileFilter: (req, file, cb) => {
//         // 限制文件类型为图片
//         const filetypes = /jpeg|jpg|png|gif/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb('上传失败！仅支持后缀为' + filetypes + '文件类型。');
//     }
// });
// // 路由处理文件上传
// router.post('/upLoadImg', upload.single('image'), async (req, res) => {
//     if (!req.file) {
//         res.send({
//             code: -1, // 0 表示处理成功
//             msg: '文件上传失败！' // 状态的描述
//         })
//     } else {
//         // 创建S3上传参数
//         const params = {
//             Bucket: '7072-prod-4gft37lza23ce0f9-1314508936', // 你的S3存储桶名称
//             Key: req.file.originalname, // S3中的文件名，你也可以自定义文件名
//             Body: req.file.buffer, // Multer内存存储的文件内容
//             ContentType: req.file.mimetype // 文件的MIME类型
//         };
//         // 上传文件到S3
//         try {
//             const result = await s3.upload(params).promise();
//             console.log('File uploaded successfully:', result.Location);
//             res.send({
//                 code: 0, // 0 表示处理成功
//                 msg: '文件上传成功！', // 状态的描述
//                 data: { fileUrl: result.Location }
//             })
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             res.send({
//                 code: 0, // 0 表示处理成功
//                 msg: '文件上传失败!' // 状态的描述
//             })
//         }
//     }
// });
/**
 * 发布失物招领
 * @route POST /sendPublish
 * @group 全局按钮发布失物招领
 * @param {string} openid - 用户openid
 * @param {string} names - 物品名称
 * @param {string} times - 时间
 * @param {string} location - 地点
 * @param {string} phone - 手机号
 * @param {string} content - 描述
 * @param {string} imageUrls - 图片（逗号分隔）
 * @returns {object} 200 - 请求成功
 */
const Send = require("../../../controllers/send.controller.js");
router.post('/sendPublish', (req, res, next) => {
    //将数据插入数据库
    Send.send(req.body.data, (response, err) => {
        if (err) {
            res.send({
                code: -1, // -1 表示处理失败
                msg: '请求失败！', // 状态的描述
                data: err
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
 * 获取失物招领列表
 * @route POST /sendPublish
 * @group 首页-获取失物招领列表
 * @param {string} pageSize - 每页数量
 * @param {string} pageNum - 当前页
 * @returns {object} 200 - 请求成功
 */
router.post('/getFeedList', (req, res, next) => {
    // 查询数据库
    console.log(req.body);
    Send.getFeedList(req.body, (response, err) => {
        if (err) {
            res.send({
                code: -1, // -1 表示处理失败
                msg: '请求失败！', // 状态的描述
                data: err
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