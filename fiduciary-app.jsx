import React, { useState } from 'react';

// Main App Component
export default function FiduciaryApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'onboarding'
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    workYears: 5,
    incomeStability: '',
    income: '',
    savings: '',
    hasDebt: null,
    debtTypes: [],
    debtAmount: '',
    debtStress: '',
    goals: [],
    retirementTimeline: 15,
    dependents: null,
    dependentCount: 1,
    soleEarner: null,
    upcomingEvents: '',
    decisionComfort: '',
    changeWish: '',
    anythingElse: ''
  });

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  if (currentView === 'onboarding') {
    return (
      <OnboardingFlow 
        step={onboardingStep}
        setStep={setOnboardingStep}
        formData={formData}
        updateForm={updateForm}
        toggleArrayItem={toggleArrayItem}
        onComplete={() => setCurrentView('home')}
      />
    );
  }

  return (
    <HomePage 
      onStartOnboarding={() => {
        setCurrentView('onboarding');
        setOnboardingStep(0);
      }}
    />
  );
}

// Home Page Component
function HomePage({ onStartOnboarding }) {
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
            <span>A</span>
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
          
          <p style={styles.snapshotHint}>Complete onboarding to see your numbers</p>
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
            <button style={styles.taskItem} onClick={onStartOnboarding}>
              <div style={styles.taskCheck}>
                <div style={styles.taskCheckEmpty} />
              </div>
              <div style={styles.taskInfo}>
                <span style={styles.taskName}>Complete your profile</span>
                <span style={styles.taskUrgent}>⚡ Get started</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            <div style={styles.taskItem}>
              <div style={styles.taskCheck}>
                <div style={styles.taskCheckEmpty} />
              </div>
              <div style={styles.taskInfo}>
                <span style={styles.taskName}>Link your bank account</span>
                <span style={styles.taskPending}>Waiting on profile</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>

            <div style={styles.taskItem}>
              <div style={styles.taskCheck}>
                <div style={styles.taskCheckEmpty} />
              </div>
              <div style={styles.taskInfo}>
                <span style={styles.taskName}>Set your first goal</span>
                <span style={styles.taskPending}>Waiting on profile</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
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

// Onboarding Flow Component
function OnboardingFlow({ step, setStep, formData, updateForm, toggleArrayItem, onComplete }) {
  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div style={styles.onboardingContainer}>
      <div style={styles.onboardingGradient} />
      
      {/* Progress Header */}
      <header style={styles.onboardingHeader}>
        <button style={styles.backBtn} onClick={step === 0 ? onComplete : prevStep}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <span style={styles.progressText}>{step + 1} of {totalSteps}</span>
        </div>
        <div style={{ width: 40 }} />
      </header>

      {/* Step Content */}
      <main style={styles.onboardingMain}>
        {step === 0 && <StepOne formData={formData} updateForm={updateForm} />}
        {step === 1 && <StepTwo formData={formData} updateForm={updateForm} />}
        {step === 2 && <StepThree formData={formData} updateForm={updateForm} toggleArrayItem={toggleArrayItem} />}
        {step === 3 && <StepFour formData={formData} updateForm={updateForm} />}
        {step === 4 && <StepFive formData={formData} updateForm={updateForm} />}
      </main>

      {/* Continue Button */}
      <footer style={styles.onboardingFooter}>
        <button style={styles.continueBtn} onClick={nextStep}>
          {step === totalSteps - 1 ? "Complete" : "Continue"}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </footer>
    </div>
  );
}

// Step 1: Let's start simple
function StepOne({ formData, updateForm }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Let's start simple</h1>
      <p style={styles.stepSubtitle}>Just the basics so we know who we're talking to.</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>What should we call you?</label>
        <input
          type="text"
          style={styles.input}
          placeholder="Your first name"
          value={formData.name}
          onChange={(e) => updateForm('name', e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>How can we reach you?</label>
        <input
          type="email"
          style={styles.input}
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => updateForm('email', e.target.value)}
        />
        <input
          type="tel"
          style={{ ...styles.input, marginTop: 12 }}
          placeholder="Phone number"
          value={formData.phone}
          onChange={(e) => updateForm('phone', e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>What do you do for work?</label>
        <input
          type="text"
          style={styles.input}
          placeholder="e.g., Teacher, Nurse, Freelancer, Between jobs..."
          value={formData.work}
          onChange={(e) => updateForm('work', e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>How long have you been doing that?</label>
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="30"
            value={formData.workYears}
            onChange={(e) => updateForm('workYears', parseInt(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.sliderValue}>
            {formData.workYears === 0 ? '<1 year' : formData.workYears === 30 ? '30+ years' : `${formData.workYears} years`}
          </span>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Does your income feel stable right now?</label>
        <div style={styles.optionGrid}>
          {['Very stable', 'Mostly stable', 'Uncertain', 'Actively unstable'].map(option => (
            <button
              key={option}
              style={{
                ...styles.optionBtn,
                ...(formData.incomeStability === option ? styles.optionBtnActive : {})
              }}
              onClick={() => updateForm('incomeStability', option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 2: Your money right now
function StepTwo({ formData, updateForm }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Your money right now</h1>
      <p style={styles.stepSubtitle}>A rough picture is all we need. No judgment here.</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Roughly, what do you earn per year after taxes?</label>
        <div style={styles.optionGrid}>
          {['Under $30K', '$30K - $50K', '$50K - $75K', '$75K - $100K', '$100K - $150K', '$150K+'].map(option => (
            <button
              key={option}
              style={{
                ...styles.optionBtn,
                ...(formData.income === option ? styles.optionBtnActive : {})
              }}
              onClick={() => updateForm('income', option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>How much do you have saved — all accounts combined?</label>
        <div style={styles.optionGrid}>
          {['Under $1K', '$1K - $5K', '$5K - $15K', '$15K - $50K', '$50K - $100K', '$100K+'].map(option => (
            <button
              key={option}
              style={{
                ...styles.optionBtn,
                ...(formData.savings === option ? styles.optionBtnActive : {})
              }}
              onClick={() => updateForm('savings', option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Do you have any debt right now?</label>
        <div style={styles.optionRow}>
          <button
            style={{
              ...styles.optionBtnLarge,
              ...(formData.hasDebt === true ? styles.optionBtnActive : {})
            }}
            onClick={() => updateForm('hasDebt', true)}
          >
            Yes
          </button>
          <button
            style={{
              ...styles.optionBtnLarge,
              ...(formData.hasDebt === false ? styles.optionBtnActive : {})
            }}
            onClick={() => updateForm('hasDebt', false)}
          >
            No
          </button>
        </div>
      </div>

      {formData.hasDebt && (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>What kind?</label>
            <div style={styles.checkboxGrid}>
              {['Credit cards', 'Mortgage', 'Car loan', 'Student loans', 'Medical debt', 'Personal loans', 'Other'].map(type => (
                <button
                  key={type}
                  style={{
                    ...styles.checkboxBtn,
                    ...(formData.debtTypes.includes(type) ? styles.checkboxBtnActive : {})
                  }}
                  onClick={() => toggleArrayItem('debtTypes', type)}
                >
                  <span style={styles.checkbox}>
                    {formData.debtTypes.includes(type) && '✓'}
                  </span>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Is any of this debt causing you stress?</label>
            <div style={styles.optionGrid}>
              {['Not really', 'Somewhat', 'Yes, significantly', "It's overwhelming"].map(option => (
                <button
                  key={option}
                  style={{
                    ...styles.optionBtn,
                    ...(formData.debtStress === option ? styles.optionBtnActive : {})
                  }}
                  onClick={() => updateForm('debtStress', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Step 3: What are you working toward?
function StepThree({ formData, updateForm, toggleArrayItem }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>What are you working toward?</h1>
      <p style={styles.stepSubtitle}>Pick up to 3 things that matter most right now.</p>

      <div style={styles.formGroup}>
        <div style={styles.goalGrid}>
          {[
            { id: 'debt', label: 'Getting out of debt', icon: '🔓' },
            { id: 'emergency', label: 'Building an emergency cushion', icon: '🛡️' },
            { id: 'saving', label: 'Saving for something specific', icon: '🎯' },
            { id: 'kids', label: "My kids' future", icon: '👨‍👧‍👦' },
            { id: 'retire', label: 'Retiring someday without panic', icon: '🏖️' },
            { id: 'breathing', label: 'Just... breathing room', icon: '💨' },
            { id: 'wealth', label: 'Growing wealth long term', icon: '📈' },
            { id: 'other', label: 'Something else', icon: '✨' }
          ].map(goal => (
            <button
              key={goal.id}
              style={{
                ...styles.goalBtn,
                ...(formData.goals.includes(goal.id) ? styles.goalBtnActive : {}),
                opacity: formData.goals.length >= 3 && !formData.goals.includes(goal.id) ? 0.5 : 1
              }}
              onClick={() => {
                if (formData.goals.length < 3 || formData.goals.includes(goal.id)) {
                  toggleArrayItem('goals', goal.id);
                }
              }}
            >
              <span style={styles.goalIcon}>{goal.icon}</span>
              <span style={styles.goalLabel}>{goal.label}</span>
              {formData.goals.includes(goal.id) && (
                <span style={styles.goalCheck}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {formData.goals.includes('retire') && (
        <div style={styles.formGroup}>
          <label style={styles.label}>When would you like that to be possible?</label>
          <div style={styles.sliderContainer}>
            <input
              type="range"
              min="5"
              max="40"
              value={formData.retirementTimeline}
              onChange={(e) => updateForm('retirementTimeline', parseInt(e.target.value))}
              style={styles.slider}
            />
            <span style={styles.sliderValue}>
              {formData.retirementTimeline === 40 ? '40+ years' : `${formData.retirementTimeline} years`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Step 4: A few things that help us help you
function StepFour({ formData, updateForm }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>A few things that help us help you</h1>
      <p style={styles.stepSubtitle}>Your life shapes your finances. Let's understand it.</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Do you have anyone who depends on you financially?</label>
        <div style={styles.optionRow}>
          <button
            style={{
              ...styles.optionBtnLarge,
              ...(formData.dependents === true ? styles.optionBtnActive : {})
            }}
            onClick={() => updateForm('dependents', true)}
          >
            Yes
          </button>
          <button
            style={{
              ...styles.optionBtnLarge,
              ...(formData.dependents === false ? styles.optionBtnActive : {})
            }}
            onClick={() => updateForm('dependents', false)}
          >
            No
          </button>
        </div>
      </div>

      {formData.dependents && (
        <div style={styles.formGroup}>
          <label style={styles.label}>How many?</label>
          <div style={styles.counterRow}>
            <button 
              style={styles.counterBtn}
              onClick={() => updateForm('dependentCount', Math.max(1, formData.dependentCount - 1))}
            >
              −
            </button>
            <span style={styles.counterValue}>{formData.dependentCount}</span>
            <button 
              style={styles.counterBtn}
              onClick={() => updateForm('dependentCount', Math.min(10, formData.dependentCount + 1))}
            >
              +
            </button>
          </div>
        </div>
      )}

      <div style={styles.formGroup}>
        <label style={styles.label}>Are you the only earner in your household?</label>
        <div style={styles.optionRow}>
          <button
            style={{
              ...styles.optionBtnLarge,
              ...(formData.soleEarner === true ? styles.optionBtnActive : {})
            }}
            onClick={() => updateForm('soleEarner', true)}
          >
            Yes
          </button>
          <button
            style={{
              ...styles.optionBtnLarge,
              ...(formData.soleEarner === false ? styles.optionBtnActive : {})
            }}
            onClick={() => updateForm('soleEarner', false)}
          >
            No, there's another earner
          </button>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Is there anything big coming up in the next few years?</label>
        <p style={styles.labelHint}>Home purchase, wedding, medical procedure, job change, etc.</p>
        <textarea
          style={styles.textarea}
          placeholder="Optional — but it helps us plan with you"
          value={formData.upcomingEvents}
          onChange={(e) => updateForm('upcomingEvents', e.target.value)}
          rows={3}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>How would you describe your comfort with financial decisions?</label>
        <div style={styles.comfortOptions}>
          {[
            { id: 'guide', label: 'I need a lot of guidance', desc: 'Walk me through everything' },
            { id: 'collab', label: 'I like collaboration', desc: 'You advise, I decide' },
            { id: 'handle', label: 'Just handle it for me', desc: "I trust you to do what's right" }
          ].map(option => (
            <button
              key={option.id}
              style={{
                ...styles.comfortBtn,
                ...(formData.decisionComfort === option.id ? styles.comfortBtnActive : {})
              }}
              onClick={() => updateForm('decisionComfort', option.id)}
            >
              <span style={styles.comfortLabel}>{option.label}</span>
              <span style={styles.comfortDesc}>{option.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 5: One more thing
function StepFive({ formData, updateForm }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>One more thing</h1>
      <p style={styles.stepSubtitle}>This is the part where you tell us what really matters.</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>If you could change one thing about your financial life, what would it be?</label>
        <textarea
          style={styles.textareaLarge}
          placeholder="Take your time. There's no wrong answer."
          value={formData.changeWish}
          onChange={(e) => updateForm('changeWish', e.target.value)}
          rows={5}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Is there anything you want us to know that we haven't asked about?</label>
        <textarea
          style={styles.textareaLarge}
          placeholder="Optional — but sometimes the most important things are the ones forms don't ask."
          value={formData.anythingElse}
          onChange={(e) => updateForm('anythingElse', e.target.value)}
          rows={4}
        />
      </div>

      <div style={styles.completionNote}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <div>
          <p style={styles.completionTitle}>That's everything we need to get started.</p>
          <p style={styles.completionText}>We'll use this to build your profile. You can always update it later.</p>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  // Container
  container: {
    minHeight: '100vh',
    background: '#f8fafc',
    position: 'relative',
    maxWidth: 430,
    margin: '0 auto',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    background: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 50%, #fce7f3 100%)',
    zIndex: 0,
  },

  // Header
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    position: 'relative',
    zIndex: 1,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1e293b',
    letterSpacing: '-0.5px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  notificationBtn: {
    position: 'relative',
    background: 'white',
    border: 'none',
    borderRadius: 12,
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    background: '#ef4444',
    borderRadius: '50%',
    border: '2px solid white',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },

  // Nav Pills
  navPills: {
    display: 'flex',
    gap: 8,
    padding: '0 20px 16px',
    position: 'relative',
    zIndex: 1,
    overflowX: 'auto',
  },
  navPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 16px',
    background: 'rgba(255,255,255,0.7)',
    border: 'none',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 500,
    color: '#64748b',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  navPillActive: {
    background: 'white',
    color: '#1e293b',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },

  // Main Content
  main: {
    padding: '0 20px 100px',
    position: 'relative',
    zIndex: 1,
  },

  // Cards
  card: {
    background: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  checkInIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: '#ecfdf5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInLabel: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
  },
  moreBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: 16,
    letterSpacing: 2,
  },
  advisorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  advisorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  advisorName: {
    fontSize: 17,
    fontWeight: 600,
    color: '#1e293b',
  },
  advisorSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
  dateRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 16,
  },
  dateHighlight: {
    fontSize: 18,
    fontWeight: 600,
    color: '#6366f1',
  },
  timeText: {
    fontSize: 15,
    color: '#64748b',
  },
  recommendText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 1.5,
  },
  secondaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: 'transparent',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
    cursor: 'pointer',
    marginBottom: 10,
  },
  primaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  // Snapshot Card
  snapshotCard: {
    background: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  snapshotHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  snapshotTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
  },
  snapshotGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 16,
  },
  snapshotItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  snapshotLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  snapshotValue: {
    fontSize: 20,
    fontWeight: 600,
    color: '#cbd5e1',
  },
  snapshotHint: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Tasks Section
  tasksSection: {
    background: 'white',
    borderRadius: 20,
    padding: 20,
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  tasksHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #f1f5f9',
  },
  tasksTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 0',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #f1f5f9',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
  taskCheck: {
    width: 24,
    height: 24,
  },
  taskCheckEmpty: {
    width: 22,
    height: 22,
    borderRadius: 6,
    border: '2px solid #e2e8f0',
  },
  taskInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  taskName: {
    fontSize: 15,
    fontWeight: 500,
    color: '#1e293b',
  },
  taskUrgent: {
    fontSize: 13,
    color: '#f59e0b',
    fontWeight: 500,
  },
  taskPending: {
    fontSize: 13,
    color: '#94a3b8',
  },

  // Bottom Navigation
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 430,
    background: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px 20px 24px',
    borderTop: '1px solid #f1f5f9',
    zIndex: 100,
  },
  bottomNavItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
  },
  bottomNavLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 500,
  },
  messageBadge: {
    position: 'absolute',
    top: -2,
    right: 4,
    width: 18,
    height: 18,
    background: '#ef4444',
    borderRadius: '50%',
    color: 'white',
    fontSize: 11,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Floating Help Button
  floatingHelp: {
    position: 'fixed',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },

  // Onboarding Styles
  onboardingContainer: {
    minHeight: '100vh',
    background: '#f8fafc',
    position: 'relative',
    maxWidth: 430,
    margin: '0 auto',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  onboardingGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    background: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 50%, #fce7f3 100%)',
    zIndex: 0,
  },
  onboardingHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    position: 'relative',
    zIndex: 1,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.8)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  progressContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  progressBar: {
    width: '100%',
    height: 6,
    background: 'rgba(255,255,255,0.5)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 500,
  },
  onboardingMain: {
    flex: 1,
    padding: '0 20px',
    position: 'relative',
    zIndex: 1,
    overflowY: 'auto',
    paddingBottom: 120,
  },
  onboardingFooter: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 430,
    padding: '20px',
    background: 'linear-gradient(180deg, transparent 0%, #f8fafc 20%)',
    zIndex: 10,
  },
  continueBtn: {
    width: '100%',
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
  },

  // Step Content
  stepContent: {
    paddingTop: 20,
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: '-0.5px',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
    lineHeight: 1.5,
  },

  // Form Elements
  formGroup: {
    marginBottom: 28,
  },
  label: {
    display: 'block',
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 12,
  },
  labelHint: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: -8,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    padding: '16px 18px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    fontSize: 16,
    color: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '16px 18px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    fontSize: 16,
    color: '#1e293b',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  textareaLarge: {
    width: '100%',
    padding: '18px 20px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 16,
    fontSize: 16,
    color: '#1e293b',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.6,
    boxSizing: 'border-box',
  },

  // Slider
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: 'white',
    padding: '16px 20px',
    borderRadius: 14,
    border: '2px solid #e2e8f0',
  },
  slider: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    appearance: 'none',
    background: '#e2e8f0',
    outline: 'none',
  },
  sliderValue: {
    fontSize: 15,
    fontWeight: 600,
    color: '#6366f1',
    minWidth: 80,
    textAlign: 'right',
  },

  // Option Buttons
  optionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  optionBtn: {
    padding: '14px 16px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
  },
  optionBtnActive: {
    background: '#f0f0ff',
    borderColor: '#6366f1',
    color: '#6366f1',
  },
  optionRow: {
    display: 'flex',
    gap: 12,
  },
  optionBtnLarge: {
    flex: 1,
    padding: '18px 20px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  // Checkbox Grid
  checkboxGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  checkboxBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 12,
    fontSize: 15,
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  checkboxBtnActive: {
    background: '#f0f0ff',
    borderColor: '#6366f1',
    color: '#6366f1',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    border: '2px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    color: '#6366f1',
    background: 'white',
  },

  // Goal Buttons
  goalGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  goalBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '16px 18px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
    position: 'relative',
  },
  goalBtnActive: {
    background: '#f0f0ff',
    borderColor: '#6366f1',
  },
  goalIcon: {
    fontSize: 24,
  },
  goalLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: 500,
    color: '#1e293b',
  },
  goalCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    background: '#6366f1',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
  },

  // Counter
  counterRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    background: 'white',
    padding: '16px',
    borderRadius: 14,
    border: '2px solid #e2e8f0',
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: '#f1f5f9',
    border: 'none',
    fontSize: 24,
    color: '#64748b',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1e293b',
    minWidth: 40,
    textAlign: 'center',
  },

  // Comfort Options
  comfortOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  comfortBtn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '18px 20px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  comfortBtnActive: {
    background: '#f0f0ff',
    borderColor: '#6366f1',
  },
  comfortLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
  },
  comfortDesc: {
    fontSize: 13,
    color: '#94a3b8',
  },

  // Completion Note
  completionNote: {
    display: 'flex',
    gap: 16,
    padding: 20,
    background: '#ecfdf5',
    borderRadius: 16,
    marginTop: 20,
  },
  completionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#065f46',
    marginBottom: 4,
  },
  completionText: {
    fontSize: 14,
    color: '#047857',
    lineHeight: 1.5,
  },
};
