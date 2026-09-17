"use client";

import React, { useState } from "react";
import { X, Send, UserCheck, CheckCircle2, ShieldCheck, Mail, AlertTriangle } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: "draft_email" | "assign_lease" | null;
  payload?: any;
  onActionComplete: (message: string) => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  modalType,
  payload,
  onActionComplete,
}) => {
  if (!isOpen || !modalType) return null;

  // Form states
  const [recipient, setRecipient] = useState(
    payload?.recipient || "raghav.sethi@veridian-corp.example"
  );
  const [subject, setSubject] = useState(
    payload?.subject || "Re: Updated Vendor List — Veridian Corp"
  );
  const [body, setBody] = useState(
    `Hi Raghav,\n\nApologies for the slight delay on this! Please find attached the updated vendor list for Q3/Q4.\n\nLet me know if you need any adjustments before your ops meeting.\n\nBest,\nArjun`
  );

  const [assignedOwner, setAssignedOwner] = useState("facilities@veridian-corp.example");
  const [notes, setNotes] = useState(
    "Facilities lead assigned as primary signatory. Arjun Malhotra retains VP sign-off backup."
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onActionComplete(
        `Email successfully dispatched to ${recipient}! Vendor List deliverable marked as COMPLETED.`
      );
      onClose();
    }, 700);
  };

  const handleSubmitLease = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onActionComplete(
        `Mumbai Lease Sign-off ownership assigned to ${assignedOwner}. All-staff notice and Raghav Sethi updated!`
      );
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {modalType === "draft_email" ? (
              <div className="p-2 rounded-lg bg-amber-950 border border-amber-700/50 text-amber-400">
                <Send className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-red-950 border border-red-700/50 text-red-400">
                <UserCheck className="w-4 h-4" />
              </div>
            )}
            <h3 className="text-base font-bold text-white">
              {modalType === "draft_email"
                ? "Executive Email Dispatcher"
                : "Assign Mumbai Lease Ownership"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {modalType === "draft_email" ? (
          <form onSubmit={handleSubmitEmail} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                To (Recipient):
              </label>
              <input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                Subject Line:
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                Email Message Body:
              </label>
              <textarea
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-sans focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Attachment: <strong>Veridian_Q3_Vendor_List_Updated.xlsx</strong> automatically included.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Email Now"}
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitLease} className="p-6 space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                <strong>Friday 25 Sep Deadline</strong>: Resolves unassigned sign-off flag for Mumbai Office Lease.
              </span>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                Select Authorized Sign-off Lead:
              </label>
              <select
                value={assignedOwner}
                onChange={(e) => setAssignedOwner(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-red-500"
              >
                <option value="facilities@veridian-corp.example">
                  Facilities Internal Lead (facilities@veridian-corp.example)
                </option>
                <option value="arjun.malhotra@veridian-corp.example">
                  Arjun Malhotra - VP Sales (Direct Executive Sign-off)
                </option>
                <option value="raghav.sethi@veridian-corp.example">
                  Raghav Sethi - Ops Manager
                </option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                Assignment Authorization Notes:
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-red-500 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all"
              >
                {isSubmitting ? "Updating..." : "Confirm Sign-off Assignment"}
                <UserCheck className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
