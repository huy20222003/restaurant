import {Schema, model} from 'mongoose';

const Reviews = new Schema ({
    rate: {
        type: Schema.Types.Number,
        required: true,
        default: 0.0
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    review: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true,
    }
}, {
    timestamps: true
});

export default model('reviews', Reviews);
