import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  email: String,
  hash: String,
  firstName: String,
  lastName: String,
});
