import React, { useState } from "react";
import { Play, RotateCcw, Clock, Target, Flame, Calendar, Trophy, Users, MessageSquare, Bot, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Dashboard() {
  const [isRunning, setIsRunning] = useState(false);


    
  return (
    <div>    
        <Navbar />
    <div className="min-h-screen bg-gray-50 pt-6 px-6">
      {/* ---------------------- HEADER ---------------------- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good Morning, User 👋</h1>
        <p className="text-gray-600 mt-1">You're 7 days into your study streak! Keep going 🚀</p>
      </div>

      {/* ---------------------- GRID LAYOUT ---------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        {/* ---------------------- POMODORO TIMER ---------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Pomodoro Timer</h2>
          </div>

          <div className="flex justify-center my-8">
            <div className="w-64 h-64 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900">25:00</div>
                <div className="text-sm text-gray-500 mt-2">{isRunning ? "Focus Time" : "Ready?"}</div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-center space-x-3 mb-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex items-center px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Pause" : "Start"}
            </button>

            <button className="flex items-center px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-t pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Cycles Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">145m</div>
              <div className="text-sm text-gray-600">Focus Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">7</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </motion.div>

        {/* ---------------------- RIGHT SIDEBAR ---------------------- */}
        <div className="space-y-6">

          {/* Weekly Goal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Weekly Goal</h3>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">You’re 70% towards your weekly goal!</p>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center mb-4">
              <Flame className="w-5 h-5 text-orange-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Study Streak</h3>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900">7</div>
              <p className="text-gray-600">days in a row 🔥</p>
            </div>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex mb-4">
              <Calendar className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium">Mathematics Review</div>
                <div className="text-gray-500">9:00 - 10:30</div>
              </div>
              <div>
                <div className="font-medium">Physics Problem Set</div>
                <div className="text-gray-500">11:00 - 12:30</div>
              </div>
              <div>
                <div className="font-medium">Chemistry Notes</div>
                <div className="text-gray-500">2:00 - 4:30</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------------------- FEATURE CARDS ---------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard icon={<Users className="text-blue-600" />} title="Join Study Room" subtitle="24/7 virtual study rooms" />
        <DashboardCard icon={<Bot className="text-purple-600" />} title="AI Study Buddy" subtitle="Get personalized help" />
        <DashboardCard icon={<MessageSquare className="text-orange-600" />} title="Chat Rooms" subtitle="Connect with peers" />
        <DashboardCard icon={<BarChart3 className="text-green-600" />} title="Analytics" subtitle="Track your progress" />
      </div>

      {/* ---------------------- RECENT SESSIONS ---------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>

        <div className="space-y-3">
          <SessionItem title="Focus Session - Mathematics" duration="45 minutes" />
          <SessionItem title="Break Session" duration="5 minutes" />
          <SessionItem title="Focus Session - Physics" duration="45 minutes" />
        </div>
      </motion.div>
     
    </div>
    <Footer />
    </div>
  );
}

/* ---------------------- SMALL COMPONENTS ---------------------- */
function DashboardCard({ icon, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer"
    >
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </motion.div>
  );
}

function SessionItem({ title, duration }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div>
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{duration}</div>
      </div>
      <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
        Completed
      </span>
    </div>
  );
}
