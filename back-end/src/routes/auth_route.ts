import express from 'express';
import { registerUser, getUser } from '../controllers/auth_controller';

const router = express.Router();

router.post('/register', registerUser);
router.get("/api/getUser", getUser);

export default router;
