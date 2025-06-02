# Smartchat AI Assistant with Plugin System

A modern, extensible chat interface that combines natural language processing with plugin-based functionality. Built with React, Node.js, and MongoDB.

## 🚀 Live Demo

🔗 [Click here to view the live app](https://smartchat-ai-assistant.onrender.com)

This is a fully functional AI-powered chat assistant built with React, Node.js, Express, and Tailwind CSS. Try commands like:

- `/weather Delhi`
- `/calc 12+3*2`
- `/define innovation`

![Chat Interface Screenshot](https://github.com/adesh9201/SmartChat-AI-Assistant/blob/main/frontend/src/assets/logo.png)

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Plugin System](#plugin-system)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

## Features

### Core Functionality
- **Conversational Interface**: Clean, responsive chat UI with real-time messaging
- **Plugin Architecture**: Extensible system for adding new functionality
- **Natural Language Processing**: Understands conversational queries and converts them to plugin commands
- **Persistent Storage**: Chat history automatically saved to MongoDB
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Built-in Plugins
- **🌤️ Weather Plugin**: Get current weather information for any city
  - Command: `/weather [city]`
  - Natural language: "What's the weather in Paris?"
  
- **🧮 Calculator Plugin**: Evaluate mathematical expressions
  - Command: `/calc [expression]`
  - Natural language: "Calculate 15% of 200"
  
- **📖 Dictionary Plugin**: Fetch word definitions
  - Command: `/define [word]`
  - Natural language: "What does 'serendipity' mean?"

## Demo

Try these example interactions:
```
User: What's the weather like in Tokyo?
Bot: [Weather card showing Tokyo's current conditions]

User: /calc 2 + 2 * 5
Bot: [Calculator card showing result: 12]

User: Define the word "ephemeral"
Bot: [Dictionary card with definition]
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM

### External APIs
- **OpenWeatherMap** - Weather data
- **Dictionary API** - Word definitions

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v5.0 or higher) - Local installation or cloud instance
- **Git** - Version control

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/adesh9201/SmartChat-AI-Assistant
cd ai-chat-interface
```

### 2. Backend Setup
```bash
cd server
npm install
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Environment Configuration
Create a `.env` file in the server directory:
```bash
cd ../server
cp .env.example .env
```

Edit the `.env` file with your configuration (see [Configuration](#configuration) section).

## Configuration

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ai-chat

# External APIs
WEATHER_API_KEY=your_openweathermap_api_key

# Server Configuration
PORT=8080
NODE_ENV=development

# CORS (optional - for production)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8080
```

### Getting API Keys

#### OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Generate a new API key
5. Add it to your `.env` file

### MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB (macOS with Homebrew)
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify connection
mongosh mongodb://localhost:27017
```

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Usage

### Running the Application

#### Development Mode
Start both backend and frontend in development mode:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Access the application at `http://localhost:5173`

#### Production Mode
```bash
# Build frontend
cd client
npm run build

# Start backend
cd ../server
npm start
```

### Using the Chat Interface

#### Slash Commands
Direct plugin commands:
- `/weather London` - Get weather for London
- `/calc 15 * 8 + 22` - Calculate mathematical expression
- `/define ephemeral` - Get definition of "ephemeral"

#### Natural Language
Conversational queries:
- "What's the weather in New York?"
- "Calculate the square root of 144"
- "What does 'ubiquitous' mean?"

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### Chat Endpoints
```http
GET /api/chat
```
Get all chat messages
- **Response**: Array of message objects

```http
POST /api/chat
```
Save a new message
- **Body**: `{ message: string, sender: string }`
- **Response**: Saved message object

#### Plugin Endpoints

```http
GET /api/weather/:city
```
Get weather information for a city
- **Parameters**: `city` (string) - City name
- **Response**: Weather data object

```http
GET /api/calc/:expression
```
Evaluate mathematical expression
- **Parameters**: `expression` (string) - Mathematical expression
- **Response**: Calculation result

```http
GET /api/define/:word
```
Get word definition
- **Parameters**: `word` (string) - Word to define
- **Response**: Definition data

### Response Format

All API responses follow this structure:
```json
{
  "success": true,
  "data": { },
  "message": "Success message"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

## Plugin System

The chat interface uses a flexible plugin architecture that allows easy extension of functionality.

### Creating a New Plugin

#### 1. Backend Implementation

**Create Controller** (`server/controllers/jokeController.js`):
```javascript
const axios = require('axios');

exports.getJoke = async (req, res) => {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    res.json({
      success: true,
      data: { joke: response.data.value }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch joke'
    });
  }
};
```

**Add Route** (`server/routes/joke.js`):
```javascript
const express = require('express');
const router = express.Router();
const { getJoke } = require('../controllers/jokeController');

router.get('/', getJoke);

module.exports = router;
```

**Register Route** (`server/app.js`):
```javascript
app.use('/api/joke', require('./routes/joke'));
```

#### 2. Frontend Implementation

**Update Context** (`client/src/context/ChatContext.jsx`):
```javascript
case 'joke':
  assistantMessage = await fetchPluginMessage('joke', '');
  break;
```

**Add Plugin Card** (`client/src/components/PluginCard.jsx`):
```javascript
case 'joke':
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-md max-w-md">
      <h3 className="font-bold text-lg mb-2 text-yellow-800">🎭 Random Joke</h3>
      <p className="text-gray-700">{data.joke}</p>
    </div>
  );
```

### Plugin Development Guidelines

1. **Consistent Error Handling**: Always return standardized error responses
2. **Input Validation**: Validate all user inputs
3. **Rate Limiting**: Implement rate limiting for external API calls
4. **Caching**: Cache responses when appropriate
5. **Documentation**: Document your plugin's functionality

## Project Structure

```
ai-chat-interface/
├── client/                  # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── PluginCard.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── ChatContext.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/                  # Backend (Node.js + Express)
│   ├── controllers/
│   │   ├── chatController.js
│   │   ├── weatherController.js
│   │   ├── calculatorController.js
│   │   └── dictionaryController.js
│   ├── models/
│   │   ├── messageModel.js
│   │   └── ...
│   ├── routes/
│   │   ├── chatRoutes.js
│   │   ├── weatherRoutes.js
│   │   ├── calculatorRoutes.js
│   │   └── dictionaryRoutes.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

## Development

### Code Style
This project uses:
- **ESLint** for JavaScript linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Development Scripts

#### Backend Scripts
```bash
npm run dev        # Start with nodemon
npm start          # Production start
npm test           # Run tests
npm run lint       # Run ESLint
```

#### Frontend Scripts
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview build
npm test           # Run tests
npm run lint       # Run ESLint
```

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass

## Troubleshooting

### Common Issues

#### MongoDB Connection Issues
**Problem**: `MongooseError: connect ECONNREFUSED`

**Solutions**:
- Ensure MongoDB is running: `brew services start mongodb-community`
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

#### Weather Plugin Not Working
**Problem**: Weather data not loading

**Solutions**:
- Verify OpenWeatherMap API key is valid
- Check API key in `.env` file
- Ensure API key has proper permissions

#### CORS Errors
**Problem**: Frontend can't connect to backend

**Solutions**:
- Check Vite proxy configuration in `vite.config.js`
- Verify CORS middleware in backend
- Ensure correct ports are used

#### Build Failures
**Problem**: `npm run build` fails

**Solutions**:
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all dependencies are installed

### Debug Mode

Enable debug logging:
```bash
# Backend
DEBUG=app:* npm run dev

# Frontend (browser console)
localStorage.setItem('debug', 'true')
```

### Getting Help

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/adesh9201/SmartChat-AI-Assistant/issues)
3. Create a new issue with:
   - Detailed problem description
   - Steps to reproduce
   - System information
   - Error logs

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Project Maintainer**: [Adesh Mishra]
- **Email**: panditadesh123@gmail.com
- **GitHub**: [https://github.com/adesh9201](https://github.com/adesh9201)
- **LinkedIn**: [https://www.linkedin.com/in/adesh-mishra-221816297](https://www.linkedin.com/in/adesh-mishra-221816297/)

**Project Repository**: [https://github.com/adesh9201/SmartChat-AI-Assistant](https://github.com/adesh9201/SmartChat-AI-Assistant)

---

### Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Dictionary API](https://dictionaryapi.dev/) for word definitions
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

**⭐ If you found this project helpful, please give it a star on GitHub!**