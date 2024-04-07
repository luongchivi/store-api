module.exports = sequelize => {
    const { UserRole, User } = sequelize.models;

    const associationOptions = {
        targetKey: 'id',
        foreignKey: 'userRoleId',
        as: 'userRoles',
    };

    User.belongsTo(UserRole, associationOptions);
    UserRole.hasMany(User, associationOptions);
};
