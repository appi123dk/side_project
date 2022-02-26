const express = require('express');
const router = express.Router();
const models = require('../models');

//passport login
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../helpers/passwordHash');


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

        if (!user) {
            return done(null, false, { message: '일치하는 아이디 패스워드가 존재하지 않습니다.' });

        } else {
            return done(null, user.dataValues);
        }

    }
));

// router + controller
router.get('/', (_, res) => {
    res.send('account app');
});

router.get('/join', (_, res) => {
    res.render('accounts/join.html');
});

router.post('/join', async (req, res) => {
    try {

        const user = models.Users.findOne({
            where: {
                username: req.body.username
            }
        });

        await models.Users.create(req.body);
        res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');
        

    } catch (e) {
        console.log(e);
        res.send('<script>alert("에러가 감지되었습니다");location.href="/accounts/join";</script>');
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

module.exports = router;