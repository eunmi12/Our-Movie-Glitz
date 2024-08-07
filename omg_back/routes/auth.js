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
            }
                const user_no = results.insertId;
                console.log("result_no====================",user_no);
                db.query(`insert into user_coupon (uc_user_no, uc_coupon_no) values(?,1)`,[user_no],(err,result) => {
                  if(err){
                    console.log('error 발생');
                    return res.status(500).json({ err:'error'});
                    
                  } else{
                    return res.json(result);
                  }
                })
            
        }
    )
})
// ----------------------------------------------------------------------

// 로그인-------------------------------------
router.post("/login", async(req, res) => {
  console.log("req.body : -------> ",req.body);

  const user_id = req.body.user_id;
  const user_pwd = req.body.user_pwd;

  db.query("select user_no, user_id, user_pwd, user_name, user_phone, user_auth, user_del from user where user_id = ?",
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

          if(user.user_del === 1){
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
          } else {
            res.send({
              // 비밀번호 불일치 시
              code: 402,
              message: "정지되었습니다 관리자에게 문의하시기 바랍니다.",
            });
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

  const data = {
    user_name : req.body.user_name,
    user_phone : req.body.user_phone,
    user_id : req.body.user_id,
  };

  console.log("Data:-------->",data);

  db.query(`select user_id from user where user_name = ? and user_phone = ?`,
    [data.user_name, data.user_phone],
    function(err, results, fields){
      // console.log(results.length);
      if(err){
        res.send({
          code : 400,
          failed :  "error occurred",
          error: err,
        });
      } else {
        console.log("Database query results:", results);

        if(results.length > 0){
          const user_id = results[0].user_id;
          res.send({
            code: 200,
            message : "아이디 찾기 성공",
            user_id : user_id
          })
        } else {
          res.send({
            code: 404,
            message: "일치하는 사용자가 없습니다."
          });
          // console.log(res.send.code);
        }
      }
    }
  )
  
});

// ----------------------------------------------------------------------

// 비밀번호 찾기------------------------------------------------------------
router.post("/findPwd", async(req, res) => {
  console.log("req.body : -------> ",req.body);

  const data = {
    tmp_pwd : Math.random().toString(36).slice(2),
    user_name : req.body.user_name,
    user_phone : req.body.user_phone,
    user_id : req.body.user_id,
  };
  console.log("user_data : --------->", data);
  
  db.query(`select * from user where user_id = ? and user_name = ? and user_phone = ?`,
    [data.user_id, data.user_name, data.user_phone],
    function(err, results){
      console.log("results.length:---->",results.length);
      
      if(err){
        res.send({
          code : 400,
          failed : "Error occurred",
          error : err,
        });
      } else if (results.length === 0){
        res.send({
          code : 404,
          message : "일치하는 사용자가 없습니다.",
        });
      } else {
        db.query(
          `update user set user_pwd =? where user_id = ? and user_name = ? and user_phone = ?`,
          [data.tmp_pwd, data.user_id, data.user_name, data.user_phone],
          function(err, updateResults){
            if(err) {
              res.send({
                code: 400,
                failed : "Error occurred",
                error : err,
              });
            } else {
              res.send({
                code : 200,
                message : "임시비밀번호 부여 성공",
                tmp_pwd : data.tmp_pwd,
              });
            }
          }
        )
      }
    }
  )

});

// ----------------------------------------------------------------------

// 카카오 로그인----------------------------------------------------------






// ----------------------------------------------------------------------


//진우작성 완

//치혁작성

//치혁작성 완

//은미작성
router.post('/joincoupon',(req,res)=>{
  const uc_user_no = req.body.user_no;

  db.query(`insert into user_coupon (uc_user_no, uc_coupon_no) values(?,1)`,[uc_user_no], (err,result)=>{
    if(err){
      return res.status(500).json({ err:'쿠폰 입력중 에러 발생'});
    }
    res.json(result);
  });
});
//은미작성 완

//재영작성

//재영작성 완

//아름작성

//아름작성 완

//회창작성

//회창작성 완





module.exports = router;