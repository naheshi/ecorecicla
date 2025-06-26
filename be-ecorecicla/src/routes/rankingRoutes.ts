import express from 'express';
import authenticate from '../utils/middleware/authenticate';
import { getRaking } from '../controllers/rankingController';

const router = express.Router();

router.get('/', authenticate, getRaking);

export const rankingRoutes = router;