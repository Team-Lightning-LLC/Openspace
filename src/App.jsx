import React, { useState } from 'react';
import { styles, KUMO_URL } from './styles';
import HomePage from './HomePage';
import OnboardingFlow from './OnboardingFlow';
import AdvisorChat from './AdvisorChat';
import PlanView from './PlanView';
import LearnView from './LearnView';
import ProgressView from './ProgressView';
import MessagesView from './MessagesView';
import AccountLinking from './AccountLinking';

export default function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  
  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isOnboarded, setIsOnboarded] = useState(false);
  
  // User profile data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    incomeStability: '',
    income: '',
    savings: '',
    hasDebt: null,
    debtTypes: [],
    debtStress: '',
    goals: [],
    dependents: false,
    dependentCount: '',
    lifeEvents: [],
    decisionComfort: '',
    changeWish: '',
    anythingElse: '',
  });
  
  // Account linking state
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  
  // Chat state
  const [savedChats, setSavedChats] = useState([]);

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

  const toggleGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : prev.goals.length < 3
          ? [...prev.goals, goal]
          : prev.goals
    }));
  };

  // Navigation
  const navigate = (view, tab = null) => {
    setCurrentView(view);
    if (tab) setActiveTab(tab);
  };

  // Onboarding completion
  const completeOnboarding = () => {
    setIsOnboarded(true);
    setCurrentView('home');
  };

  // Account linking completion
  const completeAccountLinking = (accounts) => {
    setLinkedAccounts(accounts);
    setCurrentView('home');
  };

  // Save chat
  const handleSaveChat = (chatData) => {
    setSavedChats(prev => [...prev, chatData]);
    // In production, this would also send to Messages
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
            toggleGoal={toggleGoal}
            toggleArrayItem={toggleArrayItem}
            onComplete={completeOnboarding}
            onExit={() => navigate('home')}
          />
        );
      
      case 'advisor':
        return (
          <AdvisorChat
            userName={formData.name}
            userProfile={formData}
            onNavigate={navigate}
            onOpenScheduler={() => {/* Open scheduler modal */}}
            onSaveChat={handleSaveChat}
          />
        );
      
      case 'accountLinking':
        return (
          <AccountLinking
            onComplete={completeAccountLinking}
            onBack={() => navigate('home')}
          />
        );
      
      case 'plan':
        return (
          <PlanView
            userProfile={formData}
            onNavigate={navigate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      
      case 'learn':
        return (
          <LearnView
            userProfile={formData}
            onNavigate={navigate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      
      case 'progress':
        return (
          <ProgressView
            userProfile={formData}
            linkedAccounts={linkedAccounts}
            onNavigate={navigate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      
      case 'messages':
        return (
          <MessagesView
            savedChats={savedChats}
            onNavigate={navigate}
          />
        );
      
      case 'home':
      default:
        return (
          <HomePage
            userName={formData.name}
            isOnboarded={isOnboarded}
            linkedAccounts={linkedAccounts}
            onStartOnboarding={() => {
              setOnboardingStep(0);
              navigate('onboarding');
            }}
            onOpenChat={() => navigate('advisor')}
            onLinkAccounts={() => navigate('accountLinking')}
            onNavigate={navigate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return renderView();
}
