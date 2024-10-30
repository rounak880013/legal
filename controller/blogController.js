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
    let search_string="how-to-in-corporate-buisness-in-india";
    console.log(req.body);
    // Create a new blog instance
    const newBlog = new Blog({
      title,
      h1,
      content,
      category,
      search_string:search_string,
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
        name: 'Companies Act,1973',
        slug: 'companies_act_1973',
        description: 'Overview of the Companies Act of 1973.'
      },
      {
        name: 'Criminal Procedure Code,1973',
        slug: 'criminal_procedure_code_1973',
        description: 'Insights into the Criminal Procedure Code of 1973.'
      },
      {
        name: 'Civil Procedure,1908',
        slug: 'civil_procedure_1908',
        description: 'A look into the Civil Procedure Act of 1908.'
      },
      {
        name: 'Civil Procedure,1908',
        slug: 'civil_procedure_1908',
        description: 'An overview of the Civil Procedure Act of 1908.'
      },
      {
        name: 'Other laws',
        slug: 'other_laws',
        description: 'Various laws and acts of importance.'
      },
      {
        name: 'Family law',
        slug: 'family_law',
        description: 'Principles and cases in family law.'
      },
      {
        name: 'Intellectual Property Rights',
        slug: 'intellectual_property_rights',
        description: 'Introduction to intellectual property rights.'
      },
      {
        name: 'Business Law',
        slug: 'business_law',
        description: 'An overview of business law principles.'
      },
      {
        name: 'Transfer of Property Act',
        slug: 'transfer_of_property_act',
        description: 'Details of the Transfer of Property Act.'
      },
      {
        name: 'Evidence Act,1872',
        slug: 'evidence_act_1872',
        description: 'The key points of the Evidence Act of 1872.'
      },
      {
        name: 'Child and Women Welfare Laws',
        slug: 'child_and_women_welfare_laws',
        description: 'Laws supporting child and women welfare.'
      },
      {
        name: 'Information Technology Act',
        slug: 'information_technology_act',
        description: 'Overview of the Information Technology Act.'
      },
      {
        name: 'Indian Constitution',
        slug: 'indian_constitution',
        description: 'Fundamentals of the Indian Constitution.'
      },
      {
        name: 'Alternate Dispute Resolution',
        slug: 'alternate_dispute_resolution',
        description: 'Methods in alternate dispute resolution.'
      },
      {
        name: 'Corporate Law',
        slug: 'corporate_law',
        description: 'Introduction to corporate law concepts.'
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
    console.log(category)
    const blogPosts = await Blog.find({ category: category })
    .sort({ created_at: -1 }) // Sort by created_at in descending order (latest first)
    .limit(100);
    console.log(blogPosts)
    
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
