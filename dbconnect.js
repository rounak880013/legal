require('dotenv').config();
const mongoose = require("mongoose");

// Now you can access the environment variables
const db_link = process.env.db_link;

mongoose
  .connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
