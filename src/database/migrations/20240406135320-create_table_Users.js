'use strict';

const { DataTypes } = require('sequelize');

const { DB_TABLE_NAMES, getTableNameForMigrations } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.createTable(getTableNameForMigrations(DB_TABLE_NAMES.USER), {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        user_role_id: {
          type: DataTypes.STRING,
          references: {
            model: getTableNameForMigrations(DB_TABLE_NAMES.USER_ROLE),
            key: 'id',
          },
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        is_status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true, // when create new user status is true is show active
          allowNull: false,
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

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.dropTable(getTableNameForMigrations(DB_TABLE_NAMES.USER), { transaction: t });
    });
  }
};
