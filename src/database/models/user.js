const { DataTypes } = require('sequelize');

const { DB_TABLE_NAMES } = require('../constants');


module.exports = sequelize => (
    sequelize.define(DB_TABLE_NAMES.USER, {
        userRoleId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    }, {
        underscored: true,
        timestamps: true,
    })
);