var express = require('express');
var router = express.Router();

/* GET home page. */
const mainRouter = require("./Main")
const transactionsRouter = require("../routes/Transactions")
// 안에 있는 js를 할당
const balanceRouter = require("../routes/Balance");
// const beneficiaryRouter = require("../routes/Beneficiary");
const userRouter = require("../routes/User");
const noticeRouter = require("../routes/Noticeboard");

const admin = require("../routes/Beneficiary");
const userpage = require("./userpage");


const chanRouter = require("../routes/chan");
// 1 : /balance 주소, 2: 할당
router.use("/balance", balanceRouter);
router.use("/main", mainRouter);

// 김태진 : 입출금 페이지
router.use("/transactions", transactionsRouter)
// router.use("/health", healthRouter);
// router.use("/beneficiary", beneficiaryRouter);
router.use("/user", userRouter);
<<<<<<< HEAD
router.use("/notice", noticeRouter);
=======

router.use("/admin", admin);
router.use("/mypage", userpage);


router.use("/chan", chanRouter);


>>>>>>> 5a1e5d15385970dc9b3a99233d40993aba7ba901

module.exports = router;
