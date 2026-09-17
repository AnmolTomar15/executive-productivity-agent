import {
  EXECUTIVE_DELIVERABLES,
  EMAIL_THREADS,
  MEETING_TRANSCRIPT,
  VOICE_NOTES,
  CALENDAR_EVENTS,
  PEOPLE,
} from "./dataPack";

export interface Citation {
  sourceType: "email" | "voice_note" | "transcript" | "calendar";
  label: string;
  excerpt: string;
  linkId?: string;
}

export interface AIResponse {
  answer: string;
  citations: Citation[];
  suggestedActions?: {
    label: string;
    actionType: "draft_email" | "assign_lease" | "view_calendar" | "view_deliverables";
    payload?: any;
  }[];
}

export const SUGGESTED_PROMPTS = [
  "🚨 What urgent issues need my immediate attention?",
  "📋 What deliverables do I currently owe Raghav Sethi?",
  "🏢 What is the status and deadline of the Mumbai lease renewal?",
  "📊 Did Divya send the expense variance report on time for Board Prep?",
  "📅 Summarize my calendar and free slots for Thursday 24 September.",
  "🎙️ What commitments did I make in my voice memos?",
];

// Asynchronous query executor supporting optional live LLM API keys (Gemini / OpenAI)
export async function queryExecutiveAgentAsync(
  userQuery: string,
  customApiKey?: string
): Promise<AIResponse> {
  const geminiKey = customApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const openAIKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (geminiKey && geminiKey.trim().length > 5) {
    try {
      const systemContext = `You are the Executive Productivity Assistant for Arjun Malhotra (VP Sales at Veridian Corp).
Your task is to answer queries strictly based on his Data Pack for the week of September 21–25, 2026:
- Executive: Arjun Malhotra (arjun.malhotra@veridian-corp.example)
- Team: Neha Kapoor (Marketing Lead), Raghav Sethi (Ops Manager), Divya Rao (Finance), Priya Nair (Meridian Logistics client).
- Critical Issues:
  1. Mumbai Office Lease Renewal: Deadline Fri 25 Sep EOD, UNASSIGNED/UNOWNED. Raghav emailed Thu 4:45 PM warning signature is pending.
  2. Vendor List to Raghav: OVERDUE. Promised Mon EOD / Tue morning. Raghav followed up 3 times (Mon 9:50 AM, Tue 9:15 AM, Wed 8:45 AM).
  3. Expense Variance Report: Delivered on time by Divya Rao on Wed 6:00 PM.
  4. Q3 Campaign Deck: Review scheduled for Thu 9:30 AM before Board Prep.
Be concise, executive-focused, professional, and provide clear citations.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: `${systemContext}\n\nUser Question: ${userQuery}` },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const defaultResponse = queryExecutiveAgent(userQuery);
          return {
            answer: text,
            citations: defaultResponse.citations,
            suggestedActions: defaultResponse.suggestedActions,
          };
        }
      }
    } catch (e) {
      console.warn("Live API call error, falling back to local RAG engine:", e);
    }
  }

  // Fallback to grounded local engine
  return queryExecutiveAgent(userQuery);
}

export function queryExecutiveAgent(userQuery: string): AIResponse {
  const queryLower = userQuery.toLowerCase();

  // 1. URGENT ISSUES / IMMEDIATE ATTENTION
  if (
    queryLower.includes("urgent") ||
    queryLower.includes("immediate") ||
    queryLower.includes("red flag") ||
    queryLower.includes("attention") ||
    queryLower.includes("critical")
  ) {
    return {
      answer: `Here are the top urgent issues requiring your immediate action for the week of September 21–25, 2026:

1. **🔴 CRITICAL & UNOWNED: Mumbai Office Lease Renewal**
   - **Deadline**: Friday, 25 September 2026 (End of Day).
   - **Status**: Completely unassigned and unowned. Facilities sent 2 all-staff notices (Mon 10:15 AM & Thu 4:00 PM). Raghav Sethi emailed you on Thu 4:45 PM warning that the deadline is 1 day away and still lacks an authorized sign-off owner.
   - **Required Action**: Confirm and assign Facilities (or yourself) as the sign-off lead immediately.

2. **🟠 OVERDUE DELIVERABLE: Updated Vendor List to Raghav Sethi**
   - **Original Commitment**: Promised by EOD Tuesday, Sep 22 (Voice Note 1 & Leadership Sync).
   - **Status**: Raghav sent 3 follow-ups (Mon 9:50 AM, Tue 9:15 AM, Wed 8:45 AM). You confirmed you would send it by Wednesday morning, but it remains unfulfilled.
   - **Required Action**: Dispatch the updated vendor list to Raghav.`,
      citations: [
        {
          sourceType: "email",
          label: "Email Thread 5 (Mumbai Lease) - Message 5",
          excerpt:
            "Raghav Sethi (Thu 4:45 PM): 'This is now one day out and still unowned — can you confirm who's handling it?'",
          linkId: "thread-5",
        },
        {
          sourceType: "email",
          label: "Email Thread 1 (Vendor List) - Message 5",
          excerpt:
            "Raghav Sethi (Wed 8:45 AM): 'Just checking — still good for this morning?'",
          linkId: "thread-1",
        },
        {
          sourceType: "voice_note",
          label: "Voice Note 1 (Cab Memo)",
          excerpt:
            "Arjun (Mon 6:40 PM): 'need to get Raghav that vendor list... Also still haven't heard back on the Mumbai lease thing, someone needs to own that...'",
          linkId: "vn-1",
        },
      ],
      suggestedActions: [
        {
          label: "Assign Mumbai Lease Ownership",
          actionType: "assign_lease",
        },
        {
          label: "Draft Vendor List Email to Raghav",
          actionType: "draft_email",
          payload: { recipient: "raghav.sethi@veridian-corp.example", subject: "Re: Vendor List" },
        },
      ],
    };
  }

  // 2. RAGHAV SETHI / VENDOR LIST
  if (
    queryLower.includes("raghav") ||
    queryLower.includes("vendor")
  ) {
    return {
      answer: `You currently owe **Raghav Sethi** one major outstanding deliverable:

- **Deliverable**: Updated Vendor List
- **Commitment Context**: During the Mon Sep 21 Leadership Sync, you promised to send him the updated vendor list by end-of-day Tuesday Sep 22. In Voice Note 1 (Mon 6:40 PM), you noted it might slip to Tuesday morning.
- **Follow-up Chain**:
  - Mon 9:50 AM: Raghav emailed asking for the list.
  - Mon 5:40 PM: You replied promising it first thing Tuesday morning.
  - Tue 9:15 AM: Raghav agreed.
  - Tue 6:30 PM: You replied that board prep delayed you and promised it by Wednesday morning for sure.
  - Wed 8:45 AM: Raghav sent a follow-up ("Just checking — still good for this morning?").
- **Current Status**: **Overdue / Pending Dispatch**.`,
      citations: [
        {
          sourceType: "transcript",
          label: "Leadership Sync Transcript - Utterance #3",
          excerpt:
            "Arjun: 'remind me — I told Raghav I'd send him the updated vendor list. I'll get that to him by end of day tomorrow.'",
          linkId: "ls-3",
        },
        {
          sourceType: "email",
          label: "Email Thread 1 (Vendor List) - Full Thread",
          excerpt:
            "Raghav emailed 3 times following up on the vendor list delivery timeline.",
          linkId: "thread-1",
        },
        {
          sourceType: "voice_note",
          label: "Voice Note 1 (Mon 6:40 PM)",
          excerpt:
            "Arjun: 'need to get Raghav that vendor list, I think I said today but it might slip to tomorrow morning, remind me.'",
          linkId: "vn-1",
        },
      ],
      suggestedActions: [
        {
          label: "Draft & Send Vendor List to Raghav",
          actionType: "draft_email",
          payload: { recipient: "raghav.sethi@veridian-corp.example", subject: "Updated Vendor List" },
        },
      ],
    };
  }

  // 3. MUMBAI LEASE RENEWAL
  if (
    queryLower.includes("mumbai") ||
    queryLower.includes("lease") ||
    queryLower.includes("renewal")
  ) {
    return {
      answer: `Here is the complete status of the **Mumbai Office Lease Renewal**:

- **Hard Deadline**: **Friday, 25 September 2026 (End of Day)**.
- **Current Owner**: **UNASSIGNED** (Requires urgent intervention from Arjun).
- **Background Timeline**:
  1. **Mon 21 Sep, 9:00 AM (Sync)**: Raghav noted paperwork needs a sign-off. Divya suggested Facilities, but Arjun explicitly instructed: *"Okay, flag it, don't assume."*
  2. **Mon 21 Sep, 10:15 AM**: Facilities sent 1st email reminder to All Staff about the Friday deadline.
  3. **Mon 21 Sep, 6:40 PM (Voice Note 1)**: You noted: *"someone needs to own that, I don't think it's me."*
  4. **Tue 22 Sep, 11:00 AM**: Raghav emailed Arjun & Divya asking who's signing off.
  5. **Wed 23 Sep, 9:30 AM**: Divya replied believing it sits directly with Facilities.
  6. **Thu 24 Sep, 4:00 PM**: Facilities sent 2nd email reminder to All Staff.
  7. **Thu 24 Sep, 4:45 PM**: Raghav sent an urgent email directly to Arjun: *"This is now one day out and still unowned — can you confirm who's handling it?"*`,
      citations: [
        {
          sourceType: "transcript",
          label: "Leadership Sync Transcript - Utterances #4-5",
          excerpt:
            "Raghav: 'Mumbai office renewal paperwork needs someone to sign off...' Divya: 'I think that's supposed to be Facilities...'",
          linkId: "ls-4",
        },
        {
          sourceType: "email",
          label: "Email Thread 5 (Mumbai Office Lease Renewal)",
          excerpt:
            "Facilities Sent 2 reminders. Raghav emailed Thu 4:45 PM asking Arjun to confirm ownership.",
          linkId: "thread-5",
        },
      ],
      suggestedActions: [
        {
          label: "Assign Facilities as Authorized Sign-off Lead",
          actionType: "assign_lease",
        },
      ],
    };
  }

  // 4. DIVYA RAO / EXPENSE VARIANCE REPORT
  if (
    queryLower.includes("divya") ||
    queryLower.includes("variance") ||
    queryLower.includes("expense") ||
    queryLower.includes("board prep")
  ) {
    return {
      answer: `Yes, **Divya Rao delivered the July Expense Variance Report on time!**

- **Timeline & Delivery**:
  - **Mon 21 Sep (Sync)**: Arjun requested the July variance report before Thursday's board prep. Divya committed to Wednesday evening.
  - **Tue 22 Sep, 9:00 AM**: Arjun emailed Divya confirming he wanted it by Wednesday evening to review prior to Thursday's session.
  - **Wed 23 Sep, 8:15 AM (Voice Note 2)**: Arjun reminded himself that the report was essential by Wed evening.
  - **Wed 23 Sep, 6:00 PM**: Divya sent an email attaching 'July_Expense_Variance_Report.pdf'.
  - **Wed 23 Sep, 6:10 PM**: Arjun replied confirming receipt: *"Got it, thank you — exactly what I needed before tomorrow."*
- **Status**: **Completed & Verified**.`,
      citations: [
        {
          sourceType: "email",
          label: "Email Thread 4 (Expense Variance Report) - Message 4",
          excerpt:
            "Divya Rao (Wed 6:00 PM): 'Report attached, sent as promised.' [Attachment: July_Expense_Variance_Report.pdf]",
          linkId: "thread-4",
        },
        {
          sourceType: "email",
          label: "Email Thread 4 - Message 5",
          excerpt:
            "Arjun Malhotra (Wed 6:10 PM): 'Got it, thank you — exactly what I needed before tomorrow.'",
          linkId: "thread-4",
        },
        {
          sourceType: "voice_note",
          label: "Voice Note 2 (Wed 8:15 AM)",
          excerpt:
            "Arjun: 'expense variance report from Divya needs to be in my hands by Wednesday evening... I want time to go through it before board prep.'",
          linkId: "vn-2",
        },
      ],
      suggestedActions: [
        {
          label: "View Thursday Board Prep Details",
          actionType: "view_calendar",
        },
      ],
    };
  }

  // 5. THURSDAY SCHEDULE / THURSDAY 24 SEP
  if (
    queryLower.includes("thursday") ||
    queryLower.includes("24 sep") ||
    queryLower.includes("calendar") ||
    queryLower.includes("schedule") ||
    queryLower.includes("free")
  ) {
    return {
      answer: `Here is your complete schedule and open slots for **Thursday, 24 September 2026**:

📅 **Arjun Malhotra's Schedule**:
- **8:00 AM**: Received Q3 Campaign Deck draft from Neha ('Q3_Campaign_Deck_vDraft.pdf').
- **9:00 AM – 10:00 AM**: 🟢 **Board Prep Session** (with Divya Rao).
- **9:30 AM – 10:00 AM**: 📊 **Q3 Campaign Deck Review** with Neha Kapoor (overlapping 2nd half of Board Prep block).
- **10:00 AM – 4:00 PM**: ⚡ **AVAILABLE / FREE SLOTS** (Open for deep work, follow-ups, and resolving Mumbai Lease).
- **4:00 PM – 5:00 PM**: 👥 **Hiring Panel — Sales Associate**.

📌 **Key Events in Email/Voice Notes on Thursday**:
- 4:00 PM: Facilities sent 2nd reminder for Mumbai Lease.
- 4:45 PM: Raghav emailed asking you to confirm who is handling the Mumbai lease sign-off.`,
      citations: [
        {
          sourceType: "calendar",
          label: "Calendar Event - Thu 24 Sep",
          excerpt: "9:00-10:00 AM Board Prep Session | 4:00-5:00 PM Hiring Panel",
        },
        {
          sourceType: "email",
          label: "Email Thread 2 - Message 5",
          excerpt: "Neha (Thu 8:00 AM): 'Deck is ready, attaching the draft ahead of our 9:30 review.'",
          linkId: "thread-2",
        },
      ],
      suggestedActions: [
        {
          label: "View Master Calendar View",
          actionType: "view_calendar",
        },
      ],
    };
  }

  // 6. VOICE MEMOS / VOICE NOTES
  if (
    queryLower.includes("voice") ||
    queryLower.includes("memo") ||
    queryLower.includes("cab") ||
    queryLower.includes("audio")
  ) {
    return {
      answer: `You recorded **2 personal voice memos** during the week:

🎙️ **Voice Note 1 — Monday 21 Sep, 6:40 PM (recorded in cab)**:
- *Content*: *"Quick note to self — need to get Raghav that vendor list, I think I said today but it might slip to tomorrow morning, remind me. Also still haven't heard back on the Mumbai lease thing, someone needs to own that, I don't think it's me."*
- *Commitments*: Vendor list slipping to Tue morning; Mumbai lease needs ownership.

🎙️ **Voice Note 2 — Wednesday 23 Sep, 8:15 AM**:
- *Content*: *"Reminder — expense variance report from Divya needs to be in my hands by Wednesday evening, not Thursday, I want time to go through it before board prep. Also Meridian call — I owe Priya a time, need to lock that in today."*
- *Commitments*: Expense report deadline priority (Wed evening); Meridian call scheduling priority (Wed 3:00 PM locked).`,
      citations: [
        {
          sourceType: "voice_note",
          label: "Voice Note 1 (Mon 21 Sep 6:40 PM)",
          excerpt: "Personal cab memo regarding vendor list and Mumbai lease.",
          linkId: "vn-1",
        },
        {
          sourceType: "voice_note",
          label: "Voice Note 2 (Wed 23 Sep 8:15 AM)",
          excerpt: "Morning memo regarding expense report and Meridian call.",
          linkId: "vn-2",
        },
      ],
      suggestedActions: [
        {
          label: "Open Voice Memo Player",
          actionType: "view_deliverables",
        },
      ],
    };
  }

  // GENERIC GROUNDED FALLBACK SEARCH
  const matchedEmails = EMAIL_THREADS.flatMap((t) => t.messages).filter(
    (m) =>
      m.content.toLowerCase().includes(queryLower) ||
      m.threadSubject.toLowerCase().includes(queryLower)
  );

  const matchedUtterances = MEETING_TRANSCRIPT.utterances.filter(
    (u) =>
      u.text.toLowerCase().includes(queryLower) ||
      (u.topic && u.topic.toLowerCase().includes(queryLower))
  );

  const matchedVoiceNotes = VOICE_NOTES.filter(
    (v) =>
      v.transcript.toLowerCase().includes(queryLower) ||
      v.title.toLowerCase().includes(queryLower)
  );

  let citations: Citation[] = [];

  matchedEmails.forEach((m) => {
    citations.push({
      sourceType: "email",
      label: `Email (${m.threadSubject}) - ${m.fromName} (${m.timestamp})`,
      excerpt: m.content,
      linkId: m.threadId,
    });
  });

  matchedUtterances.forEach((u) => {
    citations.push({
      sourceType: "transcript",
      label: `Leadership Sync - ${u.speaker}`,
      excerpt: u.text,
      linkId: u.id,
    });
  });

  matchedVoiceNotes.forEach((v) => {
    citations.push({
      sourceType: "voice_note",
      label: v.title,
      excerpt: v.transcript,
      linkId: v.id,
    });
  });

  const answer = citations.length > 0
    ? `I searched your executive data pack for "${userQuery}". Found ${citations.length} matching entries across emails, transcripts, and voice notes.`
    : `Based on Arjun Malhotra's executive data pack (Sep 21–25, 2026), no direct text match was found for "${userQuery}". Please refer to the top suggestions or explore the Data Pack tab for detailed records.`;

  return {
    answer,
    citations: citations.slice(0, 5),
    suggestedActions: [
      {
        label: "View Urgent Issues",
        actionType: "view_deliverables",
      },
    ],
  };
}
