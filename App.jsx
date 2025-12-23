import React, { useState } from 'react';
import HomePage from './HomePage';
import OnboardingFlow from './OnboardingFlow';
import AdvisorChat from './AdvisorChat';
import AccountLinking from './AccountLinking';
import PlanView from './PlanView';
import LearnView from './LearnView';
import ProgressView from './ProgressView';
import MessagesView from './MessagesView';

export default function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [onboardingStep, setOnboardingStep] = useState(0);
  
  // User state
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  
  // Onboarding form data
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

  // Form helpers
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

  // Navigation handlers
  const navigate = (view, tab = null) => {
    setCurrentView(view);
    if (tab) setActiveTab(tab);
  };

  const handleStartOnboarding = () => {
    setCurrentView('onboarding');
    setOnboardingStep(0);
  };

  const handleCompleteOnboarding = () => {
    console.log('Onboarding complete. Generating profile from:', formData);
    setIsOnboarded(true);
    setCurrentView('home');
  };

  const handleExitOnboarding = () => {
    setCurrentView('home');
  };

  const handleStartAccountLinking = () => {
    setCurrentView('accountLinking');
  };

  const handleCompleteAccountLinking = (accounts) => {
    setLinkedAccounts(accounts);
    setCurrentView('home');
  };

  const handleExitAccountLinking = () => {
    setCurrentView('home');
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'onboarding':
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
      
      case 'accountLinking':
        return (
          <AccountLinking
            onComplete={handleCompleteAccountLinking}
            onExit={handleExitAccountLinking}
            linkedAccounts={linkedAccounts}
          />
        );
      
      case 'advisor':
        return (
          <AdvisorChat
            userName={formData.name}
            userProfile={formData}
            onNavigate={navigate}
          />
        );
      
      case 'messages':
        return (
          <MessagesView
            userName={formData.name}
            onNavigate={navigate}
          />
        );
      
      case 'plan':
        return (
          <PlanView
            userName={formData.name}
            userProfile={formData}
            onNavigate={navigate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      
      case 'learn':
        return (
          <LearnView
            userName={formData.name}
            onNavigate={navigate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      
      case 'progress':
        return (
          <ProgressView
            userName={formData.name}
            userProfile={formData}
            linkedAccounts={linkedAccounts}
            onNavigate={navigate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      
      case 'home':
      default:
        return (
          <HomePage 
            onStartOnboarding={handleStartOnboarding}
            onStartAccountLinking={handleStartAccountLinking}
            onNavigate={navigate}
            isOnboarded={isOnboarded}
            hasLinkedAccounts={linkedAccounts.length > 0}
            userName={formData.name}
            userProfile={formData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return renderView();
}
