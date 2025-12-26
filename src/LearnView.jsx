import React from 'react';
import { styles, colors, KUMO_URL } from './styles';
import NavPills from './NavPills';
import BottomNav from './BottomNav';

export default function LearnView({ userProfile, onNavigate, activeTab, setActiveTab }) {
  const articles = [
    { id: 1, title: 'Emergency Funds 101', time: '5 min', icon: '🛡️' },
    { id: 2, title: 'Understanding Credit Scores', time: '7 min', icon: '📊' },
    { id: 3, title: 'Debt Payoff Strategies', time: '6 min', icon: '💳' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGradient} />
      
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <img src={KUMO_URL} alt="" style={styles.logoImage} />
          </div>
          <span style={styles.logoText}>OpenSpace</span>
        </div>
        <div style={styles.avatar}>
          {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'O'}
        </div>
      </header>
      
      <NavPills activeTab={activeTab} setActiveTab={setActiveTab} onNavigate={onNavigate} />
      
      <main style={styles.main}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: colors.text, marginBottom: 20 }}>
          Learn
        </h2>
        
        <div style={styles.card}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: 16 }}>
            Recommended for You
          </h3>
          
          {articles.map((article, i) => (
            <button 
              key={article.id}
              style={{
                ...styles.taskItem,
                ...(i === articles.length - 1 ? styles.taskItemLast : {})
              }}
            >
              <span style={{ fontSize: 24 }}>{article.icon}</span>
              <div style={styles.taskInfo}>
                <span style={styles.taskName}>{article.title}</span>
                <span style={{ ...styles.taskStatus, color: colors.textMuted }}>{article.time} read</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ))}
        </div>
      </main>
      
      <BottomNav 
        activeTab={activeTab} 
        onNavigate={onNavigate}
        onOpenChat={() => onNavigate('advisor')}
      />
    </div>
  );
}
