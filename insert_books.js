// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 18,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 15,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: "A Brief History of Time", 
    author: "Stephen Hawking", 
    genre: "Science", 
    published_year: 1988, 
    price: 22, 
    in_stock: false, 
    pages: 212, 
    publisher: "Bantam Books"
  },
  {
    title: "The Great Gatsby", 
    author: "F. Scott Fitzgerald", 
    genre: "Fiction",
    published_year: 1925, 
    price: 14, 
    in_stock: true, 
    pages: 180,
    publisher: "Charles Scribner's Sons"
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 25,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
   title: "Becoming",
   author: "Michelle Obama", 
   genre: "Biography",
   published_year: 2018, 
   price: 28, 
   in_stock: true, 
   pages: 448, 
   publisher: "Crown Publishing Group"
  },
  {
   title: "Sapiens: A Brief History of Humankind", 
   author: "Yuval Noah Harari", 
   genre: "History", 
   published_year: 2011, 
   price: 30,
   in_stock: true,
   pages: 443, 
   publisher: "Harvill Secker"
  },
  {
   title: "Educated", 
   author: "Tara Westover", 
   genre: "Memoir",
   published_year: 2018, 
   price: 26,
   in_stock: false, 
   pages: 334,
   publisher: "Random House"
  },
  {
   title: "Harry Potter and the Sorcerer’s Stone", 
   author: "J.K. Rowling",
   genre: "Fantasy",
   published_year: 1997, 
   price: 20, 
   in_stock: true,
   pages: 309, 
   publisher: "Bloomsbury"
  },
  {
   title: "The Silent Patient", 
   author: "Alex Michaelides", 
   genre: "Thriller",
   published_year: 2019, 
   price: 19,
   in_stock: true, 
   pages: 336,
   publisher: "Celadon Books"
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 