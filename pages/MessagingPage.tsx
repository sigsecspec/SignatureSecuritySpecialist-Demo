import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Conversation, Message } from '../types';

const mockConversations: Conversation[] = [];

const mockMessages: { [key: string]: Message[] } = {};

const MessagingPage: React.FC = () => {
    const { user } = useAuth();
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    
    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setMessages(mockMessages[conversation.id] || []);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        const msg: Message = {
            id: Date.now(),
            sender: user?.email || 'self',
            recipient: selectedConversation.id,
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: true,
        };
        setMessages(prev => [...prev, msg]);
        setNewMessage('');
    };


    return (
        <div>
            <h1 className="text-3xl font-bold text-sss-ebony mb-8">Messaging Center</h1>
            <div className="flex h-[70vh] bg-white rounded-lg shadow-md">
                {/* Conversation List */}
                <div className="w-1/3 border-r">
                    <div className="p-4 border-b">
                        <input type="text" placeholder="Search conversations..." className="w-full px-3 py-2 border rounded-md text-sm"/>
                    </div>
                    <div className="overflow-y-auto h-full">
                        {mockConversations.map(convo => (
                            <div key={convo.id} onClick={() => handleSelectConversation(convo)} 
                                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${selectedConversation?.id === convo.id ? 'bg-gray-100' : ''}`}>
                                <div className="w-10 h-10 bg-sss-sage text-white rounded-full flex items-center justify-center font-bold mr-3">{convo.avatar}</div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{convo.name}</p>
                                    <p className="text-sm text-sss-grey truncate">{convo.lastMessage}</p>
                                </div>
                                <p className="text-xs text-sss-grey">{convo.timestamp}</p>
                            </div>
                        ))}
                         {mockConversations.length === 0 && (
                            <p className="text-center text-sss-grey p-4">No conversations yet.</p>
                        )}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="w-2/3 flex flex-col">
                    {selectedConversation ? (
                         <>
                            <div className="p-4 border-b flex items-center">
                                 <div className="w-10 h-10 bg-sss-sage text-white rounded-full flex items-center justify-center font-bold mr-3">{selectedConversation.avatar}</div>
                                 <h2 className="text-xl font-bold">{selectedConversation.name}</h2>
                            </div>
                             <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                                {messages.map(msg => (
                                     <div key={msg.id} className={`flex ${msg.sender === user?.email ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-lg max-w-xs ${msg.sender === user?.email ? 'bg-sss-sage text-white' : 'bg-gray-200 text-sss-ebony'}`}>
                                            <p>{msg.content}</p>
                                            <p className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t">
                                <form onSubmit={handleSendMessage} className="flex">
                                    <input 
                                        type="text" 
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        placeholder="Type your message..." 
                                        className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-sss-sage"/>
                                    <button type="submit" className="bg-sss-sage text-white font-bold px-6 rounded-r-md">Send</button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-sss-grey">Select a conversation to start messaging.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagingPage;