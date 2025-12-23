import React from 'react';
import styles from './styles';
import BottomNav from './BottomNav';
import NavPills from './NavPills';

export default function PlanView({ userName, userProfile, onNavigate, activeTab, setActiveTab }) {
  const goals = userProfile?.goals || [];
  
  const goalDetails = {
    debt: { 
      label: 'Getting out of debt', 
      icon: '🔓', 
      progress: 23,
      target: '$8,500',
      remaining: '$6,545',
      timeline: '18 months'
    },
    emergency: { 
      label: 'Emergency cushion', 
      icon: '🛡️', 
      progress: 45,
      target: '$3,000',
      remaining: '$1,650',
      timeline: '8 months'
    },
    breathing: { 
      label: 'Breathing room', 
      icon: '💨', 
      progress: 60,
      target: '$500/mo surplus',
      remaining: '$200/mo to go',
      timeline: '3 months'
    },
    retire: { 
      label: 'Retirement', 
      icon: '🏖️', 
      progress: 12,
      target: '$500,000',
      remaining: '$440,000',
      timeline: '20 years'
    },
    kids: { 
      label: "Kids' future", 
      icon: '👨‍👧‍👦', 
      progress: 8,
      target: '$50,000',
      remaining: '$46,000',
      timeline: '15 years'
    },
  };

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
        <h1 style={styles.pageTitle}>Your Plan</h1>
        <p style={styles.pageSubtitle}>What we're working toward together</p>

        {/* Priority Order */}
        <div style={styles.priorityCard}>
          <div style={styles.priorityHeader}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span style={styles.priorityTitle}>Recommended Priority</span>
          </div>
          <ol style={styles.priorityList}>
            <li style={styles.priorityItem}>
              <span style={styles.priorityNumber}>1</span>
              <span>Build $500 emergency buffer</span>
            </li>
            <li style={styles.priorityItem}>
              <span style={styles.priorityNumber}>2</span>
              <span>Pay down high-interest debt</span>
            </li>
            <li style={styles.priorityItem}>
              <span style={styles.priorityNumber}>3</span>
              <span>Expand emergency fund to 3 months</span>
            </li>
          </ol>
          <p style={styles.priorityWhy}>
            <strong>Why this order?</strong> The buffer prevents new debt when surprises happen. Then we attack high-interest debt while it's costing you the most.
          </p>
        </div>

        {/* Goals */}
        <div style={styles.goalsSection}>
          <h2 style={styles.sectionTitle}>Your Goals</h2>
          
          {goals.length > 0 ? (
            <div style={styles.goalsList}>
              {goals.map((goalId) => {
                const goal = goalDetails[goalId];
                if (!goal) return null;
                
                return (
                  <div key={goalId} style={styles.goalCard}>
                    <div style={styles.goalHeader}>
                      <span style={styles.goalIcon}>{goal.icon}</span>
                      <div style={styles.goalInfo}>
                        <span style={styles.goalLabel}>{goal.label}</span>
                        <span style={styles.goalTimeline}>{goal.timeline}</span>
                      </div>
                      <span style={styles.goalPercent}>{goal.progress}%</span>
                    </div>
                    <div style={styles.goalProgressBar}>
                      <div style={{...styles.goalProgressFill, width: `${goal.progress}%`}} />
                    </div>
                    <div style={styles.goalMeta}>
                      <span>Target: {goal.target}</span>
                      <span>Remaining: {goal.remaining}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={styles.emptyGoals}>
              <p>No goals set yet. Complete onboarding to add your goals.</p>
            </div>
          )}
        </div>

        {/* Monthly Allocation */}
        <div style={styles.allocationCard}>
          <h2 style={styles.sectionTitle}>Suggested Monthly Allocation</h2>
          <div style={styles.allocationList}>
            <div style={styles.allocationItem}>
              <div style={{...styles.allocationDot, background: '#10b981'}} />
              <span style={styles.allocationLabel}>Emergency Fund</span>
              <span style={styles.allocationAmount}>$150</span>
            </div>
            <div style={styles.allocationItem}>
              <div style={{...styles.allocationDot, background: '#6366f1'}} />
              <span style={styles.allocationLabel}>Debt Paydown</span>
              <span style={styles.allocationAmount}>$200</span>
            </div>
            <div style={styles.allocationItem}>
              <div style={{...styles.allocationDot, background: '#f59e0b'}} />
              <span style={styles.allocationLabel}>Flexible Buffer</span>
              <span style={styles.allocationAmount}>$70</span>
            </div>
          </div>
          <p style={styles.allocationNote}>
            This leaves room for life to happen. We can adjust anytime.
          </p>
        </div>
      </main>

      <BottomNav currentView="plan" onNavigate={onNavigate} />
    </div>
  );
}
