import { Router } from 'express';
import {
  verifyAdmin,
  verifyRoot,
  verifyToken,
} from '../middlewares/auth.middlewares';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
  updateOrder,
} from '../controllers/orders.controllers';

const router = Router();

router.post('/order/create-order', verifyToken, createOrder);
router.get('/order/get-order/:id', verifyToken, getOrder);
/*----------------GETTING ALL ORDERS-----------------*/
router.get('/order/get-user-orders', verifyToken, getUserOrders);
router.get('/order/get-order/:id', verifyToken, getOrder);
router.get('/order/get-all-orders', verifyToken, verifyAdmin, getAllOrders);
router.put(
  '/update-order:id',
  verifyToken,
  verifyAdmin,
  verifyRoot,
  updateOrder
);
router.delete(
  '/delete-order:id',
  verifyToken,
  verifyAdmin,
  verifyRoot,
  deleteOrder
);

export default router;
