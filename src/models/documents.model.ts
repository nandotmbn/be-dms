/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const DocumentsSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  title: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "PENDING"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Documents = mongoose.model('Documents', DocumentsSchema);

export { Documents };

