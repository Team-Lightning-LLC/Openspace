import React from 'react';
import styles from './styles';
import BottomNav from './BottomNav';
import NavPills from './NavPills';

export default function LearnView({ userName, onNavigate, activeTab, setActiveTab }) {
  const lessons = [
    {
      id: 1,
      title: 'Understanding Compound Interest',
      description: 'How small amounts grow over time — and how debt uses this against you',
      duration: '5 min',
      category: 'Fundamentals',
      icon: '📈',
      completed: false,
      recommended: true
    },
    {
      id: 2,
      title: 'Emergency Funds: Why Before Everything',
      description: 'The foundation that makes all other financial goals possible',
      duration: '4 min',
      category: 'Savings',
      icon: '🛡️',
      completed: false,
      recommended: true
    },
    {
      id: 3,
      title: 'Debt Avalanche vs. Debt Snowball',
      description: 'Two strategies for paying off debt — and which might work for you',
      duration: '6 min',
      category: 'Debt',
      icon: '🔓',
      completed: false
    },
    {
      id: 4,
      title: 'Reading Your Credit Report',
      description: "What's on it, what it means, and how to fix errors",
      duration: '8 min',
      category: 'Credit',
      icon: '📋',
      completed: false
    },
    {
      id: 5,
      title: 'The 50/30/20 Budget Myth',
      description: "Why one-size-fits-all budgets don't work — and what to do instead",
      duration: '5 min',
      category: 'Budgeting',
      icon: '💰',
      completed: false
    },
    {
      id: 6,
      title: 'When to Start Investing',
      description: 'The right time (hint: it depends on your situation)',
      duration: '7 min',
      category: 'Investing',
      icon: '📊',
      completed: false
    }
  ];

  const recommendedLessons = lessons.filter(l => l.recommended);
  const allLessons = lessons.filter(l => !l.recommended);

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
        <h1 style={styles.pageTitle}>Learn</h1>
        <p style={styles.pageSubtitle}>Build your financial knowledge, one concept at a time</p>

        {/* Recommended Section */}
        <div style={styles.learnSection}>
          <div style={styles.learnSectionHeader}>
            <span style={styles.sectionTitle}>Recommended for You</span>
            <span style={styles.recommendedBadge}>Based on your goals</span>
          </div>
          
          <div style={styles.lessonsList}>
            {recommendedLessons.map((lesson) => (
              <button key={lesson.id} style={styles.lessonCard}>
                <div style={styles.lessonIcon}>{lesson.icon}</div>
                <div style={styles.lessonContent}>
                  <span style={styles.lessonTitle}>{lesson.title}</span>
                  <span style={styles.lessonDescription}>{lesson.description}</span>
                  <div style={styles.lessonMeta}>
                    <span style={styles.lessonCategory}>{lesson.category}</span>
                    <span style={styles.lessonDuration}>{lesson.duration}</span>
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* All Lessons Section */}
        <div style={styles.learnSection}>
          <span style={styles.sectionTitle}>All Lessons</span>
          
          <div style={styles.lessonsList}>
            {allLessons.map((lesson) => (
              <button key={lesson.id} style={styles.lessonCard}>
                <div style={styles.lessonIcon}>{lesson.icon}</div>
                <div style={styles.lessonContent}>
                  <span style={styles.lessonTitle}>{lesson.title}</span>
                  <span style={styles.lessonDescription}>{lesson.description}</span>
                  <div style={styles.lessonMeta}>
                    <span style={styles.lessonCategory}>{lesson.category}</span>
                    <span style={styles.lessonDuration}>{lesson.duration}</span>
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Philosophy */}
        <div style={styles.philosophyCard}>
          <h3 style={styles.philosophyTitle}>Our approach to learning</h3>
          <p style={styles.philosophyText}>
            We don't believe in information overload. Each lesson is short, 
            practical, and connected to your actual situation. Learn what you 
            need, when you need it.
          </p>
        </div>
      </main>

      <BottomNav currentView="learn" onNavigate={onNavigate} />
    </div>
  );
}
