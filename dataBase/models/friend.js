module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            foreignKey: true
        },
        friend_id: {
            type: DataTypes.STRING,
            foreignKey: true
        }
    }, {
        tableName: 'friend',
        timestamps: false
    });

    const User = sequelize.import('./user.js');


    Friend.belongsTo(User, {foreignKey: 'user_id'});
    Friend.belongsTo(User, {foreignKey: 'friend_id'});

    return Friend

};
