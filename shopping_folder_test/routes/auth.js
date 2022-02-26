// 환경세팅
const express = require('express');
const router = express.Router();
const models = require('../models');

// facebook login setup
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const dotenv = require('dotenv');

dotenv.config(); // LOAD CONFIG

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new FacebookStrategy({
    // https://developers.facebook.xn--com-k94n91q appId 및 scretID 발급
    clientID: process.env.FACEBOOK_APPID, //입력하세요
    clientSecret: process.env.FACEBOOK_SECRETCODE, //입력하세요.
    callbackURL: `${process.env.SITE_DOMAIN}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email'] //받고 싶은 필드 나열
},
    async (accessToken, refreshToken, profile, done) => {
        //아래 하나씩 찍어보면서 데이터를 참고해주세요.
        //console.log(accessToken);
        console.log(profile);
        //console.log(profile.displayName);
        //console.log(profile.emails[0].value);
        //console.log(profile._raw);
        //console.log(profile._json);

        try {
            const username = `fb_${profile.id}`;

            // 존재하는지 체크
            const exist = await models.Users.count({
                where: {
                    // 아이디로 조회를 해봅니다.
                    username
                }
            });

            if (!exist) {
                // 존재하면 바로 세션에 등록
                user = await models.Users.create({
                    username,
                    displayname: profile.displayName,
                    password: "facebook"
                });
            } else {
                user = await models.Users.findOne({
                    where: {
                        username
                    }
                });
            }

            return done(null, user);

        } catch (e) {
            console.log(e);
        }

    } 
));

passport.use(new NaverStrategy({
    clientID: process.env.NAVER_APPID,
    clientSecret: process.env.NAVER_SECRETCODE,
    callbackURL: 'http://localhost:3000/auth/naver/callback',
},
    async (accessToken, refreshToken, profile, done) => {

        console.log(profile);
        const username = `naver_${profile.id}`
        try {
            const exist = await models.Users.findOne({
                where: {
                    username
                }
            });

            if (!exist) {
                user = await models.Users.create({
                    username,
                    displayname: profile.emails[0].value,
                    password: 'naver'
                })

            } else {
                user = await models.Users.findOne({
                    where: {
                        username
                    }
                });
            }
            
            return done(null, user);

        } catch (e) {
            console.log(e);
        }
        
    }
));



passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_APPID,
    // clientSecret: process.env.KAKAO_SECRETCODE,
    callbackURL: 'http://localhost:3000/auth/kakao/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    const username = `kakao_${profile.id}`
    try {
        const exist = await models.Users.findOne({
            where: {
                username
            }
        });

        if (!exist) {
            user = await models.Users.create({
                username,
                displayname: profile.displayName,
                password: 'kakao'
            })

        } else {
            user = await models.Users.findOne({
                where: {
                    username
                }
            });
        }
        
        return done(null, user);
    } catch (e) {
        console.log(e);
    }
  }
))
// passport 함수 : logout, is_authenticated, 


router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));

router.get('/facebook/callback',
    passport.authenticate('facebook',{
        successRedirect: '/',
        failureRedirect: '/auth/facebook/fail'
    })
);


//로그인 성공시 이동할 주소
router.get('/kakao/success', (req, res) => {
    res.send(req.user);
});

router.get('/kakao/fail', (req, res) => {
    res.send('kakao login fail');
});


router.get('/naver', passport.authenticate('naver', null));

router.get('/naver/callback',
    passport.authenticate('naver', {
        successRedirect: '/',
        failureRedirect: '/auth/naver/fail'
    })
)

router.get('/kakao', passport.authenticate('kakao', null));

router.get('/kakao/callback',
    passport.authenticate('kakao', {
        successRedirect: '/',
        failureRedirect: '/auth/kakao/fail'
    })
)

module.exports = router;