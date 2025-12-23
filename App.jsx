import React, { useState } from 'react';
import HomePage from './HomePage';
import OnboardingFlow from './OnboardingFlow';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'onboarding'
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Basics
    name: '',
    email: '',
    phone: '',
    work: '',
    workYears: 5,
    incomeStability: '',
    
    // Step 2: Money snapshot
    income: '',
    savings: '',
    hasDebt: null,
    debtTypes: [],
    debtAmount: '',
    debtStress: '',
    
    // Step 3: Goals
    goals: [],
    retirementTimeline: 15,
    
    // Step 4: Life context
    dependents: null,
    dependentCount: 1,
    soleEarner: null,
    upcomingEvents: '',
    decisionComfort: '',
    
    // Step 5: Human layer
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

  const handleStartOnboarding = () => {
    setCurrentView('onboarding');
    setOnboardingStep(0);
  };

  const handleCompleteOnboarding = () => {
    // Here we would generate Profile documents from formData
    console.log('Onboarding complete. Form data:', formData);
    setCurrentView('home');
  };

  const handleExitOnboarding = () => {
    setCurrentView('home');
  };

  if (currentView === 'onboarding') {
    return (
      <OnboardingFlow 
        step={onboardingStep}
        setStep={setOnboardingStep}
        formData={formData}
        updateForm={updateForm}
        toggleArrayItem={toggleArrayItem}
        onComplete={handleCompleteOnboarding}
        onExit={handleExitOnboarding}
      />
    );
  }

  return (
    <HomePage 
      onStartOnboarding={handleStartOnboarding}
      isOnboarded={formData.name !== ''}
      userName={formData.name}
    />
  );
}
