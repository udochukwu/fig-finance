import mongoose from 'mongoose';
const { Schema, model } = mongoose
const eventSchema = new Schema(
  {
    address: { type: String, required: true },
    category: { type: String, required: true, lowercase: true  },
    city: { type: String, required: true, lowercase: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    isVirtual: { type: Boolean, default: false },
    title: { type: String, required: true, lowercase: true  },
  },
  {
    timestamps: true,
  }
);

const Event = model('Event', eventSchema);

export default Event;
