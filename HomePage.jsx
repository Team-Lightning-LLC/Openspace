import React, { useState } from 'react';
import styles from './styles';

export default function HomePage({ onStartOnboarding, isOnboarded, userName }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={styles.container}>
      {/* Background gradient */}
      <div style={styles.backgroundGradient} />
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={styles.logoText}>Haven</span>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.notificationBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={styles.notificationDot} />
          </button>
          <div style={styles.avatar}>
            <span>{userName ? userName[0].toUpperCase() : 'A'}</span>
          </div>
        </div>
      </header>

      {/* Navigation Pills */}
      <nav style={styles.navPills}>
        {['Home', 'Plan', 'Learn', 'Progress'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.navPill,
              ...(activeTab === tab.toLowerCase() ? styles.navPillActive : {})
            }}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab === 'Home' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
            {tab === 'Plan' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
            {tab === 'Learn' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>}
            {tab === 'Progress' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>}
            <span style={{ marginLeft: 6 }}>{tab}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Greeting */}
        {userName && (
          <div style={styles.greeting}>
            <h2 style={styles.greetingText}>Welcome back, {userName}</h2>
          </div>
        )}

        {/* Next Check-in Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.checkInIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <span style={styles.checkInLabel}>Next check-in with</span>
            <button style={styles.moreBtn}>•••</button>
          </div>
          
          <div style={styles.advisorRow}>
            <div style={styles.advisorAvatar}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <div style={styles.advisorName}>Your AI Advisor</div>
              <div style={styles.advisorSubtext}>Quarterly Review</div>
            </div>
          </div>
          
          <div style={styles.dateRow}>
            <span style={styles.dateHighlight}>Mon, Mar 15</span>
            <span style={styles.timeText}>10:00 AM (30m)</span>
          </div>

          <p style={styles.recommendText}>
            We recommend check-ins at least <strong>once a quarter</strong>.
          </p>

          <button style={styles.secondaryBtn}>Reschedule</button>
          <button style={styles.primaryBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Start check-in now
          </button>
        </div>

        {/* Financial Snapshot Card */}
        <div style={styles.snapshotCard}>
          <div style={styles.snapshotHeader}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span style={styles.snapshotTitle}>Your Snapshot</span>
          </div>
          
          <div style={styles.snapshotGrid}>
            <div style={styles.snapshotItem}>
              <span style={styles.snapshotLabel}>Net Worth</span>
              <span style={styles.snapshotValue}>--</span>
            </div>
            <div style={styles.snapshotItem}>
              <span style={styles.snapshotLabel}>Monthly Surplus</span>
              <span style={styles.snapshotValue}>--</span>
            </div>
            <div style={styles.snapshotItem}>
              <span style={styles.snapshotLabel}>Goal Progress</span>
              <span style={styles.snapshotValue}>--</span>
            </div>
            <div style={styles.snapshotItem}>
              <span style={styles.snapshotLabel}>Safety Score</span>
              <span style={styles.snapshotValue}>--</span>
            </div>
          </div>
          
          <p style={styles.snapshotHint}>
            {isOnboarded 
              ? 'Link your accounts to see your numbers' 
              : 'Complete onboarding to see your numbers'}
          </p>
        </div>

        {/* Tasks Section */}
        <div style={styles.tasksSection}>
          <div style={styles.tasksHeader}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <span style={styles.tasksTitle}>Tasks</span>
          </div>

          <div style={styles.tasksList}>
            {/* Profile Task */}
            <button 
              style={styles.taskItem} 
              onClick={!isOnboarded ? onStartOnboarding : undefined}
            >
              <div style={styles.taskCheck}>
                {isOnboarded ? (
                  <div style={styles.taskCheckComplete}>✓</div>
                ) : (
                  <div style={styles.taskCheckEmpty} />
                )}
              </div>
              <div style={styles.taskInfo}>
                <span style={{
                  ...styles.taskName,
                  ...(isOnboarded ? styles.taskNameComplete : {})
                }}>Complete your profile</span>
                {isOnboarded ? (
                  <span style={styles.taskComplete}>Done</span>
                ) : (
                  <span style={styles.taskUrgent}>⚡ Get started</span>
                )}
              </div>
              {!isOnboarded && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              )}
            </button>

            {/* Link Bank Task */}
            <div style={styles.taskItem}>
              <div style={styles.taskCheck}>
                <div style={styles.taskCheckEmpty} />
              </div>
              <div style={styles.taskInfo}>
                <span style={styles.taskName}>Link your bank account</span>
                <span style={styles.taskPending}>
                  {isOnboarded ? 'Ready to connect' : 'Waiting on profile'}
                </span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isOnboarded ? "#94a3b8" : "#cbd5e1"} strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>

            {/* Set Goal Task */}
            <div style={styles.taskItem}>
              <div style={styles.taskCheck}>
                <div style={styles.taskCheckEmpty} />
              </div>
              <div style={styles.taskInfo}>
                <span style={styles.taskName}>Set your first goal</span>
                <span style={styles.taskPending}>
                  {isOnboarded ? 'Ready to set' : 'Waiting on profile'}
                </span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isOnboarded ? "#94a3b8" : "#cbd5e1"} strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav style={styles.bottomNav}>
        <button style={styles.bottomNavItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span style={{ ...styles.bottomNavLabel, color: '#6366f1' }}>Home</span>
        </button>
        <button style={styles.bottomNavItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span style={styles.bottomNavLabel}>Advisor</span>
        </button>
        <button style={styles.bottomNavItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span style={styles.bottomNavLabel}>Messages</span>
          <span style={styles.messageBadge}>1</span>
        </button>
      </nav>

      {/* Floating Help Button */}
      <button style={styles.floatingHelp}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </button>
    </div>
  );
}
