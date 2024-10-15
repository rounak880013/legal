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
  // Extract the search string from query parameters or request body
  const search_string = req.query.search_string || req.params.search_string || req.body.search_string;

  try {
    // Find a single blog post that matches the search string
    const blogPost = await Blog.findOne({
      "search_string": search_string
    });

    // If no blog post is found, return a 404 error
    if (!blogPost) {
      return res.status(404).send('No blog post found.');
    }

    console.log("Blog post found:", blogPost);

    // Render the blog page and pass the blog data to the view
    res.render('blog_page', { blogPost });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).send('Internal Server Error.');
  }
};

const blog_home_page = async (req, res) => {

  try {
    const categories = [
      {
        name: 'Technology',
        slug: 'technology',
        description: 'Latest trends and insights in technology.',
        imageUrl: '/images/tech.jpg'
      },
      {
        name: 'Finance',
        slug: 'finance',
        description: 'Stay updated with the financial world.',
        imageUrl: '/images/finance.jpg'
      },
      {
        name: 'Health',
        slug: 'health',
        description: 'Tips and articles on health and wellness.',
        imageUrl: '/images/health.jpg'
      }
    ];
    res.render('blog_home',{categories});
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).send('Internal Server Error.');
  }
};

const get_category_blogs = async (req, res) => {

  try {
    const category = req.query.category || req.params.category || req.body.category;
    // const blogPosts = await Blog.find({ category: category })
    // .sort({ created_at: -1 }) // Sort by created_at in descending order (latest first)
    // .limit(100);
    const blogPosts = [
      {
        title: 'Understanding AI in 2024',
        slug: 'understanding-ai-2024',
        excerpt: 'Explore the latest advancements in artificial intelligence this year.',
        imageUrl: '/images/ai.jpg',
        created_at: new Date(),
        category:category
      },
      {
        title: 'The Future of Finance',
        slug: 'future-of-finance',
        excerpt: 'How technology is reshaping the financial sector.',
        imageUrl: '/images/finance.jpg',
        created_at: new Date(),
        category:category
      }
      // Add more posts...
    ];
    
    res.render('blog_category',{
      categoryName: category,
      blogPosts: blogPosts
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).send('Internal Server Error.');
  }
};

module.exports = {
  save_blogs,
  get_blogs,
  blog_home_page,
  get_category_blogs
};
