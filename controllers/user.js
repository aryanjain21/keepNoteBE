const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { decrypt } = require('../utils/encDecr');

module.exports = {
    signup: async (req, res) => {
        try {
            let userEmail = await User.findOne({email: req.body.email})
            if(userEmail) {
                throw {message: 'User already exist.'}
            }
            const user = new User(req.body);
            let newUser = await user.save();
            let payload = {
                _id: newUser._id,
                email: newUser.email 
            }
            let token = jwt.sign(payload, config.secret, {
                expiresIn: 24*60*60*2
            });
            newUser = newUser.toJSON();
            newUser.token = token;
            delete newUser.password;
            return res.json({
                status: 200,
                message: 'User created successfully',
                data: newUser
            });
        } catch (error) {
            return res.status(400).json({
                message: (error && error.message) || 'Oops!! failed to create user'
            });
        }
    },

    login: async (req, res) => {
        try {
            // console.log('login', req.body);
            let user = await User.findOne({email: req.body.email})
            if(!user) {
                throw {message: 'User does not exist'}
            }
            let checkPassword = decrypt(req.body.password, user.password);
            if(!checkPassword) {
                throw {message: 'Email/Password is incorrect'}
            }
            let payload = {
                _id: user._id,
                email: user.email 
            }
            let token = jwt.sign(payload, config.secret, {
                expiresIn: 24*60*60*2
            });
            user = user.toJSON();
            user.token = token;
            delete user.password;
            return res.json({
                status: 200,
                message: 'Login successful!',
                data: user
            })
        } catch (error) {
            return res.status(401).json({
                message: (error && error.message) || 'Oops!! failed to login'
            })
        }
    }
}