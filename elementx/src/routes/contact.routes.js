import { Router } from 'express';
import { createTicket } from '../controllers/contact.controllers';

const router = Router();

router.post('/contact/create-ticket', createTicket);

export default router;
