const router = require('express').Router();
router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //swagger-tags=['Hello World']
    res.send("hello World")
});
    
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));  // 👈 agrega esta línea
module.exports = router;