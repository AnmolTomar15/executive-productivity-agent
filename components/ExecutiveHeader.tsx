"use client";

import React from "react";
import {
  Calendar,
  Sparkles,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Briefcase,
  User,
  ShieldCheck,
} from "lucide-react";

interface ExecutiveHeaderProps {
  activeTab: "briefing" | "chat" | "data" | "deliverables";
  setActiveTab: (tab: "briefing" | "chat" | "data" | "deliverables") => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  overdueCount: number;
  criticalCount: number;
}

export const DATES = [
  { id: "all", label: "Full Week View", subText: "21–25 Sep 2026" },
  { id: "2026-09-21", label: "Mon 21 Sep", subText: "Leadership Sync Day" },
  { id: "2026-09-22", label: "Tue 22 Sep", subText: "Vendor List Deadline" },
  { id: "2026-09-23", label: "Wed 23 Sep", subText: "Meridian Call & Report" },
  { id: "2026-09-24", label: "Thu 24 Sep", subText: "Board Prep & Deck" },
  { id: "2026-09-25", label: "Fri 25 Sep", subText: "Mumbai Lease Deadline" },
];

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedDate,
  setSelectedDate,
  overdueCount,
  criticalCount,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* User / Agent Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/30">
              AM
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full ring-2 ring-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">
                Arjun Malhotra
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700/50 text-indigo-300 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" /> VP Sales
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Executive Productivity Agent</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-medium">Veridian Corp</span>
            </p>
          </div>
        </div>

        {/* Timeline Simulation Controller */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
          <span className="text-xs font-semibold text-slate-400 px-2 flex items-center gap-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-indigo-400" /> Simulation Date:
          </span>
          {DATES.map((d) => {
            const isSelected = selectedDate === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDate(d.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <div>{d.label}</div>
              </button>
            );
          })}
        </div>

        {/* Red Flag Stats */}
        <div className="flex items-center gap-2">
          {criticalCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-semibold animate-pulse">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>{criticalCount} Critical Alert</span>
            </div>
          )}
          {overdueCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-semibold">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{overdueCount} Overdue</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-slate-800/50">
        <button
          onClick={() => setActiveTab("briefing")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "briefing"
              ? "border-indigo-500 text-indigo-400 bg-indigo-950/30"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Executive Briefing & Schedule
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "chat"
              ? "border-cyan-500 text-cyan-400 bg-cyan-950/30"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          AI Executive Assistant
          <span className="px-1.5 py-0.5 rounded-full bg-cyan-900/50 text-[10px] text-cyan-300 border border-cyan-700/50">
            RAG Active
          </span>
        </button>

        <button
          onClick={() => setActiveTab("deliverables")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "deliverables"
              ? "border-amber-500 text-amber-400 bg-amber-950/30"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Deliverables & Tasks
        </button>

        <button
          onClick={() => setActiveTab("data")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
            activeTab === "data"
              ? "border-purple-500 text-purple-400 bg-purple-950/30"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
          }`}
        >
          <Inbox className="w-4 h-4" />
          Data Pack Knowledge Base
        </button>
      </div>
    </header>
  );
};
