import React, { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--accent-primary)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 1000,
            animation: 'float 0.5s ease-out',
            backdropFilter: 'blur(12px)'
        }}>
            <div style={{
                width: '20px',
                height: '20px',
                background: 'var(--accent-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
            }}>✓</div>
            {message}
        </div>
    );
};

export default Toast;
