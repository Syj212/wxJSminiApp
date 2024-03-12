const db = require("../models");
const users = db.users;

exports.login = function (pm, cb) {
    // 判断用户状态
    users.findOne({
        where: {
            openid: pm.openid
        }
    }).then(user => {
        // 处理查询结果，可以调用回调函数
        // 判断用户是否存在
        if (!user) {
            // 用户不存在，则创建新用户
            users.create({
                openid: pm.openid,
                nickName: pm.nickName,
                avatarUrl: pm.avatarUrl,
                roleId: 'student'
            }).then(newUser => {
                cb(newUser, null);
            }).catch(errMsg => {
                cb(null,errMsg ); // 传递结果给回调函数
            })
        }else{
            // 用户存在，则更新用户信息
            user.update({
                nickName: pm.nickName,
                avatarUrl: pm.avatarUrl
            }).then(newUser => {
                cb(user, null); // 传递结果给回调函数
            }).catch(errMsg => {
                cb(null, errMsg ); // 传递错误给回调函数
            })
        }
    }).catch(error => {
        // 处理查询过程中的错误
        cb(null,error ); // 传递错误给回调函数
    });
};
