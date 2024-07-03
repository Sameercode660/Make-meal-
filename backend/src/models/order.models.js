import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      items: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'OrderItem',
          required: true,
        }
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'processing', 'delivered'],
        default: 'pending',
      },
      payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      },
      deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
      },

}, {timestamps: true})

export const Order = mongoose.model('Order', orderSchema)