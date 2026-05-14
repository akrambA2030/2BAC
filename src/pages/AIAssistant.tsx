import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Trash2, BrainCircuit, Share2 } from 'lucide-react';
import { getAIResponse } from '../services/gemini';
import { useAuth } from '../hooks/useAuth';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Bonjour ${user?.displayName?.split(' ')[0]} ! Je suis votre assistant 2BAC Academy. Comment puis-je vous aider dans vos révisions aujourd'hui ? Je peux expliquer des concepts, résoudre des exercices ou vous donner des conseils de méthodologie.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || "Désolé, je n'ai pas pu générer de réponse.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">AI Study Assistant</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">En ligne</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={clearChat}
             className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-all"
             title="Effacer la conversation"
           >
             <Trash2 className="w-5 h-5" />
           </button>
           <button className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-400 transition-all">
             <Share2 className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-6 pr-4 space-y-6 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                message.role === 'assistant' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
              }`}>
                {message.role === 'assistant' ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5 text-gray-500" />}
              </div>
              <div className={`max-w-[80%] p-6 rounded-[32px] shadow-sm ${
                message.role === 'assistant' 
                  ? 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-none' 
                  : 'bg-indigo-600 text-white rounded-tr-none'
              }`}>
                <div className={`prose dark:prose-invert max-w-none ${message.role === 'user' ? 'text-white' : ''}`}>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <p className={`text-[10px] mt-4 opacity-50 font-bold uppercase tracking-widest ${message.role === 'user' ? 'text-white text-right' : ''}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-[32px] rounded-tl-none shadow-sm h-14 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-150"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSend}
        className="relative group lg:px-20"
      >
        <div className="absolute inset-0 bg-indigo-600/10 blur-2xl group-focus-within:bg-indigo-600/20 transition-all rounded-full"></div>
        <div className="relative flex items-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-2 shadow-xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question sur les maths, la physique..."
            className="flex-1 bg-transparent px-6 py-4 border-none focus:ring-0 text-lg placeholder:text-gray-400"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">L'IA peut faire des erreurs. Vérifiez toujours les informations importantes.</p>
      </form>
    </div>
  );
}
