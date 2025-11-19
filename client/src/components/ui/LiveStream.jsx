import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Lock,
  Unlock,
  Bell,
  Settings,
  Link2,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Flag,
  MessageCircle,
  UserCircle2,
  Moon,
  BookOpen,
  Volume2,
  VolumeX,
  LayoutGrid,
  Square,
  Flame,
  ShieldCheck,
} from "lucide-react";

const MOCK_PARTICIPANTS = [
  {
    id: 1,
    name: "You",
    subject: "Business Law",
    streak: 7,
    cameraOn: true,
    micOn: false,
    isHost: true,
    isYou: true,
    status: "online",
  },
  {
    id: 2,
    name: "Kookie",
    subject: "Constitutional Law",
    streak: 32,
    cameraOn: true,
    micOn: false,
    isHost: false,
    isYou: false,
    status: "online",
  },
  {
    id: 3,
    name: "Alex Chen",
    subject: "Java DSA",
    streak: 18,
    cameraOn: false,
    micOn: false,
    isHost: false,
    isYou: false,
    status: "idle",
  },
  {
    id: 4,
    name: "Yubin",
    subject: "NCLEX Prep",
    streak: 45,
    cameraOn: true,
    micOn: false,
    isHost: false,
    isYou: false,
    status: "online",
  },
  {
    id: 5,
    name: "Sam",
    subject: "Exam Prep",
    streak: 4,
    cameraOn: false,
    micOn: false,
    isHost: false,
    isYou: false,
    status: "away",
  },
  {
    id: 6,
    name: "Riley",
    subject: "Motivation & Planning",
    streak: 9,
    cameraOn: true,
    micOn: false,
    isHost: false,
    isYou: false,
    status: "online",
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: "Kookie",
    fromId: 2,
    text: "Starting a 50 min deep work block. Good luck everyone! 💪",
    scope: "room",
    toId: null,
    timestamp: "Now",
  },
  {
    id: 2,
    from: "Alex Chen",
    fromId: 3,
    text: "@You if you get stuck in DSA later, ping me.",
    scope: "room",
    toId: null,
    timestamp: "1 min ago",
  },
];

const POMO_FOCUS_SECONDS = 50 * 60;
const POMO_BREAK_SECONDS = 10 * 60;

const statusDotClass = (status) => {
  if (status === "online") return "bg-emerald-500";
  if (status === "idle") return "bg-amber-400";
  return "bg-slate-400";
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function StudyStreamRoom() {
  // Layout + room controls
  const [ambientOn, setAmbientOn] = useState(true);
  const [roomLocked, setRoomLocked] = useState(false);
  const [aiModerationOn, setAiModerationOn] = useState(true);
  const [layoutMode, setLayoutMode] = useState("grid"); // 'grid' | 'spotlight'

  // Participants / presence
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
  const currentUser = useMemo(
    () => participants.find((p) => p.isYou),
    [participants]
  );

  // Chat / whisper
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [whisperMode, setWhisperMode] = useState(false);
  const [whisperTargetId, setWhisperTargetId] = useState(null);

  const visibleMessages = useMemo(() => {
    if (!currentUser) return messages;
    return messages.filter((m) => {
      if (m.scope === "room") return true;
      return m.fromId === currentUser.id || m.toId === currentUser.id;
    });
  }, [messages, currentUser]);

  const whisperTarget = useMemo(
    () => participants.find((p) => p.id === whisperTargetId) || null,
    [whisperTargetId, participants]
  );

  // Shared board
  const [sharedGoals, setSharedGoals] = useState([
    "Finish 2 chapters of Business Law",
    "Solve 10 DSA problems",
    "Review NCLEX pharmacology sheet",
  ]);
  const [newGoal, setNewGoal] = useState("");

  // Gamification (simple)
  const [xp, setXp] = useState(1380);
  const [level, setLevel] = useState(7);
  const [dailyStreak, setDailyStreak] = useState(5);

  // Pomodoro (global)
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [isFocusPhase, setIsFocusPhase] = useState(true);
  const [pomoSecondsLeft, setPomoSecondsLeft] = useState(POMO_FOCUS_SECONDS);
  const [completedPomoSessions, setCompletedPomoSessions] = useState(0);

  const inviteLink = "https://focushive.study/room/ultimate-focus";

  // Pomo progress
  const pomoProgress = useMemo(() => {
    const total = isFocusPhase ? POMO_FOCUS_SECONDS : POMO_BREAK_SECONDS;
    return ((total - pomoSecondsLeft) / total) * 100;
  }, [pomoSecondsLeft, isFocusPhase]);

  // Pomodoro effect
  useEffect(() => {
    if (!isPomoRunning) return;

    const interval = setInterval(() => {
      setPomoSecondsLeft((prev) => {
        if (prev <= 1) {
          if (isFocusPhase) {
            // when a focus block completes
            setCompletedPomoSessions((s) => s + 1);
            setXp((x) => x + 25);
          }

          setIsFocusPhase((phase) => !phase);
          return isFocusPhase ? POMO_BREAK_SECONDS : POMO_FOCUS_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPomoRunning, isFocusPhase]);

  // Chat handlers
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: currentUser?.name || "You",
      fromId: currentUser?.id || 1,
      text: chatInput.trim(),
      scope: whisperMode ? "whisper" : "room",
      toId: whisperMode ? whisperTargetId : null,
      timestamp: "Now",
    };
    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");
    if (!whisperMode) setXp((x) => x + 1);
  };

  // Shared goals
  const handleAddGoal = () => {
    if (!newGoal.trim()) return;
    setSharedGoals((prev) => [...prev, newGoal.trim()]);
    setNewGoal("");
  };

  const handleToggleGoal = (index) => {
    setSharedGoals((prev) =>
      prev.map((g, i) =>
        i === index && !g.startsWith("✅ ") ? `✅ ${g}` : g
      )
    );
    setXp((x) => x + 10);
  };

  // Local media controls
  const toggleYourMic = () => {
    setParticipants((prev) =>
      prev.map((p) => (p.isYou ? { ...p, micOn: !p.micOn } : p))
    );
  };

  const toggleYourCam = () => {
    setParticipants((prev) =>
      prev.map((p) => (p.isYou ? { ...p, cameraOn: !p.cameraOn } : p))
    );
  };

  // Safety
  const handleReportUser = (id) => {
    const user = participants.find((p) => p.id === id);
    alert(`Report submitted for ${user?.name ?? "User"} (stub).`);
  };

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert("Invite link copied!");
    } catch {
      alert(inviteLink);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f3f7ff] text-slate-900 transition-colors duration-300">
      {/* LEFT – ROOM NAVIGATION */}
      <aside className="hidden lg:flex flex-col w-68 xl:w-72 border-r border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xs">
              FH
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-slate-900">
                FocusHive
              </div>
              <div className="text-[11px] text-slate-500">
                Study stream rooms
              </div>
            </div>
          </div>
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
        </div>

        <div className="px-4 py-4 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-1">
            Rooms
          </p>
          <button className="flex items-center w-full gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm shadow-md shadow-blue-600/30">
            <Flame className="h-4 w-4" />
            <span className="truncate">Ultimate Deep Focus</span>
          </button>
          <button className="flex items-center w-full gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100/80">
            <Users className="h-4 w-4 text-slate-500" />
            FocusBuddies
          </button>
          <button className="flex items-center w-full gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100/80">
            <Moon className="h-4 w-4 text-slate-500" />
            Night Owls
          </button>
          <button className="flex items-center w-full gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100/80">
            <BookOpen className="h-4 w-4 text-slate-500" />
            Exam Grind
          </button>
        </div>

        {/* Streak / XP card */}
        <div className="mt-auto px-4 pb-5 pt-3 space-y-3">
          <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white p-3 shadow-md shadow-amber-500/40">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">
                  {dailyStreak}-day streak
                </div>
                <div className="text-[11px] leading-snug opacity-90">
                  Study 30+ mins today to keep it alive.
                </div>
              </div>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/30 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-white" />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] opacity-95">
              <span>Level {level}</span>
              <span>{xp} XP</span>
            </div>
          </div>

          {/* AI moderation toggle */}
          <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="font-medium text-slate-700">
                AI moderation
              </span>
            </div>
            <button
              onClick={() => setAiModerationOn((v) => !v)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
                aiModerationOn ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                  aiModerationOn ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN COLUMN */}
      <div className="flex-1 flex flex-col px-4 lg:px-8 py-5 gap-5 max-w-7xl mx-auto w-full">
        {/* TOP HEADER */}
        <header className="rounded-2xl border border-slate-200 bg-white shadow-sm px-4 lg:px-6 py-3.5 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base lg:text-lg font-semibold tracking-tight text-slate-900">
                Ultimate Deep Focus Room
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 text-red-600 text-[11px] px-2 py-[2px] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                LIVE 24/7
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
              <span>{participants.length} people studying</span>
              <span>Global Pomodoro · 50 / 10</span>
              <span>No talking • cameras optional</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lock / unlock room */}
            <button
              onClick={() => setRoomLocked((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition ${
                roomLocked
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {roomLocked ? (
                <Lock className="h-3.5 w-3.5" />
              ) : (
                <Unlock className="h-3.5 w-3.5" />
              )}
              {roomLocked ? "Locked" : "Lock room"}
            </button>

            <button
              onClick={copyInvite}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100"
            >
              <Link2 className="h-3.5 w-3.5 mr-1" />
              Invite
            </button>

            <button className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-1.5 text-slate-600 hover:bg-slate-100">
              <Bell className="h-4 w-4" />
            </button>

            <button className="hidden sm:inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-1.5 text-slate-600 hover:bg-slate-100">
              <Settings className="h-4 w-4" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div
                className={`h-2 w-2 rounded-full ${statusDotClass(
                  currentUser?.status
                )}`}
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium leading-tight text-slate-900">
                  {currentUser?.name || "You"}
                </span>
                <span className="text-[10px] text-slate-500 leading-tight">
                  {currentUser?.subject || "Study mode"}
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-[10px] font-semibold text-white">
                YOU
              </div>
            </div>
          </div>
        </header>

        {/* CENTER + RIGHT GRID */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-[minmax(0,2.5fr)_minmax(0,1.2fr)] gap-5 min-h-0">
          {/* CENTER COLUMN */}
          <section className="flex flex-col min-h-0 space-y-4">
            {/* GLOBAL POMODORO */}
            <div
              id="pomodoro-timer"
              className="rounded-2xl border border-slate-200 bg-white shadow-sm px-4 lg:px-6 py-3.5 flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-[2px] text-[11px] font-medium text-slate-700">
                      <Clock className="h-3.5 w-3.5" />
                      Global Pomodoro
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isFocusPhase ? "Focus block" : "Break"} · synced for
                      everyone
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
                    <span>
                      Sessions:{" "}
                      <span className="font-semibold">
                        {completedPomoSessions}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <div className="flex items-end gap-3">
                    <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                      {formatTime(pomoSecondsLeft)}
                    </div>
                    <div className="flex flex-col text-[11px] text-slate-500">
                      <span className="capitalize">
                        {isFocusPhase ? "Focus phase" : "Break phase"}
                      </span>
                      <span className="hidden sm:inline">
                        50 / 10 cycle · no talking
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPomoRunning((r) => !r)}
                      className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3.5 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-blue-700"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {isPomoRunning ? "Pause" : "Start"}
                    </button>
                    <button
                      onClick={() => {
                        setIsPomoRunning(false);
                        setIsFocusPhase(true);
                        setPomoSecondsLeft(POMO_FOCUS_SECONDS);
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      isFocusPhase ? "bg-blue-500" : "bg-amber-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pomoProgress}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                  />
                </div>
              </div>
            </div>

            {/* VIDEO GRID */}
            <div
              id="video-grid"
              className="flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm px-3.5 py-3.5 min-h-[320px]"
            >
              <div className="mb-3 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium flex items-center gap-1 text-slate-700">
                  <Users className="h-3.5 w-3.5" />
                  Study stream · multi-user
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLayoutMode("grid")}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border text-[11px] ${
                      layoutMode === "grid"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-slate-200 text-slate-500 bg-slate-50"
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    Grid
                  </button>
                  <button
                    onClick={() => setLayoutMode("spotlight")}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border text-[11px] ${
                      layoutMode === "spotlight"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-slate-200 text-slate-500 bg-slate-50"
                    }`}
                  >
                    <Square className="h-3.5 w-3.5" />
                    Spotlight
                  </button>
                </div>
              </div>

              <div
                className={`grid gap-3 ${
                  layoutMode === "spotlight"
                    ? "grid-cols-1 md:grid-cols-[1.7fr_1.1fr]"
                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {participants.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={`flex flex-col rounded-xl border border-slate-200 bg-slate-50 shadow-sm overflow-hidden ${
                      p.isYou ? "ring-1 ring-blue-500/60" : ""
                    } ${
                      layoutMode === "spotlight" && index === 0
                        ? "md:row-span-2"
                        : ""
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusDotClass(
                            p.status
                          )}`}
                        />
                        <span className="text-[11px] font-medium text-slate-800">
                          {p.name} {p.isYou && "(You)"}
                        </span>
                        {p.isHost && (
                          <span className="text-[10px] rounded-full bg-slate-200 px-2 py-[1px] font-medium text-slate-600">
                            Host
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px] text-right">
                        {p.subject}
                      </div>
                    </div>

                    {/* Video feed */}
                    <div
                      className={`relative flex-1 flex items-center justify-center px-3 pb-3 ${
                        p.cameraOn
                          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                          : "bg-slate-900"
                      }`}
                    >
                      {p.cameraOn ? (
                        <div className="h-full w-full rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-4xl font-semibold text-slate-100">
                          {p.name.charAt(0)}
                        </div>
                      ) : (
                        <div className="h-full w-full rounded-lg border border-dashed border-slate-600/80 flex flex-col items-center justify-center gap-1.5 text-xs text-slate-300">
                          <VideoOff className="h-4 w-4" />
                          <span>Camera off</span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-100">
                      <div className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-[1px] text-[10px] text-slate-600">
                        🔥 {p.streak} day streak
                      </div>
                      <div className="flex items-center gap-1.5">
                        {p.isYou ? (
                          <>
                            <button
                              onClick={toggleYourMic}
                              className={`h-6 w-6 inline-flex items-center justify-center rounded-full text-[11px] border ${
                                p.micOn
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-600"
                                  : "bg-white border-slate-200 text-slate-500"
                              }`}
                              title="Toggle mic"
                            >
                              {p.micOn ? (
                                <Mic className="h-3.5 w-3.5" />
                              ) : (
                                <MicOff className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <button
                              onClick={toggleYourCam}
                              className={`h-6 w-6 inline-flex items-center justify-center rounded-full text-[11px] border ${
                                p.cameraOn
                                  ? "bg-blue-50 border-blue-300 text-blue-600"
                                  : "bg-white border-slate-200 text-slate-500"
                              }`}
                              title="Toggle camera"
                            >
                              {p.cameraOn ? (
                                <Video className="h-3.5 w-3.5" />
                              ) : (
                                <VideoOff className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleReportUser(p.id)}
                            className="h-6 w-6 inline-flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                            title="Report user"
                          >
                            <Flag className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SHARED BOARD ONLY (analytics removed) */}
            <div
              id="shared-board"
              className="rounded-2xl border border-slate-200 bg-white shadow-sm px-4 lg:px-6 py-3.5 flex flex-col"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <h3 className="text-xs font-semibold text-slate-900">
                      Shared Board
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Room goals for this focus block
                  </p>
                </div>
              </div>

              <ul className="mt-2 space-y-1.5 max-h-40 overflow-y-auto pr-1 text-[12px]">
                {sharedGoals.map((goal, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 cursor-pointer rounded-lg px-1 py-1 hover:bg-slate-50 ${
                      goal.startsWith("✅ ")
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                    }`}
                    onClick={() => handleToggleGoal(index)}
                  >
                    <span className="mt-[2px]">
                      {goal.startsWith("✅ ") ? "✅" : "•"}
                    </span>
                    <span>{goal.replace(/^✅\s*/, "")}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddGoal()}
                  placeholder="Add a shared goal..."
                  className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddGoal}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-[11px] text-white px-3 py-1.5 hover:bg-slate-800"
                >
                  + Add
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN – CHAT ONLY */}
          <aside className="flex flex-col min-h-0">
            {/* Chat */}
            <div
              id="chat-panel"
              className="rounded-2xl border border-slate-200 bg-white shadow-sm px-3.5 py-3.5 flex flex-col min-h-[260px]"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-900">
                      Room Chat
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Be kind · No self-promo · Study-only
                  </p>
                </div>
              </div>

              <div className="mt-1 flex-1 min-h-0 rounded-xl bg-slate-50 border border-slate-200 px-2 py-2 overflow-y-auto space-y-1.5">
                {visibleMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`text-[11px] max-w-full rounded-lg px-2 py-1 ${
                      m.fromId === currentUser?.id
                        ? "bg-blue-50 text-slate-800 ml-auto"
                        : "bg-white text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{m.from}</span>
                      {m.scope === "whisper" && (
                        <span className="text-[10px] rounded-full bg-slate-200 px-1.5 py-[1px]">
                          whisper
                        </span>
                      )}
                      <span className="ml-auto text-[9px] text-slate-400">
                        {m.timestamp}
                      </span>
                    </div>
                    <div className="mt-0.5 break-words">{m.text}</div>
                  </div>
                ))}
              </div>

              {/* Whisper + input */}
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWhisperMode((w) => !w)}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] border ${
                      whisperMode
                        ? "border-amber-300 bg-amber-50 text-amber-700"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <UserCircle2 className="h-3.5 w-3.5" />
                    {whisperMode ? "Whisper ON" : "Whisper OFF"}
                  </button>

                  {whisperMode && (
                    <select
                      value={whisperTargetId || ""}
                      onChange={(e) =>
                        setWhisperTargetId(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      className="flex-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select user...</option>
                      {participants
                        .filter((p) => !p.isYou)
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={
                      whisperMode && whisperTarget
                        ? `Whisper to ${whisperTarget.name}...`
                        : "Send a message to everyone..."
                    }
                    className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white p-1.5 hover:bg-blue-700 shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* BOTTOM FOOTER CONTROLS – no theme switch, just ambient + layout */}
        <footer className="mt-1 rounded-2xl border border-slate-200 bg-white shadow-sm px-3.5 lg:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px]">
          {/* Ambient */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Ambient sound</span>
            <button
              onClick={() => setAmbientOn((v) => !v)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border transition ${
                ambientOn
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                  : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {ambientOn ? (
                <Volume2 className="h-3.5 w-3.5" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
              {ambientOn ? "On" : "Off"}
            </button>
          </div>

          {/* Layout */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Layout</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLayoutMode("grid")}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border transition ${
                  layoutMode === "grid"
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Grid
              </button>
              <button
                onClick={() => setLayoutMode("spotlight")}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border transition ${
                  layoutMode === "spotlight"
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                <Square className="h-3.5 w-3.5" />
                Spotlight
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}