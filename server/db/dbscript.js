const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('poster.db');

// Create users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )
`);

// Create posts table
db.run(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id)
    )
`);

// Create likes table
db.run(`
    CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER NOT NULL,
        postID INTEGER NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (postID) REFERENCES posts(id)
    )
`);

// Create follows table
db.run(`
    CREATE TABLE IF NOT EXISTS follows (
        followerID INTEGER NOT NULL,
        followeeID INTEGER NOT NULL,
        PRIMARY KEY (followerID, followeeID),
        FOREIGN KEY (followerID) REFERENCES users(id),
        FOREIGN KEY (followeeID) REFERENCES users(id)
    )
`);

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database tables created successfully.');
});
