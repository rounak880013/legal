const express = require('express');
const multer = require("multer");
// const blogController = require('../controller/home')
const practiceArea =require("../constants/practiceArea")
const homePageController = require('../controller/homePageController');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});


router.post('/apply',upload.single('resume'),homePageController.submit_job_application);

router.get('/',(req,res)=>{
    res.render('practiceArea/practice_homepage',{
      "practiceArea":practiceArea.practiceArea
    });
})

router.get('/:area_name', homePageController.get_practice_area_data);

module.exports = router;