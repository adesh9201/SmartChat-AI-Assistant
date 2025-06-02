import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/chat');
                const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
                setMessages(data);
            } catch (error) {
                console.error('Error loading messages:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const sendMessage = async (content) => {
        try {
            setIsLoading(true);

            const userMessage = {
                sender: 'user',
                content,
                type: 'text',
                timestamp: new Date().toISOString()
            };

            const userResponse = await axios.post('/api/chat', userMessage);
            setMessages(prev => [...prev, userResponse.data]);

            let assistantMessage;

            if (content.startsWith('/')) {
                const [command, ...args] = content.slice(1).split(' ');
                const query = args.join(' ');

                switch (command) {
                    case 'weather':
                        assistantMessage = await fetchPluginMessage('weather', query);
                        break;
                    case 'calc':
                        assistantMessage = await fetchPluginMessage('calc', query);
                        break;
                    case 'define':
                        assistantMessage = await fetchPluginMessage('define', query);
                        break;
                    default:
                        assistantMessage = {
                            sender: 'assistant',
                            content: `Unknown command: /${command}`,
                            type: 'text',
                            timestamp: new Date().toISOString()
                        };
                }
            } else {
                assistantMessage = await handleNaturalLanguage(content);
            }

            const assistantResponse = await axios.post('/api/chat', assistantMessage);
            setMessages(prev => [...prev, assistantResponse.data]);

        } catch (error) {
            console.error('Error sending message:', error);
            const fallback = {
                sender: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
                type: 'text',
                timestamp: new Date().toISOString()
            };
            const fallbackResponse = await axios.post('/api/chat', fallback);
            setMessages(prev => [...prev, fallbackResponse.data]);
        } finally {
            setIsLoading(false);
        }
    };

    const createPluginMessage = (pluginName, content, pluginData) => ({
        sender: 'assistant',
        content,
        type: 'plugin',
        pluginName,
        pluginData,
        timestamp: new Date().toISOString()
    });

    const fetchPluginMessage = async (pluginName, query) => {
        try {
            const response = await axios.get(`/api/${pluginName}/${query}`);
            return createPluginMessage(pluginName, `${pluginName[0].toUpperCase() + pluginName.slice(1)}: ${query}`, response.data);
        } catch (error) {
            return {
                sender: 'assistant',
                content: `Couldn't get result for /${pluginName} ${query}`,
                type: 'text',
                timestamp: new Date().toISOString()
            };
        }
    };

    const handleNaturalLanguage = async (content) => {
        const lower = content.toLowerCase();

        const weatherMatch = lower.match(/weather (?:in|for) (\w+)/);
        if (weatherMatch) {
            return await fetchPluginMessage('weather', weatherMatch[1]);
        }

        const calcMatch = content.match(/(?:calculate|what is|what's)\s+(\d+\s*[\+\-\*\/]\s*\d+)/i);
        if (calcMatch) {
            return await fetchPluginMessage('calc', calcMatch[1]);
        }

        const defineMatch = lower.match(/(?:define|meaning of) (\w+)/);
        if (defineMatch) {
            return await fetchPluginMessage('define', defineMatch[1]);
        }

        return {
            sender: 'assistant',
            content: 'I can help with weather, calculations, and definitions. Try commands like /weather London, /calc 2+2, or /define hello.',
            type: 'text',
            timestamp: new Date().toISOString()
        };
    };

    return (
        <ChatContext.Provider value={{ messages, isLoading, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);