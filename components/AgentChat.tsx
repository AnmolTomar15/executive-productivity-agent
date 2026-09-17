"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  User,
  Bot,
  Link2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  Mic,
  Calendar,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Key,
  Settings,
  X,
} from "lucide-react";
import {
  queryExecutiveAgentAsync,
  SUGGESTED_PROMPTS,
  AIResponse,
  Citation,
} from "../lib/aiEngine";

interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  citations?: Citation[];
  suggestedActions?: {
    label: string;
    actionType: "draft_email" | "assign_lease" | "view_calendar" | "view_deliverables";
    payload?: any;
  }[];
  timestamp: string;
}

interface AgentChatProps {
  onOpenActionModal: (type: "draft_email" | "assign_lease", payload?: any) => void;
  onNavigateTab: (tab: "briefing" | "data" | "deliverables") => void;
}

export const AgentChat: React.FC<AgentChatProps> = ({
  onOpenActionModal,
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "agent",
      text: `Hello Arjun. I am your Executive Productivity Assistant, trained on your complete data pack for the week of September 21–25, 2026.

I have cross-referenced all your **Meeting Transcripts**, **4 Team Calendars**, **5 Email Threads**, and **2 Cab/Voice Memos**.

How can I assist you today? You can select any of the suggested queries below or ask a custom question.`,
      timestamp: "9:00 AM",
      citations: [],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText("");
    setIsThinking(true);

    try {
      const response: AIResponse = await queryExecutiveAgentAsync(query, customApiKey);
      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        text: response.answer,
        citations: response.citations,
        suggestedActions: response.suggestedActions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleActionClick = (action: {
    label: string;
    actionType: "draft_email" | "assign_lease" | "view_calendar" | "view_deliverables";
    payload?: any;
  }) => {
    if (action.actionType === "draft_email" || action.actionType === "assign_lease") {
      onOpenActionModal(action.actionType, action.payload);
    } else if (action.actionType === "view_calendar") {
      onNavigateTab("data");
    } else if (action.actionType === "view_deliverables") {
      onNavigateTab("briefing");
    }
  };

  return (
    <div className="flex flex-col h-[78vh] rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md relative">
      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md p-6 flex flex-col justify-center items-center">
          <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Key className="w-5 h-5 text-cyan-400" />
              API Key Configuration (.env.local)
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              By default, the Executive Agent uses the built-in <strong>100% offline grounded RAG engine</strong> with zero setup required.
              Optionally, you can paste your Gemini or OpenAI API Key here or set <code>NEXT_PUBLIC_GEMINI_API_KEY</code> in <code>.env.local</code>.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Gemini / OpenAI API Key (Optional):
              </label>
              <input
                type="password"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="AIzaSy... / sk-..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent Chat Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Executive AI Assistant (RAG Engine)
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-[10px] text-emerald-300 font-semibold">
                ● Live Data Pack Grounding
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              VP Sales Intelligence • Synthesizing Emails, Transcripts, Memos & Schedules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/60 flex items-center gap-1.5 transition-all"
            title="Configure optional API keys"
          >
            <Settings className="w-3.5 h-3.5 text-cyan-400" />
            <span>API Key / .env</span>
          </button>

          <button
            onClick={() => {
              setMessages([
                {
                  id: "msg-welcome-reset",
                  sender: "agent",
                  text: "Executive Assistant context reset. Ask me anything about your commitments, emails, or schedule for Sep 21–25, 2026.",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ]);
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all text-xs flex items-center gap-1"
            title="Reset conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Badges Bar */}
      <div className="px-6 py-3 border-b border-slate-800/60 bg-slate-950/30 overflow-x-auto flex items-center gap-2 shrink-0">
        <span className="text-xs font-semibold text-slate-400 shrink-0">Quick Executive Queries:</span>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-indigo-900/60 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/60 hover:border-indigo-500/60 transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md shadow-indigo-600/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-2xl space-y-3 ${isUser ? "items-end" : "items-start"}`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    isUser
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none font-medium"
                      : "bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-tl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Render RAG Citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-700/80 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                        <Link2 className="w-3.5 h-3.5" /> Grounded Citations from Data Pack:
                      </div>
                      <div className="space-y-1.5">
                        {msg.citations.map((cite, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300"
                          >
                            <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                              {cite.sourceType === "email" && <Mail className="w-3 h-3 text-cyan-400" />}
                              {cite.sourceType === "voice_note" && <Mic className="w-3 h-3 text-amber-400" />}
                              {cite.sourceType === "transcript" && <FileText className="w-3 h-3 text-purple-400" />}
                              {cite.sourceType === "calendar" && <Calendar className="w-3 h-3 text-emerald-400" />}
                              {cite.label}
                            </div>
                            <p className="text-[11px] text-slate-400 italic mt-0.5">
                              "{cite.excerpt}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Render Suggested Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-700/80 flex flex-wrap gap-2">
                      {msg.suggestedActions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(act)}
                          className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow flex items-center gap-1.5 transition-all"
                        >
                          {act.label} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`text-[10px] text-slate-500 px-1 ${isUser ? "text-right" : "text-left"}`}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isThinking && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-slate-400 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Analyzing transcripts, email threads, voice memos, and calendars...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask your Executive Productivity Assistant about deadlines, commitments, emails..."
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
