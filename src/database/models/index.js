const user = require('./user');


module.exports = {
  init: sequelize => ({
    user: user(sequelize),
  }),
};
