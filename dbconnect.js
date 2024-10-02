require('dotenv').config();
const mongoose = require("mongoose");

// Now you can access the environment variables
const db_link = process.env.db_link;

mongoose
  .connect(db_link)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log("hello");
    console.error("Database connection error:", err);
  });
