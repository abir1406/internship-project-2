const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: {
    type: String,
    default: 'General',
    enum: ['Technology', 'Travel', 'Food', 'Health', 'Business', 'Other']
  },
  coverImage: { type: String, default: '' },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: { type: Number, default: 0 },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
