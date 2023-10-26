import {Schema, model} from 'mongoose';

const Reviews = new Schema ({
    rate: {
        type: Schema.Types.Number,
        required: true,
        default: 0.0
    },
    userReview: {
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
    }
}, {
    timestamps: true
});

export default model('reviews', Reviews);
