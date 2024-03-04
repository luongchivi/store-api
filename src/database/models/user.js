const { DataTypes } = require('sequelize');

const { DB_TABLE_NAMES } = require('../constants');

const { userTypeEnum } = require('../../routes/user/schema');


module.exports = sequelize => (
    sequelize.define(DB_TABLE_NAMES.USER, {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userType: {
            type: DataTypes.ENUM(...Object.values(userTypeEnum)),
            allowNull: true,
        },
    }, {
        underscored: true,
        timestamps: true,
    })
);