import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  id: string;
  name: string;
  reservationDate: Date;
  pickupDate: Date;
  productDetails: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  id : { type: String, required: true },
  name: { type: String, required: true },
  reservationDate: { type: Date },
  pickupDate: { type: Date },
  productDetails: { type: String },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
