import { Schema, model } from 'mongoose';

const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default model('Categories', CategoriesSchema);
