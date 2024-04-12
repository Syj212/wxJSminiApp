const db = require("../models");
const Sequelize = require("sequelize");
const losts = db.losts;
const users = db.users;
const comments = db.comments;

exports.postComment = function (pm, cb) {
    users.findOne({
        where: {
            openid: pm.openid
        }
    }).then(user => {
        // 处理查询结果，可以调用回调函数
        // 判断用户是否存在
        if (!user) {
            cb(null, '用户校验失败！'); // 传递结果给回调函数
        } else {
            comments.create({// 创建评论
                userid: user.id,
                content: pm.content,
                level: pm.level,
                lostid: pm.lostid,
                parentid: pm.parentid,
                obj_user_id: pm.obj_user_id,
                obj_user_nickName: pm.obj_user_nickName
            }).then(data => {
                cb(data, null);
            }).catch(err => {
                console.log(err);
                cb(null, err);
            });
        }
    }).catch(error => {
        // 处理查询过程中的错误
        cb(null, error); // 传递错误给回调函数
    });
    console.log(pm);
};
exports.getCommentList = function (pm, cb) {
    let whereParams = {
        lostid: pm.lostid,
        level: pm.level
    };
    if (pm.level == '2') whereParams.parentid = pm.parentid;
    comments.count({
        where: whereParams
    }).then(totalCount => {
        comments.findAll({
            where: whereParams,
            include: [{
                model: users
            }],
        }).then(data => {
            // 数据已经是联表查询结果，无需再单独查询用户信息
            cb({ data, totalCount }, null);
        }).catch(err => {
            console.log(err);
            cb(null, err);
        });
    }).catch(err => {
        // 如果获取总记录数发生错误，返回错误
        cb(err, null);
    });
};

