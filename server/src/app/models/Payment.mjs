import {Schema, model} from 'mongoose';

const Payment = new Schema ({
    sender: {
        type: String,
        required: true,
        maxLength: 200,
    }, 
    description: {
        type: String,
        maxLength: 3000,
        default : '',
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'success'
    },
    userPayment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
}, {
    timestamps: true
});

export default model('payment', Payment);
