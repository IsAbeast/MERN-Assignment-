// Connect to / Create Database
// use plp_bookstore;

// Task 2: Insert Sample Books
db.books.insertMany([
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
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    genre: 'Science',
    published_year: 1988,
    price: 22,
    in_stock: false,
    pages: 212,
    publisher: 'Bantam Books'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
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
    title: 'Becoming',
    author: 'Michelle Obama',
    genre: 'Biography',
    published_year: 2018,
    price: 28,
    in_stock: true,
    pages: 448,
    publisher: 'Crown Publishing Group'
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'History',
    published_year: 2011,
    price: 30,
    in_stock: true,
    pages: 443,
    publisher: 'Harvill Secker'
  },
  {
    _id: ObjectId('68e13ad0654154d7985af466'),
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    published_year: 2018,
    price: 26,
    in_stock: false,
    pages: 334,
    publisher: 'Random House'
  },
  {
    title: 'Harry Potter and the Sorcerer’s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    published_year: 1997,
    price: 20,
    in_stock: true,
    pages: 309,
    publisher: 'Bloomsbury'
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Thriller',
    published_year: 2019,
    price: 19,
    in_stock: true,
    pages: 336,
    publisher: 'Celadon Books'
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
]);
// Find all books:
     db.books.find({});
 
// Find books by a specific author:
     db.books.find({ author: "George Orwell" });
 
// Find books published after 1950:
     db.books.find({ published_year: { $gt: 1950 } });
 
// Find books in a specific genre:
     db.books.find({ genre: "Fiction" });

// Find in-stock books:
     db.books.find({ in_stock: true });

// Update the price of a specific book ("1984")
db.books.updateOne({ title: "1984" }, { $set: { price: 17 } });

// Delete a book by its title ("The Silent Patient")
db.books.deleteOne({ title: "The Silent Patient" });


//Advanced Queries:

// Find books that are in stock and published after 1950
db.books.find({ in_stock: true, published_year: { $gt: 1950 } });
// → should return "Becoming", "Sapiens", "Harry Potter" (still in stock)

// Projection: show only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sort by price ascending
db.books.find().sort({ price: 1 });

// Sort by price descending
db.books.find().sort({ price: -1 });

// Pagination (5 books per page)
db.books.find().limit(5).skip(0); // Page 1
db.books.find().limit(5).skip(5); // Page 2

//Aggregation Pipelines:

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

// Group books by publication decade
db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

//Indexing

// Create index on title
db.books.createIndex({ title: 1 });

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Explain performance
db.books.find({ title: "The Hobbit" }).explain("executionStats");
