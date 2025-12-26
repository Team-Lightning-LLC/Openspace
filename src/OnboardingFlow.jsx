import React, { useState } from 'react';
import { styles, colors, gradients } from './styles';

const TOTAL_STEPS = 5;

export default function OnboardingFlow({
  step,
  setStep,
  formData,
  updateForm,
  toggleGoal,
  toggleArrayItem,
  onComplete,
  onExit,
}) {
  const [focusedInput, setFocusedInput] = useState(null);

  const canContinue = () => {
    switch (step) {
      case 0:
        return formData.name && formData.email;
      case 1:
        return formData.income && formData.savings;
      case 2:
        return formData.hasDebt !== null && (formData.hasDebt === false || formData.debtStress);
      case 3:
        return formData.goals.length >= 1;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onExit();
    }
  };

  return (
    <div style={styles.onboardingContainer}>
      <div style={styles.backgroundGradient} />
      
      {/* Header */}
      <header style={styles.onboardingHeader}>
        <button style={styles.backBtn} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${((step + 1) / TOTAL_STEPS) * 100}%`
              }} 
            />
          </div>
          <span style={styles.progressText}>{step + 1} of {TOTAL_STEPS}</span>
        </div>
        
        {/* Spacer to center progress */}
        <div style={{ width: 44 }} />
      </header>

      {/* Main Content */}
      <main style={styles.onboardingMain}>
        {step === 0 && (
          <Step1Basics 
            formData={formData} 
            updateForm={updateForm}
            focusedInput={focusedInput}
            setFocusedInput={setFocusedInput}
          />
        )}
        {step === 1 && (
          <Step2Money 
            formData={formData} 
            updateForm={updateForm}
          />
        )}
        {step === 2 && (
          <Step3Debt 
            formData={formData} 
            updateForm={updateForm}
          />
        )}
        {step === 3 && (
          <Step4Goals 
            formData={formData} 
            toggleGoal={toggleGoal}
          />
        )}
        {step === 4 && (
          <Step5Final 
            formData={formData} 
            updateForm={updateForm}
          />
        )}
      </main>

      {/* Footer */}
      <div style={styles.onboardingFooter}>
        <button
          style={{
            ...styles.continueBtn,
            opacity: canContinue() ? 1 : 0.5,
            cursor: canContinue() ? 'pointer' : 'not-allowed',
          }}
          onClick={handleContinue}
          disabled={!canContinue()}
        >
          {step === TOTAL_STEPS - 1 ? 'Complete Setup' : 'Continue'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ============================================
// STEP 1: BASICS
// ============================================
function Step1Basics({ formData, updateForm, focusedInput, setFocusedInput }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Let's start simple</h1>
      <p style={styles.stepSubtitle}>Just the basics so we know who we're talking to.</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>What should we call you?</label>
        <input
          type="text"
          placeholder="Your first name"
          value={formData.name}
          onChange={(e) => updateForm('name', e.target.value)}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
          style={{
            ...styles.input,
            ...(focusedInput === 'name' ? styles.inputFocus : {})
          }}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>How can we reach you?</label>
        <input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => updateForm('email', e.target.value)}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
          style={{
            ...styles.input,
            ...(focusedInput === 'email' ? styles.inputFocus : {}),
            marginBottom: 12
          }}
        />
        <input
          type="tel"
          placeholder="Phone number (optional)"
          value={formData.phone}
          onChange={(e) => updateForm('phone', e.target.value)}
          onFocus={() => setFocusedInput('phone')}
          onBlur={() => setFocusedInput(null)}
          style={{
            ...styles.input,
            ...(focusedInput === 'phone' ? styles.inputFocus : {})
          }}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>What do you do for work?</label>
        <input
          type="text"
          placeholder="e.g., Teacher, Nurse, Freelancer, Between jobs..."
          value={formData.work}
          onChange={(e) => updateForm('work', e.target.value)}
          onFocus={() => setFocusedInput('work')}
          onBlur={() => setFocusedInput(null)}
          style={{
            ...styles.input,
            ...(focusedInput === 'work' ? styles.inputFocus : {})
          }}
        />
      </div>
    </div>
  );
}

// ============================================
// STEP 2: MONEY
// ============================================
function Step2Money({ formData, updateForm }) {
  const incomeOptions = [
    'Under $30K', '$30K - $50K', '$50K - $75K', 
    '$75K - $100K', '$100K - $150K', '$150K+'
  ];
  
  const savingsOptions = [
    'Under $1K', '$1K - $5K', '$5K - $15K',
    '$15K - $50K', '$50K - $100K', '$100K+'
  ];

  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Your money right now</h1>
      <p style={styles.stepSubtitle}>A rough picture is all we need. No judgment here.</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Roughly, what do you earn per year after taxes?</label>
        <div style={styles.optionGrid}>
          {incomeOptions.map(option => (
            <button
              key={option}
              onClick={() => updateForm('income', option)}
              style={{
                ...styles.optionBtn,
                ...(formData.income === option ? styles.optionBtnActive : {})
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>How much do you have saved — all accounts combined?</label>
        <div style={styles.optionGrid}>
          {savingsOptions.map(option => (
            <button
              key={option}
              onClick={() => updateForm('savings', option)}
              style={{
                ...styles.optionBtn,
                ...(formData.savings === option ? styles.optionBtnActive : {})
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// STEP 3: DEBT
// ============================================
function Step3Debt({ formData, updateForm }) {
  const stressOptions = [
    'Not at all', 'A little', 'Moderately', 'Yes, significantly'
  ];

  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Let's talk about debt</h1>
      <p style={styles.stepSubtitle}>Understanding your situation helps us give better guidance.</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Do you have any debt right now?</label>
        <div style={{ ...styles.optionGrid, gridTemplateColumns: '1fr 1fr' }}>
          <button
            onClick={() => updateForm('hasDebt', true)}
            style={{
              ...styles.optionBtn,
              ...(formData.hasDebt === true ? styles.optionBtnActive : {})
            }}
          >
            Yes
          </button>
          <button
            onClick={() => updateForm('hasDebt', false)}
            style={{
              ...styles.optionBtn,
              ...(formData.hasDebt === false ? styles.optionBtnActive : {})
            }}
          >
            No
          </button>
        </div>
      </div>

      {formData.hasDebt && (
        <div style={styles.formGroup}>
          <label style={styles.label}>Does your debt cause you stress?</label>
          <div style={styles.goalGrid}>
            {stressOptions.map(option => (
              <button
                key={option}
                onClick={() => updateForm('debtStress', option)}
                style={{
                  ...styles.goalBtn,
                  ...(formData.debtStress === option ? styles.goalBtnActive : {})
                }}
              >
                <span style={styles.goalLabel}>{option}</span>
                {formData.debtStress === option && (
                  <span style={styles.goalCheck}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// STEP 4: GOALS
// ============================================
function Step4Goals({ formData, toggleGoal }) {
  const goals = [
    { id: 'emergency', icon: '🛡️', label: 'Build emergency savings' },
    { id: 'debt', icon: '💳', label: 'Pay off debt' },
    { id: 'invest', icon: '📈', label: 'Start investing' },
    { id: 'retire', icon: '🏖️', label: 'Plan for retirement' },
    { id: 'home', icon: '🏠', label: 'Save for a home' },
    { id: 'breathing', icon: '😮‍💨', label: 'Just get breathing room' },
  ];

  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>What matters most?</h1>
      <p style={styles.stepSubtitle}>Pick up to 3 goals. We will focus on these together.</p>

      <div style={styles.goalGrid}>
        {goals.map(goal => {
          const isSelected = formData.goals.includes(goal.id);
          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              style={{
                ...styles.goalBtn,
                ...(isSelected ? styles.goalBtnActive : {})
              }}
            >
              <span style={styles.goalIcon}>{goal.icon}</span>
              <span style={styles.goalLabel}>{goal.label}</span>
              {isSelected && (
                <span style={styles.goalCheck}>✓</span>
              )}
            </button>
          );
        })}
      </div>
      
      <p style={{ 
        fontSize: 13, 
        color: colors.textMuted, 
        textAlign: 'center',
        marginTop: 16 
      }}>
        {formData.goals.length}/3 selected
      </p>
    </div>
  );
}

// ============================================
// STEP 5: FINAL
// ============================================
function Step5Final({ formData, updateForm }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Almost there</h1>
      <p style={styles.stepSubtitle}>Anything else you want your advisor to know?</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>If you could change one thing about your finances, what would it be?</label>
        <textarea
          placeholder="e.g., I wish I knew where all my money goes each month..."
          value={formData.changeWish}
          onChange={(e) => updateForm('changeWish', e.target.value)}
          rows={3}
          style={styles.textareaLarge}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Anything else on your mind? (Optional)</label>
        <textarea
          placeholder="Feel free to share anything that might help us help you..."
          value={formData.anythingElse}
          onChange={(e) => updateForm('anythingElse', e.target.value)}
          rows={4}
          style={styles.textareaLarge}
        />
      </div>

      <div style={styles.completionNote}>
        <span style={{ fontSize: 24 }}>✨</span>
        <div>
          <div style={styles.completionTitle}>You're all set!</div>
          <div style={styles.completionText}>
            After this, you will meet your AI Advisor who will use everything you have shared to give you personalized guidance.
          </div>
        </div>
      </div>
    </div>
  );
}
