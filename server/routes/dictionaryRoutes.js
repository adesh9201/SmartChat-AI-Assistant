import express from 'express';
import { getDefinition } from '../controllers/dictionaryController.js';

const router = express.Router();

router.get('/:word', getDefinition);

export default router;