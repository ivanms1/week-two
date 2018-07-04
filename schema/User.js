const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const validate = require('validator')
// Set the database according the to the ENV
const sequelize = process.env.NODE_ENV === 'test' ?
                require('../test/test-db') :
                require('../db/postgres');

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Email not valid'
            },
            
        },
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [6,40],
                msg: "Password is too short or too long"
            }
        }
    }
 });

 User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, salt) : "";
 });

 sequelize.sync()
.then(() => console.log('Connected to the database'));

 module.exports = User;