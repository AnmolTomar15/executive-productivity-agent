"use client";

import React from "react";
import {
  AlertTriangle,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  Send,
  UserCheck,
  FileText,
  Mic,
  Mail,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Info,
} from "lucide-react";
import {
  CALENDAR_EVENTS,
  EXECUTIVE_DELIVERABLES,
  ExecutiveDeliverable,
  PEOPLE,
  CalendarEvent,
} from "../lib/dataPack";

interface ExecutiveBriefingProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onOpenActionModal: (type: "draft_email" | "assign_lease", payload?: any) => void;
  onNavigateTab: (tab: "chat" | "data" | "deliverables") => void;
}

export const ExecutiveBriefing: React.FC<ExecutiveBriefingProps> = ({
  selectedDate,
  setSelectedDate,
  onOpenActionModal,
  onNavigateTab,
}) => {
  // Filter deliverables based on selected date
  const deliverables = EXECUTIVE_DELIVERABLES;
  const criticalTask = deliverables.find((d) => d.id === "task-2");
  const overdueTask = deliverables.find((d) => d.id === "task-1");

  // Filter calendar events for selected date
  const filteredEvents = selectedDate === "all"
    ? CALENDAR_EVENTS
    : CALENDAR_EVENTS.filter((e) => e.date === selectedDate);

  const arjunEvents = filteredEvents.filter((e) => e.personName === "Arjun Malhotra");

  // Daily synthesized briefing texts
  const getBriefingText = (date: string) => {
    switch (date) {
      case "2026-09-21":
        return {
          title: "Monday, 21 September 2026 Briefing",
          summary:
            "Week kicked off with Leadership Sync (9:00 AM). Key takeaways: Campaign deck target is Wednesday (Neha), vendor list due to Raghav by tomorrow EOD (Arjun), July expense report targeted for Thursday prep (Divya). Crucially, the Mumbai office lease renewal sign-off remains unassigned.",
          highlights: [
            "Leadership Sync at 9:00 AM",
            "1:1 with Neha at 2:00 PM",
            "Recorded Cab Voice Memo regarding vendor list & lease",
          ],
        };
      case "2026-09-22":
        return {
          title: "Tuesday, 22 September 2026 Briefing",
          summary:
            "Vendor list deliverable to Raghav is due today by EOD. Arjun requested Divya deliver July Expense Variance Report early (Wed evening). Client call with Meridian Logistics requested reschedule options; Arjun proposed Wed 3:00 PM.",
          highlights: [
            "Vendor list due to Raghav by EOD",
            "Moved Divya's Expense Report deadline to Wed EOD",
            "Proposed Wed 3 PM to Priya (Meridian Logistics)",
          ],
        };
      case "2026-09-23":
        return {
          title: "Wednesday, 23 Sep 2026 Briefing (Critical Mid-Week)",
          summary:
            "Raghav sent 3rd follow-up email at 8:45 AM regarding the vendor list. Meridian client call confirmed for 3:00 PM today. Divya delivered July Expense Variance Report at 6:00 PM. Neha pushed campaign deck review to Thursday 9:30 AM.",
          highlights: [
            "Vendor List OVERDUE (Raghav checked in 8:45 AM)",
            "Client Call with Meridian Logistics at 3:00 PM",
            "Expense Report received from Divya at 6:00 PM",
          ],
        };
      case "2026-09-24":
        return {
          title: "Thursday, 24 Sep 2026 Briefing (Board Prep & Urgent Flag)",
          summary:
            "Board Prep Session at 9:00 AM, overlapping with Neha's Q3 Campaign Deck Review at 9:30 AM (draft received 8:00 AM). URGENT: Mumbai lease renewal is 1 day away from Friday deadline and still unowned — Raghav emailed warning at 4:45 PM.",
          highlights: [
            "Received Q3 Campaign Deck draft (8:00 AM)",
            "Board Prep Session (9:00 AM) & Deck Review (9:30 AM)",
            "Raghav sent critical warning regarding unowned Mumbai lease",
          ],
        };
      case "2026-09-25":
        return {
          title: "Friday, 25 Sep 2026 Briefing (Deadline Day)",
          summary:
            "MUMBAI OFFICE LEASE SIGN-OFF DEADLINE IS TODAY. Facilities Check-in meeting scheduled at 10:00 AM. Free afternoon block from 1:00–2:00 PM.",
          highlights: [
            "MUMBAI LEASE DEADLINE TODAY",
            "Facilities Check-in at 10:00 AM",
            "Open afternoon for weekly closing",
          ],
        };
      default:
        return {
          title: "Full Week Summary (21–25 September 2026)",
          summary:
            "Synthesized overview of Arjun Malhotra's commitments across 1 Meeting Transcript, 4 Team Calendars, 5 Email Threads, and 2 Voice Memos. One critical unowned lease deadline and one overdue vendor list require action.",
          highlights: [
            "5 Email Threads processed",
            "2 Voice Memos analyzed",
            "1 Critical Lease Alert pending ownership",
          ],
        };
    }
  };

  const currentBriefing = getBriefingText(selectedDate);

  return (
    <div className="space-y-6 pb-12">
      {/* CRITICAL ALERTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Mumbai Lease Alert */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-950/80 via-slate-900 to-red-950/40 border border-red-700/60 p-5 shadow-xl shadow-red-950/30">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertTriangle className="w-32 h-32 text-red-500" />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Critical Action Required
                </span>
                <span className="text-xs text-red-300 font-medium">
                  Deadline: Fri 25 Sep EOD
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Mumbai Office Lease Renewal Sign-off
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Signature is required by Friday end-of-day. Facilities sent 2 reminders. Raghav Sethi emailed Thu 4:45 PM warning it remains <strong>unassigned and unowned</strong>.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-red-800/40">
              <span className="text-[11px] text-red-300/80 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> Source: Email Thread 5 & Sync
              </span>
              <button
                onClick={() => onOpenActionModal("assign_lease")}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-600/30 flex items-center gap-1.5 transition-all"
              >
                <UserCheck className="w-3.5 h-3.5" /> Assign Sign-off Owner
              </button>
            </div>
          </div>
        </div>

        {/* 2. Overdue Vendor List Alert */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-amber-950/40 border border-amber-700/60 p-5 shadow-xl shadow-amber-950/30">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Clock className="w-32 h-32 text-amber-500" />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Deliverable Overdue
                </span>
                <span className="text-xs text-amber-300 font-medium">
                  Promised: Tue 22 Sep / Wed Morning
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Send Updated Vendor List to Raghav Sethi
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Raghav sent 3 email follow-ups (Mon 9:50 AM, Tue 9:15 AM, Wed 8:45 AM). Promised twice by Arjun (Sync + Emails). Still unfulfilled.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-amber-800/40">
              <span className="text-[11px] text-amber-300/80 flex items-center gap-1">
                <Mic className="w-3.5 h-3.5" /> Source: Voice Note 1 & Thread 1
              </span>
              <button
                onClick={() =>
                  onOpenActionModal("draft_email", {
                    recipient: "raghav.sethi@veridian-corp.example",
                    subject: "Updated Vendor List",
                  })
                }
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md shadow-amber-600/30 flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Vendor List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DAILY BRIEFING CARD & AI SYNTHESIS */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl relative backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-700/50 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {currentBriefing.title}
              </h2>
              <p className="text-xs text-slate-400">
                Synthesized Executive Intelligence from Transcripts, Emails & Voice Memos
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("chat")}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            Ask Executive Assistant AI <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-normal mb-4">
          {currentBriefing.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {currentBriefing.highlights.map((h, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/60 text-xs text-slate-200 font-medium flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* SCHEDULE TIMELINE & DELIVERABLES MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Arjun's Daily Schedule */}
        <div className="lg:col-span-1 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-indigo-400" />
              Arjun's Schedule ({selectedDate === "all" ? "All Week" : selectedDate})
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {arjunEvents.length} Events
            </span>
          </div>

          <div className="space-y-2.5">
            {arjunEvents.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-xs italic">
                No scheduled calendar events for this date.
              </div>
            ) : (
              arjunEvents.map((evt) => (
                <div
                  key={evt.id}
                  className={`p-3 rounded-xl border transition-all ${
                    evt.category === "sync"
                      ? "bg-indigo-950/40 border-indigo-800/50 text-indigo-200"
                      : evt.category === "1on1"
                      ? "bg-purple-950/40 border-purple-800/50 text-purple-200"
                      : evt.category === "review"
                      ? "bg-cyan-950/40 border-cyan-800/50 text-cyan-200"
                      : evt.category === "call"
                      ? "bg-emerald-950/40 border-emerald-800/50 text-emerald-200"
                      : evt.category === "prep"
                      ? "bg-blue-950/40 border-blue-800/50 text-blue-200"
                      : "bg-slate-800/40 border-slate-700/40 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white">{evt.event}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300">
                      {evt.time}
                    </span>
                  </div>
                  <div className="text-[11px] opacity-80 mt-1 flex items-center gap-2">
                    <span>{evt.dayName}</span>
                    <span>•</span>
                    <span className="capitalize">{evt.category}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => onNavigateTab("data")}
            className="w-full py-2.5 text-center text-xs font-medium text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 rounded-xl border border-slate-700/50 transition-all flex items-center justify-center gap-1.5"
          >
            View Full Cross-Team Master Calendar <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Column: Executive Deliverables & Task Tracker */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Executive Deliverables & Commitments Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Tracked across Sync Transcripts, Voice Memos & Email Threads
              </p>
            </div>
            <button
              onClick={() => onNavigateTab("deliverables")}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              View Details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {deliverables.map((item) => {
              const isCritical = item.priority === "critical";
              const isOverdue = item.status === "overdue";
              const isCompleted = item.status === "completed";

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCritical
                      ? "bg-red-950/20 border-red-700/50"
                      : isOverdue
                      ? "bg-amber-950/20 border-amber-700/50"
                      : isCompleted
                      ? "bg-emerald-950/10 border-emerald-900/40"
                      : "bg-slate-800/40 border-slate-700/50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isCritical
                            ? "bg-red-600 text-white"
                            : isOverdue
                            ? "bg-amber-600 text-white"
                            : isCompleted
                            ? "bg-emerald-600 text-white"
                            : "bg-indigo-600 text-white"
                        }`}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                      <h4 className="text-sm font-semibold text-white">
                        {item.title}
                      </h4>
                    </div>

                    <span className="text-xs text-slate-400">
                      Due: <strong className="text-slate-200">{item.dueDate}</strong> ({item.dueTime})
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {item.source.map((src, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] border border-slate-800"
                        >
                          {src}
                        </span>
                      ))}
                    </div>

                    {item.id === "task-1" && (
                      <button
                        onClick={() =>
                          onOpenActionModal("draft_email", {
                            recipient: "raghav.sethi@veridian-corp.example",
                            subject: "Updated Vendor List",
                          })
                        }
                        className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium flex items-center gap-1 shadow"
                      >
                        <Send className="w-3 h-3" /> Send Vendor List
                      </button>
                    )}

                    {item.id === "task-2" && (
                      <button
                        onClick={() => onOpenActionModal("assign_lease")}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium flex items-center gap-1 shadow"
                      >
                        <UserCheck className="w-3 h-3" /> Assign Lease Owner
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
