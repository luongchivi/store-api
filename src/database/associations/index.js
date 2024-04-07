const userRolesUsers = require('./userRolesUsers');


module.exports = {
    init: sequelize => ({
        userRolesUsers: userRolesUsers(sequelize),
    }),
};