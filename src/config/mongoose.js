import { connect } from 'mongoose';
import { MONGODB_URL, MONGODB_ATLAS_URL } from '../config';

(async () => {
  try {
    const db = await connect(MONGODB_ATLAS_URL);
    console.log('Database connected to:', db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
