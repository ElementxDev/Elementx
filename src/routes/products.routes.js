import { Router } from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/auth.middlewares';
import {
  createProducts,
  deleteProducts,
  getProducts,
  getProduct,
  updateProducts,
} from '../controllers/products.controllers';
const router = Router();
router.get('/', (req, res) => {
  res.json({
    Name: 'Elementx API',
    version: 1.0,
    DevelopmentBy: {
      Name: 'Fallin21'
    }
  })
})
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', verifyToken, verifyAdmin, createProducts);
router.put('/products/:id', verifyToken, verifyAdmin, updateProducts);
router.delete('/products/:id', verifyToken, verifyAdmin, deleteProducts);

export default router;
