var express = require('express');
var router = express.Router();

//js파일 할당
var view = require("./view");
// var transfer = require("./transfer");


router.use('/view', view);
// router.use('/transfer', transfer);

module.exports = router;
