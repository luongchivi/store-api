'use strict';

const { DB_TABLE_NAMES, getTableNameForMigrations } = require('../src/database/constants');
const { v4: uuidv4 } = require('uuid');


module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.transaction(async t => {
            await queryInterface.bulkInsert(getTableNameForMigrations(DB_TABLE_NAMES.USER_ROLE), [
                {
                    id: uuidv4(),
                    user_role_name: 'Admin',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    user_role_name: 'User',
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            ], { transaction: t });
        });
    },

    async down(queryInterface) {
        return queryInterface.sequelize.transaction(async t => {
            await queryInterface.bulkDelete(getTableNameForMigrations(DB_TABLE_NAMES.USER_ROLE), null, { transaction: t });
        });
    },
};