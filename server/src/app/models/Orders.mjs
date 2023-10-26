import { Schema, model } from 'mongoose';

const Orders = new Schema(
  {
    items: {
      type: Array,
      required: true,
    },
    fullName: {
      type: String,
      maxLength: 200,
      required: true,
    },
    shipAddress: {
      type: String,
      maxLength: 2000,
      required: true,
    },
    phoneNumber: {
      type: String,
      maxLength: 10,
      required: true,
    },
    totalPrices: {
      type: Number,
      default: 0.0,
      required: true,
    },
    status: {
      type: Array,
      required: true,
    },
    shippingFee: {
      type: Number,
      default: 0.0,
      required: true,
    },
    shippingUnit: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isReview: {
      type: Boolean,
      required: true,
      default: false,
    },
    userOrder: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

export default model('orders', Orders);
