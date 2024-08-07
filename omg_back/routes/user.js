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

//치혁작성 완

//은미작성

//은미작성 완

//재영작성
router.post('/eventlist', (req, res) => {
    const sql = `
        select event_no, event_img1, event_title, event_cnt ,date_format(event_startdate, '%y-%m-%d') as event_startdate, date_format(event_enddate, '%y-%m-%d') as event_enddate from event order by event_no asc;
    `;
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
});

router.get('/maineventlist', (req, res) => {
    const sql = `
        select event_no, event_img1, event_title,date_format(event_startdate, '%y-%m-%d') as event_startdate, date_format(event_enddate, '%y-%m-%d') as event_enddate from event order by event_no desc;
    `;
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
});

router.post('/deleteevent', (req, res) => {
    db.query(`DELETE FROM event WHERE event_no = ?`,[req.body.event_no] , (err, results) => {
        if(err) {
            console.log('이벤트를 삭제할 수 없습니다.');
            return res.status(500).json({ error: 'error' });
        }
        return res.json(results);
    });
});
//재영작성 완

//아름작성

//아름작성 완

//회창작성

//유저 정보 불러오기
router.post('/mypage/:user_no', function(request, response, next){
    const user_no = request.params.user_no;
    
    db.query(`SELECT user_phone, user_gender, DATE_FORMAT(user_age, "%Y년 %m월 %d일") AS user_age, user_id, user_name, user_grade, user_point FROM user WHERE user_no = ?`,
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
            return response.status(500).json({ error: '쿠폰갯수 에러' });
        }
        response.json(result);
        console.log(result);
    });
})
//앞으로 볼 영화 예매내용 불러오기
router.post('/revs/:user_no', function(request, response, next){
    const user_no = request.params.user_no;
    const currentDate = new Date().toISOString().slice(0, 10); // 현재 날짜 (YYYY-MM-DD 형식)
    const currentTime = new Date().toISOString().slice(11, 16); // 현재 시간 (HH:MM 형식)

    db.query(`SELECT ticket_no, ticket_user_no, movie_img0, m.movie_title, DATE_FORMAT(ticket_date, "%Y-%m-%d") AS ticket_date, DATE_FORMAT(ticket_time, "%H시") AS ticket_time, ticket_total_price, ticket_cnt, ticket_seat 
              FROM ticket t 
              JOIN user u ON t.ticket_user_no = u.user_no 
              JOIN movie m ON t.ticket_movie_no = m.movie_no 
              WHERE user_no = ? 
              AND (ticket_date > ? OR (ticket_date = ? AND ticket_time > ?))`,
        [user_no, currentDate, currentDate, currentTime],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '예매내역 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
//모든 예매 불러오기
router.post('/rev/:user_no', function(request, response, next){
    const user_no = request.params.user_no;

    db.query(`select m.movie_no, ticket_no, ticket_user_no, movie_img0, m.movie_title, DATE_FORMAT(ticket_date, "%Y-%m-%d") AS ticket_date, DATE_FORMAT(ticket_time, "%H시") AS ticket_time, ticket_total_price,ticket_cnt,ticket_seat from ticket t join user u on t.ticket_user_no = u.user_no join movie m on t.ticket_movie_no = m.movie_no where user_no = ?;`,
        [user_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '예매내역 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
//예매한 영화 취소
router.post('/canclemovie', function(request, response, next) {
    const { user_no, ticket_no } = request.body; // user_no와 ticket_no를 받아온다

    // ticket_no를 기준으로 삭제 쿼리 작성
    db.query(`DELETE FROM ticket WHERE ticket_user_no = ? AND ticket_no = ?;`,
        [user_no, ticket_no], // user_no와 ticket_no를 쿼리에 전달
        function(error, result) {
            if (error) {
                console.error(error);
                return response.status(500).json({ error: '예매한 영화 취소 중 에러 발생' });
            }
            response.json({ success: true });
            console.log("삭제 결과:", result);
        }
    );
});

// 문희내역 불러오기
router.post('/gogaek/:user_no', function(request, response, next){
    const user_no = request.params.user_no;

    db.query(`select qna_answer, qna_no, qna_comment, qna_type, qna_title, DATE_FORMAT(qna_date, "%Y-%m-%d") AS qna_date from qna where qna_user_no = ?;`,
        [user_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '문희내역 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
// 리뷰 작성
router.post('/crereview', function(request, response, next){
    const { review_rate, review_comment, movie_no, user_no } = request.body;

    db.query(`insert into review (review_rate, review_comment, re_movie_no, re_user_no) values (?,?,?,?);`,
        [review_rate, review_comment, movie_no, user_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '리뷰 작성 도중 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
// 리뷰내역 불러오기
router.post('/review/:user_no', function(request, response, next){
    const user_no = request.params.user_no;

    db.query(`select review_no, m.movie_title, r.review_comment, r.review_like, DATE_FORMAT(r.review_date, "%Y-%m-%d") AS review_date, r.review_rate 
                from review r
                join movie m on r.re_movie_no = m.movie_no
                join user u on r.re_user_no = u.user_no
                where r.re_user_no = ?;`,
        [user_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '리뷰내역 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
// 쿠폰 상세 정보 불러오기
router.post('/coupon/:user_no', function(request, response, next){
    const user_no = request.params.user_no;

    db.query(`select uc.uc_coupon_able, c.coupon_no, c.coupon_title, c.coupon_sale, c.coupon_img1, DATE_FORMAT(c.coupon_startdate, "%Y-%m-%d") AS coupon_startdate, DATE_FORMAT(c.coupon_enddate, "%Y-%m-%d") AS coupon_enddate, c.coupon_comment 
              from coupon c
              join user_coupon uc on c.coupon_no = uc.uc_coupon_no
              where uc.uc_user_no = ?;`,
        [user_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '쿠폰 상세 정보 에러' });
        }
        response.json(result);
        console.log(result);
    });
});

//리뷰 삭제하기
router.post('/delreview', function(request, response, next){
    const review_no = request.body.review_no;

    db.query(`DELETE FROM review WHERE review_no = ?;`,
        [review_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '리뷰 삭제 중 에러 발생' });
        }
        response.json(result);
        console.log(result);
    });
});
//qna 삭제하기
router.post('/delqna', function(request, response, next){
    const qna_no = request.body.qna_no;

    db.query(`delete from qna where qna_no = ?;`,
        [qna_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '문희내역 삭제 중 에러 발생' });
        }
        response.json(result);
        console.log(result);
    });
});
// 찜한 영화 리스트
router.post('/wish/:user_no', function(request, response, next){
    const user_no = request.params.user_no;

    db.query(`select m.movie_no, m.movie_title,m.movie_img0, DATE_FORMAT(m.movie_startdate, "%Y-%m-%d") AS movie_startdate, DATE_FORMAT(m.movie_enddate, "%Y-%m-%d") AS movie_enddate, m.movie_tag, m.movie_director
                from wish w
                join movie m on m.movie_no = w.wish_movie_no
                join user u on  u.user_no = w.wish_user_no
                where w.wish_user_no = ?;`,
        [user_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '찜한 영화 리스트 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
// 찜한 영화 삭제 리스트
router.post('/delwish', function(request, response, next){
    const user_no = request.body.user_no;
    const wish_movie_no = request.body.wish_movie_no;
    console.log("wish_movie_no",wish_movie_no);
    

    db.query(`delete from wish where wish_user_no = ? and wish_movie_no = ?;`,
        [user_no, wish_movie_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '찜한 영화 삭제 리스트 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
//qna 상세페이지
router.post('/gogaekdetail/:user_no', function(request, response, next){
    const user_no = request.params.user_no;
    const qna_no = request.query.qna_no;

    db.query(`select qna_no, qna_answer, qna_title, DATE_FORMAT(qna_date, "%Y-%m-%d") AS qna_date, qna_type, user_phone, user_id, qna_comment, DATE_FORMAT(qna_answer_date, "%Y-%m-%d") AS qna_answer_date
                from qna q
                join user u on q.qna_user_no = u.user_no
                where qna_user_no = ? and qna_no = ?`,
        [user_no,qna_no],
        function(error, result, field){
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '문희내역 에러' });
        }
        response.json(result);
        console.log(result);
    });
});
// 비밀번호 확인 API
router.post('/verify-password', function(request, response, next) {
    const { user_no, user_pwd } = request.body;

    // 사용자 번호에 해당하는 사용자 정보 조회
    db.query('SELECT user_pwd FROM user WHERE user_no = ?', [user_no], function(error, result) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '서버 에러' });
        }

        // 비밀번호가 일치하는지 확인
        if (result.length === 0) {
            return response.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        // 결과에서 저장된 비밀번호 가져오기
        const storedPassword = result[0].user_pwd;

        // 입력된 비밀번호와 저장된 비밀번호 비교
        if (storedPassword === user_pwd) {
            response.json({ success: true });
        } else {
            response.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }
    });
});
// 사용자 삭제 API
router.post('/delete-user', function(request, response, next) {
    const { user_no } = request.body;

    db.query('UPDATE user SET user_del = 0 WHERE user_no = ?', [user_no], function(error, result) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '사용자 삭제 중 에러 발생' });
        }
        response.json({ success: true });
        console.log(result);
    });
});
// 개인 정보 수정
router.post('/update', function(request, response, next){
    const { user_no, user_pwd, user_phone } = request.body;

    db.query(`UPDATE user SET user_phone = ?, user_pwd = ? WHERE user_no = ?;`,
        [user_phone, user_pwd, user_no],
        function(error, result) {
            if (error) {
                console.error(error);
                return response.status(500).json({ error: '개인정보 수정 중 에러 발생' });
            }
            response.json({ success: true });
            console.log(result);
        }
    );
});


//회창작성 완




module.exports = router;