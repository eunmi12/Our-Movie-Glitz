const express = require('express');
const router = express.Router();
const db = require('../db.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성

//승호작성 완

//진우작성

// 회원가입
router.post("/join", async (req, res) => {
    console.log(req.body);

    const user = {
        user_id: req.body.user_id,
        user_pwd: req.body.user_pwd,
        user_name: req.body.user_name,
        user_phone: req.body.user_phone,
        user_gender: req.body.user_gender,
        user_age: req.body.user_age,
    };
    console.log("user: ---->",user);
    db.query(`insert into user (user_id, user_pwd, user_age, user_name, user_gender, user_phone) values(?,?,?,?,?,?)`,
        [user.user_id, user.user_pwd, user.user_name, user.user_phone, user.user_gender, user.user_age],
        (err, results, fields) => {
            if (err) {
                res.send({
                // 에러 발생 시
                code: 400,
                failed: "error occurred",
                error: err,
                });
            } else {
                res.send({
                //쿼리 실행 성공시
                code: 200,
                message: "회원가입 성공",
                });
            }
            console.log(res.send);
        }
    )
})

//진우작성 완

//치혁작성

//치혁작성 완

//은미작성

//은미작성 완

//재영작성

//재영작성 완

//아름작성

//아름작성 완

//회창작성

//회창작성 완





module.exports = router;