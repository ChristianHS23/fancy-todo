const jwt = require('jsonwebtoken')
const { User } = require('../models') 

function checkUserLogin(req, res, next) {
    let headers = req.headers.token
    try { 
       var decoded =  jwt.verify(headers, process.env.JWT_SECRET)
        User.findById(decoded._id) 
        .then (user=> {
            req.user = {
                _id: user._id,
                username : user.username,
                email : user.email
            }
            next()
        })
        .catch(err => {
            res.status(400).json({
                msg: 'Invalid User'
            })
        })

    }
    catch(err) {
        res.status(400).json({
            msg: 'Invalid Token'
        })
    }
}



module.exports = {checkUserLogin}