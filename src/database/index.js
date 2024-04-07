/**
 * Sequelize database interface
 * NOTE: The setup for models and associations is intended as a guideline and an
 *   example of structure to use. The two models are intended as examples only
 *   and should be removed when using this boilerplate to implement an actual
 *   product. The actual structure for the models and associations can also be
 *   changed as needed.
 *
 * Not covered by the boilerplate:
 *  - Migrations
 *  - Initial setup (currently, app.js sets sync = true, for actual production use
 *    updating the schema beyond the initial version should be done with migrations)
 */

const { Sequelize } = require('sequelize');

const Models = require('./models');
const Associations = require('./associations');


module.exports = {
    init: async (configuration, sync= false) => {
        const {
            dbHost,
            dbPort,
            dbName,
            dbUser,
            dbPass,
        } = configuration;

        const baseConfig = {
            host: dbHost,
            port: dbPort,
            dialect: 'postgres',
            logging: null,
            pool: {
                max: 50,
                idle: 30000,
                acquire: 120000,
            },
        };

        // if (logger) {
        //     baseConfig.logging = query => {
        //         logger.debug({ component: 'Database' }, query);
        //     };
        // }

        const sequelize = new Sequelize(dbName, dbUser, dbPass, baseConfig);

        Models.init(sequelize);
        Associations.init(sequelize);

        if (sync) {
            await sequelize.sync();
        }

        return sequelize;
    },
};
