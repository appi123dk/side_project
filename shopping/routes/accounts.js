const express = require('express');
const router = express.Router();
const models = require('../models');

//passport login
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../helpers/passwordHash');

//리캡차
const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(process.env.RECAPCHA_SITE_KEY, process.env.RECAPCHA_SECRET_KEY);


passport.serializeUser( (user, done) => {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser( (user, done ) => {
    // 세션시 예민한 정보 (패스워드같은) 를 미리 삭제시켜주는 과정, 방법 1
    const result = user;
    result.password = "";
    console.log('deserializeUser');
    done(null, result);
});

passport.use(new LocalStrategy({
    usernameField: 'username', // form field name
    passwordField: 'password',
    passReqToCallback: true
},
    async (req, username, password, done) => {

        const user = await models.Users.findOne({
            where: {
                username,
                password: passwordHash(password),
            },
            // 세션시 예민한 정보 (패스워드같은) 를 미리 삭제시켜주는 과정, 방법 2
            attributes: { exclude: ['password'] }
        });

        // 유저에서 조회되지 않을 경우
        if (!user) {
            return done(null, false, { message: '일치하는 아이디 패스워드가 존재하지 않습니다.' });

        // 이메일인증이 되어있지 않을 경우
        } else if (user.status == "이메일미인증") {
            return done(null, false, { message: '이메일 인증을 진행해주세요.' });

        // 세션으로 데이터 넘김
        } else {
            return done(null, user.dataValues);
        }

    }
));

// router + controller
router.get('/', (_, res) => {
    res.send('account app');
});

router.get('/join', recaptcha.middleware.render,(req, res) => {
    res.render('accounts/join.html', {
        // csrfToken: req.csrfToken(),
        captcha: res.recaptcha,
        flashMessage: req.flash().error
    });
});

router.post('/join', recaptcha.middleware.verify ,async (req, res) => {

    if (req.recaptcha.error) {
        return res.send('<script> \
                alert("로봇이 아닙니다를 체크해주세요."); \
                history.go(-1); \
            </script>')
    }
    try {

        // const user = models.Users.findOne({
        //     where: {
        //         username: req.body.username
        //     }
        // });

        // await models.Users.create(req.body);
        // res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');
        // ------------------------------------------
        // SendGrid로 이메일 인증 구현

        const user = await models.Users.create({
            username: req.body.username,
            displayname: req.body.displayname,
            password: req.body.password,
            status: "이메일 미인증",
        });

        // 인증키 생성후 DB삽입

        const hash_key = require('../helpers/genKey')(user.id);

        await models.EmailKey.create({
            hash_key,
            user_id: user.id 
        });

        // 인증메일 발송
        const template = require('../helpers/email/joinTemplate');
        const sigin_up_url = `${process.env.SITE_DOMAIN}/accounts/join/validate?hash_key=${hash_key}`;

        await require('../helpers/email/sendMail')({
            to: user.username,
            subject: "패캠쇼핑몰 가입 인증메일 입니다.",
            mail_body: template(sigin_up_url)
        });

        res.redirect(`/accounts/join/check?email=${user.username}`);
        

    } catch (e) {
        console.log(e);
        res.send('<script>alert("에러가 감지되었습니다");location.href="/accounts/join";</script>');
    }
});

router.get('/join/validate', async(req,res) => {
    try {
        // 인증키에 일치하는 아이디를 받아온다
        const active = await models.EmailKey.findOne({
            where: {
                hash_key: req.query.hash_key
            }
        });

        // if (!active) {
        //     // 존재하지 않는 키값일시 또는 실수로 상단 주소를 지웠을 경우
        //     return require('../../helpers/show404template')(res);
        // }

        // 사용자 상태를 이메일 인증으로 바꾼다
        await models.Users.update({
            status: "이메일인증완료"
        }, {
            where: { id: active.user_id }
        });


        const user = await models.Users.findByPk(active.user_id);


        res.render('accounts/email_active.html', { email: user.username });




    } catch (e) {


    }
});

router.post('/join/id_verification', async (req, res) => {
    try {
        const username = req.body.data
        const user = await models.Users.findOne({
            where : {
                username: username
            }
        });

        res.send({result: user});

    } catch (e) {
        console.log(e);
    }
});

router.get('/login', (req, res) => {
    res.render('accounts/login.html', {flashMessage: req.flash().error});
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/accounts/login',
        failureFlash: true
    }),
    (_, res) => {
        res.send('<script>alert("로그인 성공");location.href="/";</script>');
    }
);

router.get('/success', (req, res) => {
    res.send(req.user);
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/accounts/login');
});

router.get('/join/check', (req,res) => {
    res.render('accounts/email_check.html', { email: req.query.email });
});

module.exports = router;