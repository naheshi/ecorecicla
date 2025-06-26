import express from 'express';
import authApi from '../utils/middleware/apitoken';
import { cancelScan, getBarcodeScan, verifyMachine } from '../controllers/model/modelController';
import authenticate from '../utils/middleware/authenticate';

const router = express.Router();

router.post('/:barcode', authApi, getBarcodeScan);
router.post('/cancel', authenticate, cancelScan);
router.post('/verify-machine/:barcode', authApi, verifyMachine);

export const modelRoutes = router;