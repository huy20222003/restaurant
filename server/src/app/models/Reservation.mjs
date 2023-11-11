import { Schema, model } from 'mongoose';

const Reservations = new Schema(
  {
    fullName: {
      type: String,
      maxLength: 200,
      default: '',
    },
    tableId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'tables',
    },
    reservationDate: {
      type: Schema.Types.Date,
      default: '',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    status: {
      type: String,
      required: true,
      default: 'ordered',
    },
    type: {
      type: String,
      default: 'lunch'
    },
    note: {
      type: String,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

export default model('reservations', Reservations);
