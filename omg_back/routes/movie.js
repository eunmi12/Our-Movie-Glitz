const express = require('express');
const router = express.Router();
const db = require('../db.js');
const fs = require('fs');
const multer = require('multer');
const path = require("path");
const app = express();



//승호작성

// const upload = multer({
//     storage: multer.diskStorage({
//       	filename(req, file, done) {
//           	console.log(file);
// 			done(null, file.originalname);
//         },
// 		destination(req, file, done) {
//       		console.log(file);
// 		    done(null, path.join(__dirname, "public"));
// 	    },
//     }),
//   	// 추가된 속성
// 	limits: { fileSize: 0 },
// });

// const uploadMiddleware = upload.array("images");
// app.post("/upload", uploadMiddleware, (req, res) => {
//   console.log(req.files);
//   res.status(200).send("uploaded");
// });

router.post('/createMovie',(req,res)=>{

    // console.log('req.body : ', req.body);

    
    const data = {
        movie_startdate : req.body.startdate,
        movie_enddate : req.body.enddate,
        movie_tag : req.body.genre,
        movie_comment : req.body.detail,
        movie_title : req.body.title,
        movie_director : req.body.director,
        movie_actor : req.body.actor,
        movie_img0 : req.body.poster,
        movie_age : req.body.age
    };
    console.log('data : ', data);

    const sql = `INSERT INTO movie (movie_startdate,movie_enddate,movie_tag,movie_comment,movie_title,movie_director,movie_actor,movie_img0,movie_age) values (?,?,?,?,?,?,?,?,?);`
     db.query(sql,[data.movie_startdate,data.movie_enddate,data.movie_tag,data.movie_comment,data.movie_title,data.movie_director,data.movie_actor,data.movie_img0,data.movie_age],(err,results)=>{
        if (err) {
            res.status(500).send(err);
            console.log(err);
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
//영화 상세페이지
router.post('/movie/:movie_no', (req,res) => {
    const movie_no = req.params.movie_no;

    db.query(`select movie_no, date_format(movie_startdate, '%y-%m-%d') as movie_startdate, 
        movie_tag, movie_comment, movie_title, movie_director, movie_actor, 
        movie_img0, movie_img1, movie_img2, movie_img3, movie_img4, movie_img5, movie_age 
        from movie  where movie_no =?`,[movie_no], (error,result) =>{
        if(error){
            console.log("영화 정보 불러오는 도중 에러 발생");
            return res.status(500).json({ error: 'error'});
        }
        return res.json(result);
    })
    
    
});
//영화 상세-리뷰보기
router.post('/getmoviereview', (req,res) => {
    const movie_no = req.body.movie_no;
    
    //리뷰 좋아요누를때 유저넘버 필요해서 re_user_no 추가
    db.query(`select re_user_no, review_no, review_comment, review_rate,review_like,review_rate,user_name, 
            date_format(review_date, '%y-%m-%d') as review_date from review r
            left join user u on r.re_user_no = u.user_no
            left join movie m on r.re_movie_no = m.movie_no
            where movie_no = ?`, [movie_no], (err,result)=>{
                if(err){
                    console.log('영화 리뷰 불러오는 중 에러 발생');                    
                    return res.status(500).json({ err:'error'});
                }
                return res.json(result);
            })
});

//리뷰 좋아요 증가
router.post('/incrementreviewlike', (req,res)=>{
    const review_no = req.body.review_no;
    
    db.query(`update review set review_like = review_like + 1 where review_no = ?`, [review_no], (err,result) =>{
        if(err){
            console.log('리뷰 좋아요 증가 중 에러 발생');
            return res.status(500).json({ err:'error'});
        }
        return res.json(result);
    });
});

//영화 위시리스트 추가
router.post('/insertwish', (req,res) => {
    const wish_movie_no = req.body.wish_movie_no;
    const wish_user_no = req.body.wish_user_no;
    console.log("movie_no", wish_movie_no);
    console.log("user_no", wish_user_no);
    
    

    db.query(`select wish_no from wish where wish_movie_no = ? and wish_user_no = ?`,[wish_movie_no, wish_user_no], (err, result) => {
        if(result.length <= 0){
            db.query(`insert into wish (wish_movie_no,wish_user_no) values (?,?)`, [wish_movie_no, wish_user_no], (err, results) =>{
                if(err){
                    console.log('위시리스트 추가 중 에러 발생');
                    return res.status(500).json({ err:'error'});
                    
                } return res.json({ message: '위시리스트에 추가되었습니다.',results});
            });
        } else{
            return res.json({ message: ' 이미 위시리스트에 존재합니다. '});
        }
    });
});

//은미작성 완

//재영작성
router.get('/movielist/:tag', (req, res) => {
    const movie_tag = req.params.tag;
    const sql = `
      SELECT m.movie_no, m.movie_img0, m.movie_title, ROUND(AVG(r.review_rate), 1) AS review_rate, m.movie_cnt
      FROM movie m
      LEFT JOIN review r ON m.movie_no = r.re_movie_no
      WHERE m.movie_tag LIKE ?
      GROUP BY 
        m.movie_no, 
        m.movie_img0, 
        m.movie_title, 
        m.movie_cnt
      ORDER BY m.movie_cnt DESC
      LIMIT 3;
    `;
    // 'movie_tag'를 포함하는 모든 영화 검색
    const tagSearch = `%${movie_tag}%`;
    db.query(sql, [tagSearch], (err, results) => {
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
router.post('/cinemas', (req, res) => {
    const { movie_no } = req.body
    // db.query(`select cinema_name from cinema c
    //         join screen s on s.sc_cinema_no = c.cinema_no
    //         where sc_available = 1
    //         GROUP BY cinema_no, movie_no;`, (error, results) => {
        db.query(`select distinct cinema_no, cinema_name, movie_no
                from screen
                join cinema on cinema_no = sc_cinema_no
                join movie on movie_no = sc_movie_no
                where  movie_no = ?`, [movie_no], (error, results) => {
        if (error) {
            return res.status(500).json({ error: '상영관 목록을 불러올 수 없습니다.' });
        }
        return res.json(results);
    });
});
// 영화 예매 - 예매 날짜 조회 
router.post('/availableDates', (req, res) => {

    console.log("req.body: --->",req.body);
    const sc_movie_no = req.body.movie_no;
    const sc_cinema_no = req.body.cinema_no;
    // const { movie_no, cinema_no } = req.body;
    // console.log(req.body);
    // const today = new Date();
    // const tomorrow = new Date(today);
    // tomorrow.setDate(today.getDate() + 1);
    // const tomorrowString = tomorrow.toISOString().split('T')[0];
    const query = `select distinct screen_date from screen where sc_movie_no = ? and sc_cinema_no = ?`;
    db.query(query, [sc_movie_no, sc_cinema_no], (error, results) => {

        if(error) {
            return res.status(500).json({ error: '예매 가능한 날짜를 불러올 수 없습니다.' });
        }
        return res.status(200).json(results);
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
    console.log("/availableTimes",req.body);
    // const { movie_no, cinema_no, date } = req.body;
    // console.log('rerererere', req.body);
    // const now = new Date();
    // const currenHour = now.getHours();
    // const date = req.body.date
    // const ddate = date.toString().split('T')[0];
    const query = `select distinct screen_starttime, screen_endtime from screen where sc_movie_no = ? and sc_cinema_no = ?`;
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
// 앞단계 정보 저장
router.post('/saveinfo', (req, res) => {
    console.log("req.body:---->",req.body);
    db.query(`insert into reservation (movie_no, cinema_no, date, time, user_no) values (?, ?, ?, ?, ?)`, [req.body.movie_no, req.body.cinema_no, req.body.date, req.body.time, req.body.user_no], (error, results) => {
        if (error) {
            return res.status(500).json({ error: '저장 error' });
        }
        return res.status(200).json({ message: '저장이 완료되었습니다.' });
    })
})
// router.post('/selectseats', (req, res) => {
//     db.query(`select * from seat where seat_cinema_no = ?;`, (error, results) => {
//         if (error) {
//             console.log('좌석 조회 에러');
//             return res.status(500).json({ error: '좌석 조회 에러' });
//         }
//             return res.json(results);
//      });
// });
router.post('/seats', (req, res) => {
    // console.log('뭐가문제', req.body);
    const { movie_no, cinema_no, date, time } = req.body;

    const query = `select seat_no, seat_name, seat_reserve, seat_screen_no, screen_no
                        from seat s
                        join screen sc on sc.screen_no = s.seat_screen_no
                        where screen_no =
                            (select screen_no 
                                from screen
                                where sc_movie_no = ? and sc_cinema_no = ?  and screen_date = ? and  screen_starttime = ? )`
    // const query = `select seat_no, seat_name, seat_reserve from seat where movie_no = ? and cinema_no = ? and date = ? and time = ?`
    db.query(query, [movie_no, cinema_no, date, time], (error, results) => {
        if (error) {
            console.error('에러 시트 목록 조회', error);
            return res.status(500).json({ message: '좌석 정보를 불러오는 중 오류발생' });
        }
        return res.status(200).json(results);
    });
});
// router.post('/seats', (req, res) => {
//     // console.log(req.body);
//     const { movie_no, cinema_no, date, time } = req.body;

//     if(!movie_no || !cinema_no || !date || !time) {
//         console.error('요청값을 찾을 수 없음');
//         res.status(400).json({ message: '요청값을 찾을 수 없음' });
//         return;
//     }
//     const query = `select s.seat_name, s.seat_reserve
//                     from screen sc
//                     join movie m on m.cinema_no = s.seat_cinema_no
//                     join seat s on s.seat_cinema_no = sc.sc_cinema_no
//                     where m.movie_no = ? and s.seat_cinema_no = ? and m.date = ? and m.time = ?`;
//     db.query(query, [movie_no, cinema_no, date, time], (error, results) => {
//         if (error) {
//             console.error('좌석 가져오기 에러', error);
//             res.status(500).json({ message: error.message });
//         } else {
//             res.json(results);
//         }
//     });
// });
// 좌석 예약 상태 업데이트
// router.post('/reserve', (req, res) => {
//         const { bookingDetails } = req.body;
//         console.log('외않되', req.body);
//         const seatNumbersString = bookingDetails.join(',');
//         // const placeholders = seatNumbersS.join(',')
//         // console.log('플홀', placeholders);
//         const query = `UPDATE seat SET seat_reserve = 0 WHERE seat_no = ?`;

//         db.query(query, [seatNumbersString], (error, results) => {
//             console.log(seatNumbersString);
//             if(error) {
//                 console.error('좌석 선택 에러', error);
//                 res.status(500).json({ message: error.message });
//             } else if (results.affectedRows > 0) {
//                 const selectQuery = `select seat_name from seat`;
//                 db.query(selectQuery, [seatNumbersString], (selectError, selectResults) => {
//                     if (selectError) {
//                         console.error('좌석 상태 업데이트 후 조회 에러', selectError);
//                         res.status(500).json({ message: selectError.message });
//                     } else {
//                         res.json(selectResults);
//                     }
//                 });
//             } else {
//                 res.status(404).json({ message: '좌석을 찾을 수 없습니다.' });
//             }
//     });
// });
// 영화 예매 - 예매 완료
router.post('/book', (req, res) => {
    const { date, time, seatName, movie_no, cinema_no, user_no, total_price, seat_no } = req.body;
    console.log(req.body);
    console.log(seat_no);
    
    //const values = seatNumbers.map(seat_no => [total_price, date+' '+time, user_no, movie_no, seats, cinema_no]);
    //console.log('va', values);
    // const reservationsql = `select * from reservation where user_no = ? and movie_no = ?;`
    // db.query(reservationsql, (error, results) => {
    //     if(error) {
    //         return res.status(500).json({ error: '가져오기 error' });
    //     } return res.status(200).json({ message: '정보 가져옴' });
    // });
    const ticket_cnt = seatName.length;
    const seatNumbersString = seatName.join(',');
    const query = `insert into ticket (ticket_total_price, ticket_date, ticket_time, ticket_user_no, ticket_movie_no, ticket_seat, ti_se_cinema_no, ticket_cnt)
                    values (?, ?, ?, ?, ?, ?, ?, ?)`;
    // const values = seats.map(seat_no => [movie_no, cinema_no, date, time, seat_no]);

    db.query(query, [total_price, date, time, user_no, movie_no, seatNumbersString, cinema_no, ticket_cnt], (error, results) => {
        if (error) {
            return res.status(500).json({ error: '예매 error' });
        }
        return res.status(200).json({ message: '예매가 완료되었습니다.' });

    });
});

router.post('/reserve', (req, res) => {
    console.log(req.body.seatNumbers);
    console.log("req.body:------->",req.body);
    db.query(`update seat set seat_reserve = 0 where seat_no in (?)`, [req.body.seatNumbers], (error, results) => { // 쿼리에서 in (?) : 여러개의 값을 넣을 수 있음
        if(error) {
            return res.status(500).json({ error: '좌석저장 error' });
        } return res.status(200).json({ results });
    });
});


// 예매완료 - 결제
router.get('/payment/:ticket_no', (req, res, next) => {
    const ticket_no = req.params.ticket_no;
    db.query(`select t.ticket_no, t.ticket_total_price, t.ticket_date, t.ticket_time, t.ticket_cnt, t.ticket_movie_no, t.ticket_seat, t.ti_se_cinema_no , t.ticket_user_no, m.movie_title 
                from ticket t
                join movie m on m.movie_no = t.ticket_movie_no
                where ticket_no = ?`, [ticket_no], (error, results, fields) => {
        if(error) {
            console.log(error);
            return res.status(500).json({ error: "예매 정보 불러오기 실패" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "티켓 정보를 찾을 수 없습니다." });
        }
        return res.status(200).json(results);
    });
});
// router.get('/getTitle/:movie_no', (req, res, next) => {
//     const movie_no = req.params.movie_no;
//     console.log('영화넘버?', movie_no);

//     db.query(`select movie_title from movie where movie_no = ?`, [movie_no], (err, results) => {
//         if(err) {
//             console.error('에러?', err);
//             return res.status(500).json({ message: "영화이름 가져오기 실패" });
//         } console.log('결과?', results);
//         if (results.length === 0) {
//             return res.status(404).json({ message: "영화이름을 찾을 수 없습니다." });
//         } else {
//             return res.status(200).json(results);
//         }
//     });
// });
router.post('/ticketNo', (req, res) => {
    // console.log(req.body.user_no);
    // console.log(req.body.movie_no);
    // console.log(req.body.cinema_no);
    // console.log(req.body.date);
    // console.log(req.body.time);
    // console.log(req.body.seatName);
    db.query(`select ticket_no from ticket
            where ticket_user_no = ? and ticket_movie_no = ? and ti_se_cinema_no = ? and ticket_date = ? and ticket_time = ? and ticket_seat = ?`, 
            [req.body.user_no, req.body.movie_no, req.body.cinema_no, req.body.date, req.body.time, req.body.seatName.join()], (err, results) => { // 묶어서 받아온게 안될 때는 받아온 값을 하나씩 풀어서 받아보자
                // 배열을 문자열로 받아주는 함수가 join()
                if (err) {
                    return res.status(500).json({ error: '티켓넘버 호출 오류' });
                } return res.status(200).json(results); //results에 결과값 저장 필수
    });
});
// 결제 - 이니시스
router.post('/initiatePayment', async(req, res) => {
    const { ticket_no, movie_title, ticket_cnt, ticket_total_price, how } = req.body;

    try {
        // 이니시스 결제 요청을 위한 데이터 준비
        const paymentData = {
            // 이니시스 결제 API에 필요한 데이터 (상세는 이니시스 문서 참조)
            // 예 : amount, order_id, return_url 등
            amount: calculateAmount(), // 금액 계산 함수
            order_id: ticket_no,
            return_url: `http://localhost:8081/`, // 결제 후 리다이렉트 할 URL
            payment_method: how,
            payment_title: movie_title,
            payment_cnt: ticket_cnt,
            payment_price: ticket_total_price,
        };
        // 이니시스 결제 API 호출
        const response = await axios.post(`http://api.inicis.com/payments`, paymentData);
        // 결제 페이지 URL 반환
        res.json({ paymentUrl: response.data.paymentUrl });
    } catch (error) {
        console.error('이니시스 결제 API 오류:', error);
        res.status(500).send('결제 요청 오류');
    } return res.status(200).json(response); // ?
})

//아름작성 완

//회창작성

//회창작성 완





module.exports = router;