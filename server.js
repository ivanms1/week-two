const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const user = require('./routes/user');
const port = process.env.PORT || 3000;
const app = express();

if(process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(passport.initialize());

require('./passport/passport')(passport);

app.use('/user', user);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

module.exports = app;
