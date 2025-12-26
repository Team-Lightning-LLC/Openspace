import React from 'react';
import { styles, colors, KUMO_URL } from './styles';

export default function MessagesView({ savedChats = [], onNavigate }) {
  return (
    <div style={styles.container}>
      <header style={styles.chatHeader}>
        <button style={styles.chatBackBtn} onClick={() => onNavigate('home', 'home')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 600, color: colors.text }}>Messages</h1>
      </header>

      <main style={{ padding: 20 }}>
        {savedChats.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 40,
            color: colors.textMuted 
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: colors.bgLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <p style={{ fontSize: 15 }}>No messages yet</p>
            <p style={{ fontSize: 13, marginTop: 8 }}>
              Saved chat summaries will appear here
            </p>
          </div>
        ) : (
          savedChats.map((chat, i) => (
            <div key={i} style={styles.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: colors.bgLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img src={KUMO_URL} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>
                    Chat Summary
                  </div>
                  <div style={{ fontSize: 13, color: colors.textMuted }}>
                    {chat.timestamp?.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.5 }}>
                {chat.summary}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
