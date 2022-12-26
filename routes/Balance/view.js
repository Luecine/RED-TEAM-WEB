var express = require('express');
var router = express.Router();
var request = require('request');

const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const {id, pw} = req.body
    const options = {
        uri: "15.152.81.150:3000/api/user/register",
        method: 'POST'
    }
    axios.post(url[, data[, config]])
});

module.exports = router;
