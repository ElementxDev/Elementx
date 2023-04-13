import { Router } from 'express';
import {
  createCategory,
  getCategories,
} from '../controllers/categories.controllers';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middlewares';
const router = Router();

router.get('/categories', verifyToken, verifyAdmin, getCategories);
router.post('/categories', verifyToken, verifyAdmin, createCategory);

export default router;
