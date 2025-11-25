import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { Logo } from './Logo';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
    };

    const navLinks = [
        { name: 'Explore', path: '/marketplace' },
        { name: 'How to Use', path: '/how-to-use' },
        { name: 'Components', path: '/marketplace' },
        { name: 'Templates', path: '/' }
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#030303]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30' : 'py-5 bg-[#030303]/70 backdrop-blur-md border-b border-white/5'
                }`}>
                <div className="container flex items-center justify-between">
                    <a href="/" onClick={handleLogoClick} className="relative z-50">
                        <div className="transition-all duration-300 hover:opacity-90 hover:scale-105">
                            <Logo size="small" />
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
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

                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-zinc-400 text-sm flex items-center gap-2">
                                    <User size={16} />
                                    {user.email}
                                </span>
                                <Button
                                    variant="ghost"
                                    className="text-zinc-400 hover:text-white"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </Button>
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
                                <div className="text-center text-zinc-400 mb-2">{user.email}</div>
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

