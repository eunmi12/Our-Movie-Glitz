const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({      // cors 설정을 해줘야 front 서버와 통신 가능
    origin: 'http://localhost:8081',
    credentials: true,
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