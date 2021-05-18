const router = require('express').Router();


const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/contact', homeRoutes)


module.exports = router;