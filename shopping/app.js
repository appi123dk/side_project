// sudo npm install -g nodemon 
// -g 글로벌 설치 -> 시스템 전체적으로 서버가 작동하는 파일을 감지하여 변화된 내용 출력
// 서버를 내렸다 닫을 필요 없음

// MVC Module load
const express = require('express');
const nunjucks = require('nunjucks');

// Model - View connecting module
const logger = require('morgan');
const bodyParser = require('body-parser');

// Cookie Security Module ( CSRF )
const cookieParser = require('cookie-parser');

//flash message
const flash = require('connect-flash');

//passport login
const passport = require('passport');
const session = require('express-session');

// db folder load
const db = require('./models');
const Sentry = require('@sentry/node');




// DB authentication
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // return db.sequelize.sync();
    })
    .then(() => {
        console.log('DB Sync complete.');
        // require('./config/insertDummyData.js')();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// root route
const home = require('./routes/home.js')

// admin route module load
const admin = require('./routes/admin.js');
const contacts = require('./routes/contacts.js');
const accounts = require('./routes/accounts.js');
const auth = require('./routes/auth.js');
const chat = require('./routes/chat.js');
const cart = require('./routes/cart.js');
const checkout = require('./routes/checkout.js');


const app = express();
const port = 3000;

nunjucks.configure('template', {
    autoescape: true,
    express: app
});

// Middleware setup

// 개발모드에서만 logging 한다
if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Static folder setup
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/static', express.static('static'));

//session setup
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//session 관련 셋팅
const sessionMiddleWare = session({
    secret: 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60 //지속시간 2시간
    },
    store: new SequelizeStore({
        db: db.sequelize
    }),
});
app.use(sessionMiddleWare);

//passport setup
app.use(passport.initialize());
app.use(passport.session());

// 전체 글로벌 변수 세팅
app.use( (req, res, next) => {
    // app.locals.mypage = "nodejs";  // 모든 페이지에서 mypage라는 변수 사용이 가능
    app.locals.isLogin = req.isAuthenticated();
    if (req.isAuthenticated()){
        app.locals.loginUser = req.user;
    }
    app.locals.req_path = req.path;
    app.locals.req_query = req.query;
    next();
})

// flash setup
app.use(flash());

// URL setup
app.use('/', home);
app.use('/admin', admin);
app.use('/contacts', contacts);
app.use('/accounts', accounts);
app.use('/auth', auth);
app.use('/chat', chat);
app.use('/cart', cart);
app.use('/checkout', checkout);


app.get('/', function (req,res) {
    res.send('소비자사이드 메인페이지');
});

const server = app.listen(port, function(){
    console.log('Express listening on port', port);
});

const listen = require('socket.io');
const io = listen(server);

io.use( (socket, next) => {
    sessionMiddleWare(socket.request, socket.request.res, next);
});
// const socketConnection = require('./helpers/socketConnection.js');
// socketConnection(io);
require('./helpers/socketConnection')(io);



app.use((err, req, res, _) => {
    res.status(404).render('common/404.html')

    if (process.env.NODE_ENV == 'production') {
        this.app.use((err, req, res, _) => {
            res.status(500).render('common/500.html')
        });
    }

    Sentry.init({ dsn: 'https://a9b3b99ff3144eec99507d06e9992ca9@o402789.ingest.sentry.io/5264468' });
    Sentry.Handlers.requestHandler();
    Sentry.Handlers.errorHandler();
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});
