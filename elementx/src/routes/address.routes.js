import { Router } from 'express';
import { addDirection } from '../controllers/address.controllers';
import { verifyToken } from '../middlewares/auth.middlewares';
const router = Router();

router.post('/addresses', verifyToken, addDirection);

export default router;
