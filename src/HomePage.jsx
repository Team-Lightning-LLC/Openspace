import React from 'react';
import { styles, colors, KUMO_URL } from './styles';
import NavPills from './NavPills';
import BottomNav from './BottomNav';

export default function HomePage({
  userName,
  isOnboarded,
  linkedAccounts = [],
  onStartOnboarding,
  onOpenChat,
  onLinkAccounts,
  onNavigate,
  activeTab,
  setActiveTab,
}) {
  const hasLinkedAccounts = linkedAccounts.length > 0;

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGradient} />
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <img src={KUMO_URL} alt="" style={styles.logoImage} />
          </div>
          <span style={styles.logoText}>OpenSpace</span>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.notificationBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={styles.notificationDot} />
          </button>
          <div style={styles.avatar}>
            {userName ? userName.charAt(0).toUpperCase() : 'O'}
          </div>
        </div>
      </header>

      {/* Nav Pills */}
      <NavPills activeTab={activeTab} setActiveTab={setActiveTab} onNavigate={onNavigate} />

      {/* Main Content */}
      <main style={styles.main}>
        {/* Greeting */}
        {userName && (
          <div style={styles.greeting}>
            <h2 style={styles.greetingText}>Welcome back, {userName}</h2>
          </div>
        )}

        {/* Advisor Check-in Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardHeaderLeft}>
              <div style={{ ...styles.cardIcon, ...styles.cardIconSuccess }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span style={styles.cardTitle}>Next check-in with</span>
            </div>
            <button style={styles.cardMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="19" cy="12" r="1"/>
                <circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
          </div>

          <div style={styles.advisorRow}>
            <div style={styles.advisorAvatar}>
              <img src={KUMO_URL} alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            </div>
            <div style={styles.advisorInfo}>
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

          <button style={styles.buttonSecondary}>Reschedule</button>
          <button style={styles.buttonPrimary} onClick={onOpenChat}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Talk to advisor now
          </button>
        </div>

        {/* Snapshot Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardHeaderLeft}>
              <div style={{ ...styles.cardIcon, ...styles.cardIconPrimary }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.indigo} strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              <span style={{ ...styles.cardTitle, fontWeight: 600, color: colors.text }}>Your Snapshot</span>
            </div>
          </div>

          <div style={styles.snapshotGrid}>
            <div style={styles.snapshotItem}>
              <span style={styles.snapshotLabel}>Net Worth</span>
              <span style={hasLinkedAccounts ? styles.snapshotValue : styles.snapshotValueEmpty}>
                {hasLinkedAccounts ? '$12,450' : '—'}
              </span>
            </div>
            <div style={styles.snapshotItem}>
              <span style={styles.snapshotLabel}>Monthly Surplus</span>
              <span style={hasLinkedAccounts ? styles.snapshotValue : styles.snapshotValueEmpty}>
                {hasLinkedAccounts ? '$420' : '—'}
              </span>
            </div>
            <div style={styles.snapshotItem}>
              <span style={styles.snapshotLabel}>Goal Progress</span>
              <span style={hasLinkedAccounts ? styles.snapshotValue : styles.snapshotValueEmpty}>
                {hasLinkedAccounts ? '34%' : '—'}
              </span>
            </div>
            <div style={styles.snapshotItem}>
              <span style={styles.snapshotLabel}>Safety Score</span>
              <span style={hasLinkedAccounts ? styles.snapshotValue : styles.snapshotValueEmpty}>
                {hasLinkedAccounts ? '72' : '—'}
              </span>
            </div>
            {!hasLinkedAccounts && (
              <p style={styles.snapshotHint}>
                {isOnboarded ? 'Link accounts to see your numbers' : 'Complete onboarding to get started'}
              </p>
            )}
          </div>
        </div>

        {/* Tasks Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardHeaderLeft}>
              <div style={{ ...styles.cardIcon, ...styles.cardIconPrimary }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.indigo} strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <span style={{ ...styles.cardTitle, fontWeight: 600, color: colors.text }}>Getting Started</span>
            </div>
          </div>

          {/* Task 1: Complete Profile */}
          <button 
            style={styles.taskItem}
            onClick={!isOnboarded ? onStartOnboarding : undefined}
          >
            <div style={{
              ...styles.taskCheck,
              ...(isOnboarded ? styles.taskCheckComplete : {})
            }}>
              {isOnboarded && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
            <div style={styles.taskInfo}>
              <span style={{
                ...styles.taskName,
                ...(isOnboarded ? styles.taskNameComplete : {})
              }}>
                Complete your profile
              </span>
              <span style={{
                ...styles.taskStatus,
                ...(isOnboarded ? styles.taskStatusComplete : styles.taskStatusUrgent)
              }}>
                {isOnboarded ? 'Done' : '⚡ Get started'}
              </span>
            </div>
            {!isOnboarded && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            )}
          </button>

          {/* Task 2: Link Accounts */}
          <button 
            style={styles.taskItem}
            onClick={isOnboarded && !hasLinkedAccounts ? onLinkAccounts : undefined}
          >
            <div style={{
              ...styles.taskCheck,
              ...(hasLinkedAccounts ? styles.taskCheckComplete : {})
            }}>
              {hasLinkedAccounts && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
            <div style={styles.taskInfo}>
              <span style={{
                ...styles.taskName,
                ...(hasLinkedAccounts ? styles.taskNameComplete : {})
              }}>
                Link your accounts
              </span>
              <span style={{
                ...styles.taskStatus,
                ...(hasLinkedAccounts 
                  ? styles.taskStatusComplete 
                  : isOnboarded 
                    ? styles.taskStatusUrgent 
                    : styles.taskStatusPending)
              }}>
                {hasLinkedAccounts ? 'Done' : isOnboarded ? '⚡ Ready' : 'After profile'}
              </span>
            </div>
            {isOnboarded && !hasLinkedAccounts && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            )}
          </button>

          {/* Task 3: Set Goals */}
          <button style={{ ...styles.taskItem, ...styles.taskItemLast }}>
            <div style={styles.taskCheck} />
            <div style={styles.taskInfo}>
              <span style={styles.taskName}>Set your first goal</span>
              <span style={{ ...styles.taskStatus, ...styles.taskStatusPending }}>
                After accounts linked
              </span>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Nav */}
      <BottomNav 
        activeTab={activeTab} 
        onNavigate={onNavigate} 
        onOpenChat={onOpenChat}
        messageCount={1}
      />
    </div>
  );
}
