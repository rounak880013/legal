// blogRouter.js
const express = require('express');
const blogController = require('../controller/blogController')
const Blog = require('../model/blog'); // Import the Blog model
const router = express.Router();
const blogCategories = require('../constants/blogCategories');
const multer = require('multer');
const upload = multer();



router.get('/',blogController.blog_home_page);

router.get('/edit-blog',(req,res)=>{
  res.render('edit_blog', { 
    blog: null,
    category:blogCategories
  });
})

router.post('/new',upload.none(),blogController.save_blogs);

// Route to get a blog by ID
router.get('/:category/:search_string', blogController.get_blogs);

router.get('/:category', blogController.get_category_blogs);

module.exports = router;