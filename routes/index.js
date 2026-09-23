const router = require('express').Router();
router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //swagger-tags=['Hello World']
    res.send("hello World")
});
    
router.use('/artists', require('./artists'));
module.exports = router;

// const router = require('express').Router();
// router.get('/', (req, res) => (res.send("hello World")));
// module.exports = router;