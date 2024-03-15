module.exports = (sequelize, Sequelize) => {
    return sequelize.define("losts", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        userid: {
            type: Sequelize.UUID,
            notNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        desc: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        img: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '发送时间'
        },
        area: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '地点'
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '手机号'
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        }
    });
};