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
    db.query(`select * from movie;`, (error, results) => {
        if (error) {
            console.log('영화를 조회할 수 없습니다.');
            return res.status(500).json({ error: 'error'});
        }
        return res.json(results);
    });
});
// 영화 예매 - 상영관 선택
router.get('/cinemas', (req, res) => {
    db.query(`select * from cinema;`, (error, results) => {
        if (error) {
            return res.status(500).json({ error: '상영관 목록을 불러올 수 없습니다.' });
        }
        return res.json(results);
    });
});
// 영화 예매 - 예매 날짜 조회
router.post('/availableDates', (req, res) => {
    // const { movie_no, cinema_no } = req.body;
    // console.log(req.body);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    const query = `WITH RECURSIVE T_TEMP_DATES AS (
                    SELECT movie_startdate AS DT
                    FROM movie
                    WHERE movie_no = ? 
                    UNION
                    SELECT DATE_ADD(T_TEMP_DATES.DT, INTERVAL 1 DAY) 
                    FROM T_TEMP_DATES, movie
                    WHERE DATE_ADD(T_TEMP_DATES.DT, INTERVAL 1 DAY) <= (
                    SELECT movie_enddate FROM movie WHERE movie_no = ?
                    )
                    AND movie.movie_no = ? 
                    )
                    SELECT DT FROM T_TEMP_DATES WHERE DT >= ?`;
    db.query(query, [req.body.movie_no, req.body.movie_no, req.body.cinema_no, tomorrow], (error, results) => {
        if(error) {
            return res.status(500).json({ error: '예매 가능한 날짜를 불러올 수 없습니다.' });
        }
        return res.json(results.map(row => row.DT));
    });
});
// 영화 예매 - 예매 가능한 시간 조회
// router.post('/availableTimes', (req, res) => {
//     const { movie_no, date } = req.body;
//     const now = new Date();
//     const currenHour = now.getHours();
//     const query = `select distinct screen_starttime, screen_endtime from screen where sc_movie_no = ? and screen_startdate <= ? and screen_enddate >= ? and (scrren_starttime >= ? or screen_startdate > ?)`;
//     db.query(query, [movie_no, date, date, `${currentHour}:00:00`, date], (error, results) => {
//         if (error) {
//             return res.status(500).json({ error: '시간 조회 error' });
//         }
//         return res.json(results.map(row => row.screen_starttime));
//     });
// });
// 영화 예매 - 좌석 목록 조회
router.post('/seats', (req, res) => {
    const { cinema_no } = req.body;
    const query = `select * from seat where seat_cinema_no = ?`;
    db.query(query, [cinema_no], (error, results) => {
        if (error) {
            return res.status(500).json({ error: '좌석 조회 error' });
        }
        return res.json(results);
    });
});
// 영화 예매 - 예매 완료
router.post('/book', (req, res) => {
    const { movie_no, cinema_no, date, time, seats } = req.body;
    const query = `insert into ticket (ticket_movie_no, ti_se_cinema_no, ticket_date, ticket_time, ticket_seat_no, ticket_type)
                    values (?, ?, ?, ?, ?, ?)`;
    db.query(query, [movie_no, cinema_no, date, time, seats.join(','), 'standard'], (error, results) => {
        if (error) {
            return res.status(500).json({ error: '예매 error' });
        }
        return res.json({ message: '예매가 완료되었습니다.' });
    });
});

//아름작성 완

//회창작성

//회창작성 완





module.exports = router;