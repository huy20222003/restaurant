import {Schema, model} from 'mongoose';

const Carts = new Schema ({
    items: {
        type: Array,
        default: [],
        required: true,
    },
    totalPrices: {
        type: Number,
        default: 0,
        required: true,
    },
    userCart: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
}, {
    timestamps: true
});

export default model('carts', Carts);
