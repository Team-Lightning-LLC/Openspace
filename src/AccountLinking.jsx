import React, { useState } from 'react';
import { styles, colors, gradients } from './styles';

const INSTITUTIONS = [
  { id: 'chase', name: 'Chase', icon: '🏦' },
  { id: 'bofa', name: 'Bank of America', icon: '🏦' },
  { id: 'wells', name: 'Wells Fargo', icon: '🏦' },
  { id: 'citi', name: 'Citibank', icon: '🏦' },
  { id: 'capital', name: 'Capital One', icon: '💳' },
  { id: 'amex', name: 'American Express', icon: '💳' },
];

export default function AccountLinking({ onComplete, onBack }) {
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const [isLinking, setIsLinking] = useState(false);
  const [linkingComplete, setLinkingComplete] = useState(false);

  const toggleInstitution = (id) => {
    setSelectedInstitutions(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleLink = () => {
    setIsLinking(true);
    // Simulate linking
    setTimeout(() => {
      setIsLinking(false);
      setLinkingComplete(true);
    }, 2000);
  };

  const handleComplete = () => {
    onComplete(selectedInstitutions);
  };

  if (linkingComplete) {
    return (
      <div style={styles.onboardingContainer}>
        <div style={styles.backgroundGradient} />
        
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            ...styles.successIcon,
            width: 80,
            height: 80,
            borderRadius: 40,
            marginBottom: 24,
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          
          <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.text, marginBottom: 12 }}>
            Accounts Connected!
          </h2>
          <p style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 32, lineHeight: 1.5 }}>
            {selectedInstitutions.length} account{selectedInstitutions.length !== 1 ? 's' : ''} successfully linked. Your financial picture is coming together.
          </p>
          
          <button style={styles.continueBtn} onClick={handleComplete}>
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.onboardingContainer}>
      <div style={styles.backgroundGradient} />
      
      <header style={styles.onboardingHeader}>
        <button style={styles.backBtn} onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div style={{ flex: 1 }} />
        <button 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: colors.textSecondary, 
            fontSize: 15,
            cursor: 'pointer'
          }}
          onClick={() => onComplete([])}
        >
          Skip for now
        </button>
      </header>

      <main style={styles.onboardingMain}>
        <div style={styles.stepContent}>
          <h1 style={styles.stepTitle}>Link your accounts</h1>
          <p style={styles.stepSubtitle}>
            Connect your banks and cards so we can see your full picture. Your data is encrypted and never shared.
          </p>

          <div style={styles.goalGrid}>
            {INSTITUTIONS.map(inst => {
              const isSelected = selectedInstitutions.includes(inst.id);
              return (
                <button
                  key={inst.id}
                  onClick={() => toggleInstitution(inst.id)}
                  style={{
                    ...styles.goalBtn,
                    ...(isSelected ? styles.goalBtnActive : {})
                  }}
                >
                  <span style={styles.goalIcon}>{inst.icon}</span>
                  <span style={styles.goalLabel}>{inst.name}</span>
                  {isSelected && <span style={styles.goalCheck}>✓</span>}
                </button>
              );
            })}
          </div>

          <button
            style={{
              ...styles.goalBtn,
              marginTop: 12,
              justifyContent: 'center',
              borderStyle: 'dashed',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span style={{ color: colors.textMuted }}>Search for other banks...</span>
          </button>
        </div>
      </main>

      <div style={styles.onboardingFooter}>
        <button
          style={{
            ...styles.continueBtn,
            opacity: selectedInstitutions.length > 0 && !isLinking ? 1 : 0.5,
          }}
          onClick={handleLink}
          disabled={selectedInstitutions.length === 0 || isLinking}
        >
          {isLinking ? (
            <>
              <span style={{
                width: 20,
                height: 20,
                border: '2px solid white',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Connecting...
            </>
          ) : (
            <>
              Link {selectedInstitutions.length || ''} Account{selectedInstitutions.length !== 1 ? 's' : ''}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
