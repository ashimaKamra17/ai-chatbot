# AI Chatbot

A modern AI-powered chatbot application built with React, TypeScript, and OpenAI's API. This project features a responsive frontend and a robust backend service.

## Features

- 🤖 AI-powered chat interface
- 🔐 User authentication and authorization
- 💬 Real-time chat functionality
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🔒 Secure API key management

## Tech Stack

### Frontend

- React 19
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- OpenAI API
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API key

## Getting Started

### Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-chatbot.git
cd ai-chatbot
```

2. Set up environment variables:

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Installation

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Documentation

The API documentation is available in the `backend/postman_collection.json` file. Import this file into Postman to explore the available endpoints.

## Project Structure

```
ai-chatbot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- Never commit `.env` files or sensitive information
- Use environment variables for all sensitive data
- Keep your API keys secure and rotate them regularly

## License

This project is licensed under the MIT License - see the LICENSE file for details.
