"use client";

import React, { useState } from "react";
import {
  Mail,
  FileText,
  Mic,
  Calendar,
  Search,
  User,
  Clock,
  Play,
  Pause,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  EMAIL_THREADS,
  MEETING_TRANSCRIPT,
  VOICE_NOTES,
  CALENDAR_EVENTS,
  PEOPLE,
  EmailThread,
} from "../lib/dataPack";

export const DataExplorer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"emails" | "transcript" | "voice" | "calendar">("emails");
  const [selectedThreadId, setSelectedThreadId] = useState<string>("thread-[1-5]");
  const [activeThread, setActiveThread] = useState<EmailThread>(EMAIL_THREADS[0]);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = EMAIL_THREADS.filter(
    (t) =>
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.messages.some((m) => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md min-h-[78vh] flex flex-col">
      {/* Sub-Header Tabs */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            Data Pack Source Explorer
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-normal">
              Official Grounded Sources
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Browse Email Inbox, Meeting Transcripts, Voice Memos & Master Calendars
          </p>
        </div>

        {/* Sub Navigation Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab("emails")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === "emails"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Emails (5 Threads)
          </button>
          <button
            onClick={() => setActiveSubTab("transcript")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === "transcript"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Meeting Transcript
          </button>
          <button
            onClick={() => setActiveSubTab("voice")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === "voice"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Mic className="w-3.5 h-3.5" /> Voice Memos (2)
          </button>
          <button
            onClick={() => setActiveSubTab("calendar")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === "calendar"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Master Calendar Grid
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: EMAILS */}
      {activeSubTab === "emails" && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Thread List Column */}
          <div className="p-4 space-y-3 bg-slate-950/40">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search email threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              {filteredThreads.map((thread) => {
                const isSelected = activeThread.id === thread.id;
                const isUrgent = thread.status === "urgent";
                return (
                  <button
                    key={thread.id}
                    onClick={() => setActiveThread(thread)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-indigo-950/60 border-indigo-600 text-white shadow"
                        : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="truncate pr-2">{thread.subject}</span>
                      {isUrgent && (
                        <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 text-[10px] border border-red-800 font-bold shrink-0">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {thread.messages[thread.messages.length - 1].content}
                    </p>
                    <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between">
                      <span>{thread.messages.length} messages</span>
                      <span>{thread.lastUpdated}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Thread Detail Column */}
          <div className="md:col-span-2 p-6 overflow-y-auto space-y-6">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Thread: {activeThread.subject}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Participants: {activeThread.participants.join(", ")}
                </p>
              </div>

              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                {activeThread.messages.length} Emails
              </span>
            </div>

            {/* Email Message Chain */}
            <div className="space-y-4">
              {activeThread.messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className="rounded-xl bg-slate-950/80 border border-slate-800 p-4 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/50 text-indigo-300 font-bold flex items-center justify-center text-xs">
                        {msg.fromName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {msg.fromName}{" "}
                          <span className="text-slate-400 font-normal">
                            &lt;{msg.from}&gt;
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          To: {msg.toName}
                        </div>
                      </div>
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      {msg.timestamp}
                    </span>
                  </div>

                  <p className="text-slate-200 leading-relaxed font-mono text-[12px] pt-1">
                    "{msg.content}"
                  </p>

                  {msg.attachment && (
                    <div className="pt-2 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300 text-[11px] font-medium flex items-center gap-1.5">
                        <Paperclip className="w-3 h-3 text-cyan-400" />
                        Attachment: {msg.attachment}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MEETING TRANSCRIPT */}
      {activeSubTab === "transcript" && (
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                Meeting Transcript: {MEETING_TRANSCRIPT.title}
              </h3>
              <p className="text-xs text-slate-400">
                Date: {MEETING_TRANSCRIPT.date} ({MEETING_TRANSCRIPT.time}) • Attendees: {MEETING_TRANSCRIPT.attendees.join(", ")}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {MEETING_TRANSCRIPT.utterances.map((utt) => (
              <div
                key={utt.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-400 text-sm">
                    {utt.speaker}
                  </span>
                  {utt.topic && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      Topic: {utt.topic}
                    </span>
                  )}
                </div>

                <p className="text-slate-200 text-sm leading-relaxed">
                  "{utt.text}"
                </p>

                {utt.actionItemExtracted && (
                  <div className="pt-1.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-800/60 text-amber-300 text-[11px] font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" /> Action Item: {utt.actionItemExtracted}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: VOICE MEMOS */}
      {activeSubTab === "voice" && (
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              Arjun Malhotra's Personal Voice Memos (2 Memos)
            </h3>
            <p className="text-xs text-slate-400">
              Dictated reminders recorded for self. Treated as executive commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VOICE_NOTES.map((vn) => {
              const isPlaying = playingVoiceId === vn.id;
              return (
                <div
                  key={vn.id}
                  className="rounded-2xl bg-slate-950/90 border border-slate-800 p-5 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setPlayingVoiceId(isPlaying ? null : vn.id)
                        }
                        className="w-10 h-10 rounded-xl bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-600/30 transition-all"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {vn.title}
                        </h4>
                        <div className="text-[11px] text-slate-400">
                          {vn.timestamp} • Duration: {vn.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Waveform Visualizer */}
                  <div className="h-12 bg-slate-900 rounded-xl p-2 flex items-center justify-between gap-1 overflow-hidden border border-slate-800">
                    {[
                      30, 45, 80, 60, 95, 40, 70, 85, 30, 65, 90, 50, 75, 40,
                      85, 95, 60, 45, 80, 70, 90, 35, 60, 85, 40, 75, 90, 50,
                      65, 35, 80,
                    ].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${isPlaying ? h : Math.max(20, h * 0.4)}%` }}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isPlaying
                            ? "bg-gradient-to-t from-amber-500 to-amber-300 animate-pulse"
                            : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Transcript */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="font-bold text-amber-400 block mb-1">
                      Full Audio Transcript:
                    </span>
                    <p className="text-slate-200 italic font-mono text-[11px]">
                      "{vn.transcript}"
                    </p>
                  </div>

                  {/* Extracted Takeaways */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400">
                      Extracted Commitments:
                    </span>
                    {vn.takeaways.map((t, tIdx) => (
                      <div
                        key={tIdx}
                        className="text-xs text-slate-300 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MASTER CALENDAR GRID */}
      {activeSubTab === "calendar" && (
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              Cross-Team Master Calendar Grid (Week of Sep 21–25, 2026)
            </h3>
            <p className="text-xs text-slate-400">
              Comparing availability across Arjun Malhotra, Neha Kapoor, Raghav Sethi & Divya Rao
            </p>
          </div>

          <div className="space-y-6">
            {PEOPLE.filter((p) => p.name !== "Facilities" && p.name !== "Priya Nair").map((person) => {
              const personEvents = CALENDAR_EVENTS.filter((e) => e.personName === person.name);
              return (
                <div
                  key={person.email}
                  className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-3"
                >
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/50 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      {person.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {person.name}
                      </h4>
                      <div className="text-[11px] text-slate-400">
                        {person.role} • {person.email}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                    {["Mon 21 Sep", "Tue 22 Sep", "Wed 23 Sep", "Thu 24 Sep", "Fri 25 Sep"].map((day) => {
                      const dayEvents = personEvents.filter((e) => e.dayName === day);
                      return (
                        <div
                          key={day}
                          className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs"
                        >
                          <div className="font-bold text-slate-400 text-[11px] border-b border-slate-800 pb-1">
                            {day}
                          </div>
                          {dayEvents.length === 0 ? (
                            <div className="text-[10px] text-slate-600 italic">
                              No Events / Open
                            </div>
                          ) : (
                            dayEvents.map((evt) => (
                              <div
                                key={evt.id}
                                className="p-2 rounded bg-slate-800/90 text-[11px] font-medium text-slate-200 space-y-0.5 border border-slate-700/50"
                              >
                                <div className="text-indigo-300 font-semibold truncate">
                                  {evt.event}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {evt.time}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
