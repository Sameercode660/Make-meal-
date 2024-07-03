import mongoose, {Schema} from "mongoose";

const orderItemSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
}, {timestamps: true})

export const OrderItem = mongoose.model('OrderItem', orderItemSchema)