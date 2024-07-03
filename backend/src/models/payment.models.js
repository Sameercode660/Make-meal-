import mongoose, {Schema} from "mongoose";

const paymentSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      },
      method: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
      transactionId: {
        type: String,
      },
      amount: {
        type: Number,
        required: true,
      },
}, {timestamps: true})

export const Payment = mongoose.model('Payment', paymentSchema)