import express from 'express';
import { getProduct } from '../controllers/productController';
import authenticate from '../utils/middleware/authenticate';

const router = express.Router();

router.get('/', authenticate, getProduct);

export const productRoutes = router;