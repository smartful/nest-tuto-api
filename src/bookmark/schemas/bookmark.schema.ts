import mongoose from 'mongoose';

export const BookmarkSchema = new mongoose.Schema({
  id: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  title: String,
  description: String,
  link: String,
});
