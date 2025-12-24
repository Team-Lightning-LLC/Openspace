import React from 'react';
import styles from './styles';

export default function BottomNav({ currentView, onNavigate }) {
  const isActive = (view) => currentView === view;

  return (
    <nav style={styles.bottomNav}>
      <button 
        style={styles.bottomNavItem} 
        onClick={() => onNavigate('home', 'home')}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isActive('home') ? '#6366f1' : '#94a3b8'} 
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span style={{ 
          ...styles.bottomNavLabel, 
          color: isActive('home') ? '#6366f1' : '#94a3b8' 
        }}>
          Home
        </span>
      </button>

      <button 
        style={styles.bottomNavItem} 
        onClick={() => onNavigate('advisor')}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isActive('advisor') ? '#6366f1' : '#94a3b8'} 
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span style={{ 
          ...styles.bottomNavLabel, 
          color: isActive('advisor') ? '#6366f1' : '#94a3b8' 
        }}>
          Advisor
        </span>
      </button>

      <button 
        style={styles.bottomNavItem} 
        onClick={() => onNavigate('messages')}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isActive('messages') ? '#6366f1' : '#94a3b8'} 
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <span style={{ 
          ...styles.bottomNavLabel, 
          color: isActive('messages') ? '#6366f1' : '#94a3b8' 
        }}>
          Messages
        </span>
        {!isActive('messages') && <span style={styles.messageBadge}>1</span>}
      </button>
    </nav>
  );
}
