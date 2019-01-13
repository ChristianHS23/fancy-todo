var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const {AuthorizationController} = require('../controllers')
const todoRouter = require('./todo')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', AuthorizationController.register)
router.post('/login', AuthorizationController.login)
router.post('/signin/google',AuthorizationController.signInGoogle)
router.use('/todo', todoRouter)
router.use('/user', userRouter);


module.exports = router;
