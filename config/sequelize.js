const { getConfiguration } = require('../src/lib/common');

module.exports = async () => {
    const configuration = await getConfiguration();
    const {
        dbHost,
        dbPort,
        dbName,
        dbUser,
        dbPass,
    } = configuration;

    const dbConfig = {
        username: dbUser || 'postgres',
        password: dbPass || '060399',
        database: dbName || 'store_api',
        host: dbHost || '127.0.0.1',
        port: dbPort || 5432,
        dialect: 'postgres',
    };

    return {
        development: {
            seederStorage: 'sequelize',
            ...dbConfig,
        },
        test: {
            ...dbConfig,
        },
        production: {
            seederStorage: 'sequelize',
            ...dbConfig,
        },
    };
};
