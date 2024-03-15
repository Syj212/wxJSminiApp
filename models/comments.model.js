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
        type: {
            type: Sequelize.ENUM('lost', 'find', 'post'),
            allowNull: false,
        },
        lostid: {
            type: Sequelize.UUID,
            notNull: false,
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
        content: {
            type: Sequelize.STRING(1024),
            allowNull: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
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