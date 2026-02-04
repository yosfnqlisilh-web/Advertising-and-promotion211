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
    const [isVisible, setIsVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial', text: 'يا هلا بك! أنا فن، خبيرك في الكلادينج واللوحات. آمرني وش بغيت تسأل عنه؟ أبشر بسعدك!', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isBlinking, setIsBlinking] = useState(false);
    const [isMouthOpen, setIsMouthOpen] = useState(false);
    const [isSuperJumping, setIsSuperJumping] = useState(false); 
    const [lookUp, setLookUp] = useState(false);
    
    const [hintIndex, setHintIndex] = useState(0);
    const hints = [
        { text: "عندك استفسار؟ اسألني هنا! ✨", btn: "اسأل فن 🦾", link: null },
        { text: "راسلنا واتساب مباشرة 🟢", btn: "واتساب", link: "https://wa.me/966557517792" },
        { text: "موقعنا على الخريطة 📍", btn: "الخريطة", link: "https://share.google/yok3tFEnIDCu8AZbY" },
        { text: "تابع جديد أعمالنا! 👍", btn: "فيسبوك", link: "https://www.facebook.com/profile.php?id=61587226595703" }
    ];

    const eyesRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    useEffect(() => {
        if (!isChatOpen && isVisible) {
            const timer = setInterval(() => {
                setHintIndex((prev) => {
                    const next = (prev + 1) % hints.length;
                    if (next === 0) triggerRocketJump();
                    return next;
                });
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isChatOpen, hints.length, isVisible]);

    const triggerRocketJump = () => {
        setLookUp(true); 
        setTimeout(() => {
            setIsSuperJumping(true);
            setTimeout(() => {
                setIsSuperJumping(false);
                setLookUp(false);
            }, 400);
        }, 150);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!eyesRef.current || isChatOpen || lookUp) return;
            const { clientX, clientY } = e;
            const eyeRect = eyesRef.current.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
            eyesRef.current.style.transform = `translate(${Math.cos(angle) * 5}px, ${Math.sin(angle) * 5}px)`;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isChatOpen, lookUp]);

    useEffect(() => {
        if (lookUp && eyesRef.current) {
            eyesRef.current.style.transform = `translateY(-8px) scaleY(0.6)`;
        }
    }, [lookUp]);

    useEffect(() => {
        const blinkInterval = setInterval(() => { if (!isChatOpen) { setIsBlinking(true); setTimeout(() => setIsBlinking(false), 200); } }, 3000);
        const mouthInterval = setInterval(() => { if (!isChatOpen) { setIsMouthOpen(true); setTimeout(() => setIsMouthOpen(false), 400); } }, 4500);
        return () => { clearInterval(blinkInterval); clearInterval(mouthInterval); };
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
        } catch (error) {
            console.error("Chatbot send message error:", error);
            const errorMsg: Message = { id: loadingMsg.id, text: "يا هلا بك! حصل التماس بسيط، تواصل معنا واتساب!", sender: 'bot' };
            setMessages(prev => prev.map(m => m.id === loadingMsg.id ? errorMsg : m));
        }
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-col items-center z-[9999] transition-all cubic-bezier(0.34, 1.56, 0.64, 1) ${isSuperJumping ? 'translate-y-[-500px] opacity-0 scale-75 duration-300' : 'translate-y-0 opacity-100 scale-100 duration-500'}`}>
            
            {/* MINI HINT BUBBLE FOR MOBILE */}
            {!isChatOpen && (
                <div className="mb-2 bg-[#1a1b1e]/95 backdrop-blur-xl border border-[#ff9000]/40 p-2 sm:p-3 rounded-xl rounded-br-none shadow-2xl max-w-[120px] sm:max-w-[160px] text-center transform translate-x-[-2%]">
                    <div key={hintIndex} className="animate-in fade-in zoom-in-95 duration-500">
                        <p className="text-white text-[9px] sm:text-xs leading-tight mb-1.5 font-bold">{hints[hintIndex].text}</p>
                        {hints[hintIndex].link ? (
                            <a href={hints[hintIndex].link!} target="_blank" rel="noopener noreferrer" className="block w-full py-1 bg-[#ff9000] text-white text-center rounded-lg text-[8px] sm:text-[10px] font-black shadow-md">{hints[hintIndex].btn}</a>
                        ) : (
                            <button onClick={toggleChat} className="block w-full py-1 bg-[#ff9000] text-white text-center rounded-lg text-[8px] sm:text-[10px] font-black shadow-md">{hints[hintIndex].btn}</button>
                        )}
                    </div>
                </div>
            )}

            {isChatOpen && (
                <div className="fixed inset-0 sm:inset-auto sm:relative sm:mb-6 w-full h-full sm:w-[380px] sm:h-[550px] bg-[#1a1b1e]/98 backdrop-blur-2xl sm:rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="p-4 bg-[#ff9000] flex justify-between items-center text-white shadow-md text-right" dir="rtl">
                        <div className="flex items-center gap-3"><div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-xl">🦾</div><span className="font-bold">مساعد فن الذكي</span></div>
                        <button onClick={toggleChat} className="text-2xl hover:opacity-70">✕</button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" dir="rtl">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm ${msg.sender === 'user' ? 'bg-[#ff9000] text-white rounded-br-none font-medium' : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 bg-white/5 border-t border-white/10" dir="rtl">
                        <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-1.5 focus-within:ring-1 ring-[#ff9000]">
                            <input type="text" placeholder="اكتب سؤالك هنا..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-transparent border-none text-white outline-none text-sm" />
                            <button onClick={handleSendMessage} className="bg-[#ff9000] text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg></button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* MINI BOT FOR MOBILE */}
            {!isChatOpen && (
                <button onClick={toggleChat} className="group relative w-12 h-12 sm:w-18 sm:h-18 bg-[#ff9000] rounded-full bot-glow flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl">
                    <div className="bot-character scale-75 sm:scale-100">
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
