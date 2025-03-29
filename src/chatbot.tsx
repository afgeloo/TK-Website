import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import "./global-css/chatbot.css";
import { IonIcon } from '@ionic/react';
import { chatbubblesOutline, personCircleOutline } from 'ionicons/icons'; // Import person icon
import cowIcon from './src/assets/chatbot/CowIconChat.png'; // Import cow icon

const Chatbot: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<{ text: string, type: 'self' | 'other' }[]>([]);
    const [strictProductSearch, setStrictProductSearch] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isDisplayingMessage, setIsDisplayingMessage] = useState(false); // Track if chatbot is displaying a message
    const textBoxRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const element = $('.floating-chat');
        const myStorage = localStorage;

        if (!myStorage.getItem('chatID')) {
            myStorage.setItem('chatID', createUUID());
        }

        setTimeout(() => {
            element.addClass('enter');
        }, 1000);

        element.click(openElement);

        return () => {
            element.off('click', openElement);
        };
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
        if (textBoxRef.current) {
            textBoxRef.current.focus();
        }
    };

    const closeElement = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent the click from propagating to the parent element
        setIsExpanded(false);
    };

    const sendNewMessage = () => {
        if (isTyping || isDisplayingMessage) return; // Prevent sending new messages while typing or displaying

        if (textBoxRef.current) {
            const newMessage = textBoxRef.current.innerHTML.replace(/<div>|<br.*?>/ig, '\n').replace(/<\/div>/g, '').trim().replace(/\n/g, '<br>');
            if (!newMessage) return;

            setMessages((prevMessages) => [...prevMessages, { text: newMessage, type: 'self' }]);
            textBoxRef.current.innerHTML = '';
            textBoxRef.current.focus();

            setTimeout(() => {
                if (strictProductSearch) {
                    searchProduct(newMessage);
                } else {
                    handlePredefinedReplies(newMessage);
                }
            }, 500); // Delay to show the message before answering
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
            // Check if the message is a product query //
            const productQuery = lowerCaseMessage.match(/(?:where can i find|where|is|available|product|find|can you check|do you have|search for|look for|find me|show me|check for)\s+(.+)/i);
            if (productQuery) {
                const productName = productQuery[1].trim();
                searchProduct(productName);
                return;
            } else {
                reply = "I'm sorry, I can't determine what you said. Please try again.";
            }
        }

        if (reply) {
            setIsTyping(true); // Disable buttons immediately
            setIsDisplayingMessage(true); // Start displaying message
            
            setTimeout(() => {
                displayReply(reply);
            }, 2000); // Short delay before starting to type
        }
    };

    const displayReply = (reply: string) => {
        setIsTyping(false); // Ensure typing is false
        const words = reply.split(' ');
        let currentText = '';
        
        // Add the initial message with empty text
        setMessages(prevMessages => [...prevMessages, { text: '', type: 'other' }]);
        
        words.forEach((word, index) => {
            setTimeout(() => {
                currentText += word + ' ';
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages];
                    newMessages[newMessages.length - 1] = { 
                        text: currentText.trim(), 
                        type: 'other' 
                    };
                    return newMessages;
                });
                if (index === words.length - 1) {
                    setIsDisplayingMessage(false); // Finish displaying message
                }
            }, index * 100); // Slightly faster typing (100ms per word)
        });
    };

    const searchProduct = (productName: string) => {
        $.ajax({
            url: 'searchProduct.php',
            method: 'POST',
            data: { productName: productName },
            success: function(response) {
                setMessages((prevMessages) => [...prevMessages, { text: response, type: 'other' }]);
                setIsDisplayingMessage(false); // Finish displaying message
            },
            error: function() {
                setMessages((prevMessages) => [...prevMessages, { text: "Sorry, there was an error processing your request. Please try again later.", type: 'other' }]);
                setIsDisplayingMessage(false); // Finish displaying message
            }
        });
    };

    const toggleSearchMode = () => {
        setStrictProductSearch(!strictProductSearch);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className={`floating-chat ${isExpanded ? 'expand' : ''}`} onClick={openElement} style={{ bottom: '20px', right: '20px' }}>
                <IonIcon icon={chatbubblesOutline} style={{ fontSize: '24px' }} />
                <div className={`chat ${isExpanded ? 'enter' : ''}`} style={{ height: isExpanded ? '500px' : '60px', transition: 'height 0.5s ease-out' }}> {/* Adjusted height and transition */}
                    <div className="headerchat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Align elements */}
                        <span className="title">Tara, Usap!</span>
                        <button onClick={closeElement}>
                            <b className="fa fa-times" aria-hidden="true">x</b>
                        </button>
                    </div>
                    <ul className="messages" ref={messagesEndRef}>
                        {messages.map((message, index) => (
                            <li key={index} className={message.type}>
                                <div className="message-content">{message.text}</div>
                            </li>
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
                        <div className="text-box" contentEditable="true" ref={textBoxRef} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendNewMessage(); } }}></div>
                        <button 
                            id="sendMessage" 
                            onClick={sendNewMessage} 
                            disabled={isTyping || isDisplayingMessage} // Disable while typing or displaying
                            className={isTyping || isDisplayingMessage ? "disabled-button" : ""}
                        >
                            send
                        </button>
                    </div>
                    <div className="predefined-messages">
                        <button 
                            className={`predefined-message ${isTyping || isDisplayingMessage ? "disabled-button" : ""}`} 
                            onClick={() => { 
                                if (!isTyping && !isDisplayingMessage) { 
                                    setMessages((prevMessages) => [...prevMessages, { text: "What is Tara Kabataan?", type: 'self' }]); 
                                    handlePredefinedReplies("What is Tara Kabataan?"); 
                                } 
                            }} 
                            disabled={isTyping || isDisplayingMessage}
                        >
                            What is Tara Kabataan?
                        </button>
                        <button 
                            className={`predefined-message ${isTyping || isDisplayingMessage ? "disabled-button" : ""}`} 
                            onClick={() => { 
                                if (!isTyping && !isDisplayingMessage) { 
                                    setMessages((prevMessages) => [...prevMessages, { text: "How to join Tara Kabataan?", type: 'self' }]); 
                                    handlePredefinedReplies("How to join Tara Kabataan?"); 
                                } 
                            }} 
                            disabled={isTyping || isDisplayingMessage}
                        >
                            How to join Tara Kabataan?
                        </button>
                        <button 
                            className={`predefined-message ${isTyping || isDisplayingMessage ? "disabled-button" : ""}`} 
                            onClick={() => { 
                                if (!isTyping && !isDisplayingMessage) { 
                                    setMessages((prevMessages) => [...prevMessages, { text: "What are the advocacies of Tara Kabataan?", type: 'self' }]); 
                                    handlePredefinedReplies("What are the advocacies of Tara Kabataan?"); 
                                } 
                            }} 
                            disabled={isTyping || isDisplayingMessage}
                        >
                            What are the advocacies of Tara Kabataan?
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;