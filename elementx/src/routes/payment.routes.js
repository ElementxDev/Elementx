import { Router } from 'express';
import {
  cancelOrder,
  captureOrder,
  createOrder,
} from '../controllers/payment.controllers';
import { verifyToken } from '../middlewares/auth.middlewares';

const router = Router();

router.post('/payment/create-order', verifyToken, createOrder);
router.get('/payment/capture-order', captureOrder);
router.get('/payment/cancel-order', cancelOrder);
export default router;
