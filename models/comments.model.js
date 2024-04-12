module.exports = (sequelize, Sequelize) => {
    return sequelize.define("comments", {
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
        types: {
            type: Sequelize.ENUM('1', '2'),
            allowNull: true,
        },
        level: {
            type: Sequelize.ENUM('1', '2'),
            allowNull: false,
        },
        lostid: {
            type: Sequelize.UUID,
            notNull: true,
            references: {
                model: 'losts',
                key: 'id'
            }
        },
        parentid: {
            type: Sequelize.UUID,
            notNull: false,
            references: {
                model: 'comments',
                key: 'id'
            }
        },
        obj_user_id: {
            type: Sequelize.UUID,
            notNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        obj_user_nickName: {
            type: Sequelize.UUID,
            notNull: false
        },
        content: {
            type: Sequelize.STRING(1024),
            allowNull: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
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