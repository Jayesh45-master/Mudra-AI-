import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Ishario Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput("");

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I can help you navigate the app! Try checking out the Translator to practice signs, or go to Lessons to learn the alphabet.", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
          <div className="bg-[#5B8DEF] p-4 text-white flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <MessageCircle size={18} />
              Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white border border-slate-100 self-start text-slate-700' : 'bg-[#5B8DEF] text-white self-end'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#5B8DEF]"
            />
            <button type="submit" className="bg-[#5B8DEF] text-white p-2 rounded-full hover:bg-[#4a7bdd] transition-colors">
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#5B8DEF] hover:bg-[#4a7bdd] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;
