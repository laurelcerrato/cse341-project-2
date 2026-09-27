const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));
// router.get('/', (req, res) => {
//     //swagger-tags=['Hello World']
//     res.send("hello World")
// });
    
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));  // 👈 agrega esta línea

router.get('/login', passport.authenticate('github'), (req, res) => { });
router.get('/logout', (req, res, next) => { 
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;