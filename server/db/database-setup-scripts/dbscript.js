import sqlite3 from 'sqlite3';

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('poster.db');

// Create users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )
`);

// Create posts table
db.run(`
    CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(36) PRIMARY KEY,
        userID VARCHAR(36) NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        parentPostID VARCHAR(36), -- Reference to the parent post if this is a reply
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (parentPostID) REFERENCES posts(id)
)
`);

// Create likes table
db.run(`
    CREATE TABLE IF NOT EXISTS likes (
        userID VARCHAR(36) NOT NULL,
        postID VARCHAR(36) NOT NULL,
        PRIMARY KEY (userID, postID),
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (postID) REFERENCES posts(id)
    )
`);

// Create follows table
db.run(`
create table if not exists follows (
    userID VARCHAR(36) NOT NULL,
    isFollowingID VARCHAR(36) NOT NULL,
    PRIMARY KEY (userID, isFollowingID),
    FOREIGN KEY (userID) REFERENCES users(id),
    FOREIGN KEY (isFollowingID) REFERENCES users(id)
)
`);

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database tables created successfully.');
});
