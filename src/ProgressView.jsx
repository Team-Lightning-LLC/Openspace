import React from 'react';
import { styles, colors, gradients, KUMO_URL } from './styles';
import NavPills from './NavPills';
import BottomNav from './BottomNav';

export default function ProgressView({ userProfile, linkedAccounts, onNavigate, activeTab, setActiveTab }) {
  const hasData = linkedAccounts && linkedAccounts.length > 0;

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
          Your Progress
        </h2>
        
        {/* Safety Score */}
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>Safety Score</h3>
            <span style={{ 
              fontSize: 28, 
              fontWeight: 700, 
              color: hasData ? colors.indigo : colors.border 
            }}>
              {hasData ? '72' : '—'}
            </span>
          </div>
          
          {hasData ? (
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: '72%' }} />
            </div>
          ) : (
            <p style={{ fontSize: 14, color: colors.textMuted, textAlign: 'center' }}>
              Link accounts to see your score
            </p>
          )}
        </div>

        {/* Goals Progress */}
        <div style={styles.card}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: 16 }}>
            Goals
          </h3>
          
          {userProfile?.goals?.length > 0 ? (
            userProfile.goals.map((goal, i) => (
              <div key={goal} style={{ marginBottom: i < userProfile.goals.length - 1 ? 16 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: colors.text }}>{formatGoalName(goal)}</span>
                  <span style={{ fontSize: 14, color: colors.textMuted }}>{hasData ? '34%' : '0%'}</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: hasData ? '34%' : '0%' }} />
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: 14, color: colors.textMuted, textAlign: 'center' }}>
              Set goals in onboarding to track progress
            </p>
          )}
        </div>

        {/* Net Worth */}
        <div style={styles.card}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
            Net Worth
          </h3>
          <span style={{ 
            fontSize: 32, 
            fontWeight: 700, 
            color: hasData ? colors.text : colors.border 
          }}>
            {hasData ? '$12,450' : '—'}
          </span>
          {!hasData && (
            <p style={{ fontSize: 14, color: colors.textMuted, marginTop: 8 }}>
              Link accounts to see your net worth
            </p>
          )}
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

function formatGoalName(goal) {
  const names = {
    emergency: 'Emergency Fund',
    debt: 'Pay Off Debt',
    invest: 'Start Investing',
    retire: 'Retirement',
    home: 'Save for Home',
    breathing: 'Breathing Room',
  };
  return names[goal] || goal;
}
