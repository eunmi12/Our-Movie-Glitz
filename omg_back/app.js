const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

// 환경 변수를 로드합니다.
dotenv.config();


app.use(cors({      // cors 설정을 해줘야 front 서버와 통신 가능
    origin: 'http://localhost:8081',
    credentials: true,
}));

app.use(session({
    secret: process.env.COOKIE_SECRET, // 세션 암호화에 사용할 키
    resave: false, // 변경 사항이 없어도 세션을 다시 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션도 저장할지 여부
    cookie: { secure: false } // true로 설정하면 HTTPS에서만 작동
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const movieRouter = require('./routes/movie.js');
const adminRouter = require('./routes/admin.js');
const storeRouter = require('./routes/store.js');

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/movie', movieRouter);
app.use('/admin', adminRouter);
app.use('/store', storeRouter);

// 테스트 라우트 추가


  


app.listen(3000, function() {
    console.log('Server Running at http://localhost:3000');
});