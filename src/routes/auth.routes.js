import { Router } from 'express';
import {
  login,
  register,
  profile,
  verifyUser,
  getAllUsers,
  addAdmin,
} from '../controllers/auth.controllers';
import {
  verifyToken,
  verifyRoot,
  verifyAdmin,
} from '../middlewares/auth.middlewares';
const router = Router();

router.post('/auth/login', login);

router.post('/auth/register', register);

router.post('/auth/register/admin', verifyToken, verifyAdmin, addAdmin);

router.get('/auth/profile', verifyToken, profile);
router.get('/auth/verify', verifyUser);
router.get('/auth/get-all-users', verifyToken, verifyAdmin, getAllUsers);
export default router;
