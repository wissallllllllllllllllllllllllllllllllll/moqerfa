"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Paperclip, Send, History, X, FileText, Image, Video, Music } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

interface Message {
    id: number;
    text?: string;
    file?: File;
    isUser: boolean;
    timestamp: Date;
}

interface ChatSession {
    id: string;
    title: string;
    messages: Message[];
    lastActive: Date;
}

const EnhancedChatbot = () => {
    const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [showHistory, setShowHistory] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />;
        if (file.type.startsWith('video/')) return <Video className="w-4 h-4" />;
        if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />;
        return <FileText className="w-4 h-4" />;
    };

    const createNewSession = () => {
        const sessionId = `session-${Date.now()}`;
        const newSession: ChatSession = {
            id: sessionId,
            title: "Nouvelle conversation",
            messages: [],
            lastActive: new Date()
        };
        setChatSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(sessionId);
        setCurrentMessages([]);
        setShowHistory(false);
    };

    const loadSession = (sessionId: string) => {
        const session = chatSessions.find(s => s.id === sessionId);
        if (session) {
            setCurrentSessionId(sessionId);
            setCurrentMessages(session.messages);
            setShowHistory(false);
        }
    };

    const updateCurrentSession = (newMessages: Message[]) => {
        if (currentSessionId) {
            setChatSessions(prev => prev.map(session =>
                session.id === currentSessionId
                    ? {
                        ...session,
                        messages: newMessages,
                        lastActive: new Date(),
                        title: newMessages.length > 0 && newMessages[0].text
                            ? newMessages[0].text.substring(0, 30) + "..."
                            : "Nouvelle conversation"
                    }
                    : session
            ));
        }
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        if (!currentSessionId) {
            createNewSession();
        }

        const newMessage: Message = {
            id: Date.now(),
            text: inputValue.trim(),
            isUser: true,
            timestamp: new Date(),
        };

        const updatedMessages = [...currentMessages, newMessage];
        setCurrentMessages(updatedMessages);
        setInputValue("");
        updateCurrentSession(updatedMessages);

        // Simulate bot reply
        setTimeout(() => {
            const botReply: Message = {
                id: Date.now() + 1,
                text: `J'ai reçu votre message: "${newMessage.text}". Comment puis-je vous aider davantage?`,
                isUser: false,
                timestamp: new Date(),
            };
            const finalMessages = [...updatedMessages, botReply];
            setCurrentMessages(finalMessages);
            updateCurrentSession(finalMessages);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileUpload = (file: File) => {
        if (!currentSessionId) {
            createNewSession();
        }

        const newMessage: Message = {
            id: Date.now(),
            file,
            isUser: true,
            timestamp: new Date(),
        };

        const updatedMessages = [...currentMessages, newMessage];
        setCurrentMessages(updatedMessages);
        updateCurrentSession(updatedMessages);

        // Clear file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        // Simulate bot reply for file
        setTimeout(() => {
            const botReply: Message = {
                id: Date.now() + 1,
                text: `J'ai reçu votre fichier "${file.name}". Que souhaitez-vous faire avec ce fichier?`,
                isUser: false,
                timestamp: new Date(),
            };
            const finalMessages = [...updatedMessages, botReply];
            setCurrentMessages(finalMessages);
            updateCurrentSession(finalMessages);
        }, 1000);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const deleteSession = (sessionId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setChatSessions(prev => prev.filter(s => s.id !== sessionId));
        if (currentSessionId === sessionId) {
            setCurrentSessionId(null);
            setCurrentMessages([]);
        }
    };

    return (
      <>
          <Navbar />
          <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-8 py-20">

          <div className="flex h-screen bg-gray-50">
            {/* Sidebar for History */}
            <div className={`bg-white border-r transition-all duration-300 ${showHistory ? 'w-80' : 'w-0'} overflow-hidden`}>
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <History className="w-5 h-5" />
                            Historique des chats
                        </h2>
                        <button
                            onClick={() => setShowHistory(false)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <button
                        onClick={createNewSession}
                        className="px-5 py-2 border rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100" >
                        Nouvelle conversation
                    </button>

                    <div className="space-y-2">
                        {chatSessions.map((session) => (
                            <div
                                key={session.id}
                                className={`p-3 rounded-lg cursor-pointer transition-colors relative group ${
                                    currentSessionId === session.id ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                                onClick={() => loadSession(session.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{session.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            {session.lastActive.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => deleteSession(session.id, e)}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded"
                                    >
                                        <X className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="container mx-auto">
                {/* Header */}
                <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <History className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-semibold">Chat'Com</h1>
                        </div>
                    </div>
                    <button
                        onClick={createNewSession}
                        className="px-5 py-2 border rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                        Nouveau chat
                    </button>
                </div>

                {/* Messages Area */}
                <div
                    className={`flex-1 overflow-y-auto p-6 ${dragOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {currentMessages.length === 0 && (
                        <div className="text-center text-gray-500 mt-20">
                            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg mb-2">Commencez une nouvelle conversation</p>
                            <p>Tapez un message ou glissez-déposez un fichier pour commencer</p>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto">
                        {currentMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`mb-6 flex ${
                                    msg.isUser ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-lg p-4 rounded-2xl ${
                                        msg.isUser
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-800 border shadow-sm"
                                    }`}
                                >
                                    {msg.text && (
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    )}
                                    {msg.file && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-2">
                                            {getFileIcon(msg.file)}
                                            <a
                                                href={URL.createObjectURL(msg.file)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                {msg.file.name}
                                            </a>
                                            <span className="text-sm text-gray-500 ml-auto">
                                                {(msg.file.size / 1024).toFixed(1)} KB
                                            </span>
                                        </div>
                                    )}
                                    <div className={`text-xs mt-2 ${msg.isUser ? 'text-blue-200' : 'text-gray-500'}`}>
                                        {msg.timestamp.toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-white border-t p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-end gap-3">
                            <div className="flex-1 relative">
                                <textarea
                                    className="w-full border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={2}
                                    placeholder="Tapez votre message..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileInputChange}
                            />

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                                title="Joindre un fichier"
                            >
                                <Paperclip className="w-5 h-5 text-gray-600" />
                            </button>

                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim()}
                                className={`p-3 rounded-xl text-white transition-colors ${
                                    inputValue.trim()
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-blue-300 cursor-not-allowed"
                                }`}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          </main>
          <Footer />
          </>

    );
};

export default EnhancedChatbot;