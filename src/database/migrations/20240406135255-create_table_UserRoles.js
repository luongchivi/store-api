'use strict';

const { DataTypes } = require('sequelize');

const { DB_TABLE_NAMES, getTableNameForMigrations } = require('../constants');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.createTable(getTableNameForMigrations(DB_TABLE_NAMES.USER_ROLE), {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        user_role_name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      }, { transaction: t });
    });
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.dropTable(getTableNameForMigrations(DB_TABLE_NAMES.USER_ROLE), { transaction: t });
    });
  }
};
