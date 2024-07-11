import { Router } from 'express';
import { getUsers } from '../controllers/auth_controller';

const router: Router = Router();

router.get('/', getUsers);

export default router;
