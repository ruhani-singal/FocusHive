import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, BookOpen, Image as ImageIcon } from "lucide-react";


export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    fieldOfStudy: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const handleSignup = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  alert(data.msg);
};

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Form Data:", formData);
    alert("Account created successfully! (Later this will connect to backend)");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      {/* Navbar (Optional if not global) */}
      <header className="w-full flex justify-between items-center py-4 px-6 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="FocusHive" className="h-6" />
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            FocusHive
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["Dashboard", "Study Room", "Chat Room", "AI Buddy", "Analytics", "Profile", "Settings"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item}
              </a>
            )
          )}
          <Link to="/login" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400">
            Login
          </Link>

          <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
           Sign Up
          </Link>

        </nav>
      </header>

      {/* Sign Up Form */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-3">
            Join <span className="text-blue-600">FocusHive</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Start your journey to better study habits
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">First Name</label>
              <div className="flex items-center border rounded-md px-3">
                <User className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-2 py-2 outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Last Name</label>
              <div className="flex items-center border rounded-md px-3">
                <User className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-2 py-2 outline-none bg-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Email Address</label>
            <div className="flex items-center border rounded-md px-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Field of Study (Optional)</label>
            <div className="flex items-center border rounded-md px-3">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                placeholder="Computer Science, Biology, etc."
                className="w-full px-2 py-2 outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Password</label>
            <div className="flex items-center border rounded-md px-3">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Confirm Password</label>
            <div className="flex items-center border rounded-md px-3">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-2 py-2 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Profile Picture (Optional)</label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 border px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <ImageIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Choose image</span>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input type="checkbox" required />
            <span className="text-gray-600 dark:text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-blue-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600">
                Privacy Policy
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
