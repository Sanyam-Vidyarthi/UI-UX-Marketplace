import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Sparkles } from 'lucide-react';

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
                        padding: '0.5rem 0.75rem',
                        borderRadius: '14px',
                        transition: 'all 0.3s ease'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 4px 12px var(--accent-glow)'
                        }} className="group-hover:scale-105 transition-transform duration-300">
                            <Sparkles size={18} fill="white" />
                        </div>
                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            letterSpacing: '-0.02em',
                            color: 'white'
                        }}>
                            UX<span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>Market</span>
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
