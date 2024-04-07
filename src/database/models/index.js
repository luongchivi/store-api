const user = require('./user');
const userRole = require('./userRole')


module.exports = {
  init: sequelize => ({
    user: user(sequelize),
    userRole: userRole(sequelize),
  }),
};
