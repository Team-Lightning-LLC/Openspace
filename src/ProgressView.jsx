import React from 'react';
import styles from './styles';
import BottomNav from './BottomNav';
import NavPills from './NavPills';

export default function ProgressView({ userName, userProfile, linkedAccounts, onNavigate, activeTab, setActiveTab }) {
  const hasAccounts = linkedAccounts && linkedAccounts.length > 0;

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGradient} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <span style={styles.logoText}>OpenSpace</span>
        </div>
        <div style={styles.avatar}>
          <span>{userName ? userName[0].toUpperCase() : 'O'}</span>
        </div>
      </header>

      <NavPills activeTab={activeTab} setActiveTab={setActiveTab} onNavigate={onNavigate} />

      <main style={styles.main}>
        <h1 style={styles.pageTitle}>Your Progress</h1>
        <p style={styles.pageSubtitle}>See how far you've come</p>

        {hasAccounts ? (
          <>
            {/* Net Worth Trend */}
            <div style={styles.progressCard}>
              <div style={styles.progressCardHeader}>
                <span style={styles.progressCardTitle}>Net Worth</span>
                <span style={styles.progressTrend}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                  +$1,230 this month
                </span>
              </div>
              <div style={styles.netWorthValue}>$24,350</div>
              
              {/* Simple Chart Placeholder */}
              <div style={styles.chartPlaceholder}>
                <div style={styles.chartBar} />
                <div style={{...styles.chartBar, height: '55%'}} />
                <div style={{...styles.chartBar, height: '60%'}} />
                <div style={{...styles.chartBar, height: '52%'}} />
                <div style={{...styles.chartBar, height: '68%'}} />
                <div style={{...styles.chartBar, height: '75%'}} />
              </div>
              <div style={styles.chartLabels}>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div style={styles.metricsGrid}>
              <div style={styles.metricCard}>
                <span style={styles.metricLabel}>Debt Paid Off</span>
                <span style={styles.metricValue}>$1,955</span>
                <span style={styles.metricSub}>since starting</span>
              </div>
              <div style={styles.metricCard}>
                <span style={styles.metricLabel}>Saved</span>
                <span style={styles.metricValue}>$2,350</span>
                <span style={styles.metricSub}>since starting</span>
              </div>
              <div style={styles.metricCard}>
                <span style={styles.metricLabel}>Streak</span>
                <span style={styles.metricValue}>12 weeks</span>
                <span style={styles.metricSub}>on track</span>
              </div>
              <div style={styles.metricCard}>
                <span style={styles.metricLabel}>Safety Score</span>
                <span style={{...styles.metricValue, color: '#f59e0b'}}>B+</span>
                <span style={styles.metricSub}>improving</span>
              </div>
            </div>

            {/* Milestones */}
            <div style={styles.milestonesCard}>
              <h2 style={styles.sectionTitle}>Milestones</h2>
              
              <div style={styles.milestonesList}>
                <div style={styles.milestoneItem}>
                  <div style={styles.milestoneIconComplete}>✓</div>
                  <div style={styles.milestoneInfo}>
                    <span style={styles.milestoneName}>Completed profile</span>
                    <span style={styles.milestoneDate}>Jan 15, 2025</span>
                  </div>
                </div>
                <div style={styles.milestoneItem}>
                  <div style={styles.milestoneIconComplete}>✓</div>
                  <div style={styles.milestoneInfo}>
                    <span style={styles.milestoneName}>Connected first account</span>
                    <span style={styles.milestoneDate}>Jan 15, 2025</span>
                  </div>
                </div>
                <div style={styles.milestoneItem}>
                  <div style={styles.milestoneIconComplete}>✓</div>
                  <div style={styles.milestoneInfo}>
                    <span style={styles.milestoneName}>First $500 emergency buffer</span>
                    <span style={styles.milestoneDate}>Feb 28, 2025</span>
                  </div>
                </div>
                <div style={styles.milestoneItem}>
                  <div style={styles.milestoneIconPending}>◯</div>
                  <div style={styles.milestoneInfo}>
                    <span style={styles.milestoneNamePending}>Pay off first credit card</span>
                    <span style={styles.milestoneDate}>~4 months away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Encouragement */}
            <div style={styles.encouragementCard}>
              <span style={styles.encouragementEmoji}>🎯</span>
              <p style={styles.encouragementText}>
                You're making real progress. Small, consistent steps add up — and you've been consistent for 12 weeks now.
              </p>
            </div>
          </>
        ) : (
          <div style={styles.emptyProgress}>
            <div style={styles.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <h2 style={styles.emptyTitle}>No data yet</h2>
            <p style={styles.emptyText}>
              Link your accounts to start tracking your progress. We'll show you where you started, where you are, and how far you've come.
            </p>
            <button 
              style={styles.emptyBtn}
              onClick={() => onNavigate('home', 'home')}
            >
              Go to Home
            </button>
          </div>
        )}
      </main>

      <BottomNav currentView="progress" onNavigate={onNavigate} />
    </div>
  );
}
