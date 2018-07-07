'use strict';

const bcrypt = require('bcryptjs');
const validate = require('validator');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
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

    return User;
};