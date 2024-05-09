import sqlite3 from 'sqlite3';

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('poster.db');

// Insert test data into users table
db.run(`
    INSERT INTO users (username, password, email)
    VALUES
        ('user1', 'password1', 'user1@example.com'),
        ('user2', 'password2', 'user2@example.com'),
        ('user3', 'password3', 'user3@example.com')
`);

// Insert test data into posts table
db.run(`
    INSERT INTO posts (userID, content, createdAt)
    VALUES
        (1, 'This is user1''s first post!', '2024-05-09 10:00:00'),
        (1, 'Hello world!', '2024-05-09 10:30:00'),
        (2, 'Just testing things out.', '2024-05-09 11:00:00'),
        (3, 'Feeling excited about my new project!', '2024-05-09 12:00:00')
`);

// Insert test data into likes table
db.run(`
    INSERT INTO likes (userID, postID)
    VALUES
        (2, 1),
        (3, 2),
        (1, 4)
`);

// Insert test data into follows table
db.run(`
    INSERT INTO follows (followerID, followeeID)
    VALUES
        (1, 2),
        (1, 3),
        (2, 3)
`);

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Test data inserted successfully.');
});
