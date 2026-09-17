export interface Person {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface CalendarEvent {
  id: string;
  personName: string;
  date: string; // e.g. "2026-09-21"
  dayName: string; // "Mon 21 Sep"
  time: string; // "9:00–9:35 AM"
  startHour: number; // 9.0
  endHour: number; // 9.58
  event: string;
  category: "sync" | "1on1" | "blocked" | "review" | "call" | "prep";
}

export interface EmailMessage {
  id: string;
  threadId: string;
  threadSubject: string;
  timestamp: string;
  date: string; // "2026-09-21"
  time: string; // "9:50 AM"
  from: string;
  fromName: string;
  to: string;
  toName: string;
  content: string;
  attachment?: string;
}

export interface EmailThread {
  id: string;
  subject: string;
  participants: string[];
  messages: EmailMessage[];
  lastUpdated: string;
  status: "urgent" | "pending" | "resolved" | "scheduled";
}

export interface TranscriptUtterance {
  id: string;
  speaker: string;
  text: string;
  topic?: string;
  actionItemExtracted?: string;
}

export interface VoiceNote {
  id: string;
  title: string;
  timestamp: string;
  date: string;
  duration: string;
  transcript: string;
  takeaways: string[];
  audioSimUrl?: string;
}

export interface ExecutiveDeliverable {
  id: string;
  title: string;
  owner: string;
  ownerEmail: string;
  requestedBy: string;
  dueDate: string;
  dueTime?: string;
  status: "overdue" | "action_required" | "scheduled" | "completed";
  priority: "critical" | "high" | "medium";
  category: string;
  description: string;
  relatedThreadId?: string;
  source: string[];
}

export const PEOPLE: Person[] = [
  {
    name: "Arjun Malhotra",
    role: "VP Sales (Agent User)",
    email: "arjun.malhotra@veridian-corp.example",
    avatar: "AM",
  },
  {
    name: "Neha Kapoor",
    role: "Marketing Lead",
    email: "neha.kapoor@veridian-corp.example",
    avatar: "NK",
  },
  {
    name: "Raghav Sethi",
    role: "Ops Manager",
    email: "raghav.sethi@veridian-corp.example",
    avatar: "RS",
  },
  {
    name: "Divya Rao",
    role: "Finance",
    email: "divya.rao@veridian-corp.example",
    avatar: "DR",
  },
  {
    name: "Priya Nair",
    role: "Meridian Logistics (External Client)",
    email: "priya.nair@meridianlogistics.example",
    avatar: "PN",
  },
  {
    name: "Facilities",
    role: "Internal Distribution List",
    email: "facilities@veridian-corp.example",
    avatar: "FC",
  },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  // --- Arjun Malhotra ---
  {
    id: "arjun-mon-1",
    personName: "Arjun Malhotra",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "9:00–9:35 AM",
    startHour: 9.0,
    endHour: 9.58,
    event: "Leadership Sync",
    category: "sync",
  },
  {
    id: "arjun-mon-2",
    personName: "Arjun Malhotra",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "2:00–2:30 PM",
    startHour: 14.0,
    endHour: 14.5,
    event: "1:1 with Neha",
    category: "1on1",
  },
  {
    id: "arjun-mon-3",
    personName: "Arjun Malhotra",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "4:00–5:00 PM",
    startHour: 16.0,
    endHour: 17.0,
    event: "Blocked",
    category: "blocked",
  },

  {
    id: "arjun-tue-1",
    personName: "Arjun Malhotra",
    date: "2026-09-22",
    dayName: "Tue 22 Sep",
    time: "11:00 AM–12:00 PM",
    startHour: 11.0,
    endHour: 12.0,
    event: "Internal Budget Review",
    category: "review",
  },
  {
    id: "arjun-tue-2",
    personName: "Arjun Malhotra",
    date: "2026-09-22",
    dayName: "Tue 22 Sep",
    time: "3:00–3:30 PM",
    startHour: 15.0,
    endHour: 15.5,
    event: "Blocked",
    category: "blocked",
  },

  {
    id: "arjun-wed-1",
    personName: "Arjun Malhotra",
    date: "2026-09-23",
    dayName: "Wed 23 Sep",
    time: "3:00–3:30 PM",
    startHour: 15.0,
    endHour: 15.5,
    event: "Call — Meridian Logistics",
    category: "call",
  },
  {
    id: "arjun-wed-2",
    personName: "Arjun Malhotra",
    date: "2026-09-23",
    dayName: "Wed 23 Sep",
    time: "6:00–6:15 PM",
    startHour: 18.0,
    endHour: 18.25,
    event: "Blocked",
    category: "blocked",
  },

  {
    id: "arjun-thu-1",
    personName: "Arjun Malhotra",
    date: "2026-09-24",
    dayName: "Thu 24 Sep",
    time: "9:00–10:00 AM",
    startHour: 9.0,
    endHour: 10.0,
    event: "Board Prep Session",
    category: "prep",
  },
  {
    id: "arjun-thu-2",
    personName: "Arjun Malhotra",
    date: "2026-09-24",
    dayName: "Thu 24 Sep",
    time: "4:00–5:00 PM",
    startHour: 16.0,
    endHour: 17.0,
    event: "Hiring Panel — Sales Associate",
    category: "1on1",
  },

  {
    id: "arjun-fri-1",
    personName: "Arjun Malhotra",
    date: "2026-09-25",
    dayName: "Fri 25 Sep",
    time: "10:00–10:30 AM",
    startHour: 10.0,
    endHour: 10.5,
    event: "Facilities Check-in",
    category: "sync",
  },
  {
    id: "arjun-fri-2",
    personName: "Arjun Malhotra",
    date: "2026-09-25",
    dayName: "Fri 25 Sep",
    time: "1:00–2:00 PM",
    startHour: 13.0,
    endHour: 14.0,
    event: "Blocked",
    category: "blocked",
  },

  // --- Neha Kapoor ---
  {
    id: "neha-mon-1",
    personName: "Neha Kapoor",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "10:00–11:00 AM",
    startHour: 10.0,
    endHour: 11.0,
    event: "Blocked",
    category: "blocked",
  },
  {
    id: "neha-mon-2",
    personName: "Neha Kapoor",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "2:00–2:30 PM",
    startHour: 14.0,
    endHour: 14.5,
    event: "1:1 with Arjun",
    category: "1on1",
  },
  {
    id: "neha-tue-1",
    personName: "Neha Kapoor",
    date: "2026-09-22",
    dayName: "Tue 22 Sep",
    time: "1:00–2:00 PM",
    startHour: 13.0,
    endHour: 14.0,
    event: "Campaign Vendor Call",
    category: "call",
  },
  {
    id: "neha-wed-1",
    personName: "Neha Kapoor",
    date: "2026-09-23",
    dayName: "Wed 23 Sep",
    time: "10:00–10:30 AM",
    startHour: 10.0,
    endHour: 10.5,
    event: "Deck Prep",
    category: "prep",
  },
  {
    id: "neha-wed-2",
    personName: "Neha Kapoor",
    date: "2026-09-23",
    dayName: "Wed 23 Sep",
    time: "1:00–3:00 PM",
    startHour: 13.0,
    endHour: 15.0,
    event: "Blocked",
    category: "blocked",
  },
  {
    id: "neha-thu-1",
    personName: "Neha Kapoor",
    date: "2026-09-24",
    dayName: "Thu 24 Sep",
    time: "9:30–10:00 AM",
    startHour: 9.5,
    endHour: 10.0,
    event: "Deck Review with Arjun",
    category: "review",
  },
  {
    id: "neha-fri-1",
    personName: "Neha Kapoor",
    date: "2026-09-25",
    dayName: "Fri 25 Sep",
    time: "11:00 AM–12:00 PM",
    startHour: 11.0,
    endHour: 12.0,
    event: "Blocked",
    category: "blocked",
  },

  // --- Raghav Sethi ---
  {
    id: "raghav-mon-1",
    personName: "Raghav Sethi",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "9:00–9:35 AM",
    startHour: 9.0,
    endHour: 9.58,
    event: "Leadership Sync",
    category: "sync",
  },
  {
    id: "raghav-mon-2",
    personName: "Raghav Sethi",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "1:00–2:00 PM",
    startHour: 13.0,
    endHour: 14.0,
    event: "Blocked",
    category: "blocked",
  },
  {
    id: "raghav-tue-1",
    personName: "Raghav Sethi",
    date: "2026-09-22",
    dayName: "Tue 22 Sep",
    time: "11:00 AM–12:00 PM",
    startHour: 11.0,
    endHour: 12.0,
    event: "Internal Budget Review",
    category: "review",
  },
  {
    id: "raghav-tue-2",
    personName: "Raghav Sethi",
    date: "2026-09-22",
    dayName: "Tue 22 Sep",
    time: "3:30–4:00 PM",
    startHour: 15.5,
    endHour: 16.0,
    event: "Ops Standup",
    category: "sync",
  },
  {
    id: "raghav-wed-1",
    personName: "Raghav Sethi",
    date: "2026-09-23",
    dayName: "Wed 23 Sep",
    time: "9:00–11:00 AM",
    startHour: 9.0,
    endHour: 11.0,
    event: "Blocked",
    category: "blocked",
  },
  {
    id: "raghav-thu-1",
    personName: "Raghav Sethi",
    date: "2026-09-24",
    dayName: "Thu 24 Sep",
    time: "2:00–3:00 PM",
    startHour: 14.0,
    endHour: 15.0,
    event: "Blocked",
    category: "blocked",
  },
  {
    id: "raghav-fri-1",
    personName: "Raghav Sethi",
    date: "2026-09-25",
    dayName: "Fri 25 Sep",
    time: "10:00–10:30 AM",
    startHour: 10.0,
    endHour: 10.5,
    event: "Facilities Check-in",
    category: "sync",
  },
  {
    id: "raghav-fri-2",
    personName: "Raghav Sethi",
    date: "2026-09-25",
    dayName: "Fri 25 Sep",
    time: "3:00–4:00 PM",
    startHour: 15.0,
    endHour: 16.0,
    event: "Blocked",
    category: "blocked",
  },

  // --- Divya Rao ---
  {
    id: "divya-mon-1",
    personName: "Divya Rao",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "2:30–3:00 PM",
    startHour: 14.5,
    endHour: 15.0,
    event: "Budget Prep",
    category: "prep",
  },
  {
    id: "divya-mon-2",
    personName: "Divya Rao",
    date: "2026-09-21",
    dayName: "Mon 21 Sep",
    time: "4:00–5:00 PM",
    startHour: 16.0,
    endHour: 17.0,
    event: "Blocked",
    category: "blocked",
  },
  {
    id: "divya-tue-1",
    personName: "Divya Rao",
    date: "2026-09-22",
    dayName: "Tue 22 Sep",
    time: "9:00–9:15 AM",
    startHour: 9.0,
    endHour: 9.25,
    event: "Quick Call with Arjun",
    category: "call",
  },
  {
    id: "divya-tue-2",
    personName: "Divya Rao",
    date: "2026-09-22",
    dayName: "Tue 22 Sep",
    time: "11:00 AM–12:00 PM",
    startHour: 11.0,
    endHour: 12.0,
    event: "Internal Budget Review",
    category: "review",
  },
  {
    id: "divya-wed-1",
    personName: "Divya Rao",
    date: "2026-09-23",
    dayName: "Wed 23 Sep",
    time: "1:00–2:00 PM",
    startHour: 13.0,
    endHour: 14.0,
    event: "Blocked",
    category: "blocked",
  },
  {
    id: "divya-thu-1",
    personName: "Divya Rao",
    date: "2026-09-24",
    dayName: "Thu 24 Sep",
    time: "9:00–10:00 AM",
    startHour: 9.0,
    endHour: 10.0,
    event: "Board Prep Session",
    category: "prep",
  },
  {
    id: "divya-thu-2",
    personName: "Divya Rao",
    date: "2026-09-24",
    dayName: "Thu 24 Sep",
    time: "2:00–3:00 PM",
    startHour: 14.0,
    endHour: 15.0,
    event: "Blocked",
    category: "blocked",
  },
  {
    id: "divya-fri-1",
    personName: "Divya Rao",
    date: "2026-09-25",
    dayName: "Fri 25 Sep",
    time: "10:00–11:00 AM",
    startHour: 10.0,
    endHour: 11.0,
    event: "Blocked",
    category: "blocked",
  },
];

export const MEETING_TRANSCRIPT: {
  title: string;
  date: string;
  time: string;
  attendees: string[];
  utterances: TranscriptUtterance[];
} = {
  title: "Leadership Sync",
  date: "2026-09-21",
  time: "9:00–9:35 AM",
  attendees: ["Arjun Malhotra", "Neha Kapoor", "Raghav Sethi", "Divya Rao"],
  utterances: [
    {
      id: "ls-1",
      speaker: "Arjun Malhotra",
      text: "Let's keep this quick. Neha, where are we on the Q3 campaign deck?",
      topic: "Q3 Campaign Deck",
    },
    {
      id: "ls-2",
      speaker: "Neha Kapoor",
      text: "Draft is 80% done. I'll send it to Arjun for review by Wednesday.",
      topic: "Q3 Campaign Deck",
      actionItemExtracted: "Neha targeting Wednesday for draft review",
    },
    {
      id: "ls-3",
      speaker: "Arjun Malhotra",
      text: "Good. Also, remind me — I told Raghav I'd send him the updated vendor list. I'll get that to him by end of day tomorrow.",
      topic: "Vendor List",
      actionItemExtracted: "Arjun committed to send updated vendor list to Raghav by EOD Tuesday 22 Sep",
    },
    {
      id: "ls-4",
      speaker: "Raghav Sethi",
      text: "Appreciated. Separately, the Mumbai office renewal paperwork needs someone to sign off this week. Not sure whose desk that's on right now.",
      topic: "Mumbai Office Lease Renewal",
      actionItemExtracted: "Mumbai lease renewal sign-off unowned, needs owner sign-off by Friday 25 Sep",
    },
    {
      id: "ls-5",
      speaker: "Divya Rao",
      text: "I think that's supposed to be Facilities, but I haven't seen anyone pick it up.",
      topic: "Mumbai Office Lease Renewal",
    },
    {
      id: "ls-6",
      speaker: "Arjun Malhotra",
      text: "Okay, flag it, don't assume. Divya, can you also pull the July expense variance report before Thursday's board prep?",
      topic: "July Expense Variance Report",
      actionItemExtracted: "Divya assigned to prepare July expense variance report before Board Prep",
    },
    {
      id: "ls-7",
      speaker: "Divya Rao",
      text: "Yes, I'll have it ready Wednesday evening.",
      topic: "July Expense Variance Report",
      actionItemExtracted: "Divya committed to deliver July expense variance report by Wednesday evening",
    },
    {
      id: "ls-8",
      speaker: "Arjun Malhotra",
      text: "One more thing — client call with Meridian Logistics got pushed. I need to reconfirm the new time with their team myself.",
      topic: "Meridian Call Reschedule",
      actionItemExtracted: "Arjun to reconfirm new client call time with Meridian Logistics",
    },
    {
      id: "ls-9",
      speaker: "Neha Kapoor",
      text: "Also, just a reminder, the campaign deck review — I said Wednesday, but realistically Thursday morning is safer.",
      topic: "Q3 Campaign Deck",
      actionItemExtracted: "Neha shifted campaign deck review target to Thursday morning",
    },
    {
      id: "ls-10",
      speaker: "Arjun Malhotra",
      text: "Noted. Let's close here.",
      topic: "General",
    },
  ],
};

export const EMAIL_THREADS: EmailThread[] = [
  {
    id: "thread-1",
    subject: "Vendor List",
    participants: ["raghav.sethi@veridian-corp.example", "arjun.malhotra@veridian-corp.example"],
    lastUpdated: "Wed 23 Sep, 8:45 AM",
    status: "urgent",
    messages: [
      {
        id: "msg-1-1",
        threadId: "thread-1",
        threadSubject: "Vendor List",
        timestamp: "Mon 21 Sep, 9:50 AM",
        date: "2026-09-21",
        time: "9:50 AM",
        from: "raghav.sethi@veridian-corp.example",
        fromName: "Raghav Sethi",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Following up from the sync — can you send the updated vendor list today?",
      },
      {
        id: "msg-1-2",
        threadId: "thread-1",
        threadSubject: "Vendor List",
        timestamp: "Mon 21 Sep, 5:40 PM",
        date: "2026-09-21",
        time: "5:40 PM",
        from: "arjun.malhotra@veridian-corp.example",
        fromName: "Arjun Malhotra",
        to: "raghav.sethi@veridian-corp.example",
        toName: "Raghav Sethi",
        content: "Running behind, will send first thing tomorrow morning instead.",
      },
      {
        id: "msg-1-3",
        threadId: "thread-1",
        threadSubject: "Vendor List",
        timestamp: "Tue 22 Sep, 9:15 AM",
        date: "2026-09-22",
        time: "9:15 AM",
        from: "raghav.sethi@veridian-corp.example",
        fromName: "Raghav Sethi",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "No worries, whenever you get a chance today works.",
      },
      {
        id: "msg-1-4",
        threadId: "thread-1",
        threadSubject: "Vendor List",
        timestamp: "Tue 22 Sep, 6:30 PM",
        date: "2026-09-22",
        time: "6:30 PM",
        from: "arjun.malhotra@veridian-corp.example",
        fromName: "Arjun Malhotra",
        to: "raghav.sethi@veridian-corp.example",
        toName: "Raghav Sethi",
        content: "Sorry, got pulled into board prep — will send by tomorrow (Wednesday) morning for sure.",
      },
      {
        id: "msg-1-5",
        threadId: "thread-1",
        threadSubject: "Vendor List",
        timestamp: "Wed 23 Sep, 8:45 AM",
        date: "2026-09-23",
        time: "8:45 AM",
        from: "raghav.sethi@veridian-corp.example",
        fromName: "Raghav Sethi",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Just checking — still good for this morning?",
      },
    ],
  },
  {
    id: "thread-2",
    subject: "Q3 Campaign Deck",
    participants: ["neha.kapoor@veridian-corp.example", "arjun.malhotra@veridian-corp.example"],
    lastUpdated: "Thu 24 Sep, 8:00 AM",
    status: "resolved",
    messages: [
      {
        id: "msg-2-1",
        threadId: "thread-2",
        threadSubject: "Q3 Campaign Deck",
        timestamp: "Mon 21 Sep, 11:00 AM",
        date: "2026-09-21",
        time: "11:00 AM",
        from: "neha.kapoor@veridian-corp.example",
        fromName: "Neha Kapoor",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Deck's coming together, still targeting Wednesday for your review.",
      },
      {
        id: "msg-2-2",
        threadId: "thread-2",
        threadSubject: "Q3 Campaign Deck",
        timestamp: "Tue 22 Sep, 4:15 PM",
        date: "2026-09-22",
        time: "4:15 PM",
        from: "neha.kapoor@veridian-corp.example",
        fromName: "Neha Kapoor",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Heads up — shifting the review to Thursday morning instead of Wednesday, need one more day on the data slides.",
      },
      {
        id: "msg-2-3",
        threadId: "thread-2",
        threadSubject: "Q3 Campaign Deck",
        timestamp: "Wed 23 Sep, 10:00 AM",
        date: "2026-09-23",
        time: "10:00 AM",
        from: "arjun.malhotra@veridian-corp.example",
        fromName: "Arjun Malhotra",
        to: "neha.kapoor@veridian-corp.example",
        toName: "Neha Kapoor",
        content: "Understood, Thursday morning works. What time exactly?",
      },
      {
        id: "msg-2-4",
        threadId: "thread-2",
        threadSubject: "Q3 Campaign Deck",
        timestamp: "Wed 23 Sep, 10:20 AM",
        date: "2026-09-23",
        time: "10:20 AM",
        from: "neha.kapoor@veridian-corp.example",
        fromName: "Neha Kapoor",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Let's say 9:30 AM Thursday, before your board prep block.",
      },
      {
        id: "msg-2-5",
        threadId: "thread-2",
        threadSubject: "Q3 Campaign Deck",
        timestamp: "Thu 24 Sep, 8:00 AM",
        date: "2026-09-24",
        time: "8:00 AM",
        from: "neha.kapoor@veridian-corp.example",
        fromName: "Neha Kapoor",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Deck is ready, attaching the draft ahead of our 9:30 review.",
        attachment: "Q3_Campaign_Deck_vDraft.pdf",
      },
    ],
  },
  {
    id: "thread-3",
    subject: "Call Reschedule",
    participants: ["priya.nair@meridianlogistics.example", "arjun.malhotra@veridian-corp.example"],
    lastUpdated: "Wed 23 Sep, 2:00 PM",
    status: "scheduled",
    messages: [
      {
        id: "msg-3-1",
        threadId: "thread-3",
        threadSubject: "Call Reschedule",
        timestamp: "Mon 21 Sep, 1:00 PM",
        date: "2026-09-21",
        time: "1:00 PM",
        from: "priya.nair@meridianlogistics.example",
        fromName: "Priya Nair",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Our scheduled call this week got bumped from our side — can you propose a new time? We're flexible Tuesday–Thursday afternoons.",
      },
      {
        id: "msg-3-2",
        threadId: "thread-3",
        threadSubject: "Call Reschedule",
        timestamp: "Tue 22 Sep, 3:00 PM",
        date: "2026-09-22",
        time: "3:00 PM",
        from: "arjun.malhotra@veridian-corp.example",
        fromName: "Arjun Malhotra",
        to: "priya.nair@meridianlogistics.example",
        toName: "Priya Nair",
        content: "Apologies for the delay — how about Wednesday 3:00 PM?",
      },
      {
        id: "msg-3-3",
        threadId: "thread-3",
        threadSubject: "Call Reschedule",
        timestamp: "Tue 22 Sep, 5:45 PM",
        date: "2026-09-22",
        time: "5:45 PM",
        from: "priya.nair@meridianlogistics.example",
        fromName: "Priya Nair",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Wednesday 3 PM works on our end, confirmed.",
      },
      {
        id: "msg-3-4",
        threadId: "thread-3",
        threadSubject: "Call Reschedule",
        timestamp: "Wed 23 Sep, 1:30 PM",
        date: "2026-09-23",
        time: "1:30 PM",
        from: "priya.nair@meridianlogistics.example",
        fromName: "Priya Nair",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Quick check — still on for 3 PM today?",
      },
      {
        id: "msg-3-5",
        threadId: "thread-3",
        threadSubject: "Call Reschedule",
        timestamp: "Wed 23 Sep, 2:00 PM",
        date: "2026-09-23",
        time: "2:00 PM",
        from: "arjun.malhotra@veridian-corp.example",
        fromName: "Arjun Malhotra",
        to: "priya.nair@meridianlogistics.example",
        toName: "Priya Nair",
        content: "Yes, confirmed, see you at 3.",
      },
    ],
  },
  {
    id: "thread-4",
    subject: "Expense Variance Report",
    participants: ["divya.rao@veridian-corp.example", "arjun.malhotra@veridian-corp.example"],
    lastUpdated: "Wed 23 Sep, 6:10 PM",
    status: "resolved",
    messages: [
      {
        id: "msg-4-1",
        threadId: "thread-4",
        threadSubject: "Expense Variance Report",
        timestamp: "Mon 21 Sep, 2:30 PM",
        date: "2026-09-21",
        time: "2:30 PM",
        from: "divya.rao@veridian-corp.example",
        fromName: "Divya Rao",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Starting on the July variance numbers, targeting Thursday morning for board prep as discussed.",
      },
      {
        id: "msg-4-2",
        threadId: "thread-4",
        threadSubject: "Expense Variance Report",
        timestamp: "Tue 22 Sep, 9:00 AM",
        date: "2026-09-22",
        time: "9:00 AM",
        from: "arjun.malhotra@veridian-corp.example",
        fromName: "Arjun Malhotra",
        to: "divya.rao@veridian-corp.example",
        toName: "Divya Rao",
        content: "Actually, can I get it by Wednesday evening instead? Want time to review before Thursday.",
      },
      {
        id: "msg-4-3",
        threadId: "thread-4",
        threadSubject: "Expense Variance Report",
        timestamp: "Tue 22 Sep, 9:40 AM",
        date: "2026-09-22",
        time: "9:40 AM",
        from: "divya.rao@veridian-corp.example",
        fromName: "Divya Rao",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Wednesday evening is tight but doable, I'll prioritize it.",
      },
      {
        id: "msg-4-4",
        threadId: "thread-4",
        threadSubject: "Expense Variance Report",
        timestamp: "Wed 23 Sep, 6:00 PM",
        date: "2026-09-23",
        time: "6:00 PM",
        from: "divya.rao@veridian-corp.example",
        fromName: "Divya Rao",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "Report attached, sent as promised.",
        attachment: "July_Expense_Variance_Report.pdf",
      },
      {
        id: "msg-4-5",
        threadId: "thread-4",
        threadSubject: "Expense Variance Report",
        timestamp: "Wed 23 Sep, 6:10 PM",
        date: "2026-09-23",
        time: "6:10 PM",
        from: "arjun.malhotra@veridian-corp.example",
        fromName: "Arjun Malhotra",
        to: "divya.rao@veridian-corp.example",
        toName: "Divya Rao",
        content: "Got it, thank you — exactly what I needed before tomorrow.",
      },
    ],
  },
  {
    id: "thread-5",
    subject: "Mumbai Office Lease Renewal",
    participants: [
      "facilities@veridian-corp.example",
      "raghav.sethi@veridian-corp.example",
      "divya.rao@veridian-corp.example",
      "arjun.malhotra@veridian-corp.example",
    ],
    lastUpdated: "Thu 24 Sep, 4:45 PM",
    status: "urgent",
    messages: [
      {
        id: "msg-5-1",
        threadId: "thread-5",
        threadSubject: "Mumbai Office Lease Renewal",
        timestamp: "Mon 21 Sep, 10:15 AM",
        date: "2026-09-21",
        time: "10:15 AM",
        from: "facilities@veridian-corp.example",
        fromName: "Facilities",
        to: "All Staff",
        toName: "All Staff",
        content: "Reminder: the Mumbai office lease renewal requires an authorized signature by Friday, 25 September.",
      },
      {
        id: "msg-5-2",
        threadId: "thread-5",
        threadSubject: "Mumbai Office Lease Renewal",
        timestamp: "Tue 22 Sep, 11:00 AM",
        date: "2026-09-22",
        time: "11:00 AM",
        from: "raghav.sethi@veridian-corp.example",
        fromName: "Raghav Sethi",
        to: "arjun.malhotra@veridian-corp.example, divya.rao@veridian-corp.example",
        toName: "Arjun Malhotra & Divya Rao",
        content: "Following up from the sync — has anyone confirmed who's signing off on the Mumbai renewal? Don't think it's been assigned.",
      },
      {
        id: "msg-5-3",
        threadId: "thread-5",
        threadSubject: "Mumbai Office Lease Renewal",
        timestamp: "Wed 23 Sep, 9:30 AM",
        date: "2026-09-23",
        time: "9:30 AM",
        from: "divya.rao@veridian-corp.example",
        fromName: "Divya Rao",
        to: "raghav.sethi@veridian-corp.example, arjun.malhotra@veridian-corp.example",
        toName: "Raghav Sethi & Arjun Malhotra",
        content: "Not on my end — I believe this typically sits with Facilities directly, not us.",
      },
      {
        id: "msg-5-4",
        threadId: "thread-5",
        threadSubject: "Mumbai Office Lease Renewal",
        timestamp: "Thu 24 Sep, 4:00 PM",
        date: "2026-09-24",
        time: "4:00 PM",
        from: "facilities@veridian-corp.example",
        fromName: "Facilities",
        to: "All Staff",
        toName: "All Staff",
        content: "Second reminder: signature is still pending. Deadline is Friday, 25 September, end of day.",
      },
      {
        id: "msg-5-5",
        threadId: "thread-5",
        threadSubject: "Mumbai Office Lease Renewal",
        timestamp: "Thu 24 Sep, 4:45 PM",
        date: "2026-09-24",
        time: "4:45 PM",
        from: "raghav.sethi@veridian-corp.example",
        fromName: "Raghav Sethi",
        to: "arjun.malhotra@veridian-corp.example",
        toName: "Arjun Malhotra",
        content: "This is now one day out and still unowned — can you confirm who's handling it?",
      },
    ],
  },
];

export const VOICE_NOTES: VoiceNote[] = [
  {
    id: "vn-1",
    title: "Voice Note 1 — Cab Memo",
    timestamp: "Mon 21 Sep, 6:40 PM",
    date: "2026-09-21",
    duration: "0:42",
    transcript:
      "Quick note to self — need to get Raghav that vendor list, I think I said today but it might slip to tomorrow morning, remind me. Also still haven't heard back on the Mumbai lease thing, someone needs to own that, I don't think it's me.",
    takeaways: [
      "Arjun acknowledged owing Raghav the updated vendor list (originally Mon EOD, slipping to Tue morning).",
      "Arjun flagged Mumbai office lease renewal as unowned, noting someone needs to take ownership.",
    ],
  },
  {
    id: "vn-2",
    title: "Voice Note 2 — Morning Briefing",
    timestamp: "Wed 23 Sep, 8:15 AM",
    date: "2026-09-23",
    duration: "0:35",
    transcript:
      "Reminder — expense variance report from Divya needs to be in my hands by Wednesday evening, not Thursday, I want time to go through it before board prep. Also Meridian call — I owe Priya a time, need to lock that in today.",
    takeaways: [
      "Arjun emphasized priority for July expense variance report from Divya by Wednesday evening.",
      "Arjun reminded himself to finalize client call time with Priya (Meridian Logistics) on Wednesday.",
    ],
  },
];

export const EXECUTIVE_DELIVERABLES: ExecutiveDeliverable[] = [
  {
    id: "task-1",
    title: "Send Updated Vendor List to Raghav Sethi",
    owner: "Arjun Malhotra",
    ownerEmail: "arjun.malhotra@veridian-corp.example",
    requestedBy: "Raghav Sethi",
    dueDate: "2026-09-22",
    dueTime: "EOD (Delayed to Wed Sep 23 Morning)",
    status: "overdue",
    priority: "high",
    category: "Operations / Vendor Management",
    description:
      "Arjun promised Raghav the updated vendor list during Mon 9:00 AM Sync (due Tue EOD/Wed morning). Raghav followed up 3 times via Email (Mon 9:50 AM, Tue 9:15 AM, Wed 8:45 AM). Still unfulfilled.",
    relatedThreadId: "thread-1",
    source: [
      "Meeting Transcript (Mon 9:00 AM, item #3)",
      "Voice Note 1 (Mon 6:40 PM)",
      "Email Thread 1 (5 messages)",
    ],
  },
  {
    id: "task-2",
    title: "Assign & Resolve Mumbai Office Lease Renewal Sign-off",
    owner: "UNASSIGNED (Action Required by Arjun)",
    ownerEmail: "facilities@veridian-corp.example",
    requestedBy: "Facilities / Raghav Sethi",
    dueDate: "2026-09-25",
    dueTime: "End of Day (Friday 25 Sep)",
    status: "action_required",
    priority: "critical",
    category: "Real Estate & Governance",
    description:
      "Authorized signature required by Friday 25 Sep EOD. Facilities sent 2 company-wide reminders. Raghav emailed Arjun on Thu 4:45 PM warning it's 1 day out and completely unowned.",
    relatedThreadId: "thread-5",
    source: [
      "Meeting Transcript (Mon 9:00 AM, item #4-5)",
      "Voice Note 1 (Mon 6:40 PM)",
      "Email Thread 5 (5 messages)",
    ],
  },
  {
    id: "task-3",
    title: "Review Q3 Campaign Deck Draft from Neha",
    owner: "Arjun Malhotra & Neha Kapoor",
    ownerEmail: "neha.kapoor@veridian-corp.example",
    requestedBy: "Neha Kapoor",
    dueDate: "2026-09-24",
    dueTime: "9:30 AM",
    status: "scheduled",
    priority: "high",
    category: "Marketing Strategy",
    description:
      "Neha sent draft email Thu 8:00 AM. Scheduled review meeting set for Thu 9:30 AM before Board Prep Session.",
    relatedThreadId: "thread-2",
    source: [
      "Meeting Transcript (Mon 9:00 AM, item #2 & #9)",
      "Email Thread 2 (5 messages)",
      "Calendar Event (Thu 9:30 AM)",
    ],
  },
  {
    id: "task-4",
    title: "July Expense Variance Report for Board Prep",
    owner: "Divya Rao",
    ownerEmail: "divya.rao@veridian-corp.example",
    requestedBy: "Arjun Malhotra",
    dueDate: "2026-09-23",
    dueTime: "6:00 PM",
    status: "completed",
    priority: "medium",
    category: "Finance & Board Prep",
    description:
      "Divya delivered report on Wed 6:00 PM as requested by Arjun for review prior to Thursday Board Prep. Arjun acknowledged Wed 6:10 PM.",
    relatedThreadId: "thread-4",
    source: [
      "Meeting Transcript (Mon 9:00 AM, item #6-7)",
      "Voice Note 2 (Wed 8:15 AM)",
      "Email Thread 4 (5 messages)",
    ],
  },
  {
    id: "task-5",
    title: "Meridian Logistics Client Call",
    owner: "Arjun Malhotra & Priya Nair",
    ownerEmail: "priya.nair@meridianlogistics.example",
    requestedBy: "Priya Nair",
    dueDate: "2026-09-23",
    dueTime: "3:00–3:30 PM",
    status: "completed",
    priority: "medium",
    category: "Client Relationship",
    description:
      "Call rescheduled and confirmed for Wednesday 3:00 PM via email thread and calendar invitation.",
    relatedThreadId: "thread-3",
    source: [
      "Meeting Transcript (Mon 9:00 AM, item #8)",
      "Voice Note 2 (Wed 8:15 AM)",
      "Email Thread 3 (5 messages)",
    ],
  },
];
