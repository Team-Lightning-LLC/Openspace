import React from 'react';
import { styles, colors } from './styles';

export default function NavPills({ activeTab, setActiveTab, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'plan', label: 'Plan', icon: PlanIcon },
    { id: 'learn', label: 'Learn', icon: LearnIcon },
    { id: 'progress', label: 'Progress', icon: ProgressIcon },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onNavigate(tabId, tabId);
  };

  return (
    <nav style={styles.navPills}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              ...styles.navPill,
              ...(isActive ? styles.navPillActive : {}),
            }}
          >
            <Icon color={isActive ? colors.text : colors.textSecondary} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

function HomeIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function PlanIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}

function LearnIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

function ProgressIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  );
}
