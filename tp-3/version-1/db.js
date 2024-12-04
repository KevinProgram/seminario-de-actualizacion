// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'verduleria', // Same database name
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db; // Export the connection to use in app.js
