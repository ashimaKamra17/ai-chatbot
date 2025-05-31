import { useState } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
}

const useChatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async(message: string) => {
        const newMessage: Message = {
            id: uuidv4(),
            content: message,
            sender: 'user',
        }
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            } 
        );

        const botMessage: Message = {
            id: uuidv4(),
            content: response.data.choices[0].message.content,
            sender: 'bot',
        }
        setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
    return { messages, sendMessage };
}

export default useChatbot;