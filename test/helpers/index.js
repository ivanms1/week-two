'use strict';

const chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../../server.js');
const db = require('../../schema/');
const DatabaseCleaner = require('database-cleaner');
const dbCleaner = new DatabaseCleaner("postgresql", { postgresql: { strategy: 'truncation', skipTables: ["SequelizeMeta"] } });
const config = require('../../config');
const expect = require('expect');
const pg = require('pg');
let cleanUpDb;

before( done => {
      db.user.create({
          email: 'test@test.com',
          password: '123456'
      });
      done()
 });

 after( done => {
    db.user.destroy({
        where: {},
        truncate: true
     });

    done();
 })

// afterEach(function (done) {
//     db.sequelize.User.destroy({
//         where: {},
//         truncate: true
//     });
//     then(() => done());
// });


// let pool = new pg.Pool(config.dbUrl);

// exports.cleanUpDb = cleanUpDb = function(callback) {
//   pool.connect(function(err, client, done) {
//     if(err) return done(err);
//     dbCleaner.clean(client, function() {
//         callback();
//         done();
//     });
//   });
// };

// exports.signup = (user, callback) => {
//     chaiHttp(app)
//         .post('/api/user/signup')
//         .send({
//             email: user.email,
//             password: user.password,
//         })
//         .end((err, res) => {
//             if (err) return callback(err, null);
//             return callback(null, res.body);
//         });
// };