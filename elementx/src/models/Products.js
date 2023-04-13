import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    series: {
      type: String,
      trim: true,
    },

    price: {
      type: String,
      default: 0,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    stock: {
      type: Number,
      trim: true,
      default: 0,
      required: true,
    },
    images: {
      url: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
    },
    color: {
      type: String,
    },
    brand: {
      type: String,
    },
    // size: {
    //   type: String,
    // },
    modelName: {
      type: String,
    },
    // createBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default model('Product', ProductSchema);
