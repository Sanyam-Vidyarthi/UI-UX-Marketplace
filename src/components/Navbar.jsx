import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    return (
        <nav style={{
            padding: '1.25rem 0',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(3, 3, 3, 0.7)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" className="group" style={{ textDecoration: 'none' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.375rem 0',
                        transition: 'all 0.3s ease'
                    }}>
                        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:scale-105">
                            {/* Animated Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 opacity-100 animate-gradient-xy" />

                            {/* Glass Overlay */}
                            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

                            {/* Inner Border */}
                            <div className="absolute inset-0 border border-white/20 rounded-xl" />

                            {/* Stylized N Logo */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-white drop-shadow-md">
                                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
                                <path d="M15 19V5L9 19V5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 10px rgba(255,255,255,0.1)'
                        }}>
                            Nebulyn <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800' }}>UI</span>
                        </span>
                    </div>
                </Link>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    {['Explore', 'How to Use', 'Components', 'Templates'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'How to Use' ? '/how-to-use' : '/'}
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                            className="hover:text-white group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full opacity-50" />
                        </Link>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="ghost" style={{ color: 'var(--text-secondary)' }}>Log In</Button>
                    <Button variant="primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem' }}>Get All Access</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
