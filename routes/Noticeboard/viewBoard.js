const { Boards } = require('../../models');
var db = require('../../middlewares/db');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const {topic, contents} = req.body;

  db.query(`SELECT * FROM boards`,function(error,results,fields){
    if(error){
      throw error;
    }
    var user = results[0]


   });
    /*db.query(`update user set work=1,ontime=now() where userid="${userid}"`,function(error,user){
      if(error){
        throw error;
      }});*/
    
});

module.exports = router;
