// Connect to / Create Database// queries.js
// MongoDB – Data Layer Fundamentals & Advanced Techniques

import { MongoClient } from "mongodb";

// ⚙️ Connection setup
const uri = "mongodb://localhost:27017"; // change this if using Atlas
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    
    // Task 2: Insert Sample Books
    
    console.log("✅ Inserted 10 sample books");

    // Task 3: CRUD Queries
    console.log("\n📘 All Classic Books:");
    console.log(await books.find({ genre: "Classic" }).toArray());

    console.log("\n📗 Books published after 2000:");
    console.log(await books.find({ published_year: { $gt: 2000 } }).toArray());

    console.log("\n📙 Books by George Orwell:");
    console.log(await books.find({ author: "George Orwell" }).toArray());

    console.log("\n💰 Updating price of 1984...");
    await books.updateOne({ title: "1984" }, { $set: { price: 21.5 } });

    console.log("\n🗑️ Deleting 'The Catcher in the Rye'...");
    await books.deleteOne({ title: "The Catcher in the Rye" });

    // Task 3: Advanced Queries
    console.log("\n📕 In-stock books published after 2010:");
    console.log(
      await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray()
    );

    console.log("\n🔍 Projection (title, author, price):");
    console.log(
      await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray()
    );

    console.log("\n⬆️ Sorted by price (ascending):");
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log("\n⬇️ Sorted by price (descending):");
    console.log(await books.find().sort({ price: -1 }).toArray());

    console.log("\n📄 Pagination (5 per page):");
    const page1 = await books.find().limit(5).toArray();
    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log("Page 1:", page1);
    console.log("Page 2:", page2);

    // Task 4: Aggregation Pipelines
    console.log("\n📊 Average price of books by genre:");
    console.log(await books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]).toArray());

    console.log("\n👩‍💻 Author with most books:");
    console.log(
      await books
        .aggregate([
          { $group: { _id: "$author", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 1 },
        ])
        .toArray()
    );

    console.log("\n📅 Books grouped by publication decade:");
    console.log(
      await books
        .aggregate([
          {
            $project: {
              decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] },
            },
          },
          { $group: { _id: "$decade", count: { $sum: 1 } } },
          { $sort: { _id: 1 } },
        ])
        .toArray()
    );

    // Task 5: Indexing
    console.log("\n⚙️ Creating index on title...");
    await books.createIndex({ title: 1 });

    console.log("⚙️ Creating compound index on author and published_year...");
    await books.createIndex({ author: 1, published_year: -1 });

    const explainResult = await books.find({ title: "The Hobbit" }).explain("executionStats");
    console.log("\n🔍 Explain output for indexed query:");
    console.log(JSON.stringify(explainResult.executionStats, null, 2));
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 MongoDB connection closed.");
  }
}

main();


