module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 使用 Sequelize.literal 来包含 UUID() 函数
        },
        nickName: {
            type: Sequelize.STRING,
            notEmpty: true,
            comment: '昵称'
        },
        avatarUrl: {
            type: Sequelize.STRING,
            notEmpty: true,
            comment: '头像路径'
        },
        roleId: {
            type: Sequelize.STRING,
            notEmpty: true,
            comment: '角色名称'
        },
        state: {
            type: Sequelize.ENUM('0', '1', '2', '3'),
            defaultValue: '0',
            comment: '状态'
        },
        openid: {
            type: Sequelize.STRING,
            unique: true,
            notNull: true,
            comment: '微信用户唯一标识'
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
            comment: '创建时间'
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
            comment: '更新时间'
        }
    });
};