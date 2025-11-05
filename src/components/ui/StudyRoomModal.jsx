import React from "react";
import { motion } from "framer-motion";
import { Monitor, FileText, Presentation } from "lucide-react";

export default function StudyRoomModal({ room, onClose }) {
  if (!room) return null;

  const tools = [
    { name: "Whiteboard", icon: <Presentation className="w-4 h-4" /> },
    { name: "Document", icon: <FileText className="w-4 h-4" /> },
    { name: "Screen Share", icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          {room.name}
        </h2>

        {/* Room details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <div>
            <p className="font-medium text-gray-500">Subject</p>
            <p>{room.subject}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Type</p>
            <p>{room.type}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Music</p>
            <p>{room.music}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Avg Time</p>
            <p>{room.time}</p>
          </div>
        </div>

        {/* Participants */}
        <div className="mb-4">
          <p className="font-medium text-gray-700 mb-1">
            Current Participants ({room.participants})
          </p>
          <div className="flex space-x-1">
            {room.avatars?.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="avatar"
                className="w-7 h-7 rounded-full border border-white"
              />
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="mb-4">
          <p className="font-medium text-gray-700 mb-1">Room Rules</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            <li>Keep microphones muted when not speaking</li>
            <li>Respect others’ focus time</li>
            <li>Use the chat for questions</li>
            <li>Follow the Pomodoro timer schedule</li>
          </ul>
        </div>

        {/* Collaboration Tools */}
        <div className="mb-6">
          <p className="font-medium text-gray-700 mb-2">Collaboration Tools</p>
          <div className="flex gap-3 flex-wrap">
            {tools.map((tool) => (
              <button
                key={tool.name}
                className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                {tool.icon}
                {tool.name}
              </button>
            ))}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Join Room
          </button>
        </div>
      </motion.div>
    </div>
  );
}
