import React, { useState } from 'react';
import styles from './styles';
import BottomNav from './BottomNav';

export default function MessagesView({ userName, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const messages = [
    {
      id: 1,
      type: 'insight',
      title: 'Monthly spending pattern detected',
      preview: "I noticed your grocery spending increased by 15% this month. Want to take a look together?",
      time: '2h ago',
      unread: true,
      icon: '💡'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Quarterly check-in coming up',
      preview: "Your next check-in is scheduled for March 15. We'll review your progress and adjust your plan if needed.",
      time: '1d ago',
      unread: true,
      icon: '📅'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Large transaction detected',
      preview: "A $450 transaction was made at Best Buy. Just making sure this was you!",
      time: '3d ago',
      unread: false,
      icon: '🔔'
    },
    {
      id: 4,
      type: 'milestone',
      title: "Congrats! You hit a milestone 🎉",
      preview: "You've paid off $2,000 in debt since starting. That's real progress!",
      time: '1w ago',
      unread: false,
      icon: '🏆'
    },
    {
      id: 5,
      type: 'education',
      title: 'New lesson available',
      preview: "Based on your goals, I think you'd find 'Understanding Credit Scores' helpful.",
      time: '1w ago',
      unread: false,
      icon: '📚'
    },
  ];

  const filteredMessages = activeFilter === 'all' 
    ? messages 
    : messages.filter(m => m.type === activeFilter);

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGradient} />

      {/* Header */}
      <header style={styles.messagesHeader}>
        <button style={styles.backBtn} onClick={() => onNavigate('home', 'home')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span style={styles.messagesTitle}>Messages</span>
        <button style={styles.markAllBtn}>
          Mark all read
        </button>
      </header>

      {/* Filter Pills */}
      <div style={styles.filterPills}>
        {[
          { id: 'all', label: 'All' },
          { id: 'insight', label: 'Insights' },
          { id: 'alert', label: 'Alerts' },
          { id: 'reminder', label: 'Reminders' },
        ].map((filter) => (
          <button
            key={filter.id}
            style={{
              ...styles.filterPill,
              ...(activeFilter === filter.id ? styles.filterPillActive : {})
            }}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <main style={styles.messagesMain}>
        {filteredMessages.length > 0 ? (
          <div style={styles.messagesList}>
            {filteredMessages.map((message) => (
              <button
                key={message.id}
                style={{
                  ...styles.messageItem,
                  ...(message.unread ? styles.messageItemUnread : {})
                }}
              >
                <div style={styles.messageIcon}>{message.icon}</div>
                <div style={styles.messageContent}>
                  <div style={styles.messageHeader}>
                    <span style={{
                      ...styles.messageTitle,
                      fontWeight: message.unread ? 600 : 500
                    }}>
                      {message.title}
                    </span>
                    <span style={styles.messageTime}>{message.time}</span>
                  </div>
                  <p style={styles.messagePreview}>{message.preview}</p>
                </div>
                {message.unread && <div style={styles.unreadDot} />}
              </button>
            ))}
          </div>
        ) : (
          <div style={styles.emptyMessages}>
            <p>No messages in this category</p>
          </div>
        )}

        {/* Communication Preferences */}
        <div style={styles.preferencesCard}>
          <h3 style={styles.preferencesTitle}>Communication preferences</h3>
          <p style={styles.preferencesText}>
            We'll only message you about things that matter. You can adjust notification settings anytime.
          </p>
          <button style={styles.preferencesBtn}>
            Manage preferences
          </button>
        </div>
      </main>

      <BottomNav currentView="messages" onNavigate={onNavigate} />
    </div>
  );
}
