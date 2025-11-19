import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Clock,
  Trophy,
  Users,
  Zap,
  Plus,
} from "lucide-react";
import StudyRoomModal from "./StudyRoomModal.jsx";

export default function StudyRooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      name: "Mathematics Focus Room",
      subject: "Mathematics",
      type: "Focused Study",
      music: "Lo-fi Beats",
      time: "45 min",
      participants: 24,
      avatars: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
    },
    {
      name: "Pomodoro Central",
      subject: "Mixed",
      type: "Timed Session",
      music: "Focus Beats",
      time: "25 min",
      participants: 42,
      avatars: [
        "https://i.pravatar.cc/40?img=4",
        "https://i.pravatar.cc/40?img=5",
        "https://i.pravatar.cc/40?img=6",
      ],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100">
      {/* Header / Navbar */}
      <header className="w-full bg-white dark:bg-neutral-800 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-blue-600">FocusHive</h1>
          <nav className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/study-rooms" className="text-blue-600 font-semibold">
              Study Rooms
            </Link>
            <a href="#">Chat Room</a>
            <a href="#">AI Buddy</a>
            <a href="#">Analytics</a>
            <a href="#">Profile</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* Stats */}
        <section className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            {
              label: "Study Streak",
              value: "5 days",
              icon: <Zap className="w-5 h-5 text-yellow-400" />,
            },
            {
              label: "Total Study Time",
              value: "27 hours",
              icon: <Clock className="w-5 h-5 text-blue-500" />,
            },
            {
              label: "Active Rooms",
              value: "8",
              icon: <Users className="w-5 h-5 text-green-500" />,
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white dark:bg-neutral-800 shadow-sm rounded-2xl p-6 flex flex-col items-center"
            >
              <div className="mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </section>

        {/* AI Features */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-center">
            AI-Powered Study Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Smart Recommendations",
                desc: "Personalized study suggestions powered by AI.",
                icon: <Brain className="w-5 h-5 text-blue-500" />,
              },
              {
                title: "Focus Analytics",
                desc: "Analyze your study patterns and performance.",
                icon: <BookOpen className="w-5 h-5 text-purple-500" />,
              },
              {
                title: "AI Study Buddy",
                desc: "Chat and learn with your personalized AI assistant.",
                icon: <Users className="w-5 h-5 text-green-500" />,
              },
              {
                title: "Focus Detection",
                desc: "Stay engaged with AI-based distraction tracking.",
                icon: <Zap className="w-5 h-5 text-yellow-400" />,
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="mb-2">{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Study Rooms Grid with Modal */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-center">
            Available Study Rooms
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.name}
                onClick={() => setSelectedRoom(room)}
                className="bg-white p-5 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {room.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Subject:</span> {room.subject}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Type:</span> {room.type}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Music:</span> {room.music}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  Preview Room
                </button>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedRoom && (
            <StudyRoomModal
              room={selectedRoom}
              onClose={() => setSelectedRoom(null)}
            />
          )}
        </section>

        {/* Create Room CTA */}
        <section className="text-center mt-12">
          <div className="bg-white dark:bg-neutral-800 p-10 rounded-2xl shadow-sm">
            <Plus className="w-8 h-8 mx-auto text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Want to create your own study room?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Set up a custom environment with your preferred settings and
              invite friends.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create New Room
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-neutral-800 mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 FocusHive. All rights reserved.
      </footer>
    </div>
  );
}
