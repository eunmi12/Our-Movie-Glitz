const express = require('express');
const router = express.Router();
const db = require('../db.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성

//승호작성 완

//진우작성

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
//유저 정보 불러오기
router.post('/mypage/:user_no', function(request, response, next){
    const user_no = request.params.user_no;
    
    db.query(`SELECT user_gender, DATE_FORMAT(user_age, "%Y년 %m월 %d일") AS user_age, user_id, user_name, user_grade, user_point FROM user WHERE user_no = ?`,
        [user_no],
        function(error, result, field){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '마이페이지 유저정보 에러' });
        }
        response.json(result);
        console.log(result);
    });
});

//유저 쿠폰 갯수
router.post('/getcoupon', function(request, response, next){
    const user_no = request.body.user_no;
    console.log("user_no",user_no);
    
    db.query(`select count(uc_coupon_no) as user_coupon from user_coupon where uc_user_no = ?`,
        [user_no],
        function(error, result, field){
        if(error){
            console.error(error);
            return response.status(500).json({ error: '마이페이지 유저정보 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
//회창작성 완





module.exports = router;