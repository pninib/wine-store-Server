import dotenv from 'dotenv';

dotenv.config();

const config = {
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key',
    otpSecret: process.env.OTP_SECRET || 'my-secret-key',
    port: Number(process.env.PORT) || 3000,
    maxAttempts: Number(process.env.MAX_ATTEMPTS) || 5,
    blockDuration: Number(process.env.PASS_TIME) || 30,
    lengthOfGenerate: Number(process.env.LENGTH_OF_GENERATE) || 6,
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/wine-store",
    api_key: process.env.API_KEY || "",
    system_email: process.env.SYSTEM_EMAIL || ""
};

export default config;