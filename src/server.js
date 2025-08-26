import app from './app.js';
import config from './config/config.js';
import mongoose from 'mongoose';
const PORT = config.port || 3002;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/wine-store";

connectToMongo();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

async function connectToMongo() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected');
    }
    catch(err){
        console.log('MongoDB connection error:', err);
        
    }
}