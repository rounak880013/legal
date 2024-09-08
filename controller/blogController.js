const Blog = require("../model/blog"); // Import the Blog model

const save_blogs = async (req, res) => {
  try {
    const {
      title,
      h1,
      content,
      category,
      subCategory,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaRobots,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImageUrl,
      tags,
      imageUrl,
    } = req.body;

    // Create a new blog instance
    const newBlog = new Blog({
      title,
      h1,
      content,
      category,
      sub_category: subCategory, // Note the naming
      tags: tags.split(",").map((tag) => tag.trim()), // Split the tags by comma and trim them
      meta: {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        robots: metaRobots,
        canonicalUrl,
        ogTitle,
        ogDescription,
        ogImageUrl,
      },
      imageUrl,
      published: req.body.published === "on", // Handle checkbox value
    });

    // Save the new blog post
    const savedBlog = await newBlog.save();

    // Respond back
    res.status(201).json({
      message: "Blog created successfully!",
      blog: savedBlog,
    });
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({
      message: "Failed to create blog",
      error,
    });
  }
};

const get_blogs = async (req, res) => {
    // Extract the search string from query parameters
    const search_string = req.query.search_string || req.params.search_string || req.body.search_string;
  
    try {
      // Find blog posts that match the search string (e.g., search by title or content)
      const blogPosts = await Blog.find({
        "search_string":search_string
        });
  
      if (blogPosts.length === 0) {
        return res.status(404).send('No blog posts found.');
      }
  console.log(blogPosts);
      // Render the blog page and pass the blog data to the view
      res.render('blog_page', {blogPosts });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).send('Internal Server Error.');
    }
  };

module.exports = {
  save_blogs,
  get_blogs
};
