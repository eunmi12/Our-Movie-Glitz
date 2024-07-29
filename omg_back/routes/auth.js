const express = require('express');
const router = express.Router();
const db = require('../db.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성

//승호작성 완

//진우작성

//아이디 유효성 검사
router.post("/id_check", async (req, res) => {

    const user_id = req.body.user_id;

    db.query("select user_id from user where user_id = ?", [user_id],(err, results) => {

        if (err) {
            res.send({
              // 에러 발생 시
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            if (results.length > 0) {
              //결과값이 있으면 //쿼리 실행결과는 배열로 나와서 length를 이용하여 데이터를 파악
              res.send({
                code: 200,
                message: "존재하는 아이디입니다.",
                exists: true,
              });
            } else {
              //결과값이 없으면
              res.send({
                code: 200,
                message: "사용가능한 아이디입니다.",
                exists: false,
              });
            }
        }
    });
})

// 회원가입-------------------------------------
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
    db.query("insert into user (user_id, user_pwd, user_age, user_name, user_gender, user_phone) values(?,?,?,?,?,?)",
        [user.user_id, user.user_pwd, user.user_age, user.user_name, user.user_gender, user.user_phone],
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
// ----------------------------------------------------------------------

// 로그인-------------------------------------
router.post("/login", async(req, res) => {
  console.log("req.body : -------> ",req.body);

  const user_id = req.body.user_id;
  const user_pwd = req.body.user_pwd;

  db.query("select user_no, user_id, user_pwd, user_name, user_phone, user_auth from user where user_id = ?",
    [user_id, user_pwd],
    (err, results, fields) => {
      if(err){
        res.send({
          code: 400,
          failed: "error occurred",
          error: err,
        });
      } else{
        if(results.length > 0) {
          console.log("results : ------>",results);
          
          const user = results[0];

          console.log(user.user_id);
          console.log(user.user_pwd);
          console.log(user.user_auth);
          console.log(user.user_no);

          if(user.user_pwd === user_pwd){
            res.send({
              //login success
              code : 200,
              message : "로그인 성공",
              user_no : user.user_no,
              user_id: user.user_id,
              user_pwd: user.user_pwd,
              user_auth: user.user_auth,
              user_name: user.user_name,
            })
          } else{
            res.send({
              //비밀번호 불일치 시
              code: 401,
              message: "비밀번호가 일치하지 않습니다."
            })
          }
        } else{
          res.send({
            //이메일이 존재하지 않을 시
            code: 404,
            message: "사용자를 찾을 수 없습니다."
          });
        }
      }
    }
  )
});

// 아이디 찾기------------------------------------------------------------
router.post("/findId", async(req, res) => {
  console.log("req.body : -------> ",req.body);

});

// ----------------------------------------------------------------------

// 비밀번호 찾기------------------------------------------------------------
router.post("/findPwd", async(req, res) => {
  console.log("req.body : -------> ",req.body);

});

// ----------------------------------------------------------------------



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