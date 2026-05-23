const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://shivanikatkar04:JustiFindDatabase@justifind.buirb8w.mongodb.net/JustiFind?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// ✅ FIXED DATA (no nested array)
const data = [
 {
  email: "unspecified",
  name: "Adv. Gajanan Ashok Kageru",
  Category: "General",
  address: "Office No 302, Pasalkar Bhawan, Near Shivaji Nagar Courts, Topkhana Road, Shivaji Nagar, Pune-411005, Maharashtra",
  longitude: null,
  latitude: null,
  City: "Pune",
  contact: "08488995913",
  password: "hashed_password",
  role: "lawyer"
}
];

async function run() {
  try {
    await client.connect();

    const db = client.db("JustiFind");
    const collection = db.collection("lawyers");

    // 🔥 optional: clear old data first
    await collection.deleteMany({});

    // 🚀 insert new data
    const result = await collection.insertMany(data);

    console.log("Inserted documents:", result.insertedCount);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();