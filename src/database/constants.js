const inflection = require('inflection');


const DB_TABLE_NAMES = Object.freeze({
    USER_ROLE: 'UserRole',
    USER: 'User',
});

function getTableNameForMigrations(tableName) {
    return inflection.underscore(inflection.pluralize(tableName));
}

module.exports = {
    DB_TABLE_NAMES,
    getTableNameForMigrations,
};
