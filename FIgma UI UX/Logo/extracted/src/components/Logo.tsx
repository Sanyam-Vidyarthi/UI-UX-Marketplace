interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  iconOnly?: boolean;
}

export function Logo({ size = 'medium', iconOnly = false }: LogoProps) {
  const dimensions = {
    small: { icon: 32, text: 120, spacing: 12 },
    medium: { icon: 48, text: 180, spacing: 16 },
    large: { icon: 64, text: 240, spacing: 20 },
  };

  const config = dimensions[size];
  const iconSize = config.icon;

  return (
    <div className="flex items-center" style={{ gap: `${config.spacing}px` }}>
      {/* Icon: Abstract Nebula Orbit */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cosmic gradient for the icon */}
          <linearGradient id="nebula-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4c3f91" />
            <stop offset="50%" stopColor="#6b4fc4" />
            <stop offset="100%" stopColor="#3b8cc4" />
          </linearGradient>
          
          {/* Subtle glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main orbital ring - partial ellipse suggesting motion and nebula */}
        <path
          d="M 32 8 C 45 8 56 18 56 32 C 56 46 45 56 32 56"
          stroke="url(#nebula-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
          filter="url(#glow)"
        />
        
        {/* Inner curve - suggests "N" and adds depth */}
        <path
          d="M 20 24 Q 32 28 32 40"
          stroke="url(#nebula-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
          filter="url(#glow)"
        />
        
        {/* Orbital point - nebula core */}
        <circle
          cx="32"
          cy="8"
          r="3"
          fill="url(#nebula-gradient)"
          filter="url(#glow)"
          opacity="0.95"
        />
        
        {/* Secondary orbital point */}
        <circle
          cx="32"
          cy="56"
          r="2"
          fill="url(#nebula-gradient)"
          opacity="0.7"
        />
      </svg>

      {/* Wordmark */}
      {!iconOnly && (
        <div className="flex items-baseline" style={{ gap: `${config.spacing * 0.75}px` }}>
          <span
            className="text-[#e8eaf0] tracking-[0.15em] select-none"
            style={{
              fontSize: size === 'large' ? '32px' : size === 'medium' ? '24px' : '18px',
              fontFamily: '"Inter", "SF Pro Display", -apple-system, system-ui, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.08em',
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
            }}
          >
            UI
          </span>
        </div>
      )}
    </div>
  );
}
