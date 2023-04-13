import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    paymentId: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        id: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        images: {
          type: String,
        },
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    payer_id: {
      type: String,
    },
    currency: {
      type: String,
    },
    cartId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      default: 'pending',
    },
    totalItems: {
      type: Number,
    },
    country: {
      type: String,
      default: 'Panamá',
    },
    province: {
      type: String,
    },
    observation: {
      type: String,
    },
    province: {
      type: String,
    },
    branch: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Order', OrderSchema);
