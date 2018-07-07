'use strict';

const path = require('path');

module.exports = {
    secret : process.env.SESSION_SECRET || '9847474jshshy3739bsgsgFnfwuguwghbugewfhwbq474648264',
    jwtSecretKey: process.env.JWT_SECRET || '21822343-1233-ABEE-3133-A9318493EEFD',
    dbUrl: process.env.NODE_ENV === 'test' ? 'postgres://utvdnzdb:hxLot3tUXkVkmG66z7uQlO05f-N1rjun@packy.db.elephantsql.com:5432/utvdnzdb' : 'postgres://ivan:123456@localhost:5432/users' ,
    dialectOptions: {
      native: false,
      ssl: false
    },
};