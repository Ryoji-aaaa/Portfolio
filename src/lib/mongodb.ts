import mongoose from 'mongoose';

const connectMongo = async () => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in the environment variables");
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.error("Failure: Unconnected to MongoDB", err);
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export default connectMongo
