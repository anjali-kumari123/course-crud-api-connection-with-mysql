
const mysql = require("mysql2");
const db = mysql.createPool({
  host: "82.25.121.115",
  user: "u205680228_College_123",
  password: "edugaon@Amnour25",
  database:"u205680228_college",
});
db.getConnection((error) => {
  if (error) {
    console.log(" database connection failed " + error);
  } else {
    console.log(" database connection successfully ");
  }
});
module.exports = db;
