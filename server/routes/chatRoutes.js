import express from 'express';
import { getMessages, saveMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', saveMessage);

export default router;