'use strict';

const db = require('../../schema/');

before(done => {
    db.user.destroy({
        where: {},
        truncate: true
     })
     .then(() => {
        db.user.create({
            email: 'test@test.com',
            password: '123456'
        })
        done()
     });
 });