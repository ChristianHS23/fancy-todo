var express = require('express');
var router = express.Router();
const {checkUserLogin} = require('../middlewares')

router.use(checkUserLogin)
router.get('/')

module.exports = router;
