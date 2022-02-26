// 환경세팅
const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    if(!req.isAuthenticated()){
        res.send("<script>alert('로그인이 필요한 서비스입니다');\
        location.href='/accounts/login';</script>");
    } else {
        res.render('chat/index.html');
    }
    
});

module.exports = router;