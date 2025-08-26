import { MongoClient,  } from "mongodb"; 
import config from "./config";

const dbName = 'wine-store';
let db = null;

export async function connectToDatabase() {
    if (!db) {
        const client = new MongoClient(config.mongoUrl);
        await client.connect();
        console.log("Connection to the database was successful");
        db = client.db(dbName)
    }
    return db;
}