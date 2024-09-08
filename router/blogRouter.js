// blogRouter.js
const express = require('express');
const blogController = require('../controller/blogController')
const Blog = require('../model/blog'); // Import the Blog model
const router = express.Router();


router.get('/edit-blog',(req,res)=>{
  res.render('edit_blog', { blog: null });
})

router.post('/new',blogController.save_blogs);

// Route to get a blog by ID
router.get('/:category/:subcategory/:search_string', blogController.get_blogs);

module.exports = router;