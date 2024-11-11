import { Router } from 'express';
import { login } from '../controllers/loginController';
import { getPages } from '../controllers/pageController';

const router = Router();

router.post('/login', login);
router.post('/pages', getPages);

export default router;
