import React, { useState } from 'react';
import styles from './styles';

export default function AccountLinking({ onComplete, onExit, linkedAccounts }) {
  const [step, setStep] = useState('intro'); // 'intro', 'select', 'connecting', 'success'
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [accounts, setAccounts] = useState([...linkedAccounts]);

  const institutions = [
    { id: 'chase', name: 'Chase', icon: '🏦', color: '#117ACA' },
    { id: 'bofa', name: 'Bank of America', icon: '🏦', color: '#012169' },
    { id: 'wells', name: 'Wells Fargo', icon: '🏦', color: '#D71E28' },
    { id: 'citi', name: 'Citi', icon: '🏦', color: '#003B70' },
    { id: 'capital', name: 'Capital One', icon: '💳', color: '#004977' },
    { id: 'amex', name: 'American Express', icon: '💳', color: '#006FCF' },
    { id: 'discover', name: 'Discover', icon: '💳', color: '#FF6000' },
    { id: 'usbank', name: 'US Bank', icon: '🏦', color: '#D52B1E' },
  ];

  const handleSelectInstitution = (institution) => {
    setSelectedInstitution(institution);
    setStep('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      const newAccount = {
        id: Date.now(),
        institution: institution.name,
        type: institution.icon === '💳' ? 'Credit Card' : 'Checking',
        lastFour: Math.floor(1000 + Math.random() * 9000).toString(),
        connected: true
      };
      setAccounts(prev => [...prev, newAccount]);
      setStep('success');
    }, 2500);
  };

  const handleAddAnother = () => {
    setSelectedInstitution(null);
    setStep('select');
  };

  const handleDone = () => {
    onComplete(accounts);
  };

  return (
    <div style={styles.linkingContainer}>
      <div style={styles.linkingGradient} />

      {/* Header */}
      <header style={styles.linkingHeader}>
        <button style={styles.backBtn} onClick={onExit}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span style={styles.linkingTitle}>Link Accounts</span>
        <div style={{ width: 40 }} />
      </header>

      <main style={styles.linkingMain}>
        {/* Intro Step */}
        {step === 'intro' && (
          <div style={styles.linkingIntro}>
            <div style={styles.linkingIconLarge}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            
            <h1 style={styles.linkingHeadline}>See your full picture</h1>
            <p style={styles.linkingSubtext}>
              Connect your accounts so we can give you personalized guidance based on your real numbers — not guesses.
            </p>

            <div style={styles.trustPoints}>
              <div style={styles.trustPoint}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>Bank-level security encryption</span>
              </div>
              <div style={styles.trustPoint}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span>Read-only access — we can never move money</span>
              </div>
              <div style={styles.trustPoint}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Disconnect anytime with one tap</span>
              </div>
            </div>

            <button style={styles.linkingPrimaryBtn} onClick={() => setStep('select')}>
              Connect your first account
            </button>
            
            <button style={styles.linkingSecondaryBtn} onClick={onExit}>
              I'll do this later
            </button>
          </div>
        )}

        {/* Select Institution Step */}
        {step === 'select' && (
          <div style={styles.linkingSelect}>
            <h2 style={styles.selectTitle}>Choose your bank or card</h2>
            
            <div style={styles.searchBox}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search institutions..."
              />
            </div>

            <div style={styles.institutionGrid}>
              {institutions.map((inst) => (
                <button
                  key={inst.id}
                  style={styles.institutionBtn}
                  onClick={() => handleSelectInstitution(inst)}
                >
                  <span style={styles.institutionIcon}>{inst.icon}</span>
                  <span style={styles.institutionName}>{inst.name}</span>
                </button>
              ))}
            </div>

            <p style={styles.institutionHint}>
              Don't see yours? We support 10,000+ institutions.
            </p>
          </div>
        )}

        {/* Connecting Step */}
        {step === 'connecting' && (
          <div style={styles.linkingConnecting}>
            <div style={styles.connectingSpinner}>
              <div style={styles.spinnerRing} />
            </div>
            <h2 style={styles.connectingTitle}>Connecting to {selectedInstitution?.name}</h2>
            <p style={styles.connectingText}>
              This usually takes just a few seconds...
            </p>
            
            <div style={styles.connectingSteps}>
              <div style={styles.connectingStep}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Establishing secure connection</span>
              </div>
              <div style={{...styles.connectingStep, opacity: 0.5}}>
                <div style={styles.stepSpinner} />
                <span>Verifying credentials</span>
              </div>
              <div style={{...styles.connectingStep, opacity: 0.3}}>
                <div style={styles.stepCircle} />
                <span>Fetching account info</span>
              </div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div style={styles.linkingSuccess}>
            <div style={styles.successIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            
            <h2 style={styles.successTitle}>Account connected!</h2>
            <p style={styles.successText}>
              We can now see your {selectedInstitution?.name} account and include it in your financial picture.
            </p>

            <div style={styles.connectedAccounts}>
              <div style={styles.connectedLabel}>Connected accounts</div>
              {accounts.map((account) => (
                <div key={account.id} style={styles.connectedAccount}>
                  <div style={styles.accountIcon}>
                    {account.type === 'Credit Card' ? '💳' : '🏦'}
                  </div>
                  <div style={styles.accountInfo}>
                    <span style={styles.accountName}>{account.institution}</span>
                    <span style={styles.accountType}>{account.type} •••• {account.lastFour}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              ))}
            </div>

            <button style={styles.linkingPrimaryBtn} onClick={handleAddAnother}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add another account
            </button>
            
            <button style={styles.linkingSecondaryBtn} onClick={handleDone}>
              I'm done for now
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
