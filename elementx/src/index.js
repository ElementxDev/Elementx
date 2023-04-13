import express from 'express';
import morgan from 'morgan';
import './config/mongoose';
import { PORT } from './config';
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import categoriesRoutes from './routes/categories.routes';
import contactRoutes from './routes/contact.routes';
import orderRoutes from './routes/order.routes';
import addressRoutes from './routes/address.routes';
import statisticsRoutes from './routes/statistics.routes';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { createCategories } from './utils/initialSetup';

const app = express();

createCategories();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/',
  })
);
app.use(productsRoutes);
app.use(authRoutes);
app.use(categoriesRoutes);
app.use(contactRoutes);
app.use(orderRoutes);
app.use(addressRoutes);
app.use(statisticsRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message || 'Server error',
  });
});

app.listen(PORT);

console.log('server on port', PORT);
