const Sequelize = require('sequelize');


const sequelize = new Sequelize('users', 'ivan', '123456', {
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