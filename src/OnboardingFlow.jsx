import React from 'react';
import styles from './styles';

export default function OnboardingFlow({ 
  step, 
  setStep, 
  formData, 
  updateForm, 
  toggleArrayItem, 
  onComplete,
  onExit 
}) {
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

  const handleBack = () => {
    if (step === 0) {
      onExit();
    } else {
      prevStep();
    }
  };

  return (
    <div style={styles.onboardingContainer}>
      <div style={styles.onboardingGradient} />
      
      {/* Progress Header */}
      <header style={styles.onboardingHeader}>
        <button style={styles.backBtn} onClick={handleBack}>
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
        {step === 0 && (
          <StepBasics formData={formData} updateForm={updateForm} />
        )}
        {step === 1 && (
          <StepMoney 
            formData={formData} 
            updateForm={updateForm} 
            toggleArrayItem={toggleArrayItem} 
          />
        )}
        {step === 2 && (
          <StepGoals 
            formData={formData} 
            updateForm={updateForm} 
            toggleArrayItem={toggleArrayItem} 
          />
        )}
        {step === 3 && (
          <StepContext formData={formData} updateForm={updateForm} />
        )}
        {step === 4 && (
          <StepHuman formData={formData} updateForm={updateForm} />
        )}
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

// ===========================================
// Step 1: Let's start simple
// ===========================================
function StepBasics({ formData, updateForm }) {
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

// ===========================================
// Step 2: Your money right now
// ===========================================
function StepMoney({ formData, updateForm, toggleArrayItem }) {
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
                  <span style={{
                    ...styles.checkbox,
                    ...(formData.debtTypes.includes(type) ? styles.checkboxActive : {})
                  }}>
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

// ===========================================
// Step 3: What are you working toward?
// ===========================================
function StepGoals({ formData, updateForm, toggleArrayItem }) {
  const goals = [
    { id: 'debt', label: 'Getting out of debt', icon: '🔓' },
    { id: 'emergency', label: 'Building an emergency cushion', icon: '🛡️' },
    { id: 'saving', label: 'Saving for something specific', icon: '🎯' },
    { id: 'kids', label: "My kids' future", icon: '👨‍👧‍👦' },
    { id: 'retire', label: 'Retiring someday without panic', icon: '🏖️' },
    { id: 'breathing', label: 'Just... breathing room', icon: '💨' },
    { id: 'wealth', label: 'Growing wealth long term', icon: '📈' },
    { id: 'other', label: 'Something else', icon: '✨' }
  ];

  return (
    <div style={styles.stepContent}>
      <h1 style={styles.stepTitle}>What are you working toward?</h1>
      <p style={styles.stepSubtitle}>Pick up to 3 things that matter most right now.</p>

      <div style={styles.formGroup}>
        <div style={styles.goalGrid}>
          {goals.map(goal => (
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

// ===========================================
// Step 4: A few things that help us help you
// ===========================================
function StepContext({ formData, updateForm }) {
  const comfortOptions = [
    { id: 'guide', label: 'I need a lot of guidance', desc: 'Walk me through everything' },
    { id: 'collab', label: 'I like collaboration', desc: 'You advise, I decide' },
    { id: 'handle', label: 'Just handle it for me', desc: "I trust you to do what's right" }
  ];

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
          {comfortOptions.map(option => (
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

// ===========================================
// Step 5: One more thing
// ===========================================
function StepHuman({ formData, updateForm }) {
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
