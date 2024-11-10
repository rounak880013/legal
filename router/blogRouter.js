// blogRouter.js
const express = require('express');
const blogController = require('../controller/blogController')
const Blog = require('../model/blog'); // Import the Blog model
const router = express.Router();
const blogCategories = require('../constants/blogCategories');
const multer = require('multer');
const upload = multer();



router.get('/',blogController.blog_home_page);

router.get('/edit-blog',async (req,res)=>{
  let blog=null;
  if(req.query.search_string!=null){
    const search_string=req.query.search_string;
    blog = await Blog.findOne({
      "search_string": search_string
    });
  }
  console.log(blog)
  res.render('edit_blog', { 
    blog: blog,
    category:blogCategories
  });
})

router.post('/new',upload.none(),blogController.save_blogs);

router.post('/update_blog',upload.none(),blogController.update_blogs);

// Route to get a blog by ID
router.get('/:category/:search_string', blogController.get_blogs);

router.get('/:category', blogController.get_category_blogs);

module.exports = router;