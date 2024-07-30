const express = require('express');
const router = express.Router();
const db = require('../db.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

//승호작성
router.get(`/moviecreate`,(req,res)=>{

    const data = {
        mv_startdate : req.body.q,
        mv_enddate : req.body.w,
        mv_tag : req.body.e,
        mv_comment : req.body.r,
        mv_title : req.body.t,
        mv_price : req.body.y,
        mv_director : req.body.u,
        mv_img : req.body.i,
        mv_age : req.body.o
    };

    const sql = `INSERT INTO movie (movie_startdate,movie_enddate,movie_tag,movie_comment,movie_title,movie_price,movie_director,movie_img0,movie_age)
     values('?','?','?','?','?',?,'?','?','?');`
     db.query(sql,[data],(err,results)=>{
        if (err) {
            res.status(500).send(err);
          } else {
            res.json(results);
          }

     })
})

//승호작성 완

//진우작성

//진우작성 완

//치혁작성

//치혁작성 완

//은미작성

//은미작성 완

//재영작성
router.get('/movielist/:tag', (req, res) => {
    const movie_tag = req.params.tag;
    const sql = `
        SELECT m.movie_no, m.movie_img0, m.movie_title, r.review_rate
        FROM movie m
        LEFT JOIN review r ON m.movie_no = r.re_movie_no 
        WHERE m.movie_tag = ?
        LIMIT 3;
    `;
    db.query(sql, [movie_tag], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
});
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
// 영화 목록 페이지네이션
router.get('/movies/page', (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const query = `select * from movie limit ? offset ?`;
    db.query(query, [limit, offset], (error, results) => {
        if (error) {
            console.log('영화를 조회할 수 없습니다.');
            return res.status(500).json({ error: 'error' });
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
// 예매 날짜 목록 페이지네이션
router.post('/availableDates/page', (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const query = `select * from movie limit ? offset ?`;
    db.query(query, [limit, offset], (error, results) => {
        if (error) {
            console.log('날짜를 조회할 수 없습니다.');
            return res.status(500).json({ error: 'error' });
        }
        return res.json(results);
    });
});
// 영화 예매 - 예매 가능한 시간 조회
router.post('/availableTimes', (req, res) => {
    // const { movie_no, cinema_no, date } = req.body;
    // console.log('rerererere', req.body);
    // const now = new Date();
    // const currenHour = now.getHours();
    // const date = req.body.date
    // const ddate = date.toString().split('T')[0];
    const query = `select distinct screen_starttime, screen_endtime from screen where sc_movie_no = ? and sc_cinema_no = ? and screen_date = ?`;
    db.query(query, [req.body.movie_no, req.body.cinema_no, req.body.date], (error, results) => {
        // console.log('받고있나', results);
        if (error) {
            return res.status(500).json({ error: '시간 조회 error' });
        }
        return res.json(results.map(row => row.screen_starttime));
        // return res.json(results);
    });
});
// 영화 예매 - 좌석 목록 조회
router.post('/seats', async(req, res) => {
    // console.log(req.body);
    const date = `WITH RECURSIVE T_TEMP_DATES AS (
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
        SELECT DT FROM T_TEMP_DATES WHERE DT >= ?;`
    const time = `select distinct screen_starttime, screen_endtime from screen where sc_movie_no = ? and sc_cinema_no = ? and screen_date = ?;`
    try {
        const { movie_no, cinema_no, date, time } = req.body;
        console.log('확인', req.body);
        const rows = await db.query(`select s.seat_name, s.seat_reserve 
                                    from seat s 
                                    join movie m on m.cinema_no = s.seat_cinema_no 
                                    join screen sc on sc.sc_cinema_no = s.seat_cinema_no
                                    where m.movie_no = ? and s.seat_cinema_no = ? and m.date = ? and m.time = ?`, [movie_no, cinema_no, date, time]);
        console.log('확인2', rows);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// 좌석 예약 상태 업데이트
router.post('/reserve', async(req, res) => {
    try {
        const { seat_no, reserve } = req.body;
        const [result] = await db.query(`update seat set seat_reserve = 0 where seat_no = ?`, [reserve, seat_no]);

        if (result.affectedRows > 0) {
            const [updatedSeat] = await db.query(`select * from seat where seat_no = ?`, [seat_no]);
            res.json(updatedSeat[0]);
        } else {
            res.status(404).json({ message: 'Seat not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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