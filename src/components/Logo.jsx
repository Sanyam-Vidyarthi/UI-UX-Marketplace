import { useState } from 'react';

export function Logo({ size = 'medium', iconOnly = false }) {
  const [isHovered, setIsHovered] = useState(false);

  const dimensions = {
    small: { icon: 32, text: 120, spacing: 12 },
    medium: { icon: 48, text: 180, spacing: 16 },
    large: { icon: 64, text: 240, spacing: 20 },
  };

  const config = dimensions[size];
  const iconSize = config.icon;

  return (
    <div
      className="flex items-center logo-container"
      style={{ gap: `${config.spacing}px`, cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon: Abstract Nebula Orbit */}
      <div
        style={{
          display: 'inline-block',
          position: 'relative'
        }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'center',
            willChange: 'transform, filter'
          }}
          className={`logo-icon ${isHovered ? 'logo-hover' : ''}`}
        >
          <defs>
            {/* Cosmic gradient for the icon */}
            <linearGradient id="nebula-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4c3f91" />
              <stop offset="50%" stopColor="#6b4fc4" />
              <stop offset="100%" stopColor="#3b8cc4" />
            </linearGradient>

            {/* Enhanced gradient for hover */}
            <linearGradient id="nebula-gradient-hover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5d4fa8" />
              <stop offset="50%" stopColor="#8360e8" />
              <stop offset="100%" stopColor="#4da4e8" />
            </linearGradient>

            {/* Subtle glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Enhanced glow for hover */}
            <filter id="glow-enhanced">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main orbital ring - partial ellipse suggesting motion and nebula */}
          <path
            d="M 32 8 C 45 8 56 18 56 32 C 56 46 45 56 32 56"
            stroke={isHovered ? "url(#nebula-gradient-hover)" : "url(#nebula-gradient)"}
            strokeWidth={isHovered ? "3" : "2.5"}
            strokeLinecap="round"
            fill="none"
            opacity={isHovered ? "1" : "0.9"}
            filter={isHovered ? "url(#glow-enhanced)" : "url(#glow)"}
            className="orbital-path"
            style={{
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />

          {/* Inner curve - suggests "N" and adds depth */}
          <path
            d="M 20 24 Q 32 28 32 40"
            stroke={isHovered ? "url(#nebula-gradient-hover)" : "url(#nebula-gradient)"}
            strokeWidth={isHovered ? "3" : "2.5"}
            strokeLinecap="round"
            fill="none"
            opacity={isHovered ? "0.8" : "0.6"}
            filter={isHovered ? "url(#glow-enhanced)" : "url(#glow)"}
            style={{
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />

          {/* Orbital point - nebula core */}
          <circle
            cx="32"
            cy="8"
            r={isHovered ? "3.5" : "3"}
            fill={isHovered ? "url(#nebula-gradient-hover)" : "url(#nebula-gradient)"}
            filter={isHovered ? "url(#glow-enhanced)" : "url(#glow)"}
            opacity="0.95"
            className="orbital-point"
            style={{
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />

          {/* Secondary orbital point */}
          <circle
            cx="32"
            cy="56"
            r={isHovered ? "2.5" : "2"}
            fill={isHovered ? "url(#nebula-gradient-hover)" : "url(#nebula-gradient)"}
            opacity={isHovered ? "0.9" : "0.7"}
            filter={isHovered ? "url(#glow)" : "none"}
            style={{
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />
        </svg>
      </div>

      {/* Wordmark */}
      {!iconOnly && (
        <div
          className={`flex items-baseline logo-text ${isHovered ? 'logo-text-hover' : ''}`}
          style={{ gap: `${config.spacing * 0.75}px` }}
        >
          <span
            className="text-[#e8eaf0] tracking-[0.15em] select-none"
            style={{
              fontSize: size === 'large' ? '32px' : size === 'medium' ? '24px' : '18px',
              fontFamily: '"Inter", "SF Pro Display", -apple-system, system-ui, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.08em',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              textShadow: isHovered ? '0 0 20px rgba(107, 79, 196, 0.4)' : 'none'
            }}
          >
            NEBULYN
          </span>
          <span
            className="text-gray-500 tracking-[0.15em] select-none"
            style={{
              fontSize: size === 'large' ? '32px' : size === 'medium' ? '24px' : '18px',
              fontFamily: '"Inter", "SF Pro Display", -apple-system, system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.08em',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: isHovered ? '#8360e8' : undefined,
              textShadow: isHovered ? '0 0 15px rgba(131, 96, 232, 0.3)' : 'none'
            }}
          >
            UI
          </span>
        </div>
      )}

      <style>{`
        /* Premium Hover Animation */
        .logo-icon.logo-hover {
          transform: rotate(8deg) scale(1.08);
          filter: drop-shadow(0 0 15px rgba(107, 79, 196, 0.7)) drop-shadow(0 0 25px rgba(107, 79, 196, 0.3));
        }
        
        /* Text hover animation */
        .logo-text-hover {
          animation: text-float 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes text-float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        /* Container hover effect */
        .logo-container {
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .logo-container:hover {
          transform: translateY(-2px);
        }
        
        .logo-container:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
