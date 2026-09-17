"use client";

import React, { useState } from "react";
import { ExecutiveHeader } from "../components/ExecutiveHeader";
import { ExecutiveBriefing } from "../components/ExecutiveBriefing";
import { AgentChat } from "../components/AgentChat";
import { DataExplorer } from "../components/DataExplorer";
import { ActionModal } from "../components/ActionModal";
import { EXECUTIVE_DELIVERABLES } from "../lib/dataPack";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"briefing" | "chat" | "data" | "deliverables">("briefing");
  const [selectedDate, setSelectedDate] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"draft_email" | "assign_lease" | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenActionModal = (
    type: "draft_email" | "assign_lease",
    payload?: any
  ) => {
    setModalType(type);
    setModalPayload(payload);
    setIsModalOpen(true);
  };

  const handleActionComplete = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const overdueCount = EXECUTIVE_DELIVERABLES.filter((d) => d.status === "overdue").length;
  const criticalCount = EXECUTIVE_DELIVERABLES.filter((d) => d.priority === "critical").length;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Executive Header */}
      <ExecutiveHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        overdueCount={overdueCount}
        criticalCount={criticalCount}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "briefing" && (
          <ExecutiveBriefing
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onOpenActionModal={handleOpenActionModal}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === "chat" && (
          <AgentChat
            onOpenActionModal={handleOpenActionModal}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === "deliverables" && (
          <ExecutiveBriefing
            selectedDate="all"
            setSelectedDate={setSelectedDate}
            onOpenActionModal={handleOpenActionModal}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === "data" && <DataExplorer />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Executive Productivity Agent for <strong>Arjun Malhotra (VP Sales)</strong></span>
        </div>
        <div>
          Data Pack ground truth: 21–25 September 2026 • Veridian Corp
        </div>
      </footer>

      {/* Workflow Action Modal */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType={modalType}
        payload={modalPayload}
        onActionComplete={handleActionComplete}
      />
    </div>
  );
}
