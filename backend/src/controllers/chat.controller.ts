import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import Chat, { IMessage } from '../models/chat.model';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const requestId = uuidv4();

    // Create user message
    const userMessage: IMessage = {
      sender: 'user',
      content: message,
      timestamp: new Date(),
      requestId,
    };

    // Get AI response
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    // Create bot message
    const botMessage: IMessage = {
      sender: 'bot',
      content: aiResponse,
      timestamp: new Date(),
      requestId,
    };

    // Save messages to database
    const chat = new Chat({
      messages: [userMessage, botMessage],
    });
    await chat.save();

    res.json({
      messages: [userMessage, botMessage],
    });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.query;

    if (messageId) {
      // Find the specific message in any chat session
      const chat = await Chat.findOne({ 'messages._id': messageId });
      if (!chat) {
        return res.status(404).json({ error: 'Message not found' });
      }
      
      const message = chat.messages.find(msg => msg._id?.toString() === messageId);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.json({
        _id: chat._id,
        messages: [message],
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt
      });
    }

    // If no messageId provided, return all chats
    const chats = await Chat.find().sort({ createdAt: -1 }).limit(50);
    res.json(chats);
  } catch (error) {
    console.error('Error in getChatHistory:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

export const getChatById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.json(chat);
  } catch (error) {
    console.error('Error in getChatById:', error);
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
}; 