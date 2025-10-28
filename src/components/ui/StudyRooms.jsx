import { BookOpen, Brain, Clock, Trophy, Users, Zap, Plus } from "lucide-react";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";
import React, { useEffect } from "react";




export default function StudyRooms() {
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
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/study-rooms" className="text-blue-600 font-semibold">Study Rooms</Link>
            <a href="#">Chat Room</a>
            <a href="#">AI Buddy</a>
            <a href="#">Analytics</a>
            <a href="#">Profile</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">Login</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign Up</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* Stats */}
        <section className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            { label: "Study Streak", value: "5 days", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
            { label: "Total Study Time", value: "27 hours", icon: <Clock className="w-5 h-5 text-blue-500" /> },
            { label: "Active Rooms", value: "8", icon: <Users className="w-5 h-5 text-green-500" /> },
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
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </section>

        {/* Search & Filter */}
        <section className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search study rooms..."
            className="w-full sm:w-1/2 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="flex gap-4">
            <select className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg">
              <option>Subject</option>
              <option>Math</option>
              <option>Science</option>
              <option>Reading</option>
            </select>
            <select className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg">
              <option>Room Type</option>
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </section>

        {/* AI-Powered Features */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-center">AI-Powered Study Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Smart Recommendations", desc: "Personalized study suggestions powered by AI.", icon: <Brain className="w-5 h-5 text-blue-500" /> },
              { title: "Focus Analytics", desc: "Analyze your study patterns and performance.", icon: <BookOpen className="w-5 h-5 text-purple-500" /> },
              { title: "AI Study Buddy", desc: "Chat and learn with your personalized AI assistant.", icon: <Users className="w-5 h-5 text-green-500" /> },
              { title: "Focus Detection", desc: "Stay engaged with AI-based distraction tracking.", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="mb-2">{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-center">Weekly Leaderboard</h2>
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm">
            {[
              { name: "StudyMaster03", hours: "25h" },
              { name: "AcademicAce", hours: "23h" },
              { name: "FocusedFlare", hours: "22h" },
              { name: "You", hours: "19h" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-neutral-700 last:border-none">
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.hours}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Study Rooms */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-center">Available Study Rooms</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Mathematics Focus Room", tag: "Intensive", members: 23, type: "Public" },
              { title: "Quiet Reading Corner", tag: "Peaceful", members: 15, type: "Private" },
              { title: "Science Study Lab", tag: "Collaborative", members: 18, type: "Public" },
              { title: "Pomodoro Central", tag: "Timer Mode", members: 12, type: "Public" },
              { title: "Exam Preparation Hub", tag: "Revision", members: 20, type: "Private" },
              { title: "Night Owl Study", tag: "Late Hours", members: 10, type: "Private" },
            ].map((room, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold mb-1 flex justify-between">
                  {room.title}
                  <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-md">
                    {room.tag}
                  </span>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {room.members} active members · {room.type} room
                </p>
                <button className="mt-auto w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                  Join Room
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Create Room CTA */}
        <section className="text-center mt-12">
          <div className="bg-white dark:bg-neutral-800 p-10 rounded-2xl shadow-sm">
            <Plus className="w-8 h-8 mx-auto text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Want to create your own study room?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Set up a custom environment with your preferred settings and invite friends.
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
