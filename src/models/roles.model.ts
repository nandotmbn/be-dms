/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    min: 0
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

const Roles = mongoose.model('Roles', RoleSchema);

export { Roles };
