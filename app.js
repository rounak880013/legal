const express = require("express");
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
// const getRoutes = require('./getRoutes');
const cors = require("cors");
const path = require('path');
// const metadata = require('./metadata');
// const prerender = require('prerender-node');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

let port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/contact-us',(req,res)=>{
    res.render('contact_us');
})

app.listen(port, function () {
    // generateSitemap()
    console.log(`Server is listening on port ${port}`);
  });