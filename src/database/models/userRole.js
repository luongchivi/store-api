const { DataTypes } = require('sequelize');

const { DB_TABLE_NAMES } = require('../constants');


module.exports = sequelize => (
    sequelize.define(DB_TABLE_NAMES.USER_ROLE, {
        userRoleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        underscored: true,
        timestamps: true,
    })
);