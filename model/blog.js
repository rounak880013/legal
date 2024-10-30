const mongoose = require('mongoose');

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
  },
  h1: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Array of strings
    default: [], // Default is an empty array
  },
  search_string: {
      type: String,
      trim: true,
      unique: true,
  },
  meta: {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    keywords: {
      type: String,
      trim: true,
    },
    robots: {
      type: String,
      trim: true,
    },
    canonicalUrl: {
      type: String,
      trim: true,
    },
    ogTitle: {
      type: String,
      trim: true,
    },
    ogDescription: {
      type: String,
      trim: true,
    },
    ogImageUrl: {
      type: String,
      trim: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default to current date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Default to current date
  },
  published: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

// Create the Blog model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
