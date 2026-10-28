import { useState, useEffect, useRef } from "react";
import { Bot, X, SendHorizontal } from "lucide-react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import { getAIResponse } from "../../services/gemini";

import type { Message } from "../../types";
import EmergencyAlert from "./EmergencyAlert";

const emergencyKeywords = [
  "chest pain",
  "heart attack",
  "can't breathe",
  "difficulty breathing",
  "stroke",
  "unconscious",
  "bleeding",
  "heavy bleeding",
  "seizure",
  "collapsed",
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      sender: "ai",
      text: "Hello! 👋 I'm MediAura AI. I can help you understand symptoms, provide basic first aid guidance, find nearby hospitals, and assist during emergencies.",
      timestamp: new Date(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const animateAIResponse = (
    fullText: string,
    updatedMessages: Message[]
  ): Promise<void> => {

    return new Promise((resolve) => {

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: "",
        timestamp: new Date(),
      };

      setMessages([
        ...updatedMessages,
        aiMessage,
      ]);

      let currentIndex = 0;

      const interval = setInterval(() => {

      currentIndex++;

      const partialText =
          fullText.slice(0, currentIndex);

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiMessage.id
              ? {
                  ...msg,
                  text: partialText,
                }
              : msg
          )
        );
      
      if (currentIndex >= fullText.length) {
          clearInterval(interval);
          resolve();
      }
      }, 30);
    });
    };
    

  const handleSend = async () => {

    const userMessage = message.trim();
    if (!userMessage) return;

    const hasEmergencyKeyword = emergencyKeywords.some((keyword) =>
      userMessage.toLowerCase().includes(keyword)
    );

    const updatedMessages: Message[] = [
      ...messages,
      {
        id: crypto.randomUUID(),
        sender: "user",
        text: userMessage,
        timestamp: new Date(),
        isEmergency: hasEmergencyKeyword,
      },
    ];

    setMessages(updatedMessages);

    setMessage("");
    
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(updatedMessages);

      await animateAIResponse(
          aiResponse,
          updatedMessages
      );

    } catch (error) {
      console.error(error);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: crypto.randomUUID(),
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRegenerate = async () => {

    const updatedMessages = messages.slice(0, -1);

    setIsTyping(true);

    try {

      const aiResponse =
        await getAIResponse(updatedMessages);

      await animateAIResponse(
        aiResponse,
        updatedMessages
      );

    } catch (error) {

      console.error(error);

    } finally {

      setIsTyping(false);

    }

  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
     behavior: "smooth",
      });
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem(
      "mediAuraChat",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    const savedChat = localStorage.getItem("mediAuraChat");

    if (savedChat) {
      const parsedMessages: Message[] = JSON.parse(savedChat);

      const restoredMessages = parsedMessages.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));

      setMessages(restoredMessages);
    }
  }, []);

  useEffect(() => {
  if (!textareaRef.current) return;

  textareaRef.current.style.height = "auto";

  textareaRef.current.style.height =
  `${textareaRef.current.scrollHeight}px`;

  }, [message]);

  return (
    <>
      {isOpen && (
        <div
          className="
            fixed
            bottom-24
            right-6
            z-50
            w-96
            h-[600px]
            rounded-2xl
            bg-slate-900/95
            backdrop-blur-md
            border
            border-cyan-500/20
            shadow-2xl
            flex
            flex-col
            overflow-hidden
          "
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h2 className="text-white font-bold">
                    MediAura AI
                  </h2>

                  <p className="text-xs text-emerald-400">
                    ● Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5">

              {messages.map((msg, index) => {

                const isLastMessage = index === messages.length - 1;

                return (

                  <div key={msg.id}>
                    <ChatBubble
                      sender={msg.sender}
                      text={msg.text}
                      timestamp={msg.timestamp}
                      isLastMessage={isLastMessage}
                      onRegenerate={handleRegenerate}
                      isTyping={isTyping}
                    />
                  {msg.isEmergency && <EmergencyAlert />}
                </div>
              );
            })}

              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef}></div>

            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3">

                <textarea
                  ref={textareaRef}
                  disabled={isTyping}
                  placeholder={
                      isTyping
                          ? "MediAura AI is typing..."
                          : "Ask MediAura AI..."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="
                    flex-1
                    min-h-[48px]
                    max-h-40
                    resize-none
                    overflow-y-auto
                    rounded-xl
                    bg-slate-800
                    border
                    border-white/10
                    px-4
                    py-3
                    text-white
                    placeholder-gray-400
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                ></textarea>

                <button
                    onClick={handleSend}
                    disabled={isTyping}
                    className={`
                        w-12
                        h-12
                        rounded-xl
                        text-white
                        flex
                        items-center
                        justify-center
                        transition

                        ${
                          isTyping
                            ? "bg-cyan-700 cursor-not-allowed opacity-60"
                            : "bg-cyan-500 hover:bg-cyan-400"
                        }
                    `}
                >
                    <SendHorizontal className="w-5 h-5" />
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed
          bottom-6
          right-6
          z-50
          w-16
          h-16
          rounded-full
          bg-cyan-500
          flex
          items-center
          justify-center
          cursor-pointer
          shadow-lg
          transition-all
          duration-300
          hover:scale-110
        "
      >
        <Bot className="w-8 h-8 text-white" />
      </div>
    </>
  );
};

export default AIAssistant;