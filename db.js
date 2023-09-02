const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Database connected");
  }
});

module.exports = db;
