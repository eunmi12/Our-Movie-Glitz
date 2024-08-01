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
        movie_img0 : req.body.poster,
        movie_age : req.body.age
    };
    console.log('data : ', data);

    const sql = `INSERT INTO movie (movie_startdate,movie_enddate,movie_tag,movie_comment,movie_title,movie_director,movie_img0,movie_age) values (?,?,?,?,?,?,?,?);`
     db.query(sql,[data.movie_startdate,data.movie_enddate,data.movie_tag,data.movie_comment,data.movie_title,data.movie_director,data.movie_img0,data.movie_age],(err,results)=>{
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

//은미작성 완

//재영작성
router.get('/movielist/:tag', (req, res) => {
    const movie_tag = req.params.tag;
    const sql = `
        SELECT m.movie_no, m.movie_img0, m.movie_title, r.review_rate, m.movie_cnt
        FROM movie m
        LEFT JOIN review r ON m.movie_no = r.re_movie_no 
        WHERE m.movie_tag = ?
        order by m.movie_cnt desc
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

    const query = `select distinct s.seat_no, s.seat_name, s.seat_reserve, s.seat_screen_no
                    from seat s
                    join reservation r on r.cinema_no = s.seat_cinema_no
                    join screen sc on sc.sc_cinema_no = s.seat_cinema_no
                    and r.movie_no = ? and r.cinema_no = ? and r.date = ? and screen_starttime = ?`
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
    const { date, time, seatNumbers, movie_no, cinema_no, user_no, total_price } = req.body;
    console.log(req.body);
    //const values = seatNumbers.map(seat_no => [total_price, date+' '+time, user_no, movie_no, seats, cinema_no]);
    //console.log('va', values);
    // const reservationsql = `select * from reservation where user_no = ? and movie_no = ?;`
    // db.query(reservationsql, (error, results) => {
    //     if(error) {
    //         return res.status(500).json({ error: '가져오기 error' });
    //     } return res.status(200).json({ message: '정보 가져옴' });
    // });
    const seatNumbersString = seatNumbers.join(',');
    const query = `insert into ticket (ticket_total_price, ticket_date, ticket_user_no, ticket_movie_no, ticket_seat, ti_se_cinema_no)
                    values (?, ?, ?, ?, ?, ?)`;
    // const values = seats.map(seat_no => [movie_no, cinema_no, date, time, seat_no]);

    db.query(query, [total_price, date+' '+time, user_no, movie_no, seatNumbersString, cinema_no], (error, results) => {
        if (error) {
            return res.status(500).json({ error: '예매 error' });
        }
        return res.status(200).json({ message: '예매가 완료되었습니다.' });
    });
});
router.post('/reserve', (req, res) => {
    console.log(req.body.seatNumbers);
    db.query(`update seat set seat_reserve = 0 where seat_name in (?)`, [req.body.seatNumbers], (error, results) => { // 쿼리에서 in (?) : 여러개의 값을 넣을 수 있음
        if(error) {
            return res.status(500).json({ error: '좌석저장 error' });
        } return res.status(200).json({ message: '좌석 저장 완료' });
    });
});

//아름작성 완

//회창작성

//회창작성 완





module.exports = router;