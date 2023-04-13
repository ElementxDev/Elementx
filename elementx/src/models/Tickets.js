import { model, schema } from 'mongoose';

const ticketsSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Tickets', ticketsSchema);
