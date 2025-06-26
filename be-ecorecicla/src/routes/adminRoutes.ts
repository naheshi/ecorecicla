import express from 'express';
import authenticate from '../utils/middleware/authenticate';
import { deleteProduct, registerProduct } from '../controllers/admin/productController';
import { upload } from '../utils/upload';
import { deleteProductImage, editProductImage } from '../controllers/admin/imageController';

const router = express.Router();

//Product
router.post('/product', authenticate, upload, registerProduct)
router.delete('/products/:id', authenticate, deleteProduct);

//Image
router.delete('/images/:id', authenticate, deleteProductImage)
router.post('/images', authenticate, upload, editProductImage)

export const adminRoutes = router;