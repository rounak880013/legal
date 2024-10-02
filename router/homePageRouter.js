const express = require('express');
// const blogController = require('../controller/home')
const homePageController = require('../controller/homePageController');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('practiceArea/practice_homepage');
})

router.get('/:area_name', homePageController.get_practice_area_data);

module.exports = router;