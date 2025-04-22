import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import "./global-css/chatbot.css";
import { IonIcon } from '@ionic/react';
import { chatbubblesOutline } from 'ionicons/icons';

const Chatbot: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasEntered, setHasEntered] = useState(false); 
    const [messages, setMessages] = useState<{ text: string, type: 'self' | 'other' }[]>([]);
    const [strictProductSearch, setStrictProductSearch] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isDisplayingMessage, setIsDisplayingMessage] = useState(false);
    const textBoxRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const myStorage = localStorage;

        if (!myStorage.getItem('chatID')) {
            myStorage.setItem('chatID', createUUID());
        }
        setTimeout(() => {
            setHasEntered(true);
        }, 300); 
    }, []);

    const createUUID = () => {
        let s: string[] = [];
        const hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((parseInt(s[19], 16) & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        return s.join("");
    };

    const openElement = () => {
        setIsExpanded(true);
        if (textBoxRef.current) textBoxRef.current.focus();
    };

    const closeElement = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsExpanded(false);
    };

    const sendNewMessage = () => {
        if (isTyping || isDisplayingMessage) return;
        if (textBoxRef.current) {
            const newMessage = textBoxRef.current.innerHTML.replace(/<div>|<br.*?>/ig, '\n').replace(/<\/div>/g, '').trim().replace(/\n/g, '<br>');
            if (!newMessage) return;

            setMessages((prev) => [...prev, { text: newMessage, type: 'self' }]);
            textBoxRef.current.innerHTML = '';
            textBoxRef.current.focus();

            setTimeout(() => {
                strictProductSearch ? searchProduct(newMessage) : handlePredefinedReplies(newMessage);
            }, 500);
        }
    };

    const handlePredefinedReplies = (message: string) => {
        let reply = '';
        const lowerCaseMessage = message.toLowerCase();
    
        if (lowerCaseMessage.includes("what is tara kabataan")) {
            reply = "Ang Tara Kabataan (TK) ay isang organisasyon ng mga kabataan sa Maynila na itinatag para isulong ang kaginhawaan ng bawat kabataan at Manilenyo. Pinapahalagahan ng samahan ang pakikipagkapwa ng mga Pilipino na nakasandig sa ating karapatan at pagkakapantay-pantay. Naniniwala ang TK sa kakayahan ng bawat kabataan, sa loob at labas ng paaralan, na siyang higit na dapat mabigyan ng oportunidad na malinang at mapaunlad. Mula rito, mas makikilala ng kabataan ang kaniyang sarili at matatanaw ang kaniyang mahalagang papel sa komunidad, lipunan, at bayan. Mula sa sarili tungo sa bayan ang siyang hinihikayat ng Tara Kabataan sa kaniyang kapwa.";
        } else if (lowerCaseMessage.includes("how to join tara kabataan")) {
            reply = "To join Tara Kabataan, you can visit our website and fill out the membership form. You can also attend our events and meetings to learn more about our organization and how you can get involved.";
        } else if (lowerCaseMessage.includes("what are the advocacies of tara kabataan")) {
            reply = `The advocacies of Tara Kabataan (5 K) are:
    - *Kalusugan*: Promoting accessible and humane healthcare services for all.
    - *Kalikasan*: Leading the call for climate justice and environmental protection.
    - *Karunungan*: Advocating for comprehensive and liberating education.
    - *Kultura*: Strengthening national identity and creative thinking.
    - *Kasarian*: Valuing gender equality and inclusive society.
    
    Visit the About page to learn more.`;
        } else if (/^(hello+|hi+|hey+)[!?,.]*$/.test(lowerCaseMessage)) {
            reply = "Hello! How can I assist you today?";
        } else if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks") || lowerCaseMessage.includes("thank")) {
            reply = "You're always welcome with Tara Kabataan!";
        } else {
            const productQuery = lowerCaseMessage.match(/(?:find|search for|check for|look for|do you have|is there)\s+(.+)/i);
            if (productQuery) {
                const productName = productQuery[1].trim();
                searchProduct(productName);
                return;
            } else {
                reply = "I'm sorry, I can't determine what you said. Please try again.";
            }
        }
    
        if (reply) {
            setIsTyping(true);
            setIsDisplayingMessage(true);
    
            setTimeout(() => {
                displayReply(reply);
            }, 2000);
        }
    };
    
    const displayReply = (reply: string) => {
        setIsTyping(false);
        const words = reply.split(' ');
        let currentText = '';
    
        setMessages(prev => [...prev, { text: '', type: 'other' }]);
    
        words.forEach((word, index) => {
            setTimeout(() => {
                currentText += word + ' ';
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { text: currentText.trim(), type: 'other' };
                    return updated;
                });
    
                if (index === words.length - 1) {
                    setIsDisplayingMessage(false);
                }
            }, index * 100);
        });
    };
    
    const searchProduct = (productName: string) => {
        $.ajax({
            url: 'searchProduct.php',
            method: 'POST',
            data: { productName },
            success: res => {
                setMessages(prev => [...prev, { text: res, type: 'other' }]);
                setIsDisplayingMessage(false);
            },
            error: () => {
                setMessages(prev => [...prev, { text: "Sorry, something went wrong.", type: 'other' }]);
                setIsDisplayingMessage(false);
            }
        });
    };
    
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            className={`floating-chat ${hasEntered ? 'enter' : ''} ${isExpanded ? 'expand' : ''}`}
            onClick={openElement}
            style={{ bottom: '20px', right: '20px' }}
        >
            <IonIcon icon={chatbubblesOutline} style={{ fontSize: '24px' }} />
            <div className={`chat ${isExpanded ? 'enter' : ''}`} style={{ height: isExpanded ? '500px' : '60px', transition: 'height 0.5s ease-out' }}>
                <div className="headerchat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="title">Tara, Usap!</span>
                    <button onClick={closeElement}>
                        <b className="fa fa-times" aria-hidden="true">x</b>
                    </button>
                </div>
                <ul className="messages" ref={messagesEndRef}>
                    {messages.map((msg, i) => (
                        <li key={i} className={msg.type}><div className="message-content">{msg.text}</div></li>
                    ))}
                    {isTyping && (
                        <li className="other typing-indicator">
                            <div className="message-content typing">
                                <span>•</span><span>•</span><span>•</span>
                            </div>
                        </li>
                    )}
                </ul>
                <div className="footerchat">
                    <div
                        className="text-box"
                        contentEditable
                        ref={textBoxRef}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendNewMessage(); } }}
                    ></div>
                    <button
                        id="sendMessage"
                        onClick={sendNewMessage}
                        disabled={isTyping || isDisplayingMessage}
                        className={isTyping || isDisplayingMessage ? "disabled-button" : ""}
                    >send</button>
                </div>
                <div className="predefined-messages">
                    {["What is Tara Kabataan?", "How to join Tara Kabataan?", "What are the advocacies of Tara Kabataan?"].map((q, i) => (
                        <button
                            key={i}
                            className={`predefined-message ${isTyping || isDisplayingMessage ? "disabled-button" : ""}`}
                            onClick={() => {
                                if (!isTyping && !isDisplayingMessage) {
                                    setMessages(prev => [...prev, { text: q, type: 'self' }]);
                                    handlePredefinedReplies(q);
                                }
                            }}
                            disabled={isTyping || isDisplayingMessage}
                        >{q}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
