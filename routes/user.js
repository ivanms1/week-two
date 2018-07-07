const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../schema').user;

router.get('/all', (req, res) => {
    User.findAll()
    .then(users => res.json(users));
})

router.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password
    }

    User.find({
        where: {
            email: newUser.email
        }
    })
    .then(user => {
        if(!user) {
            User.create(newUser)
            .then(user => {
                let payload = {
                    email: user.email
                };
                let token = jwt.sign(payload, 'secretKey', { expiresIn: '1h'});
                return res.json({ session: token })
            })
            .catch(err => {
                res.status(400).json({ message: err.message });
            })
        }
        else{
            return res.status(400).json({msg: 'User already exists.'})
        }
    })
    .catch(err => res.status(400).json(err));
});

router.post('/login', (req, res) => {
    const logUser = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({
        where:{
            email: logUser.email
        }
    })
    .then(user => {
        if(!user) return res.status(404).json({msg: 'User does not exist.'});

        bcrypt.compare(logUser.password, user.password)
        .then(isMatch => {
            if(isMatch){
                let payload = {
                    email: user.email
                };
                let token = jwt.sign(payload, 'secretKey', { expiresIn: '1h'});
                return res.json({ session: token });
            }
            else {
                return res.status(400).json({msg: 'Invalid Password'})
            }
        })
        .catch(err => res.status(401));
    })
});

// Protected route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ msg: `You are authenticated ${req.user.email}`})
})

module.exports = router;


