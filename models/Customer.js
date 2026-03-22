import mongoose from 'mongoose';

const customerSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
    lastContacted: {
      type: Date,
    },
    servicesHistory: [
      {
        service: { type: String, required: true },
        date: { type: Date, default: Date.now },
        price: { type: Number },
        totalBill: { type: Number, default: 0 },
        amountPaid: { type: Number, default: 0 },
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

customerSchema.index({ userId: 1 });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
