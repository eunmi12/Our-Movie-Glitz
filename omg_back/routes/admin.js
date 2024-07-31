const express = require('express');
const router = express.Router();
const db = require('../db.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");
const { log } = require('console');

//승호작성

//승호작성 완

//진우작성

//진우작성 완

//치혁작성

//공지사항리스트
router.get('/noticelist',(req, res) => {
    const notice = req.body.notice_no;
    db.query(`select notice_no,notice_title,notice_date,notice_cnt from notice;`, (err, results) => {
        if(err) {
            console.log('공지사항을 조회할 수 없습니다.');
            return res.status(500).json({ error: err });
        } 
        return res.json(results);
    });
});

//공지사항페이지
router.get('/notice/:notice_no' , (req , res ) => {
    const notice_no = req.params.notice_no;
    console.log("notice_no ---->", notice_no);
    db.query(`select notice_no,notice_title,notice_date,notice_coment,notice_cnt from notice where notice_no=?;`, [notice_no] , (err, results) => {
        if(err) {
            console.log('공지사항을 불러올 수 없습니다.');
            return res.status(500).json({ error : err })
        }
        return res.status(200).json({ data: results });
    });
});

//faq리스트
router.get('/faqlist',(req, res) => {
    db.query(`select faq_no,faq_q,faq_a from faq;`, (err, results) => {
        if(err) {
            console.log('FAQ를 조회할 수 없습니다.');
            return res.status(500).json({ error: err });
        } 
        return res.json(results);
    });
});

//1:1문의 등록
router.post('/registqna',(req,res) =>{
    const qna_title = req.body.qna_title;
    const qna_comment = req.body.qna_comment;
    const qna_type = req.body.qna_type;
    const qna_user_no = req.body.qna_user_no;    
    console.log('qna_title >>',qna_title,"qna_comment >>",qna_comment,"qna_type >>",qna_type,"qna_user_no >>",qna_user_no);
    db.query(`insert into qna (qna_title,qna_comment,qna_type,qna_user_no) values (?,?,?,?)`,[qna_title,qna_comment,qna_type,qna_user_no], (err, results) =>{
        if(err){
            console.log("1:1문의 등록 중 오류 발생");
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

//치혁작성 완

//은미작성

//faq 수정
router.post('/qupdate',(req,res) =>{
    const faq_q = req.body.faq_q;
    const faq_no = req.body.faq_no;

    // console.log('Received data:', faq_q, faq_no);
    db.query(`update faq set faq_q = ? where faq_no = ?`,[faq_q,faq_no], (error, result) =>{
        if(error){
            console.log("FAQ 수정 중 오류 발생");
            return res.status(500).json({ error: 'error'});
        }
        return res.json(result);
    });
});
router.post('/aupdate',(req,res) =>{
    const faq_a = req.body.faq_a;
    const faq_no = req.body.faq_no;

    console.log('Received data:', faq_a, faq_no);
    db.query(`update faq set faq_a = ? where faq_no = ?`,[faq_a,faq_no], (error, result) =>{
        if(error){
            console.log("FAQ 수정 중 오류 발생");
            return res.status(500).json({ error: 'error'});
        }
        return res.json(result);
    });
});
router.post('/aupdate',(req,res) =>{
    const faq_a = req.body.faq_a;
    const faq_no = req.body.faq_no;

    db.query(`update faq set faq_a = ? where faq_no = ?`,[faq_a,faq_no], (error, result) =>{
        if(error){
            console.log("FAQ 수정 중 오류 발생");
            return res.status(500).json({ error: 'error'});
        }
        return res.json(result);
    });
});
router.post('/aupdate',(req,res) =>{
    const faq_a = req.body.faq_a;
    const faq_no = req.body.faq_no;

    db.query(`update faq set faq_a = ? where faq_no = ?`,[faq_a,faq_no], (error, result) =>{
        if(error){
            console.log("FAQ 수정 중 오류 발생");
            return res.status(500).json({ error: 'error'});
        }
        return res.json(result);
    });
});
router.post('/deletefaq',(req,res) =>{
    const faq_no = req.body.faq_no;

    db.query(`delete from faq where faq_no = ?`,[faq_no], (error, result) =>{
        if(error){
            console.log("FAQ 삭제 중 오류 발생");
            return res.status(500).json({ error: 'error'});
        }
        return res.json(result);
    });
});
router.post('/createfaq',(req,res) =>{
    const faq_a = req.body.faq_a;
    const faq_q = req.body.faq_q;
    console.log('faq_a:',faq_a,"faq_q:",faq_q);
    db.query(`insert into faq (faq_q,faq_a) values (?,?)`,[faq_q,faq_a], (error, result) =>{
        if(error){
            console.log("FAQ 등록 중 오류 발생");
            return res.status(500).json({ error: 'error'});
        }
        res.json(result);
    });
});
router.get('/user/seats', (req, res) => {
    let sql = 'SELECT seat_no, seat_cinema_no, seat_name,seat_reserve FROM seat WHERE seat_cinema_no = 1';
    db.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    });
  });


//은미작성 완

//재영작성

//재영작성 완

//아름작성
// 회원목록 조회 및 삭제 관리
router.post('/selectUser', (req, res) => {
    db.query(`select user_no, user_gender, user_name, user_age, user_grade, user_point from user where user_del = "1";`, (err, results) => {
        if (err) {
            console.log('회원정보를 조회할 수 없습니다.');
            return res.status(500).json({ error: 'error'});
        }
        return res.json(results);
    });
});

router.post('/updateUser', (req, res) => {
    const { user_no, user_grade } = req.body;
    db.query(`update user set user_grade = ? where user_no = ?;`, [user_grade, user_no], (err, results) => {
        if(err) {
            console.log('회원등급을 변경할 수 없습니다.');
            return res.status(500).json({ error: 'error'});
        }
        return res.json(results);
    });
});

router.post('/deleteUser', (req, res) => {
    db.query(`update user set user_del = '0' where user_no = ?;`, [req.body.user_no], (err, results) => {
        if(err) {
            console.log('회원정보를 삭제할 수 없습니다.');
            return res.status(500).json({ error: 'error' });
        }
        return res.json(results);
    });
});

//아름작성 완

//회창작성

//회창작성 완





module.exports = router;