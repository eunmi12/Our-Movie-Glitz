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
router.get('/eventlist', (req, res) => {
    const sql = `
        select event_no, event_img1, event_title, date_format(event_startdate, '%y-%m-%d') as event_startdate, date_format(event_enddate, '%y-%m-%d') as event_enddate from event order by event_no desc;
    `;
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
});
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
            return response.status(500).json({ error: '쿠폰갯수 에러' });
        }
        response.json(result);
        console.log(result);
    });
})

// 예매내역 불러오기
router.post('/rev/:user_no', function(request, response, next){
    const user_no = request.params.user_no;

    db.query(`select m.movie_title, DATE_FORMAT(ticket_date, "%Y-%m-%d-%h시") AS ticket_date, ticket_total_price,ticket_cnt,ticket_seat from ticket t join user u on t.ticket_user_no = u.user_no join movie m on t.ticket_movie_no = m.movie_no where user_no = ?;`,
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
// 문희내역 불러오기
router.post('/gogaek/:user_no', function(request, response, next){
    const user_no = request.params.user_no;

    db.query(`select qna_answer, qna_no, qna_comment, qna_type, qna_title, DATE_FORMAT(qna_date, "%Y-%m-%d-%h:%i") AS qna_date from qna where qna_user_no = ?;`,
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

    db.query(`select coupon_no, coupon_title, coupon_sale, coupon_img1, DATE_FORMAT(coupon_startdate, "%Y-%m-%d") AS coupon_startdate, DATE_FORMAT(coupon_enddate, "%Y-%m-%d") AS coupon_enddate, coupon_comment 
                from coupon c
                join user_coupon uc on c.coupon_no = uc.uc_coupon_no
                where uc.uc_user_no = 2;`,
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
//qna 상세페이지

// //회창작성 완
// router.post('/gogaekdetail/:user_no', function(request, response, next){
//     const user_no = request.params.user_no;

//     db.query(`select qna_no, qna_comment, qna_title, DATE_FORMAT(qna_date, "%Y-%m-%d-%h:%i") AS qna_date from qna where qna_user_no = ?;`,
//         [user_no],
//         function(error, result, field){
//         if (error) {
//             console.error(error);
//             return response.status(500).json({ error: '문희내역 에러' });
//         }
//         response.json(result);
//         console.log(result);
//     });
// });




module.exports = router;