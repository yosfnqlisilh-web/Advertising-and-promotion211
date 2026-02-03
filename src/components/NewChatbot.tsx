'use client';

import { useState, useEffect, useRef } from 'react';
import { getGeminiResponse } from '@/app/actions';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    loading?: boolean;
}

const NewChatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial', text: 'يا هلا بك! أنا فن، آمرني وش بغيت تسأل عنه؟ أبشر بسعدك!', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isBlinking, setIsBlinking] = useState(false);
    const [isMouthOpen, setIsMouthOpen] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    
    const eyesRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!eyesRef.current || isChatOpen) return;
            const { clientX, clientY } = e;
            const eyeRect = eyesRef.current.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            const deltaX = clientX - eyeCenterX;
            const deltaY = clientY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(5, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 35);
            eyesRef.current.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isChatOpen]);

    useEffect(() => {
        const blinkInterval = setInterval(() => { if (!isChatOpen) { setIsBlinking(true); setTimeout(() => setIsBlinking(false), 200); } }, 3000);
        const mouthInterval = setInterval(() => { if (!isChatOpen) { setIsMouthOpen(true); setTimeout(() => setIsMouthOpen(false), 400); } }, 4500);
        const jumpInterval = setInterval(() => { if (!isChatOpen) { setIsJumping(true); setTimeout(() => setIsJumping(false), 800); } }, 7000);
        return () => { clearInterval(blinkInterval); clearInterval(mouthInterval); clearInterval(jumpInterval); };
    }, [isChatOpen]);

    const toggleChat = () => setIsChatOpen(!isChatOpen);
    
    const handleSendMessage = async () => {
        const text = inputValue.trim();
        if (!text) return;

        const userMsg: Message = { id: `u-${Date.now()}`, text, sender: 'user' };
        const loadingMsg: Message = { id: `b-l-${Date.now()}`, text: 'قاعد أفكر...', sender: 'bot', loading: true };
        
        setMessages(prev => [...prev, userMsg, loadingMsg]);
        setInputValue('');

        try {
            const botResponse = await getGeminiResponse(text);
            const newBotMsg: Message = { id: `b-r-${Date.now()}`, text: botResponse, sender: 'bot' };
            setMessages(prev => prev.map(m => m.id === loadingMsg.id ? newBotMsg : m));
        } catch (error: any) {
            const errorMsg: Message = { id: loadingMsg.id, text: `خطأ تقني: ${error.message || 'غير معروف'}`, sender: 'bot' };
            setMessages(prev => prev.map(m => m.id === loadingMsg.id ? errorMsg : m));
        }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-col items-end z-[9999]">
            {isChatOpen && (
                <div className="fixed inset-0 sm:inset-auto sm:relative sm:mb-6 w-full h-full sm:w-[380px] sm:h-[550px] bg-[#1a1b1e]/98 backdrop-blur-2xl sm:rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
                    <div className="p-4 bg-[#ff9000] flex justify-between items-center text-white shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-2xl">🤖</div>
                            <div>
                                <h3 className="font-bold text-sm leading-none">مساعد فن الذكي</h3>
                                <span className="text-[10px] opacity-80">متصل الآن - أبشر بسعدك</span>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="text-2xl hover:opacity-70">✕</button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm ${
                                    msg.sender === 'user' ? 'bg-[#ff9000] text-white rounded-br-none shadow-[0_4px_12px_rgba(255,144,0,0.3)]' : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white/5 border-t border-white/10">
                        <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-2 py-1.5 focus-within:ring-1 ring-[#ff9000] transition-all">
                            <input 
                                type="text" 
                                placeholder="اكتب سؤالك هنا..." 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                className="flex-1 bg-transparent border-none text-white px-3 py-2 outline-none text-sm"
                            />
                            <button 
                                onClick={handleSendMessage} 
                                className="bg-[#ff9000] text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-[0_4px_12px_rgba(255,144,0,0.4)] hover:scale-105 transition-transform active:scale-95"
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {!isChatOpen && (
                <button 
                    onClick={toggleChat}
                    className={`group relative w-14 h-14 sm:w-20 sm:h-20 bg-[#ff9000] rounded-full bot-glow flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${isJumping ? 'jump-animation' : ''}`}
                >
                    <div className="bot-character">
                        <div className="eyebrows-container"><div className="eyebrow"></div><div className="eyebrow"></div></div>
                        <div ref={eyesRef} className={`eyes-container ${isBlinking ? 'blink' : ''}`}><div className="eye"></div><div className="eye"></div></div>
                        <div className={`mouth ${isMouthOpen ? 'mouth-open' : ''}`}></div>
                    </div>
                </button>
            )}
        </div>
    );
}

export default NewChatbot;
