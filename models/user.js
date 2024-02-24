module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
        nickName: {
            type: Sequelize.STRING,
            defaultValue: "John Doe",
            comment: '昵称',
        },
        avatarUrl:{
            type: Sequelize.STRING,
            notEmpty: true,
            comment: '头像路径',
        }
    });
};