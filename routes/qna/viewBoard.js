// const { Boards } = require('../../models');
var db = require("../../middlewares/db");
var express = require("express");
var router = express.Router();
var tokenauth = require("./tokenauth");
var {
  encryptResponse,
  decryptRequest,
  decryptEnc,
} = require("../../middlewares/crypt");
const profile = require("../../middlewares/profile");

router.get("/", function (req, res, next) {
     tokenauth.authresult(req, function (aResult) {
      if(aResult == true){
      const cookie = decryptEnc(req.cookies.Token);
      profile(cookie).then((data) => {
        if(data.data.is_admin){
        db.query(`SELECT * FROM qna`, function (error, results) {
          if (error) {
            throw error;
          }
      
        var cookieData = data.data;
        res.render("temp/qna/viewboard", {
          u_data: cookieData.username,
          results: results,
        });

      });
    }else{
      var userId = data.data.username;
      db.query(`SELECT * FROM qna where userId = '${userId}'`, function (error, results) {
        if (error) {
          throw error;
        }
        var cookieData = data.data;
        res.render("temp/qna/viewboard", {
          u_data: cookieData.username,
          results: results,
        });
    });
    }
    });
    } else {
      res.render("temp/qna/alert");
    }
  });
});

module.exports = router;
