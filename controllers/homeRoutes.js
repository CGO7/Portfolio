const router = require('express').Router();


router.get('/', (req, res) => {
  
    res.render('homepage');
 }); 

router.get('/contact', (req, res) => {
  
    res.render('contact');
 }); 

 router.get('/portfolio', (req, res) => {
  
    res.render('portfolio');
 
 });

module.exports = router;


module.exports = router;