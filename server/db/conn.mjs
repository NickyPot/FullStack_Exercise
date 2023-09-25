import { MongoClient } from "mongodb";

//address to mongodb
const connectionString = "mongodb://localhost:27017/";

//connect
export const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
    console.log(`Connected to MongoDB`);
} catch (e) {
    console.error(e);
}

let db = conn.db("acmeDB");

export default db;