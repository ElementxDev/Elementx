import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { number } from 'joi';
const userSchema = new Schema(
  {
    image: {
      type: String,
      default: 'default',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: Number,
    },
    country: {
      type: String,
      trim: true,
      default: 'panama',
    },
    province: {
      type: String,
      trim: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.generateHash = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export default model('User', userSchema);
