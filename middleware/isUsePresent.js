const User = require('../models/user');

//TODO: Not completed
module.exports = (req, res, next) => {
    console.log('oops!!!!', req, req.user)
    if(!req.user && !req.user._id){
        return res.status(401).json({
            message :'Invalid user...'
        })
    }

    try {
        if(User.findById(req.user._id)) {  
            next();
        } else {
            return res.status(400).json({
                message: 'User dose not exist'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message :'Server error...'
        });
    }
}