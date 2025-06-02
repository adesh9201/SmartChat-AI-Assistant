import { ChatProvider } from './context/ChatContext';
import Chat from './components/Chat';
import logo from './assets/ai-logo.png';

function App() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="w-full max-w-4xl h-full bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        
        {/* 🔷 Header */}
        <div className="flex flex-col items-center justify-center py-3 border-b bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex-none">
          <img src={logo} alt="AI Chatbot Logo" className="h-12 w-12 mb-1" />
          <h1 className="text-xl font-bold tracking-wide">SmartChat AI Assistant</h1>
          <p className="text-xs font-light">Your intelligent command-based companion</p>
        </div>

        {/* 💬 Main Chat Area (fills the rest) */}
        <div className="flex-1 overflow-hidden">
          <ChatProvider>
            <Chat />
          </ChatProvider>
        </div>
      </div>
    </div>
  );
}

export default App;