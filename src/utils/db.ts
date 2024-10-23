import mongoose from 'mongoose';

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URIが設定されていません');
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // タイムアウトを5秒に設定
    });
    console.log('MongoDBに接続しました');
  } catch (error) {
    console.error('MongoDB接続エラー:', error);
  }
};

export default connectToDatabase;