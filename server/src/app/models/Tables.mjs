import {Schema, model} from 'mongoose';

const Tables = new Schema ({
    name: {
        type: String,
        required: true,
        maxLength: 100,
    },
    description: {
        type: String,
        required: true, 
        maxLength: 100
    },
}, {
    timestamps: true
});

export default model('tables', Tables);
