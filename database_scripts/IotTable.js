var MongoClient = require('mongodb').MongoClient;

// URI to mongodb
const uri = "mongodb://localhost:27017/";

// connect to client
const client = new MongoClient(uri);

async function run() {
    try {
        // connect to acme and iot table
        const database = client.db("acmeDB");
        const col = database.collection("iotDB");

        // Create a document to insert
        var obj = [
            { DeviceName: 'Smart Light', wAdditionTime: Date.now(), fee: "1", Industry: "Gaming" },
            { DeviceName: 'Thermostat', wAdditionTime: Date.now(), fee: "2", Industry: "Silicon Manufacturing" },
            { DeviceName: 'Door', wAdditionTime: Date.now(), fee: "3", Industry: "Ceramic Manufacturing" },
            { DeviceName: 'Elevator', wAdditionTime: Date.now(), fee: "4", Industry: "Car Manufacturing" },
            { DeviceName: 'Doorbell', wAdditionTime: Date.now(), fee: "5", Industry: "Motorcycle Manufacturing" }
        ];
        // Insert doc
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
