/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documents'
  },
  content: {
    type: String,
    default: '',
  },
  isArchived: {
    type: Boolean,
    default: false
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

const Comments = mongoose.model('Comments', CommentSchema);

export { Comments };
