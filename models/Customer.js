import mongoose from 'mongoose';

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    lastVisit: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    servicesHistory: [
      {
        service: { type: String, required: true },
        date: { type: Date, default: Date.now },
        price: { type: Number },
        staff: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
