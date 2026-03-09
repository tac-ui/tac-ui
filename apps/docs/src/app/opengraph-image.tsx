import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Tac UI — Cross-Platform Design System';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 88,
          height: 88,
          borderRadius: 22,
          background: 'rgba(255,255,255,0.95)',
          marginBottom: 32,
        }}
      >
        <svg width="52" height="52" viewBox="0 0 1024 1024" fill="none">
          <path
            d="M280.243 328.138C228.115 277.568 265.607 192 339.893 192H600.48C707.762 192 787.371 287.047 763.86 387.064L664.003 811.864C661.236 823.635 650.297 832 637.671 832C507.329 832 406.708 722.484 423.586 598.991L434.873 516.411C437.787 495.088 430.26 473.67 414.467 458.349L280.243 328.138Z"
            fill="#0a0a0a"
          />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          display: 'flex',
          fontSize: 56,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}
      >
        Tac UI
      </div>

      {/* Subtitle */}
      <div
        style={{
          display: 'flex',
          fontSize: 22,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '-0.01em',
        }}
      >
        Cross-Platform Design System
      </div>

      {/* Tags */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 36,
        }}
      >
        {['React', 'React Native', 'Tailwind CSS', 'Framer Motion'].map((tag) => (
          <div
            key={tag}
            style={{
              display: 'flex',
              padding: '8px 18px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
              fontSize: 14,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
