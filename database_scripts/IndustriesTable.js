var MongoClient = require('mongodb').MongoClient;

// URI to mongodb
const uri = "mongodb://localhost:27017/";

// connect to client
const client = new MongoClient(uri);

async function run() {
    try {
        // connect to acme and industries table
        const database = client.db("acmeDB");
        const col = database.collection("industriesDB");

        // Create a document to insert
        var obj = [
            { name: 'Gaming'},
            { name: 'Silicon Manufacturing'},
            { name: 'Ceramic Manufacturing'},
            { name: 'Car Manufacturing'},
            { name: 'Motorcycle Manufacturing'}
        ];
        // Insert document to collection
        const result = await col.insertMany(obj);

        // Print how many records were added
        console.log('Added =>', result.insertedCount);

    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}
// Run the function and handle any errors
run().catch(console.dir);
