const express = require('express');
const router = express.Router();
const db = require('../db.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");
const { log } = require('console');

//승호작성

router.get('/reservationlist',(req,res)=>{

    db.query(`select ticket_no,user_name,movie_title
        from ticket t
        join user u on t.ticket_user_no = u.user_no
        join movie m on t.ticket_movie_no = m.movie_no;`,
    (err, results)=>{
        if(err) {
            console.log('예매현황을 불러올 수 없습니다.');
            return res.status(500).json({ error: err });
        } 
        return res.json(results);
    })
});



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

//공지사항 조회수 증가
router.post('/incrementnoticecnt', (req, res) => {
    const notice_no = req.body.notice_no;

    db.query(`update notice set notice_cnt = notice_cnt + 1 where notice_no = ?;`, [notice_no], function (err, results){
        if(err) {
            console.log('조회수 증가 중 오류가 발생했습니다.');
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

//관리자 1:1문의 관리
router.post('/qnalist', (req, res) => {   
    db.query(`select q.qna_no,q.qna_type,q.qna_title,u.user_name,q.qna_date,q.qna_answer from qna q join user u on q.qna_user_no = u.user_no order by q.qna_no desc;`, (err, results, fields) => {
        if(err){
            console.log('1:1문의 리스트를 불러올 수 없습니다.');
            return res.status(500).json({ error : err })
        }
        res.json(results);
    })
})

//관리자 1:1문의 답변 삭제
router.post('/deleteqna' , (req, res) => {
    const qna_no = req.body.qna_no;
    console.log(qna_no);
    db.query(`update qna set qna_answer = null where qna_no = ?;`, [qna_no], function(err, results){
        if(err){
            console.log(err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    })
})

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

//상영리스트 뽑기
router.post('/cinemalist',(req,res)=>{
    db.query((`select screen_no, movie_title, cinema_no, cinema_name, concat(screen_starttime,'~',screen_endtime) as cinema_time,
        date_format(screen_date, '%y-%m-%d') as screen_date 
        from screen s
        join movie m on s.sc_movie_no = m.movie_no
        join cinema c on s.sc_cinema_no = c.cinema_no;`),(err,result)=>{
        if(err){
            console.log("CINEMA 리스트 중 오류 발생");
            return res.status(500).json({ err:'error'});
        }
        res.json(result);
        console.log("data",result);
    });
});

//상영할 영화 리스트 불러오기
router.post('/scmovielist',(req,res)=>{
    db.query(`select movie_no, movie_title, date_format(movie_startdate, '%y-%m-%d') as movie_startdate, 
        date_format(movie_enddate, '%y-%m-%d') as movie_enddate from movie`, (err,result)=>{
        if(err){
            console.log("cinema에서 영화리스트 불러오는 도중 오류 발생");
            return res.status(500).json({ err: 'error'});
        }
        res.json(result);
        console.log("moviedata",result);
    });
});
//상영할 상영관 리스트 불러오기
router.post('/sccinemalist', (req,res) => {
    db.query(`select cinema_no, cinema_name from cinema`, (err,result) => {
        if(err){
            console.log("cinema에서 상영관 리스트 불러오기");
            return res.status(500).json({ err: 'error'});
        }
        res.json(result);
    });
});

//상영할 정보 등록하기
router.post('/insertscreen', (req,res) => {
    const data = {
        screen_starttime : req.body.screen_starttime,
        screen_endtime : req.body.screen_endtime,
        sc_movie_no : req.body.sc_movie_no,
        sc_cinema_no : req.body.sc_cinema_no,
        screen_date : req.body.screen_date,
    }
    db.query(`insert into screen (screen_starttime,screen_endtime,sc_movie_no,sc_cinema_no,screen_date) 
        values (?,?,?,?,?)`,[data.screen_starttime,data.screen_endtime,data.sc_movie_no,data.sc_cinema_no,data.screen_date], (err,result)=>{
            if(err){
                console.log('상영 정보 등록 중 오류 발생');
                return res.status(500).json({ err: 'error'});
            }
            res.json(result);
        });
});

//상영된 정보 삭제하기
router.post('/deletescreen', (req,res) => {
    const screen_no = req.body.screen_no;
    db.query(`DELETE FROM screen WHERE screen_no = ?`,[screen_no], (err,result)=>{
        if(err){
            console.log('상영 삭제 중 오류 발생');
            return res.status(500).json({ err: 'error'});
        }
        res.json(result);
    });
});

//공지사항 작성
router.post('/insertnotice', (req,res)=>{
    const notice_title = req.body.notice_title;
    const notice_date = req.body.notice_date;
    const notice_comment = req.body.notice_comment;
    console.log("notice_title:",notice_title,"notice_date",notice_date,"notice_comment",notice_comment);

    db.query(`insert into notice (notice_title,notice_date,notice_coment) values (?,?,?)`,
        [notice_title,notice_date,notice_comment], (error, result) => {
            if(error){
                console.log("공지사항 작성 중 오류 발생");
                return res.status(500).json({error: 'error'});
            }
            res.json(result);
        }
    );
});

//공지사항 상세보기
router.post('/notice/:notice_no',(req,res)=>{
    const notice_no = req.params.notice_no;
    db.query(`select notice_no, notice_title, date_format(notice_date, '%Y-%m-%d') as notice_date, notice_coment from notice where notice_no =?`, [notice_no], (err,result)=>{
        if(err){
            console.log("공지사항 상세보기로 넘어가는 중 오류 발생");
            return res.status(500).json({ err:'error'});
        }
        res.json(result);
    });
});
//공지사항 업데이트
router.post('/updatenotice', (req,res) => {
    const notice_no = req.body.notice_no;
    const notice_title = req.body.notice_title;
    const notice_coment = req.body.notice_coment;
    const notice_date = req.body.notice_date;

    // console.log("notice_no:",notice_no);
    // console.log("notice_title:",notice_title);
    // console.log("notice_coment:",notice_coment);
    // console.log("notice_date:",notice_date);

    db.query(`update notice set notice_title =?, notice_date = ?, notice_coment=? where notice_no = ?`,
        [notice_title,notice_date, notice_coment, notice_no], (error, result) => {
            if(error){
                console.log('공지사항 수정 중 오류 발생');
                return res.status(500).json({ error:'error'});
            }
            res.json(result);
        }
    );
});
//공지사항 삭제
router.post('/deletenotice', (req,res) => {
    const notice_no = req.body.notice_no;

    db.query(`delete from notice where notice_no = ?`,[notice_no], (error,result) => {
        if(error){
            console.log('공지사항 삭제 중 오류 발생');
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