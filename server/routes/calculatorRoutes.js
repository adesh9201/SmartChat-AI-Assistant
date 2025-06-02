import express from 'express';
import { calculate } from '../controllers/calculatorController.js';

const router = express.Router();

router.get('/:expression', calculate);

export default router;