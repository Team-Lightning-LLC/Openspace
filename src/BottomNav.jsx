import React from 'react';
import { styles, colors, KUMO_URL } from './styles';

export default function BottomNav({ activeTab, onNavigate, onOpenChat, messageCount = 0 }) {
  return (
    <nav style={styles.bottomNav}>
      {/* Home */}
      <button 
        style={styles.bottomNavItem}
        onClick={() => onNavigate('home', 'home')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'home' ? colors.indigo : colors.textMuted} strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span style={{
          ...styles.bottomNavLabel,
          ...(activeTab === 'home' ? styles.bottomNavLabelActive : {})
        }}>
          Home
        </span>
      </button>

      {/* Advisor */}
      <button 
        style={styles.bottomNavItem}
        onClick={onOpenChat}
      >
        <div style={{ 
          width: 24, 
          height: 24, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <img 
            src={KUMO_URL} 
            alt="" 
            style={{ 
              width: 22, 
              height: 22, 
              objectFit: 'contain',
              opacity: activeTab === 'advisor' ? 1 : 0.5
            }} 
          />
        </div>
        <span style={{
          ...styles.bottomNavLabel,
          ...(activeTab === 'advisor' ? styles.bottomNavLabelActive : {})
        }}>
          Advisor
        </span>
      </button>

      {/* Messages */}
      <button 
        style={styles.bottomNavItem}
        onClick={() => onNavigate('messages', 'messages')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'messages' ? colors.indigo : colors.textMuted} strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <span style={{
          ...styles.bottomNavLabel,
          ...(activeTab === 'messages' ? styles.bottomNavLabelActive : {})
        }}>
          Messages
        </span>
        {messageCount > 0 && (
          <span style={styles.bottomNavBadge}>{messageCount}</span>
        )}
      </button>
    </nav>
  );
}
