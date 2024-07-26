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
    db.query(`select notice_title,notice_date,notice_cnt from notice;`, (err, results) => {
        if(err) {
            console.log('공지사항을 조회할 수 없습니다.');
            return res.status(500).json({ error: err });
        } 
        return res.json(results);
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

//치혁작성 완

//은미작성

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