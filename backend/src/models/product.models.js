import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
      },
      image: {
        type: String,
      },
      stock: {
        type: Number,
        default: 0,
      },

}, {timestamps: true})

export const Product = mongoose.model('Product', productSchema)