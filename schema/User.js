const sequelize = require('../db/postgres');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING
 });

 User.beforeCreate((user, options) => {
    const salt = bcrypt.genSalt(10);
    user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
 });

 module.exports = User;