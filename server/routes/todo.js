var express = require('express');
var router = express.Router();
const {checkUserLogin} = require('../middlewares')
const {TodoController} =require('../controllers')

router.use(checkUserLogin)
router.get('/', TodoController.find)
router.post('/', TodoController.create)
router.put('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router;
