import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
    }, 
    email: {
        type: String,
        unique: true
    }, 
    mobile: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true,
        min: 8
    }, 
    otp: {
        type: String
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)