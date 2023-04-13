import { Router } from 'express';
import { getTotals } from '../controllers/statistics.controllers';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middlewares';

const router = Router();
router.get('/statistics/totals', getTotals);

export default router;
