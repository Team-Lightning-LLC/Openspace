import React, { useState, useRef, useEffect } from 'react';

// ============================================
// KUMO CLOUD IMAGE
// ============================================
const KUMO_URL = 'https://i.imgur.com/oWuVYXz.png';

// ============================================
// COLORS & DESIGN TOKENS
// ============================================
const colors = {
  indigo: '#818cf8',
  indigoDeep: '#6366f1',
  sky: '#38bdf8',
  skyDeep: '#0ea5e9',
  text: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  bgLight: '#f1f5f9',
  bgPage: '#f8fafc',
  white: '#ffffff',
  success: '#10b981',
  successLight: '#ecfdf5',
  warning: '#f59e0b',
  error: '#ef4444',
};

const gradients = {
  primary: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
  background: 'linear-gradient(180deg, #e0e7ff 0%, #e0f2fe 30%, #f0f9ff 60%, #f8fafc 100%)',
};

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', work: '',
    incomeStability: '', income: '', savings: '',
    hasDebt: null, debtTypes: [], debtStress: '',
    goals: [], dependents: false, dependentCount: '',
    lifeEvents: [], decisionComfort: '', changeWish: '', anythingElse: '',
  });
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [savedChats, setSavedChats] = useState([]);

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  
  const toggleGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : prev.goals.length < 3 ? [...prev.goals, goal] : prev.goals
    }));
  };

  const navigate = (view, tab = null) => {
    setCurrentView(view);
    if (tab) setActiveTab(tab);
  };

  // Render based on current view
  if (currentView === 'onboarding') {
    return (
      <OnboardingFlow
        step={onboardingStep}
        setStep={setOnboardingStep}
        formData={formData}
        updateForm={updateForm}
        toggleGoal={toggleGoal}
        onComplete={() => { setIsOnboarded(true); navigate('home', 'home'); }}
        onExit={() => navigate('home')}
      />
    );
  }

  if (currentView === 'advisor') {
    return (
      <AdvisorChat
        userName={formData.name}
        userProfile={formData}
        onBack={() => navigate('home', 'home')}
        onSaveChat={(chat) => setSavedChats(prev => [...prev, chat])}
      />
    );
  }

  if (currentView === 'messages') {
    return <MessagesView savedChats={savedChats} onBack={() => navigate('home', 'home')} />;
  }

  // Main app with tabs
  return (
    <div style={styles.container}>
      {/* Full-height gradient background */}
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
            <BellIcon />
            <span style={styles.notificationDot} />
          </button>
          <div style={styles.avatar}>
            {formData.name ? formData.name.charAt(0).toUpperCase() : 'O'}
          </div>
        </div>
      </header>

      {/* Nav Pills */}
      <nav style={styles.navPills}>
        {[
          { id: 'home', label: 'Home', icon: <HomeIcon /> },
          { id: 'plan', label: 'Plan', icon: <PlanIcon /> },
          { id: 'learn', label: 'Learn', icon: <LearnIcon /> },
          { id: 'progress', label: 'Progress', icon: <ProgressIcon /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.navPill,
              ...(activeTab === tab.id ? styles.navPillActive : {})
            }}
          >
            {React.cloneElement(tab.icon, { 
              color: activeTab === tab.id ? colors.text : colors.textSecondary 
            })}
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {activeTab === 'home' && (
          <HomeTab
            userName={formData.name}
            isOnboarded={isOnboarded}
            linkedAccounts={linkedAccounts}
            onStartOnboarding={() => { setOnboardingStep(0); navigate('onboarding'); }}
            onOpenChat={() => navigate('advisor')}
            onLinkAccounts={() => setLinkedAccounts(['chase', 'bofa'])}
          />
        )}
        {activeTab === 'plan' && (
          <PlanTab userProfile={formData} isOnboarded={isOnboarded} />
        )}
        {activeTab === 'learn' && (
          <LearnTab />
        )}
        {activeTab === 'progress' && (
          <ProgressTab userProfile={formData} linkedAccounts={linkedAccounts} />
        )}
      </main>

      {/* Bottom Nav */}
      <nav style={styles.bottomNav}>
        <button style={styles.bottomNavItem} onClick={() => { setActiveTab('home'); }}>
          <HomeIcon color={activeTab === 'home' ? colors.indigo : colors.textMuted} />
          <span style={{ ...styles.bottomNavLabel, color: activeTab === 'home' ? colors.indigo : colors.textMuted }}>Home</span>
        </button>
        <button style={styles.bottomNavItem} onClick={() => navigate('advisor')}>
          <img src={KUMO_URL} alt="" style={{ width: 22, height: 22, objectFit: 'contain', opacity: 0.6 }} />
          <span style={styles.bottomNavLabel}>Advisor</span>
        </button>
        <button style={styles.bottomNavItem} onClick={() => navigate('messages')}>
          <MailIcon color={colors.textMuted} />
          <span style={styles.bottomNavLabel}>Messages</span>
          {savedChats.length > 0 && <span style={styles.bottomNavBadge}>{savedChats.length}</span>}
        </button>
      </nav>
    </div>
  );
}

// ============================================
// HOME TAB
// ============================================
function HomeTab({ userName, isOnboarded, linkedAccounts, onStartOnboarding, onOpenChat, onLinkAccounts }) {
  const hasLinkedAccounts = linkedAccounts.length > 0;

  return (
    <>
      {userName && (
        <div style={styles.greeting}>
          <h2 style={styles.greetingText}>Welcome back, {userName}</h2>
        </div>
      )}

      {/* Advisor Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardHeaderLeft}>
            <div style={{ ...styles.cardIconBox, background: colors.successLight }}>
              <ClockIcon color={colors.success} />
            </div>
            <span style={styles.cardLabel}>Next check-in with</span>
          </div>
          <button style={styles.menuBtn}><MoreVertIcon /></button>
        </div>

        <div style={styles.advisorRow}>
          <div style={styles.advisorAvatar}>
            <img src={KUMO_URL} alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
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

        <p style={styles.recommendText}>We recommend check-ins at least <strong>once a quarter</strong>.</p>

        <button style={styles.secondaryBtn}>Reschedule</button>
        <button style={styles.primaryBtn} onClick={onOpenChat}>
          <ChatIcon color={colors.white} />
          Talk to advisor now
        </button>
      </div>

      {/* Snapshot Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardHeaderLeft}>
            <div style={{ ...styles.cardIconBox, background: '#eef2ff' }}>
              <CardIcon color={colors.indigo} />
            </div>
            <span style={{ ...styles.cardLabel, fontWeight: 600, color: colors.text }}>Your Snapshot</span>
          </div>
        </div>
        <div style={styles.snapshotGrid}>
          <SnapshotItem label="Net Worth" value={hasLinkedAccounts ? '$12,450' : '—'} />
          <SnapshotItem label="Monthly Surplus" value={hasLinkedAccounts ? '$420' : '—'} />
          <SnapshotItem label="Goal Progress" value={hasLinkedAccounts ? '34%' : '—'} />
          <SnapshotItem label="Safety Score" value={hasLinkedAccounts ? '72' : '—'} />
        </div>
        {!hasLinkedAccounts && (
          <p style={styles.snapshotHint}>{isOnboarded ? 'Link accounts to see your numbers' : 'Complete onboarding to get started'}</p>
        )}
      </div>

      {/* Tasks Card */}
      <div style={styles.card}>
        <div style={{ ...styles.cardLabel, fontWeight: 600, color: colors.text, marginBottom: 12 }}>Getting Started</div>
        <TaskItem 
          label="Complete your profile" 
          status={isOnboarded ? 'done' : 'urgent'} 
          done={isOnboarded}
          onClick={!isOnboarded ? onStartOnboarding : undefined}
        />
        <TaskItem 
          label="Link your accounts" 
          status={hasLinkedAccounts ? 'done' : isOnboarded ? 'urgent' : 'pending'} 
          done={hasLinkedAccounts}
          onClick={isOnboarded && !hasLinkedAccounts ? onLinkAccounts : undefined}
        />
        <TaskItem label="Set your first goal" status="pending" done={false} isLast />
      </div>
    </>
  );
}

// ============================================
// PLAN TAB (with real content!)
// ============================================
function PlanTab({ userProfile, isOnboarded }) {
  const milestones = [
    { id: 1, title: 'Build $1,000 Emergency Buffer', target: '$1,000', current: '$650', progress: 65, status: 'active' },
    { id: 2, title: 'Pay Off Credit Card', target: '$3,200', current: '$2,100 remaining', progress: 34, status: 'upcoming' },
    { id: 3, title: 'Expand Emergency Fund to 3 Months', target: '$9,000', current: '$0', progress: 0, status: 'future' },
  ];

  const monthlyActions = [
    { id: 1, title: 'Auto-transfer $200 to savings', frequency: '1st of month', done: true },
    { id: 2, title: 'Extra $50 to credit card', frequency: '15th of month', done: false },
    { id: 3, title: 'Review subscriptions', frequency: 'This month', done: false },
  ];

  return (
    <>
      <div style={styles.greeting}>
        <h2 style={styles.greetingText}>Your Financial Plan</h2>
        <p style={{ fontSize: 15, color: colors.textSecondary, marginTop: 4 }}>Your personalized roadmap based on your goals.</p>
      </div>

      {/* Current Focus */}
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>🎯</span>
          <div>
            <div style={{ fontSize: 13, color: colors.textSecondary, fontWeight: 500 }}>CURRENT FOCUS</div>
            <div style={{ fontSize: 17, fontWeight: 600, color: colors.text }}>Build Emergency Buffer</div>
          </div>
        </div>
        <div style={styles.progressBarLarge}>
          <div style={{ ...styles.progressFill, width: '65%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 14, color: colors.textSecondary }}>$650 saved</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.indigo }}>$1,000 goal</span>
        </div>
        <p style={{ fontSize: 14, color: colors.textSecondary, marginTop: 16, lineHeight: 1.5 }}>
          At your current pace, you will hit this milestone in <strong>5 weeks</strong>. Keep it up!
        </p>
      </div>

      {/* Monthly Actions */}
      <div style={styles.card}>
        <div style={{ ...styles.cardLabel, fontWeight: 600, color: colors.text, marginBottom: 16 }}>This Month's Actions</div>
        {monthlyActions.map((action, i) => (
          <div key={action.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 0',
            borderBottom: i < monthlyActions.length - 1 ? `1px solid ${colors.bgLight}` : 'none',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 8,
              border: action.done ? 'none' : `2px solid ${colors.border}`,
              background: action.done ? colors.success : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {action.done && <CheckIcon color={colors.white} size={14} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: action.done ? colors.textMuted : colors.text, textDecoration: action.done ? 'line-through' : 'none' }}>
                {action.title}
              </div>
              <div style={{ fontSize: 13, color: colors.textMuted }}>{action.frequency}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div style={styles.card}>
        <div style={{ ...styles.cardLabel, fontWeight: 600, color: colors.text, marginBottom: 16 }}>Your Milestones</div>
        {milestones.map((milestone, i) => (
          <div key={milestone.id} style={{
            padding: '16px 0',
            borderBottom: i < milestones.length - 1 ? `1px solid ${colors.bgLight}` : 'none',
            opacity: milestone.status === 'future' ? 0.5 : 1,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: colors.text }}>{milestone.title}</span>
              <span style={{ 
                fontSize: 12, fontWeight: 600, 
                color: milestone.status === 'active' ? colors.indigo : colors.textMuted,
                textTransform: 'uppercase',
              }}>
                {milestone.status === 'active' ? '● Active' : milestone.status === 'upcoming' ? 'Up Next' : 'Future'}
              </span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${milestone.progress}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 13, color: colors.textMuted }}>{milestone.current}</span>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>{milestone.target}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ============================================
// LEARN TAB
// ============================================
function LearnTab() {
  const articles = [
    { id: 1, title: 'Emergency Funds 101', time: '5 min', icon: '🛡️', tag: 'Recommended' },
    { id: 2, title: 'Understanding Credit Scores', time: '7 min', icon: '📊', tag: null },
    { id: 3, title: 'Debt Payoff Strategies', time: '6 min', icon: '💳', tag: null },
    { id: 4, title: 'Budgeting That Actually Works', time: '8 min', icon: '📝', tag: 'Popular' },
  ];

  return (
    <>
      <div style={styles.greeting}>
        <h2 style={styles.greetingText}>Learn</h2>
        <p style={{ fontSize: 15, color: colors.textSecondary, marginTop: 4 }}>Build your financial knowledge.</p>
      </div>

      <div style={styles.card}>
        <div style={{ ...styles.cardLabel, fontWeight: 600, color: colors.text, marginBottom: 16 }}>Recommended for You</div>
        {articles.map((article, i) => (
          <button key={article.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%', padding: '14px 0', background: 'none', border: 'none',
            borderBottom: i < articles.length - 1 ? `1px solid ${colors.bgLight}` : 'none',
            cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ fontSize: 28 }}>{article.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: colors.text }}>{article.title}</div>
              <div style={{ fontSize: 13, color: colors.textMuted }}>{article.time} read</div>
            </div>
            {article.tag && (
              <span style={{
                fontSize: 11, fontWeight: 600, color: colors.indigo,
                background: '#eef2ff', padding: '4px 8px', borderRadius: 6,
              }}>{article.tag}</span>
            )}
            <ChevronIcon color={colors.textMuted} />
          </button>
        ))}
      </div>
    </>
  );
}

// ============================================
// PROGRESS TAB
// ============================================
function ProgressTab({ userProfile, linkedAccounts }) {
  const hasData = linkedAccounts.length > 0;

  return (
    <>
      <div style={styles.greeting}>
        <h2 style={styles.greetingText}>Your Progress</h2>
      </div>

      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>Safety Score</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: hasData ? colors.indigo : colors.border }}>
            {hasData ? '72' : '—'}
          </span>
        </div>
        {hasData && (
          <div style={styles.progressBarLarge}>
            <div style={{ ...styles.progressFill, width: '72%' }} />
          </div>
        )}
        {!hasData && <p style={{ fontSize: 14, color: colors.textMuted, textAlign: 'center' }}>Link accounts to see your score</p>}
      </div>

      <div style={styles.card}>
        <div style={{ ...styles.cardLabel, fontWeight: 600, color: colors.text, marginBottom: 16 }}>Net Worth</div>
        <span style={{ fontSize: 36, fontWeight: 700, color: hasData ? colors.text : colors.border }}>
          {hasData ? '$12,450' : '—'}
        </span>
        {hasData && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span style={{ color: colors.success, fontSize: 14, fontWeight: 600 }}>↑ $420</span>
            <span style={{ color: colors.textMuted, fontSize: 14 }}>this month</span>
          </div>
        )}
      </div>

      {userProfile?.goals?.length > 0 && (
        <div style={styles.card}>
          <div style={{ ...styles.cardLabel, fontWeight: 600, color: colors.text, marginBottom: 16 }}>Goals Progress</div>
          {userProfile.goals.map((goal, i) => (
            <div key={goal} style={{ marginBottom: i < userProfile.goals.length - 1 ? 16 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: colors.text }}>{formatGoalName(goal)}</span>
                <span style={{ fontSize: 14, color: colors.textMuted }}>{hasData ? '34%' : '0%'}</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: hasData ? '34%' : '0%' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ============================================
// ONBOARDING FLOW
// ============================================
function OnboardingFlow({ step, setStep, formData, updateForm, toggleGoal, onComplete, onExit }) {
  const TOTAL_STEPS = 5;

  const canContinue = () => {
    switch (step) {
      case 0: return formData.name && formData.email;
      case 1: return formData.income && formData.savings;
      case 2: return formData.hasDebt !== null && (formData.hasDebt === false || formData.debtStress);
      case 3: return formData.goals.length >= 1;
      default: return true;
    }
  };

  const handleContinue = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div style={{ ...styles.container, display: 'flex', flexDirection: 'column' }}>
      <div style={styles.backgroundGradient} />
      
      {/* Header */}
      <header style={styles.onboardingHeader}>
        <button style={styles.backBtn} onClick={() => step > 0 ? setStep(step - 1) : onExit()}>
          <ChevronLeftIcon color={colors.text} />
        </button>
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
          </div>
          <span style={styles.progressText}>{step + 1} of {TOTAL_STEPS}</span>
        </div>
        <div style={{ width: 44 }} />
      </header>

      {/* Content */}
      <main style={styles.onboardingMain}>
        {step === 0 && <Step1 formData={formData} updateForm={updateForm} />}
        {step === 1 && <Step2 formData={formData} updateForm={updateForm} />}
        {step === 2 && <Step3 formData={formData} updateForm={updateForm} />}
        {step === 3 && <Step4 formData={formData} toggleGoal={toggleGoal} />}
        {step === 4 && <Step5 formData={formData} updateForm={updateForm} />}
      </main>

      {/* Footer */}
      <div style={styles.onboardingFooter}>
        <button
          style={{ ...styles.primaryBtn, opacity: canContinue() ? 1 : 0.5 }}
          onClick={handleContinue}
          disabled={!canContinue()}
        >
          {step === TOTAL_STEPS - 1 ? 'Complete Setup' : 'Continue'}
          <ChevronIcon color={colors.white} />
        </button>
      </div>
    </div>
  );
}

function Step1({ formData, updateForm }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Let's start simple</h1>
      <p style={styles.stepSubtitle}>Just the basics so we know who we're talking to.</p>
      <FormGroup label="What should we call you?">
        <input style={styles.input} placeholder="Your first name" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
      </FormGroup>
      <FormGroup label="How can we reach you?">
        <input style={{ ...styles.input, marginBottom: 12 }} type="email" placeholder="Email address" value={formData.email} onChange={e => updateForm('email', e.target.value)} />
        <input style={styles.input} type="tel" placeholder="Phone number (optional)" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} />
      </FormGroup>
      <FormGroup label="What do you do for work?">
        <input style={styles.input} placeholder="e.g., Teacher, Nurse, Freelancer..." value={formData.work} onChange={e => updateForm('work', e.target.value)} />
      </FormGroup>
    </div>
  );
}

function Step2({ formData, updateForm }) {
  const incomeOptions = ['Under $30K', '$30K - $50K', '$50K - $75K', '$75K - $100K', '$100K - $150K', '$150K+'];
  const savingsOptions = ['Under $1K', '$1K - $5K', '$5K - $15K', '$15K - $50K', '$50K - $100K', '$100K+'];

  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Your money right now</h1>
      <p style={styles.stepSubtitle}>A rough picture is all we need. No judgment here.</p>
      <FormGroup label="Roughly, what do you earn per year after taxes?">
        <div style={styles.optionGrid}>
          {incomeOptions.map(opt => (
            <button key={opt} onClick={() => updateForm('income', opt)} style={{ ...styles.optionBtn, ...(formData.income === opt ? styles.optionBtnActive : {}) }}>{opt}</button>
          ))}
        </div>
      </FormGroup>
      <FormGroup label="How much do you have saved — all accounts combined?">
        <div style={styles.optionGrid}>
          {savingsOptions.map(opt => (
            <button key={opt} onClick={() => updateForm('savings', opt)} style={{ ...styles.optionBtn, ...(formData.savings === opt ? styles.optionBtnActive : {}) }}>{opt}</button>
          ))}
        </div>
      </FormGroup>
    </div>
  );
}

function Step3({ formData, updateForm }) {
  const stressOptions = ['Not at all', 'A little', 'Moderately', 'Yes, significantly'];

  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Let's talk about debt</h1>
      <p style={styles.stepSubtitle}>Understanding your situation helps us give better guidance.</p>
      <FormGroup label="Do you have any debt right now?">
        <div style={{ ...styles.optionGrid, gridTemplateColumns: '1fr 1fr' }}>
          <button onClick={() => updateForm('hasDebt', true)} style={{ ...styles.optionBtn, ...(formData.hasDebt === true ? styles.optionBtnActive : {}) }}>Yes</button>
          <button onClick={() => updateForm('hasDebt', false)} style={{ ...styles.optionBtn, ...(formData.hasDebt === false ? styles.optionBtnActive : {}) }}>No</button>
        </div>
      </FormGroup>
      {formData.hasDebt && (
        <FormGroup label="Does your debt cause you stress?">
          <div style={styles.goalGrid}>
            {stressOptions.map(opt => (
              <button key={opt} onClick={() => updateForm('debtStress', opt)} style={{ ...styles.goalBtn, ...(formData.debtStress === opt ? styles.goalBtnActive : {}) }}>
                <span style={styles.goalLabel}>{opt}</span>
                {formData.debtStress === opt && <span style={styles.goalCheck}>✓</span>}
              </button>
            ))}
          </div>
        </FormGroup>
      )}
    </div>
  );
}

function Step4({ formData, toggleGoal }) {
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
        {goals.map(goal => (
          <button key={goal.id} onClick={() => toggleGoal(goal.id)} style={{ ...styles.goalBtn, ...(formData.goals.includes(goal.id) ? styles.goalBtnActive : {}) }}>
            <span style={{ fontSize: 24 }}>{goal.icon}</span>
            <span style={styles.goalLabel}>{goal.label}</span>
            {formData.goals.includes(goal.id) && <span style={styles.goalCheck}>✓</span>}
          </button>
        ))}
      </div>
      <p style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: 16 }}>{formData.goals.length}/3 selected</p>
    </div>
  );
}

function Step5({ formData, updateForm }) {
  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>Almost there</h1>
      <p style={styles.stepSubtitle}>Anything else you want your advisor to know?</p>
      <FormGroup label="If you could change one thing about your finances, what would it be?">
        <textarea style={styles.textarea} rows={3} placeholder="e.g., I wish I knew where all my money goes..." value={formData.changeWish} onChange={e => updateForm('changeWish', e.target.value)} />
      </FormGroup>
      <div style={styles.completionNote}>
        <span style={{ fontSize: 24 }}>✨</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#065f46' }}>You're all set!</div>
          <div style={{ fontSize: 14, color: '#047857' }}>After this, you will meet your AI Advisor.</div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ADVISOR CHAT (Full featured with limits)
// ============================================
const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES_PER_CHAT = 20;
const MAX_CHATS_PER_DAY = 10;
const STORAGE_KEY = 'openspace_advisor_usage';

function AdvisorChat({ userName, userProfile, onBack, onSaveChat }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Usage tracking
  const [usage, setUsage] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.date === new Date().toDateString()) return data;
      }
    } catch (e) {}
    return { date: new Date().toDateString(), chatsToday: 1 };
  });

  const totalMessageCount = messages.length;
  const messagesRemaining = MAX_MESSAGES_PER_CHAT - totalMessageCount;

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'advisor',
        content: `Hi${userName ? ` ${userName}` : ''}! I am here to help you navigate your day-to-day financial questions.\n\nFor meaningful changes to your overall approach, schedule time with your AI Advisor.`,
        time: new Date(),
        hasScheduleLink: true,
      }]);
      // Save usage
      const newUsage = { date: new Date().toDateString(), chatsToday: usage.chatsToday };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsage));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping || chatEnded) return;
    if (totalMessageCount >= MAX_MESSAGES_PER_CHAT - 1) {
      setChatEnded(true);
      return;
    }

    const userMsg = { role: 'user', content: inputValue.trim().slice(0, MAX_MESSAGE_LENGTH), time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getFallbackResponse(userMsg.content, userProfile);
      setMessages(prev => [...prev, { role: 'advisor', content: response, time: new Date() }]);
      setIsTyping(false);
      if (totalMessageCount + 2 >= MAX_MESSAGES_PER_CHAT) setChatEnded(true);
    }, 1200);
  };

  const handleEndChat = () => {
    setShowMenu(false);
    setShowSaveModal(true);
  };

  const handleSave = () => {
    if (onSaveChat) {
      onSaveChat({
        messages,
        timestamp: new Date(),
        summary: messages[1]?.content?.slice(0, 100) || 'Chat conversation',
      });
    }
    setShowSaveModal(false);
    onBack();
  };

  const handleDiscard = () => {
    setShowSaveModal(false);
    onBack();
  };

  // Render message content with schedule link
  const renderContent = (msg) => {
    if (msg.hasScheduleLink) {
      const parts = msg.content.split('schedule time with your AI Advisor');
      return (
        <>
          {parts[0]}
          <button style={styles.inlineLink} onClick={() => alert('Schedule modal would open')}>
            schedule time with your AI Advisor
          </button>
          {parts[1]}
        </>
      );
    }
    return msg.content;
  };

  return (
    <div style={{ ...styles.container, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={styles.chatHeader}>
        <button style={styles.backBtn} onClick={handleEndChat}><ChevronLeftIcon color={colors.text} /></button>
        <div style={styles.chatHeaderCenter}>
          <div style={styles.chatAvatar}>
            <img src={KUMO_URL} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>Daily Advisor</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>
              Chat {usage.chatsToday}/{MAX_CHATS_PER_DAY} · Msg {totalMessageCount}/{MAX_MESSAGES_PER_CHAT}
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <button style={styles.menuBtn} onClick={() => setShowMenu(!showMenu)}><MoreVertIcon /></button>
          {showMenu && (
            <div style={styles.dropdown}>
              <button style={styles.dropdownItem} onClick={() => { setShowMenu(false); setShowSaveModal(true); }}>
                <SaveIcon color={colors.textSecondary} /> Save chat
              </button>
              <button style={{ ...styles.dropdownItem, borderBottom: 'none' }} onClick={handleEndChat}>
                <CloseCircleIcon color={colors.textSecondary} /> End chat
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Messages */}
      <div style={styles.chatMessages}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12, alignItems: 'flex-end' }}>
            {msg.role === 'advisor' && (
              <div style={styles.chatMsgAvatar}>
                <img src={KUMO_URL} alt="" style={{ width: 16, height: 16, objectFit: 'contain' }} />
              </div>
            )}
            <div style={msg.role === 'user' ? styles.userBubble : styles.advisorBubble}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{renderContent(msg)}</p>
              <span style={{ fontSize: 11, opacity: 0.7, display: 'block', marginTop: 6 }}>
                {msg.time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={styles.chatMsgAvatar}><img src={KUMO_URL} alt="" style={{ width: 16, height: 16 }} /></div>
            <div style={styles.advisorBubble}><TypingDots /></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 2 && !chatEnded && (
        <div style={styles.quickPrompts}>
          {['How am I doing?', 'Help with debt', 'Is this worth buying?'].map(p => (
            <button key={p} style={styles.quickPromptBtn} onClick={() => setInputValue(p)}>{p}</button>
          ))}
        </div>
      )}

      {/* Input */}
      {!chatEnded ? (
        <div style={styles.chatInputArea}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: messagesRemaining <= 4 ? colors.warning : colors.textMuted }}>
              {messagesRemaining} messages left
            </span>
          </div>
          <div style={styles.chatInputWrapper}>
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Ask anything..."
              rows={1}
              style={styles.chatInput}
            />
            <button style={{ ...styles.sendBtn, opacity: inputValue.trim() ? 1 : 0.5 }} onClick={handleSend} disabled={!inputValue.trim()}>
              <SendIcon color={colors.white} />
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: colors.textMuted }}>
            {inputValue.length}/{MAX_MESSAGE_LENGTH}
          </div>
        </div>
      ) : (
        <div style={styles.chatInputArea}>
          <p style={{ textAlign: 'center', color: colors.textSecondary, marginBottom: 16 }}>This chat has ended</p>
          <button style={styles.primaryBtn} onClick={() => setShowSaveModal(true)}>Save & Close</button>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div style={styles.modalOverlay} onClick={() => setShowSaveModal(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalIcon}>
              <SaveIcon color={colors.success} size={32} />
            </div>
            <h3 style={styles.modalTitle}>Save this chat?</h3>
            <p style={styles.modalText}>We will send a summary to your Message Center so you can reference it later.</p>
            <button style={styles.primaryBtn} onClick={handleSave}>Save & Close</button>
            <button style={styles.textBtn} onClick={handleDiscard}>Discard</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MESSAGES VIEW (Full featured with filters)
// ============================================
function MessagesView({ savedChats, onBack }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const defaultMessages = [
    { id: 1, type: 'insight', title: 'Monthly spending pattern detected', preview: "I noticed your grocery spending increased by 15% this month. Want to take a look together?", time: '2h ago', unread: true, icon: '💡' },
    { id: 2, type: 'reminder', title: 'Quarterly check-in coming up', preview: "Your next check-in is scheduled for March 15. We'll review your progress and adjust your plan.", time: '1d ago', unread: true, icon: '📅' },
    { id: 3, type: 'alert', title: 'Large transaction detected', preview: "A $450 transaction was made at Best Buy. Just making sure this was you!", time: '3d ago', unread: false, icon: '🔔' },
    { id: 4, type: 'milestone', title: "Congrats! You hit a milestone 🎉", preview: "You've paid off $2,000 in debt since starting. That's real progress!", time: '1w ago', unread: false, icon: '🏆' },
    { id: 5, type: 'education', title: 'New lesson available', preview: "Based on your goals, I think you'd find 'Understanding Credit Scores' helpful.", time: '1w ago', unread: false, icon: '📚' },
  ];

  // Add saved chats to messages
  const allMessages = [
    ...savedChats.map((chat, i) => ({
      id: `chat-${i}`,
      type: 'chat',
      title: 'Chat summary saved',
      preview: chat.summary,
      time: chat.timestamp ? formatTimeAgo(chat.timestamp) : 'Recently',
      unread: true,
      icon: '💬'
    })),
    ...defaultMessages
  ];

  const filteredMessages = activeFilter === 'all' 
    ? allMessages 
    : allMessages.filter(m => m.type === activeFilter);

  const unreadCount = allMessages.filter(m => m.unread).length;

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGradient} />

      {/* Header */}
      <header style={styles.messagesHeader}>
        <button style={styles.backBtn} onClick={onBack}>
          <ChevronLeftIcon color={colors.textSecondary} />
        </button>
        <span style={styles.messagesTitle}>Messages</span>
        <button style={styles.markAllBtn} onClick={() => alert('All marked as read')}>
          Mark all read
        </button>
      </header>

      {/* Filter Pills */}
      <div style={styles.filterPills}>
        {[
          { id: 'all', label: `All${unreadCount > 0 ? ` (${unreadCount})` : ''}` },
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
                onClick={() => alert(`Opening: ${message.title}`)}
              >
                <div style={styles.messageIconBox}>{message.icon}</div>
                <div style={styles.messageContent}>
                  <div style={styles.messageItemHeader}>
                    <span style={{
                      ...styles.messageItemTitle,
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
            <p style={{ color: colors.textMuted }}>No messages in this category</p>
          </div>
        )}

        {/* Communication Preferences */}
        <div style={styles.preferencesCard}>
          <h3 style={styles.preferencesTitle}>Communication preferences</h3>
          <p style={styles.preferencesText}>
            We'll only message you about things that matter. You can adjust notification settings anytime.
          </p>
          <button style={styles.preferencesBtn} onClick={() => alert('Opening preferences')}>
            Manage preferences
          </button>
        </div>
      </main>
    </div>
  );
}

function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

// ============================================
// HELPER COMPONENTS
// ============================================
function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

function SnapshotItem({ label, value }) {
  return (
    <div>
      <span style={{ fontSize: 13, color: colors.textSecondary }}>{label}</span>
      <span style={{ display: 'block', fontSize: 22, fontWeight: 700, color: value === '—' ? colors.border : colors.text }}>{value}</span>
    </div>
  );
}

function TaskItem({ label, status, done, onClick, isLast }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 0',
      background: 'none', border: 'none', borderBottom: isLast ? 'none' : `1px solid ${colors.bgLight}`,
      cursor: onClick ? 'pointer' : 'default', textAlign: 'left',
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 8, border: done ? 'none' : `2px solid ${colors.border}`,
        background: done ? colors.success : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {done && <CheckIcon color={colors.white} size={14} />}
      </div>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: done ? colors.textMuted : colors.text, textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
        <span style={{ display: 'block', fontSize: 13, color: status === 'done' ? colors.success : status === 'urgent' ? colors.warning : colors.textMuted }}>
          {status === 'done' ? 'Done' : status === 'urgent' ? '⚡ Get started' : 'Coming up'}
        </span>
      </div>
      {onClick && <ChevronIcon color={colors.textMuted} />}
    </button>
  );
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 8, height: 8, borderRadius: '50%', background: colors.textMuted,
          animation: 'pulse 1.4s infinite', animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

// ============================================
// ICONS
// ============================================
function HomeIcon({ color = colors.textSecondary }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function PlanIcon({ color = colors.textSecondary }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function LearnIcon({ color = colors.textSecondary }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
}
function ProgressIcon({ color = colors.textSecondary }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function BellIcon({ color = colors.textSecondary }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}
function ChatIcon({ color = colors.textSecondary }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
function MailIcon({ color = colors.textSecondary, size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function CardIcon({ color = colors.textSecondary }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
}
function ClockIcon({ color = colors.textSecondary }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function MoreVertIcon({ color = colors.textMuted }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>;
}
function ChevronIcon({ color = colors.textMuted }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;
}
function ChevronLeftIcon({ color = colors.text }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
}
function CheckIcon({ color = colors.white, size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
}
function SendIcon({ color = colors.white }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
}
function SaveIcon({ color = colors.success, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
}
function CloseCircleIcon({ color = colors.textSecondary }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
}

// ============================================
// HELPERS
// ============================================
function formatGoalName(goal) {
  const names = { emergency: 'Emergency Fund', debt: 'Pay Off Debt', invest: 'Start Investing', retire: 'Retirement', home: 'Save for Home', breathing: 'Breathing Room' };
  return names[goal] || goal;
}

function getFallbackResponse(msg, profile) {
  const lower = msg.toLowerCase();
  if (lower.includes('debt')) return `I hear that debt is on your mind. Here is what helps: focus on one card at a time, usually the highest interest rate first. Even $25 extra per month makes a difference.`;
  if (lower.includes('doing') || lower.includes('how')) return `Here is what matters: Are you ending each month with something left over, even $50? That is the foundation. How does a typical month look?`;
  if (lower.includes('buy') || lower.includes('worth')) return `When thinking through a purchase: "Will I still be glad I bought this in 2 weeks?" If yes, does it fit the budget without stress?`;
  return `I want to make sure I am helpful here. Could you tell me more about what is prompting this question?`;
}

// ============================================
// STYLES
// ============================================
const styles = {
  container: { minHeight: '100vh', background: colors.bgPage, position: 'relative', maxWidth: 430, margin: '0 auto', fontFamily: "'DM Sans', -apple-system, sans-serif" },
  backgroundGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: gradients.background, zIndex: 0 },
  
  // Header
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', position: 'relative', zIndex: 1 },
  logoContainer: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: { width: 40, height: 40, borderRadius: 12, background: gradients.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, boxShadow: '0 4px 16px rgba(99,102,241,0.25)' },
  logoImage: { width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' },
  logoText: { fontSize: 22, fontWeight: 700, color: colors.text, letterSpacing: -0.5 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12 },
  notificationBtn: { width: 44, height: 44, borderRadius: 12, background: colors.white, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  notificationDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: '50%', background: colors.error },
  avatar: { width: 44, height: 44, borderRadius: 12, background: gradients.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.white, fontWeight: 600, fontSize: 16, boxShadow: '0 4px 16px rgba(99,102,241,0.25)' },

  // Nav Pills
  navPills: { display: 'flex', gap: 8, padding: '0 20px 20px', position: 'relative', zIndex: 1, overflowX: 'auto' },
  navPill: { display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', background: colors.white, border: 'none', borderRadius: 24, fontSize: 14, fontWeight: 500, color: colors.textSecondary, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  navPillActive: { background: colors.white, color: colors.text, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },

  // Main
  main: { padding: '0 20px 120px', position: 'relative', zIndex: 1 },
  greeting: { marginBottom: 20 },
  greetingText: { fontSize: 22, fontWeight: 600, color: colors.text },

  // Cards
  card: { background: colors.white, borderRadius: 20, padding: 24, marginBottom: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  cardHeaderLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  cardIconBox: { width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardLabel: { fontSize: 14, fontWeight: 500, color: colors.textSecondary },
  menuBtn: { width: 32, height: 32, borderRadius: 8, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },

  // Advisor row
  advisorRow: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 },
  advisorAvatar: { width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  advisorName: { fontSize: 17, fontWeight: 600, color: colors.text, marginBottom: 2 },
  advisorSubtext: { fontSize: 14, color: colors.textSecondary },
  dateRow: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 },
  dateHighlight: { fontSize: 18, fontWeight: 600, color: colors.indigo },
  timeText: { fontSize: 14, color: colors.textSecondary },
  recommendText: { fontSize: 14, color: colors.textSecondary, marginBottom: 20, lineHeight: 1.5 },

  // Snapshot
  snapshotGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  snapshotHint: { gridColumn: '1 / -1', fontSize: 13, color: colors.textMuted, textAlign: 'center', fontStyle: 'italic', marginTop: 12 },

  // Progress bars
  progressBar: { width: '100%', height: 6, background: colors.border, borderRadius: 3, overflow: 'hidden' },
  progressBarLarge: { width: '100%', height: 10, background: colors.border, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', background: gradients.primary, borderRadius: 3, transition: 'width 0.3s ease' },

  // Buttons
  primaryBtn: { width: '100%', padding: '14px 20px', background: gradients.primary, border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600, color: colors.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(99,102,241,0.25)' },
  secondaryBtn: { width: '100%', padding: '14px 20px', background: 'transparent', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600, color: colors.text, cursor: 'pointer', marginBottom: 8 },

  // Bottom Nav
  bottomNav: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: colors.white, display: 'flex', justifyContent: 'space-around', padding: '12px 20px 28px', borderTop: `1px solid ${colors.bgLight}`, zIndex: 100 },
  bottomNavItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '4px 16px' },
  bottomNavLabel: { fontSize: 12, fontWeight: 500, color: colors.textMuted },
  bottomNavBadge: { position: 'absolute', top: 0, right: 8, minWidth: 18, height: 18, background: colors.error, borderRadius: 9, color: colors.white, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' },

  // Onboarding
  onboardingHeader: { display: 'flex', alignItems: 'center', padding: '16px 20px', position: 'relative', zIndex: 1, gap: 16 },
  backBtn: { width: 44, height: 44, borderRadius: 12, background: colors.white, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  progressContainer: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  progressText: { fontSize: 13, color: colors.textSecondary, fontWeight: 500 },
  onboardingMain: { flex: 1, padding: '0 20px', position: 'relative', zIndex: 1, overflowY: 'auto', paddingBottom: 120 },
  onboardingFooter: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: 20, background: `linear-gradient(180deg, transparent 0%, ${colors.bgPage} 30%)`, zIndex: 10 },
  stepContent: { paddingTop: 20 },
  stepTitle: { fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: 8, letterSpacing: -0.5 },
  stepSubtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: 32, lineHeight: 1.5 },
  label: { display: 'block', fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 12 },
  input: { width: '100%', padding: '16px 18px', background: colors.white, border: `2px solid ${colors.border}`, borderRadius: 14, fontSize: 16, color: colors.text, outline: 'none', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '16px 18px', background: colors.white, border: `2px solid ${colors.border}`, borderRadius: 14, fontSize: 16, color: colors.text, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' },
  optionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  optionBtn: { padding: '14px 16px', background: colors.white, border: `2px solid ${colors.border}`, borderRadius: 12, fontSize: 14, fontWeight: 500, color: colors.textSecondary, cursor: 'pointer', textAlign: 'center' },
  optionBtnActive: { background: '#eef2ff', borderColor: colors.indigo, color: colors.indigo },
  goalGrid: { display: 'flex', flexDirection: 'column', gap: 10 },
  goalBtn: { display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', background: colors.white, border: `2px solid ${colors.border}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left' },
  goalBtnActive: { background: '#eef2ff', borderColor: colors.indigo },
  goalLabel: { flex: 1, fontSize: 15, fontWeight: 500, color: colors.text },
  goalCheck: { width: 24, height: 24, borderRadius: 12, background: colors.indigo, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 },
  completionNote: { display: 'flex', gap: 16, padding: 20, background: colors.successLight, borderRadius: 16, marginTop: 20 },

  // Chat
  chatHeader: { display: 'flex', alignItems: 'center', padding: '12px 16px', background: colors.white, borderBottom: `1px solid ${colors.bgLight}`, gap: 12 },
  chatHeaderCenter: { flex: 1, display: 'flex', alignItems: 'center', gap: 12 },
  chatAvatar: { width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  chatMessages: { flex: 1, padding: 16, overflowY: 'auto' },
  chatMsgAvatar: { width: 28, height: 28, borderRadius: 8, background: colors.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, flexShrink: 0 },
  userBubble: { maxWidth: '80%', padding: '12px 16px', borderRadius: 18, borderBottomRightRadius: 4, background: gradients.primary, color: colors.white },
  advisorBubble: { maxWidth: '80%', padding: '12px 16px', borderRadius: 18, borderBottomLeftRadius: 4, background: colors.white, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  quickPrompts: { padding: '0 16px 16px', display: 'flex', flexWrap: 'wrap', gap: 8 },
  quickPromptBtn: { padding: '10px 14px', background: colors.white, border: `1px solid ${colors.border}`, borderRadius: 20, fontSize: 13, color: colors.textSecondary, cursor: 'pointer' },
  chatInputArea: { padding: '12px 16px 28px', background: colors.white, borderTop: `1px solid ${colors.bgLight}` },
  chatInputWrapper: { display: 'flex', alignItems: 'flex-end', gap: 10, background: colors.bgPage, borderRadius: 16, padding: '8px 8px 8px 16px' },
  chatInput: { flex: 1, border: 'none', background: 'transparent', fontSize: 15, resize: 'none', outline: 'none', fontFamily: 'inherit', padding: '8px 0', color: colors.text },
  sendBtn: { width: 44, height: 44, borderRadius: 12, background: gradients.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' },

  // Dropdown
  dropdown: { position: 'absolute', top: '100%', right: 0, marginTop: 8, background: colors.white, borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', overflow: 'hidden', minWidth: 160, zIndex: 100 },
  dropdownItem: { display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '14px 16px', background: 'none', border: 'none', borderBottom: `1px solid ${colors.bgLight}`, fontSize: 14, color: colors.text, cursor: 'pointer', textAlign: 'left' },

  // Modal
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 1000 },
  modalContent: { background: colors.white, borderRadius: 24, padding: 28, maxWidth: 340, width: '100%', textAlign: 'center' },
  modalIcon: { width: 64, height: 64, borderRadius: 32, background: colors.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  modalTitle: { fontSize: 20, fontWeight: 600, color: colors.text, marginBottom: 12 },
  modalText: { fontSize: 15, color: colors.textSecondary, marginBottom: 24, lineHeight: 1.5 },
  textBtn: { width: '100%', padding: '14px 20px', background: 'transparent', border: 'none', fontSize: 15, fontWeight: 500, color: colors.textSecondary, cursor: 'pointer', marginTop: 8 },
  inlineLink: { background: 'none', border: 'none', color: colors.indigo, fontSize: 'inherit', fontWeight: 500, cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 },

  // Messages View
  messagesHeader: { display: 'flex', alignItems: 'center', padding: '16px 20px', position: 'relative', zIndex: 1, gap: 12 },
  messagesTitle: { flex: 1, fontSize: 20, fontWeight: 600, color: colors.text },
  markAllBtn: { background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: colors.indigo, cursor: 'pointer' },
  filterPills: { display: 'flex', gap: 8, padding: '0 20px 16px', position: 'relative', zIndex: 1, overflowX: 'auto' },
  filterPill: { padding: '8px 14px', background: colors.white, border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 500, color: colors.textSecondary, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  filterPillActive: { background: colors.text, color: colors.white },
  messagesMain: { padding: '0 20px 40px', position: 'relative', zIndex: 1 },
  messagesList: { display: 'flex', flexDirection: 'column', gap: 12 },
  messageItem: { display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, background: colors.white, border: 'none', borderRadius: 16, cursor: 'pointer', textAlign: 'left', width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'relative' },
  messageItemUnread: { background: '#fefefe', boxShadow: '0 2px 12px rgba(99,102,241,0.1)' },
  messageIconBox: { width: 40, height: 40, borderRadius: 12, background: colors.bgLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 },
  messageContent: { flex: 1, minWidth: 0 },
  messageItemHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 },
  messageItemTitle: { fontSize: 15, color: colors.text },
  messageTime: { fontSize: 12, color: colors.textMuted, flexShrink: 0 },
  messagePreview: { fontSize: 14, color: colors.textSecondary, lineHeight: 1.4, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
  unreadDot: { position: 'absolute', top: 16, right: 16, width: 8, height: 8, borderRadius: '50%', background: colors.indigo },
  emptyMessages: { textAlign: 'center', padding: 40 },
  preferencesCard: { marginTop: 24, padding: 20, background: colors.white, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  preferencesTitle: { fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 8 },
  preferencesText: { fontSize: 14, color: colors.textSecondary, lineHeight: 1.5, marginBottom: 16 },
  preferencesBtn: { padding: '10px 16px', background: 'none', border: `1px solid ${colors.border}`, borderRadius: 10, fontSize: 14, fontWeight: 500, color: colors.text, cursor: 'pointer' },
};
