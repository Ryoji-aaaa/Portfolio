import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  reservationDate: { type: Date },
  pickupDate: { type: Date },
  productDetails: { type: String }
});

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);
