/*eslint no-console: "error"*/
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const lodash = require('lodash');
const config = require('../config');

const sequelize = new Sequelize(config.dbUrl, {
    logging: false,
    dialect: 'postgres'
});

let db = {};
sequelize.authenticate().then(() => {
    console.log('Database (Postgresql) connection established!');
}, (err) => {
    console.log('Database (Postgresql) connection error', err);
});

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize,
    Sequelize
}, db);