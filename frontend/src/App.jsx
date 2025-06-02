import { ChatProvider } from './context/ChatContext';
import Chat from './components/Chat';
import logo from './assets/ai-logo.png'; // ✅ Make sure this file exists

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* 🔷 App Header with Logo */}
        <div className="flex flex-col items-center justify-center py-6 border-b bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
          <img src={logo} alt="AI Chatbot Logo" className="h-16 w-16 mb-2" />
          <h1 className="text-2xl font-bold tracking-wide">SmartChat AI Assistant</h1>
          <p className="text-sm font-light">Your intelligent command-based companion</p>
        </div>

        {/* 🔧 Chat Context Provider */}
        <ChatProvider>
          <Chat />
        </ChatProvider>
      </div>
    </div>
  );
}

export default App;