const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Blog = require('../model/blog'); // Adjust path to your Blog model

// MongoDB connection setup
const dbURI = ''; // Update with your MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

async function scrapeAndUpdateBlog(url, search_string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate to the URL
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Scrape metadata
        const metaData = await page.evaluate((cononical_url) => {
            const getMetaTagContent = (name) => document.querySelector(`meta[name="${name}"]`)?.content || '';
            const getOgTagContent = (property) => document.querySelector(`meta[property="${property}"]`)?.content || '';

            return {
                meta: {
                    title: getMetaTagContent('title') || document.title,
                    description: getMetaTagContent('description'),
                    keywords: getMetaTagContent('keywords'),
                    robots: getMetaTagContent('robots'),
                    canonicalUrl: cononical_url,
                    ogTitle: getOgTagContent('og:title'),
                    ogDescription: getOgTagContent('og:description'),
                    ogImageUrl: getOgTagContent('og:image')
                }
            };
        });

        // Scrape the main content (if there’s a recognizable pattern for tags)
        const blogContent = await page.evaluate(() => {
            const tags = Array.from(document.querySelectorAll('.tags a')).map(tag => tag.innerText.trim()) || [];
            return { tags };
        });

        // Combine the scraped metadata and tags
        const updateData = {
            ...metaData,
            ...blogContent,
            updatedAt: new Date(), // Set the updated time
        };

        // Find and update the blog by search_string
        const result = await Blog.findOneAndUpdate(
            { search_string },  // Filter
            { $set: updateData }, // Update
            { new: true } // Return the updated document
        );

        if (result) {
            console.log('Blog updated:', result);
        } else {
            console.log('No blog found with the provided search_string.');
        }

    } catch (error) {
        console.error('Error scraping or updating blog data:', error);
    } finally {
        await browser.close();
    }
}

// Example usage
const url = 'https://sjcolegal.com/how-to-in-corporate-buisness-in-india';
const search_string = 'how-to-in-corporate-buisness-in-india';
const cononical_url="https://sjcolegal.com/blogs/companies_act_1973/how-to-in-corporate-buisness-in-india";
scrapeAndUpdateBlog(url, search_string,cononical_url);
