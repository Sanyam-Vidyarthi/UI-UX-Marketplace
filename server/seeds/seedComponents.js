import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Component from '../models/Component.js';

dotenv.config();

const components = [
    {
        title: "Glassmorphism Card",
        description: "A beautiful card with frosted glass effect, perfect for modern dark mode interfaces.",
        category: "Cards",
        code: `/* Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  color: white;
}`
    },
    {
        title: "Neon Button",
        description: "High-visibility action button with a glowing neon effect on hover.",
        category: "Buttons",
        code: `export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <button className="group relative px-12 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white transition-all duration-300 hover:scale-105 overflow-visible">
        {/* Neon glow effect */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        
        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2 tracking-wide">
          GET STARTED
          <span className="text-xl">&gt;</span>
        </span>
      </button>
    </div>
  );
}`
    },
    {
        title: "Animated Navbar",
        description: "Responsive navigation bar with smooth scroll animations and mobile menu.",
        category: "Navigation",
        code: `import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, User, Heart, Video, Settings } from "lucide-react";

type NavItem = {
  id: string;
  icon: React.ElementType;
  label: string;
};

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "favorites", icon: Heart, label: "Favorites" },
  { id: "videos", icon: Video, label: "Videos" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function AnimatedNavBar() {
  const [activeItem, setActiveItem] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-violet-100 via-purple-100 to-violet-100 rounded-full shadow-lg px-12 py-5"
    >
      <div className="flex items-center gap-16">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              onClick={() => setActiveItem(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Icon
                  className={\`w-7 h-7 transition-colors duration-300 \${
                    isActive
                      ? "text-violet-600"
                      : isHovered
                      ? "text-violet-500"
                      : "text-violet-400"
                  }\`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.div>

              {/* Active Indicator Dot */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-violet-600 rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}`
    },
    {
        title: "Gradient Text",
        description: "Text component with a customizable linear gradient background.",
        category: "Typography",
        code: `/* Gradient Text */
.text-gradient {
  background: linear-gradient(135deg, #FFFFFF 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  font-size: 3rem;
  line-height: 1.1;
}`
    },
    {
        title: "Modal Dialog",
        description: "Accessible modal dialog with backdrop blur and entrance animation.",
        category: "Overlays",
        code: `/* Modal Dialog */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`
    },
    {
        title: "Input Field",
        description: "Modern input field with floating label and validation states.",
        category: "Forms",
        code: `/* Floating Label Input */
.input-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-field {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

.input-field:focus {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.05);
}

.input-label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: #a1a1aa;
  pointer-events: none;
  transition: all 0.2s;
  background: #050505;
  padding: 0 0.25rem;
}

.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label {
  top: -0.5rem;
  left: 0.75rem;
  font-size: 0.8rem;
  color: #7c3aed;
}`
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        // Clear existing data
        await Component.deleteMany();
        console.log('Cleared existing components');

        // Insert seed data
        await Component.insertMany(components);
        console.log(`Seeded ${components.length} components successfully`);

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();
