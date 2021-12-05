const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    let token = req.headers ? req.headers['authorization'] : '';
    jwt.verify(token, config.secret, (err, tok) => {
        if(err) {
            return res.status(401).json({
                message: err.message
            });
        } else if(tok && tok._id) {
            // console.log('auth', req)
            req.user = tok
            // console.log('auth after', req)
            next();
        } else {
            return res.status(401).json({
                message: 'Something went wrong...'
            });
        }
    });
}