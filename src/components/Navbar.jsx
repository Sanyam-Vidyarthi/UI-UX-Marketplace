import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { Logo } from './Logo';
import { Menu, X, User, LogOut, LayoutDashboard, CreditCard, ChevronDown, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, signOut } = useAuth();
    const { tokens } = useWallet();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/');
        setMobileMenuOpen(false);
        setDropdownOpen(false);
    };

    const navLinks = [
        { name: 'Explore', path: '/marketplace' },
        { name: 'How to Use', path: '/how-to-use' },
        { name: 'Pricing', path: '/pricing' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#030303]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30' : 'py-5 bg-[#030303]/70 backdrop-blur-md border-b border-white/5'
                }`}>
                <div className="container flex items-center justify-between">
                    <a href="/" onClick={handleLogoClick} className="relative z-50 flex-shrink-0">
                        <div className="transition-all duration-300 hover:opacity-90 hover:scale-105">
                            <Logo size="small" />
                        </div>
                    </a>

                    {/* Desktop Nav - Centered */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`text-sm font-medium transition-all relative group ${location.pathname === item.path ? 'text-white' : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-violet-500 transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full opacity-50'
                                    }`} />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs">
                                        {user.email[0].toUpperCase()}
                                    </div>
                                    <div className="flex flex-col items-start text-xs">
                                        <span className="text-white font-medium max-w-[100px] truncate">{user.email.split('@')[0]}</span>
                                        <span className="text-amber-400 flex items-center gap-1">
                                            <Coins size={10} /> {tokens}
                                        </span>
                                    </div>
                                    <ChevronDown size={14} className={`text-zinc-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                                        >
                                            <div className="p-3 border-b border-white/5">
                                                <p className="text-zinc-400 text-xs mb-1">Signed in as</p>
                                                <p className="text-white text-sm font-medium truncate">{user.email}</p>
                                            </div>
                                            <div className="p-1">
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <LayoutDashboard size={16} /> Dashboard
                                                </Link>
                                                <Link
                                                    to="/pricing"
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <CreditCard size={16} /> Buy Tokens
                                                </Link>
                                            </div>
                                            <div className="p-1 border-t border-white/5">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <LogOut size={16} /> Log Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    className="text-zinc-400 hover:text-white"
                                    onClick={() => navigate('/login')}
                                >
                                    Log In
                                </Button>
                                <Button
                                    variant="primary"
                                    className="py-2 px-5 text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
                                    onClick={() => navigate('/pricing')}
                                >
                                    Get All Access
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 text-zinc-400 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-[#030303] z-40 transition-all duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-4 w-full max-w-xs mt-8">
                        {user ? (
                            <>
                                <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
                                    <Coins size={16} /> {tokens} Tokens
                                </div>
                                <div className="text-center text-zinc-400 mb-4">{user.email}</div>
                                <Button
                                    href="/dashboard"
                                    variant="secondary"
                                    className="w-full justify-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-center text-zinc-400"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-center text-zinc-400"
                                    onClick={() => {
                                        navigate('/login');
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Log In
                                </Button>
                                <Button
                                    variant="primary"
                                    className="w-full justify-center"
                                    onClick={() => {
                                        navigate('/pricing');
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Get All Access
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
