const Sequelize = require('sequelize');

//connect the test database
const sequelize = new Sequelize('users_test', 'ivan', '123456', {
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;