"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../utils/cartSlice";
import { AIMessage } from "../../../types/types";
import { FiCpu, FiX, FiSend, FiShoppingBag, FiZap } from "react-icons/fi";

export const AIChefWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "👋 Hi! I'm **TastyAI**, your personal AI Sommelier & Chef. Ask me anything—from dish recommendations and wine pairings to customized high-protein meals!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const dispatch = useDispatch();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chef", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });
      const data = await res.json();

      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.reply || "I'm having trouble retrieving recommendations right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedItems: data.suggestedItems,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Assistant Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Oops! Network issue connecting to TastyAI. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: any) => {
    dispatch(
      addItem({
        item: {
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          quantity: 1,
          isVeg: true,
          restaurantName: item.restaurantName,
        },
      })
    );
  };

  const promptChips = [
    "🍕 Best pizza & drink combo",
    "🥗 High protein meal under ₹350",
    "🍰 Sweet craving dessert",
    "🌱 Vegan recommendations",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-neon-amber flex items-center gap-2.5 px-5 py-3.5 rounded-full shadow-glow-amber transition-transform duration-300 hover:scale-105"
        >
          <div className="relative">
            <FiZap className="text-xl text-slate-950 animate-spin-slow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="font-bold text-slate-950 text-sm tracking-wide">Ask TastyAI</span>
        </button>
      )}

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[540px] glass-panel rounded-2xl shadow-glass-lg flex flex-col border border-white/20 overflow-hidden animate-float">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-slate-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-slate-950 shadow-glow-amber">
                <FiCpu className="text-xl text-slate-950" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 flex items-center gap-1.5 text-base">
                  TastyAI Sommelier <FiZap className="text-amber-400 text-xs" />
                </h3>
                <p className="text-xs text-slate-400">Powered by Gemini AI • Culinary Companion</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Messages Window */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-amber-500 text-slate-950 font-medium rounded-br-none"
                      : "bg-slate-900/90 text-slate-200 border border-white/10 rounded-bl-none shadow-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* AI Suggested Dish Cards */}
                  {msg.suggestedItems && msg.suggestedItems.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                      <p className="text-xs font-bold text-amber-400">Recommended Dishes:</p>
                      {msg.suggestedItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-950/80 p-2.5 rounded-xl border border-amber-500/30 flex items-center justify-between gap-2"
                        >
                          <div>
                            <p className="font-bold text-slate-100 text-xs">{item.name}</p>
                            <p className="text-[11px] text-amber-400 font-semibold">₹{item.price}</p>
                          </div>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="px-2.5 py-1 text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <FiShoppingBag className="text-xs" /> Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-900/60 p-3 rounded-2xl border border-white/10 w-fit">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>TastyAI is crafting your culinary recommendation...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="px-3 py-2 bg-slate-950/80 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-white/10 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask TastyAI for food or pairings..."
              className="flex-1 glass-input px-3.5 py-2 rounded-xl text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all shadow-glow-amber"
            >
              <FiSend className="text-base" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChefWidget;
