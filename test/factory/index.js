'use strict';

const f = require('factory-girl');
const factory = f.factory;
const adapter = new f.SequelizeAdapter();
const models = require('../../schema');

factory.setAdapter(adapter);
// User Factory
factory.define('User', models.user, {
    email: factory.chance('email'),
    password: '123456'
}, {

    });

    module.exports = factory