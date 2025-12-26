// ============================================
// PLAN VIEW
// ============================================
import React from 'react';
import { styles, colors, KUMO_URL } from './styles';
import NavPills from './NavPills';
import BottomNav from './BottomNav';

export default function PlanView({ userProfile, onNavigate, activeTab, setActiveTab }) {
  return (
    <div style={styles.container}>
      <div style={styles.backgroundGradient} />
      <Header onNavigate={onNavigate} userName={userProfile?.name} />
      <NavPills activeTab={activeTab} setActiveTab={setActiveTab} onNavigate={onNavigate} />
      
      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
            Your Financial Plan
          </h2>
          <p style={{ fontSize: 15, color: colors.textSecondary, marginBottom: 20 }}>
            Your personalized roadmap based on your goals.
          </p>
          
          <div style={{ 
            padding: 24, 
            background: colors.bgLight, 
            borderRadius: 16, 
            textAlign: 'center' 
          }}>
            <p style={{ color: colors.textMuted }}>
              Complete onboarding to unlock your plan
            </p>
          </div>
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

function Header({ onNavigate, userName }) {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <div style={styles.logoIcon}>
          <img src={KUMO_URL} alt="" style={styles.logoImage} />
        </div>
        <span style={styles.logoText}>OpenSpace</span>
      </div>
      <div style={styles.avatar}>
        {userName ? userName.charAt(0).toUpperCase() : 'O'}
      </div>
    </header>
  );
}
