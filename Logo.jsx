import React from 'react';

// Kumo cloud image URL
const KUMO_URL = 'https://i.imgur.com/oWuVYXz.png';

/**
 * OpenSpace Logo Component
 * 
 * @param {string} variant - 'full' (with text), 'icon' (cloud only), 'text' (text only)
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {boolean} dark - Use white text for dark backgrounds
 */
export function Logo({ variant = 'full', size = 'md', dark = false }) {
  const sizes = {
    sm: { icon: 28, text: 18, gap: 8 },
    md: { icon: 36, text: 22, gap: 10 },
    lg: { icon: 48, text: 28, gap: 12 },
  };
  
  const s = sizes[size];
  const textColor = dark ? '#ffffff' : '#1e293b';
  
  if (variant === 'icon') {
    return (
      <img 
        src={KUMO_URL} 
        alt="OpenSpace" 
        style={{ 
          width: s.icon, 
          height: 'auto',
          objectFit: 'contain'
        }} 
      />
    );
  }
  
  if (variant === 'text') {
    return (
      <span style={{
        fontSize: s.text,
        fontWeight: 700,
        color: textColor,
        letterSpacing: '-0.5px',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        OpenSpace
      </span>
    );
  }
  
  // Full logo (icon + text)
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: s.gap,
    }}>
      <img 
        src={KUMO_URL} 
        alt="" 
        style={{ 
          width: s.icon, 
          height: 'auto',
          objectFit: 'contain'
        }} 
      />
      <span style={{
        fontSize: s.text,
        fontWeight: 700,
        color: textColor,
        letterSpacing: '-0.5px',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        OpenSpace
      </span>
    </div>
  );
}

/**
 * App Icon Component (for displaying in UI, not actual app icon)
 * Shows the kumo cloud on the gradient background
 */
export function AppIcon({ size = 80 }) {
  const borderRadius = size * 0.22;
  
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: borderRadius,
      background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
      padding: size * 0.15,
    }}>
      <img 
        src={KUMO_URL} 
        alt="OpenSpace" 
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'brightness(0) invert(1)', // Makes it white
        }} 
      />
    </div>
  );
}

/**
 * Header Logo - Used in the app header
 */
export function HeaderLogo({ onPress }) {
  return (
    <button 
      onClick={onPress}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
      }}>
        <img 
          src={KUMO_URL} 
          alt="" 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
          }} 
        />
      </div>
      <span style={{
        fontSize: 22,
        fontWeight: 700,
        color: '#1e293b',
        letterSpacing: '-0.5px',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        OpenSpace
      </span>
    </button>
  );
}

export default Logo;
