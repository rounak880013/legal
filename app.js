const express = require("express");
const connect = require("./dbconnect");
const blogRouter = require("./router/blogRouter")
const homePageRouter = require("./router/homePageRouter")
const practiceArea =require("./constants/practiceArea")
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
// const getRoutes = require('./getRoutes');
const cors = require("cors");
const path = require('path');
// const metadata = require('./metadata');
// const prerender = require('prerender-node');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

let port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/blogs', blogRouter);

app.get('/',(req,res)=>{
    res.render('home',{
      "homePagePracticeArea":practiceArea.homePagePracticeArea
    });
})

app.get('/contact-us',(req,res)=>{
    res.render('contact_us');
})


app.get('/career',(req,res)=>{
    res.render('career', { blog: null });
});

app.use('/practice-area',homePageRouter)

app.use('/api',homePageRouter)

app.listen(port, function () {
    // generateSitemap()
    console.log(`Server is listening on port ${port}`);
  });