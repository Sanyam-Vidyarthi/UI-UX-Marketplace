import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Component from '../models/Component.js';

dotenv.config();

const components = [
  {
    title: "Glassmorphism Card",
    description: "A beautiful card with frosted glass effect, perfect for modern dark mode interfaces.",
    category: "Cards",
    tokenPrice: 15,
    isPremium: true,
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
    tokenPrice: 10,
    isPremium: true,
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
    tokenPrice: 25,
    isPremium: true,
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
    tokenPrice: 5,
    isPremium: true,
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
    tokenPrice: 15,
    isPremium: true,
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
    tokenPrice: 8,
    isPremium: true,
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
  },
  {
    title: "Success Alert",
    description: "A subtle but clear success notification with icon and dismiss button.",
    category: "Feedback",
    tokenPrice: 5,
    isPremium: true,
    code: `/* Success Alert */
.alert-success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #34d399;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.alert-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}`
  },
  {
    title: "Error Toast",
    description: "Animated toast notification for error states, slides in from corner.",
    category: "Feedback",
    tokenPrice: 5,
    isPremium: true,
    code: `/* Error Toast */
.toast-error {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #18181b;
  border-left: 4px solid #ef4444;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2000;
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}`
  },
  {
    title: "Sidebar Navigation",
    description: "Collapsible sidebar with nested menu items and smooth transitions.",
    category: "Navigation",
    tokenPrice: 20,
    isPremium: true,
    code: `/* Sidebar Navigation */
.sidebar {
  width: 280px;
  height: 100vh;
  background: #0a0a0a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  padding: 0.75rem 1rem;
  color: #a1a1aa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.sidebar-item:hover, .sidebar-item.active {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.sidebar-item.active {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
}`
  },
  {
    title: "Pricing Table",
    description: "Comparison table for pricing plans with highlighted 'Popular' option.",
    category: "Data Display",
    tokenPrice: 20,
    isPremium: true,
    code: `/* Pricing Card */
.pricing-card {
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  transition: transform 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-5px);
  border-color: rgba(124, 58, 237, 0.5);
}

.pricing-card.popular {
  background: linear-gradient(145deg, #18181b 0%, #1e1e24 100%);
  border: 1px solid #7c3aed;
  box-shadow: 0 0 30px rgba(124, 58, 237, 0.15);
}

.price {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin: 1.5rem 0;
}

.price span {
  font-size: 1rem;
  color: #a1a1aa;
  font-weight: 400;
}`
  },
  {
    title: "User Avatar Group",
    description: "Stacked user avatars with tooltip on hover, great for team sections.",
    category: "Data Display",
    tokenPrice: 8,
    isPremium: true,
    code: `/* Avatar Group */
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #050505;
  margin-left: -12px;
  background: #27272a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  transition: transform 0.2s;
  cursor: default;
}

.avatar:first-child {
  margin-left: 0;
}

.avatar:hover {
  transform: translateY(-4px);
  z-index: 10;
}`
  },
  {
    title: "Progress Bar",
    description: "Animated progress bar with gradient fill and percentage label.",
    category: "Feedback",
    tokenPrice: 5,
    isPremium: true,
    code: `/* Gradient Progress Bar */
.progress-container {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 100px;
  height: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #db2777);
  border-radius: 100px;
  width: 0%; /* Set via inline style */
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
}`
  },
  {
    title: "Toggle Switch",
    description: "iOS-style toggle switch with smooth sliding animation.",
    category: "Forms",
    tokenPrice: 5,
    isPremium: true,
    code: `/* Toggle Switch */
.toggle-switch {
  position: relative;
  width: 52px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.3s;
}

.toggle-switch.active {
  background: #7c3aed;
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .toggle-thumb {
  transform: translateX(20px);
}`
  },
  {
    title: "Badge Pill",
    description: "Rounded badge for status indicators, available in multiple colors.",
    category: "Data Display",
    tokenPrice: 3,
    isPremium: true,
    code: `/* Status Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.025em;
}

.badge-primary {
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
  border: 1px solid rgba(124, 58, 237, 0.2);
}

.badge-success {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}`
  },
  {
    title: "Breadcrumbs",
    description: "Clean breadcrumb navigation for hierarchical content structures.",
    category: "Navigation",
    tokenPrice: 5,
    isPremium: true,
    code: `/* Breadcrumbs */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a1a1aa;
  font-size: 0.9rem;
}

.breadcrumb-item {
  color: #a1a1aa;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-item:hover {
  color: white;
}

.breadcrumb-separator {
  color: #52525b;
  font-size: 0.8rem;
}

.breadcrumb-item.active {
  color: white;
  font-weight: 500;
}`
  },
  {
    title: "Accordion",
    description: "Expandable content sections with smooth height animation.",
    category: "Data Display",
    tokenPrice: 10,
    isPremium: true,
    code: `/* Accordion */
.accordion-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.accordion-header {
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  text-align: left;
}

.accordion-icon {
  transition: transform 0.3s ease;
}

.accordion-item.open .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  color: #a1a1aa;
  line-height: 1.6;
}

.accordion-item.open .accordion-content {
  max-height: 200px; /* Adjust based on content */
  padding-bottom: 1.5rem;
}`
  },
  {
    title: "Skeleton Loader",
    description: "Shimmering placeholder for loading states to improve perceived performance.",
    category: "Feedback",
    tokenPrice: 8,
    isPremium: true,
    code: `/* Skeleton Loader */
.skeleton {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}`
  },
  {
    title: "File Upload",
    description: "Drag and drop file upload zone with preview and progress.",
    category: "Forms",
    tokenPrice: 12,
    isPremium: true,
    code: `/* File Upload Zone */
.upload-zone {
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.01);
}

.upload-zone:hover, .upload-zone.drag-active {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.05);
}

.upload-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #a1a1aa;
}

.upload-text {
  color: #e4e4e7;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.upload-subtext {
  color: #71717a;
  font-size: 0.9rem;
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
