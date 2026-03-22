import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    customerName: {
      type: String,
      required: true,
    },
    service: {
      type: String,
    },
    serviceType: {
      type: String,
      enum: ['Makeup', 'Service', 'Mehandi', 'Nail Extension'],
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    priceDiscussed: {
      type: Number,
      default: 0,
    },
    advanceTaken: {
      type: Number,
      default: 0,
    },
    appointmentType: {
      type: String,
      enum: ['salon', 'outside'],
      default: 'salon',
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
