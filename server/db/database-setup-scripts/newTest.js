import sqlite3 from 'sqlite3';

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('poster.db');

// Function to generate a random string of specified length
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random email address
function generateRandomEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return generateRandomString(10) + '@' + randomDomain;
}

// Generate and insert test data into the users table
const numberOfUsers = 10;
for (let i = 0; i < numberOfUsers; i++) {
  const username = 'user' + i;
  const password = generateRandomString(8);
  const email = generateRandomEmail();

  db.run(`INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)`, [i, username, password, email], (err) => {
    if (err) {
      console.error('Error inserting user:', err);
    } else {
      console.log(`User ${username} inserted successfully.`);
    }
  });
}

// Generate and insert test data into the posts table
const numberOfPosts = 20;
for (let i = 0; i < numberOfPosts; i++) {
  const userID = Math.floor(Math.random() * numberOfUsers);
  const content = 'This is post number ' + i;
  const createdAt = new Date().toISOString();
  const parentPostID = i > 0 ? Math.floor(Math.random() * i) : null;

  db.run(`INSERT INTO posts (id, userID, content, createdAt, parentPostID) VALUES (?, ?, ?, ?, ?)`, [i, userID, content, createdAt, parentPostID], (err) => {
    if (err) {
      console.error('Error inserting post:', err);
    } else {
      console.log(`Post ${i} inserted successfully.`);
    }
  });
}

// Generate and insert test data into the likes table
const numberOfLikes = 30;
for (let i = 0; i < numberOfLikes; i++) {
  const userID = Math.floor(Math.random() * numberOfUsers);
  const postID = Math.floor(Math.random() * numberOfPosts);

  db.run(`INSERT INTO likes (userID, postID) VALUES (?, ?)`, [userID, postID], (err) => {
    if (err) {
      console.error('Error inserting like:', err);
    } else {
      console.log(`Like ${i} inserted successfully.`);
    }
  });
}

// Generate and insert test data into the follows table
const numberOfFollows = 40;
for (let i = 0; i < numberOfFollows; i++) {
  const userID = Math.floor(Math.random() * numberOfUsers);
  const isFollowingID = Math.floor(Math.random() * numberOfUsers);

  db.run(`INSERT INTO follows (userID, isFollowingID) VALUES (?, ?)`, [userID, isFollowingID], (err) => {
    if (err) {
      console.error('Error inserting follow:', err);
    } else {
      console.log(`Follow ${i} inserted successfully.`);
    }
  });
}

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error('Error closing database connection:', err.message);
  }
  console.log('Database connection closed.');
});
