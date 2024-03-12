const db = require("../models");
const Sequelize = require("sequelize");
const sends = db.sends;
const users = db.users;

exports.send = function (pm, cb) {
    console.log(pm);
    // 根据openid查询用户信息
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
            // 用户存在，则发布一条消息
            sends.create({
                userid: user.id,
                desc: pm.desc,
                img: pm.img,
                name: pm.name,
                time: pm.time,
                area: pm.area,
                phone: pm.phone
            }).then(data => {
                cb(data, null);
            }).catch(err => {
                console.log(err);
                cb(null, err);
            })
        }
    }).catch(error => {
        // 处理查询过程中的错误
        cb(null, error); // 传递错误给回调函数
    });

};
exports.getFeedList = function (pm, cb) {
    sends.count().then(totalCount => {
        totalCount = totalCount - 1;
        // 从第pageNum条开始查询pageSize条数据
        console.log(pm);
        sends.findAll({
            offset: pm.pageNum - 1,
            limit: pm.pageSize,// 添加limit来限制返回的数据条数
            order: [['createdAt', 'ASC']]
        }).then(data => {
            cb({ data, totalCount }, null);
        }).catch(err => {
            console.log(err);
            cb(null, err);
        });
    }).catch(err => {
        // 如果获取总记录数发生错误，返回错误
        console.log(err);
        cb(err, null);
    });
};
