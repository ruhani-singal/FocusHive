import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Brain,
  Users,
  BarChart3,
  Focus,
  ArrowUp,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll button visibility
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Scroll Animations
  const useScrollAnimation = () => {
    const controls = useAnimation();
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) controls.start("visible");
          });
        },
        { threshold: 0.2 }
      );
      const elements = document.querySelectorAll(".fade-section");
      elements.forEach((el) => observer.observe(el));
      return () => elements.forEach((el) => observer.unobserve(el));
    }, [controls]);
    return controls;
  };

  const controls = useScrollAnimation();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <Header
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Hero */}
      <Hero controls={controls} />

      {/* Features */}
      <Features controls={controls} />

      {/* Everything You Need */}
      <EverythingYouNeed controls={controls} />

      {/* Testimonials */}
      <Testimonials controls={controls} />

      {/* Newsletter */}
      <Newsletter controls={controls} />

      {/* Footer */}
      <Footer />

      {/* Scroll to top */}
      {showScrollTop && (
        <motion.button
          onClick={scrollTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </div>
  );
}

/* ----------------------------- COMPONENTS ----------------------------- */

function Header({ mobileOpen, setMobileOpen, darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="flex justify-between items-center py-4 px-6 md:px-12">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          FocusHive
        </h1>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["Dashboard", "Study Rooms", "Activity", "Portfolio","Settings"].map(
            (item)=>(
                <Link key={item} to={`/${item.toLowerCase().replace(" ","-")}`}
            
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                    {item}
                </Link>
            ))}
        </nav>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden md:flex gap-3">
            <Button variant="outline" className="text-sm">
              Sign in
            </Button>
            <Button className="bg-blue-600 text-white text-sm">
              Register
            </Button>
          </div>

          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-950 border-t dark:border-gray-800"
        >
          <div className="flex flex-col px-6 py-4 space-y-3 text-gray-700 dark:text-gray-200 text-sm">
            {["Dashboard", "Study Rooms", "Activity", "Portfolio", "Settings"].map(
              (item) => (
                <a key={item} href="#">
                  {item}
                </a>
              )
            )}
            <div className="flex gap-2 pt-3">
              <Button variant="outline" className="text-sm w-1/2">
                Sign in
              </Button>
              <Button className="bg-blue-600 text-white text-sm w-1/2">
                Register
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero({ controls }) {
  return (
    <section className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-indigo-100/20 to-transparent dark:from-blue-900/20 dark:via-indigo-900/10 animate-pulse-slow pointer-events-none" />

      <motion.div
        className="max-w-lg fade-section relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Focus Better,{" "}
          <span className="text-blue-600 dark:text-blue-400">Study Smarter</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Join thousands of students in our AI-powered study environment.
          Connect, focus, and achieve your academic goals with FocusHive.
        </p>
        <div className="flex gap-4 mt-6">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Start Studying Now
          </Button>
          <Button variant="outline">Join Study Room</Button>
        </div>
      </motion.div>
    </section>
  );
}

function Features({ controls }) {
  const data = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI StudyBuddy",
      text: "Intelligent tutoring that adapts to your learning style.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Virtual Study Rooms",
      text: "Collaborative spaces where students connect globally.",
      color: "from-pink-500 to-red-400",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Analytics",
      text: "Gain insights into your study patterns with AI-powered recommendations.",
      color: "from-cyan-500 to-green-400",
    },
    {
      icon: <Focus className="w-6 h-6" />,
      title: "Deep Focus Mode",
      text: "Distraction-free environment with adaptive focus techniques.",
      color: "from-emerald-500 to-teal-400",
    },
  ];

  return (
    <SectionFade controls={controls}>
      <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
        Powered by Innovation
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Experience technology that transforms how students learn, collaborate,
        and succeed.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </SectionFade>
  );
}

function EverythingYouNeed({ controls }) {
  const data = [
    "AI Study Rooms",
    "AI Study Buddy",
    "Whisper Rooms",
    "Progress Analytics",
    "Pomodoro Timers",
    "Goal Setting",
  ];

  return (
    <SectionFade controls={controls} bg="bg-white dark:bg-gray-950">
      <h3 className="text-2xl font-semibold mb-2">
        Everything You Need to Succeed
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Tools designed to help you maintain focus, stay motivated, and achieve
        your academic goals.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((title, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.02 }}
            className="border rounded-xl p-6 text-left bg-slate-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800 transition shadow-sm"
          >
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Boost your productivity and learning efficiency with FocusHive.
            </p>
          </motion.div>
        ))}
      </div>
    </SectionFade>
  );
}

function Testimonials({ controls }) {
  const data = [
    {
      name: "Aarav Mehta",
      text: "FocusHive completely changed my study habits. I’m now consistent and more focused than ever!",
    },
    {
      name: "Sofia Sharma",
      text: "The AI StudyBuddy is like having a personal tutor — it really understands my weak points.",
    },
    {
      name: "Liam Johnson",
      text: "The dark mode and minimalist design keep me in deep focus sessions easily.",
    },
  ];

  return (
    <SectionFade controls={controls} bg="bg-slate-50 dark:bg-gray-900">
      <h3 className="text-2xl font-semibold mb-8 text-blue-600 dark:text-blue-400">
        What Our Users Say
      </h3>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {data.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-950 border dark:border-gray-800 p-6 rounded-xl shadow-md max-w-sm"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">“{t.text}”</p>
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">
              {t.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </SectionFade>
  );
}

function Newsletter({ controls }) {
  return (
    <SectionFade controls={controls}>
      <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Subscribe to get study tips, productivity hacks, and FocusHive updates!
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 w-full outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3">
          Subscribe
        </Button>
      </div>
    </SectionFade>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 md:px-20 border-t border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            FocusHive
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Empowering students worldwide to focus smarter and achieve more.
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Quick Links</h5>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Connect With Us</h5>
          <div className="flex justify-center md:justify-start gap-4">
            {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
        © 2025 FocusHive. All rights reserved.
      </div>
    </footer>
  );
}

/* Helper components */
function SectionFade({ controls, children, bg }) {
  return (
    <section
      className={`${bg || ""} px-6 md:px-20 py-20 text-center fade-section`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

function FeatureCard({ icon, title, text, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-2xl p-6 text-left text-white bg-gradient-to-r ${color} shadow-lg`}
    >
      <div className="mb-3">{icon}</div>
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-sm opacity-90">{text}</p>
    </motion.div>
  );
}
