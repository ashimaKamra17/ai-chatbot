import express from 'express';
import { sendMessage, getChatHistory, getChatById } from '../controllers/chat.controller';

const router = express.Router();

router.post('/message', sendMessage);
router.get('/history', getChatHistory);
router.get('/chat/:id', getChatById);

export default router; 