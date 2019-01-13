const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {OAuth2Client} =require('google-auth-library')
const {checkHash} = require('../helpers')

let clientId = '817985586817-drg8a084t1bqid2our0gdl2mp4hqf3lr.apps.googleusercontent.com'
const client = new OAuth2Client(clientId)

class AuthorizationController {

    static register(req, res) { 
        let {username, email, password} = req.body
        User.create({username, email, password})
            .then(user => {
                // let {_id, email} = user
                // let token = jwt.sign({_id, email}, process.env.JWT_SECRET)
                // res.status(201).json(user)
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg : 'Internal Server Error'
                })
            })
    }

    static login(req, res) {
        let {email, password} = req.body
        User.findOne({email})
            .then(user => {
                let {_id, email} = user
                if(checkHash(password, user.password)) {
                    let token = jwt.sign({_id, email}, process.env.JWT_SECRET)
                    // res.status(201).json(user)
                    res.status(200).json(token)
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg : 'Internal Server Error'
                })
            })
    }

    static signInGoogle(req, res) {
        let tempName ,tempEmail = ''
        let {id_token} = req.body

        client.verifyIdToken({
            idToken: id_token,
            audience: clientId
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                console.log(payload);
                const {email, name} = payload
                tempName = name
                tempEmail = email
                return User.findOne({email})
            })
            .then(user => {
                if(user) {
                    let {_id, email} = user
                    let token = jwt.sign({_id, email}, process.env.JWT_SECRET)
                    console.log("Masuk Sudah terdaftar");
                    res.json(token)
                } else {
                    User.create({email: tempEmail, username: tempName})
                    .then(response => {
                        let {_id, email} = response
                        let token = jwt.sign({_id, email}, process.env.JWT_SECRET)
                        console.log("Masuk Daftar Dulu");
                        res.status(201).json(token)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            msg : 'Internal Server Error'
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg : 'Internal Server Error'
                })
            })
    }
}

module.exports = AuthorizationController