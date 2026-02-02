'use client';

import { useState, useEffect, useRef } from 'react';
import { getGeminiResponse } from '../app/actions'; // Import the new Server Action

const saudiGuide = [
    { text: "ودّك تشوف تصاميمنا اللي تبيض الوجه؟ مرّ على معرض أعمالنا!", btn: "شوف الشغل 🎨", link: "#our-work" },
    { text: "لا تشيل هم التواصل، حنا موجودين دايم لخدمتك 24 ساعة!", btn: "راسلنا الحين 📧", link: "mailto:admin@fan-alelan.com" },
    { text: "تابعنا على فيسبوك وشوف الجديد أول بأول، لا يفوتك!", btn: "فيسبوكنا 👍", link: "https://www.facebook.com/profile.php?id=61587226595703" },
    { text: "تبي تعرف وين موقعنا؟ حنا قريبين منك، شرفنا!", btn: "موقعنا بقوقل 📍", link: "https://share.google/yok3tFEnIDCu8AZbY" }
];

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    loading?: boolean;
}

// Add isProactive to the bubble state type
interface BubbleState {
    visible: boolean;
    text: string;
    btn: string;
    link: string;
    isProactive?: boolean;
}

const NewChatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial', text: 'يا هلا بك! أنا فن، آمرني وش بغيت تسأل عنه؟ أبشر بسعدك!', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [bubble, setBubble] = useState<BubbleState>({ visible: false, text: 'حياك الله في فن الإعلان! ✨', btn: '', link: '' });
    const [isHovering, setIsHovering] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const eyesRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Mouse tracking for eyes
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
            const distance = Math.min(8, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 20);

            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            eyesRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isChatOpen]);

    // Bot attention-grabbing shake animation
    useEffect(() => {
        const shakeInterval = setInterval(() => {
            if (!isChatOpen) {
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 500); // Animation duration
            }
        }, 7000); // Shake every 7 seconds

        return () => clearInterval(shakeInterval);
    }, [isChatOpen]);

    // Proactive bubble messages logic
    useEffect(() => {
        const proactiveInterval = setInterval(() => {
            if (!isChatOpen && !isHovering) {
                const randomEntry = saudiGuide[Math.floor(Math.random() * saudiGuide.length)];
                // Set the bubble as a persistent, proactive message
                setBubble({ visible: true, text: randomEntry.text, btn: randomEntry.btn, link: randomEntry.link, isProactive: true });
                
                setTimeout(() => {
                    // Only hide the bubble if it's still the same proactive one
                    setBubble(b => (b.isProactive ? { ...b, visible: false, isProactive: false } : b));
                }, 8000); // Keep it visible for 8 seconds
            }
        }, 15000);

        return () => clearInterval(proactiveInterval);
    }, [isChatOpen, isHovering]);

    const handleMouseEnter = () => {
        if (isChatOpen) return;
        setIsHovering(true);
        // Only show the generic hover bubble if no other bubble is already visible
        setBubble(b => {
            if (b.visible) return b; // Don't overwrite an existing proactive bubble
            return { visible: true, text: "أهلاً بك! أنا هنا للمساعدة. اضغط عليّ للتحدث.", btn: "", link: "", isProactive: false };
        });
    };

    const handleMouseLeave = () => {
        if (isChatOpen) return;
        setIsHovering(false);
        // Only hide the bubble if it's a non-proactive (hover) bubble
        setBubble(b => (b.isProactive ? b : { ...b, visible: false }));
    };

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
        setIsHovering(false);
        // Always hide any bubble when opening/closing chat
        setBubble({visible: false, text: '', btn: '', link: '', isProactive: false});
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 500);
    };
    
    const handleSendMessage = async () => {
        const text = inputValue.trim();
        if (!text) return;

        const userMessage: Message = { id: `user-${Date.now()}`, text, sender: 'user' };
        const loadingMessage: Message = { id: `bot-${Date.now()}`, text: 'قاعد أفكر...', sender: 'bot', loading: true };
        
        setMessages(prev => [...prev, userMessage, loadingMessage]);
        setInputValue('');

        try {
            const botResponse = await getGeminiResponse(text);
            const newBotMessage: Message = { id: `bot-response-${Date.now()}`, text: botResponse, sender: 'bot' };
            setMessages(prev => prev.map(m => m.id === loadingMessage.id ? newBotMessage : m));

        } catch (error) {
            console.error("Error getting response from server action:", error);
            const errorMessage = { 
                id: loadingMessage.id, 
                text: "معليش حصل خطأ فني، جرب تسألني بعد شوي أو تواصل مع الدعم مباشرة.", 
                sender: 'bot' as const, 
                loading: false 
            };
            setMessages(prev => prev.map(m => m.id === loadingMessage.id ? errorMessage : m));
        }
    };

    return (
        <div 
            id="bot-master-container" 
            ref={containerRef} 
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-center z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
             <div id="bot-bubble" className={`transition-all duration-300 ease-in-out max-w-[220px] sm:max-w-xs text-right ${bubble.visible && !isChatOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}>
                 <div className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl rounded-br-lg text-xs sm:text-sm mb-3 shadow-lg">
                     <p>{bubble.text}</p>
                    {bubble.btn && <a href={bubble.link} target={bubble.link.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer" className="block mt-2 p-1.5 bg-yellow-500 text-white text-center rounded-lg text-xs no-underline">{bubble.btn}</a>}
                 </div>
            </div>

            {isChatOpen && (
                 <div id="chat-window" className="w-[300px] h-[400px] bg-[#1a1b1e] border-2 border-yellow-500 rounded-2xl overflow-hidden mb-4 shadow-2xl flex flex-col">
                    <div id="chat-header" className="bg-yellow-500 text-white p-2.5 font-bold flex justify-between items-center">
                        <span>اسأل &quot;فن&quot; 🦾</span>
                        <button onClick={toggleChat} className="bg-transparent border-none text-white cursor-pointer">✕</button>
                    </div>
                    <div id="chat-messages" className="flex-1 p-2.5 overflow-y-auto flex flex-col gap-2.5 text-sm text-gray-200">
                        {messages.map(msg => (
                            <div key={msg.id} className={`max-w-[85%] p-2 px-3 rounded-xl ${msg.sender === 'bot' ? 'bg-[#333] self-start rounded-bl-sm' : 'bg-yellow-500 self-end rounded-br-sm'} ${msg.loading ? 'loading-dots' : ''}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div id="chat-input-area" className="flex p-2.5 bg-[#25262b] gap-1.5">
                        <input 
                            type="text" 
                            id="chat-input" 
                            placeholder="اكتب سؤالك هنا..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1 bg-transparent border border-gray-600 rounded-lg text-white px-2.5 py-1.5 outline-none"
                        />
                        <button id="send-btn" onClick={handleSendMessage} className="bg-yellow-500 border-none text-white px-4 py-1.5 rounded-lg cursor-pointer">أرسل</button>
                    </div>
                </div>
            )}
            
            <div id="main-bot" onClick={toggleChat} className={`w-16 h-16 sm:w-20 sm:h-20 bg-[radial-gradient(circle_at_30%_30%,#f7941d,#b36500)] rounded-full relative cursor-pointer shadow-[0_0_25px_rgba(247,148,29,0.7)] flex flex-col justify-center items-center transition-transform duration-200 ease-out ${isPulsing ? 'animate-pulse' : ''} ${isShaking ? 'shake' : ''}`}>
                <div ref={eyesRef} className="eyes-container flex items-center transition-transform duration-100 ease-linear">
                    <div className="eye"></div>
                    <div className="eye"></div>
                </div>
                <div className="mouth"></div>
            </div>
        </div>
    );
}

export default NewChatbot;
