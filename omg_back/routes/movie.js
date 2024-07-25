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
// 영화 예매 - 영화 목록 조회 및 선택
router.get('/movies', (req, res) => {
    db.query(`select movie_no, movie_title, movie_age from movie`, (err, results) => {
        if (err) {
            console.log('영화를 조회할 수 없습니다.');
            return res.status(500).json({ error: 'error'});
        }
        return res.json(results);
    });
});
// 영화 예매 - 날짜 조회 및 선택
router.get('/movies/:movie_no/available-dates', (req, res) => {
    const { movie_no } = req.params;

    // 데이터베이스에서 해당 영화의 예약 가능한 날짜를 가져오는 로직
    db.query(`select date`)
})

//아름작성 완

//회창작성

//회창작성 완





module.exports = router;