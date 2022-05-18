const mysql = require("mysql2");
const keys = require('../keys');

const db = mysql.createConnection({
    host: keys.HOST,
    user: keys.USER,
    password: keys.PASS,
    database: keys.DB
});

db.connect(err => {
    if(err) throw err;
    console.log("successfully connected to db!")
});

module.exports = db;