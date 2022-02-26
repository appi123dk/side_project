module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/accounts/login')
    } else {
        if(req.user.username !== 'admin') {
            res.send('<script>alert("관리자만 접근 가능합니다");\
            location.href="/";</script>');
        } else {
            return next();
        }
    }
}