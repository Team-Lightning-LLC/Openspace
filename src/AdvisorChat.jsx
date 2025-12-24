import React, { useState, useRef, useEffect } from 'react';

// ============================================
// CONSTANTS
// ============================================
const LIMITS = {
  MAX_CHARS: 500,
  MAX_MESSAGES: 20,      // Total messages (10 user + 10 advisor)
  MAX_CHATS_PER_DAY: 10,
};

// ============================================
// ADVISOR CHAT COMPONENT
// ============================================
export default function AdvisorChat({ 
  userName, 
  userProfile, 
  onNavigate,
  vertesiaAPI,           // Vertesia API instance
  onSaveChat,            // Callback when chat is saved
  savedChatsToday = 0,   // Number of chats already saved today
}) {
  // Chat state
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatId] = useState(() => `chat_${Date.now()}`);
  
  // Limit tracking
  const [messageCount, setMessageCount] = useState(0);
  const [chatsUsedToday, setChatsUsedToday] = useState(() => {
    const stored = localStorage.getItem('openspace_chats_today');
    if (stored) {
      const { count, date } = JSON.parse(stored);
      if (date === new Date().toDateString()) {
        return count;
      }
    }
    return 0;
  });
  
  // Save state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSummary, setSavedSummary] = useState(null);
  const [chatEnded, setChatEnded] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0 && chatsUsedToday < LIMITS.MAX_CHATS_PER_DAY) {
      const greeting = {
        id: Date.now(),
        role: 'advisor',
        content: `Hi${userName ? ` ${userName}` : ''}! I'm here to help you think through financial decisions. What's on your mind today?`,
        timestamp: new Date()
      };
      setMessages([greeting]);
      setMessageCount(1);
      incrementDailyChats();
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if conversation is at limit
  const isAtMessageLimit = messageCount >= LIMITS.MAX_MESSAGES;
  const isAtDailyLimit = chatsUsedToday >= LIMITS.MAX_CHATS_PER_DAY;
  const charsRemaining = LIMITS.MAX_CHARS - inputValue.length;
  const messagesRemaining = LIMITS.MAX_MESSAGES - messageCount;

  // Increment daily chat count
  const incrementDailyChats = () => {
    const newCount = chatsUsedToday + 1;
    setChatsUsedToday(newCount);
    localStorage.setItem('openspace_chats_today', JSON.stringify({
      count: newCount,
      date: new Date().toDateString()
    }));
  };

  // Handle input change with character limit
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= LIMITS.MAX_CHARS) {
      setInputValue(value);
    }
  };

  // Send message
  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || isAtMessageLimit || chatEnded) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setMessageCount(prev => prev + 1);
    setIsTyping(true);

    try {
      // Call Vertesia API for response
      const response = await getAdvisorResponse(userMessage.content, messages, userProfile, vertesiaAPI);
      
      const advisorMessage = {
        id: Date.now(),
        role: 'advisor',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, advisorMessage]);
      setMessageCount(prev => prev + 1);

      // Check if we've hit the limit
      if (messageCount + 2 >= LIMITS.MAX_MESSAGES) {
        setChatEnded(true);
      }
    } catch (error) {
      console.error('Failed to get advisor response:', error);
      const errorMessage = {
        id: Date.now(),
        role: 'advisor',
        content: "I'm having trouble connecting right now. Let's try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setMessageCount(prev => prev + 1);
    }

    setIsTyping(false);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Save chat and generate synthesis
  const handleSaveChat = async () => {
    setIsSaving(true);
    
    try {
      const synthesis = await synthesizeChat(messages, userProfile, vertesiaAPI);
      setSavedSummary(synthesis);
      
      // Call parent callback to store/message the synthesis
      if (onSaveChat) {
        onSaveChat({
          chatId,
          messages,
          synthesis,
          savedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Failed to save chat:', error);
      setSavedSummary({
        error: true,
        content: "We couldn't generate your summary right now, but your conversation has been saved."
      });
    }
    
    setIsSaving(false);
  };

  // End chat early
  const handleEndChat = () => {
    setChatEnded(true);
    setShowSaveModal(true);
  };

  // Quick prompts
  const quickPrompts = [
    "How am I doing this month?",
    "Help me understand my debt",
    "What should I focus on first?",
    "Is this purchase worth it?"
  ];

  // If at daily limit and no active chat
  if (isAtDailyLimit && messages.length === 0) {
    return (
      <div style={styles.chatContainer}>
        <ChatHeader onBack={() => onNavigate('home', 'home')} />
        <div style={styles.limitReached}>
          <div style={styles.limitIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h2 style={styles.limitTitle}>You've reached today's limit</h2>
          <p style={styles.limitText}>
            You've had {LIMITS.MAX_CHATS_PER_DAY} conversations today. Your daily limit resets at midnight.
          </p>
          <p style={styles.limitSubtext}>
            This limit helps us keep OpenSpace free and sustainable for everyone.
          </p>
          <button style={styles.limitBtn} onClick={() => onNavigate('home', 'home')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.chatContainer}>
      {/* Header */}
      <ChatHeader 
        onBack={() => onNavigate('home', 'home')} 
        onEndChat={handleEndChat}
        messagesRemaining={messagesRemaining}
        chatEnded={chatEnded}
      />

      {/* Messages */}
      <div style={styles.chatMessages}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        {/* Limit warning */}
        {messagesRemaining <= 4 && messagesRemaining > 0 && !chatEnded && (
          <div style={styles.limitWarning}>
            {messagesRemaining} messages remaining in this conversation
          </div>
        )}

        {/* Chat ended state */}
        {chatEnded && !showSaveModal && (
          <div style={styles.chatEndedBanner}>
            <p>This conversation has ended.</p>
            <button style={styles.savePromptBtn} onClick={() => setShowSaveModal(true)}>
              Save & get your takeaways
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && !chatEnded && (
        <div style={styles.quickPrompts}>
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              style={styles.quickPromptBtn}
              onClick={() => {
                setInputValue(prompt);
                inputRef.current?.focus();
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      {!chatEnded && (
        <div style={styles.chatInputArea}>
          <div style={styles.inputLimitIndicator}>
            <span style={{ color: charsRemaining < 50 ? '#ef4444' : '#94a3b8' }}>
              {charsRemaining} characters
            </span>
            <span style={styles.messageLimitText}>
              {messagesRemaining} messages left
            </span>
          </div>
          <div style={styles.chatInputWrapper}>
            <textarea
              ref={inputRef}
              style={styles.chatInput}
              placeholder="Ask anything about your finances..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              rows={1}
              disabled={isAtMessageLimit}
            />
            <button 
              style={{
                ...styles.chatSendBtn,
                opacity: inputValue.trim() && !isTyping ? 1 : 0.5
              }}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping || isAtMessageLimit}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <p style={styles.chatDisclaimer}>
            For general guidance only. Not financial, tax, or legal advice.
          </p>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <SaveModal
          isSaving={isSaving}
          savedSummary={savedSummary}
          onSave={handleSaveChat}
          onClose={() => {
            setShowSaveModal(false);
            if (savedSummary) {
              onNavigate('home', 'home');
            }
          }}
          onNewChat={() => {
            setShowSaveModal(false);
            setMessages([]);
            setMessageCount(0);
            setChatEnded(false);
            setSavedSummary(null);
            // Initialize new chat
            const greeting = {
              id: Date.now(),
              role: 'advisor',
              content: `Hi${userName ? ` ${userName}` : ''}! Starting a fresh conversation. What would you like to think through?`,
              timestamp: new Date()
            };
            setMessages([greeting]);
            setMessageCount(1);
            incrementDailyChats();
          }}
          chatsRemaining={LIMITS.MAX_CHATS_PER_DAY - chatsUsedToday}
        />
      )}
    </div>
  );
}

// ============================================
// CHAT HEADER
// ============================================
function ChatHeader({ onBack, onEndChat, messagesRemaining, chatEnded }) {
  return (
    <header style={styles.chatHeader}>
      <button style={styles.chatBackBtn} onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <div style={styles.chatHeaderCenter}>
        <div style={styles.chatAdvisorAvatar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div>
          <div style={styles.chatAdvisorName}>Your Advisor</div>
          <div style={styles.chatAdvisorStatus}>
            <span style={styles.statusDot} />
            {chatEnded ? 'Chat ended' : `${messagesRemaining} messages left`}
          </div>
        </div>
      </div>
      {!chatEnded && (
        <button style={styles.chatMenuBtn} onClick={onEndChat}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
          </svg>
        </button>
      )}
    </header>
  );
}

// ============================================
// MESSAGE BUBBLE
// ============================================
function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div style={{
      ...styles.messageWrapper,
      justifyContent: isUser ? 'flex-end' : 'flex-start'
    }}>
      {!isUser && (
        <div style={styles.messageAvatar}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
      )}
      <div style={{
        ...styles.messageBubble,
        ...(isUser ? styles.userBubble : styles.advisorBubble)
      }}>
        <p style={styles.messageText}>{message.content}</p>
        <span style={styles.messageTime}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

// ============================================
// TYPING INDICATOR
// ============================================
function TypingIndicator() {
  return (
    <div style={styles.messageWrapper}>
      <div style={styles.messageAvatar}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      </div>
      <div style={{ ...styles.messageBubble, ...styles.advisorBubble }}>
        <div style={styles.typingIndicator}>
          <span style={styles.typingDot} />
          <span style={{ ...styles.typingDot, animationDelay: '0.2s' }} />
          <span style={{ ...styles.typingDot, animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// SAVE MODAL
// ============================================
function SaveModal({ isSaving, savedSummary, onSave, onClose, onNewChat, chatsRemaining }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        {!savedSummary ? (
          <>
            <h2 style={styles.modalTitle}>Save this conversation?</h2>
            <p style={styles.modalText}>
              I'll create a summary with your key takeaways and action items, 
              then send it to your messages.
            </p>
            <button 
              style={styles.modalPrimaryBtn} 
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? 'Creating summary...' : 'Save & get takeaways'}
            </button>
            <button style={styles.modalSecondaryBtn} onClick={onClose}>
              Discard conversation
            </button>
          </>
        ) : (
          <>
            <div style={styles.successIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 style={styles.modalTitle}>Saved!</h2>
            <p style={styles.modalText}>
              Your summary has been sent to your messages. Check it anytime.
            </p>
            
            {/* Preview of synthesis */}
            {savedSummary.content && (
              <div style={styles.synthesisPre}>
                {savedSummary.content.substring(0, 200)}...
              </div>
            )}

            {chatsRemaining > 0 ? (
              <>
                <button style={styles.modalPrimaryBtn} onClick={onNewChat}>
                  Start new conversation ({chatsRemaining} left today)
                </button>
                <button style={styles.modalSecondaryBtn} onClick={onClose}>
                  Back to Home
                </button>
              </>
            ) : (
              <>
                <p style={styles.modalSubtext}>
                  You've used all {LIMITS.MAX_CHATS_PER_DAY} conversations for today.
                </p>
                <button style={styles.modalPrimaryBtn} onClick={onClose}>
                  Back to Home
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// API FUNCTIONS
// ============================================

// Get advisor response from Vertesia
async function getAdvisorResponse(userMessage, messageHistory, userProfile, vertesiaAPI) {
  // If no API available, use fallback
  if (!vertesiaAPI) {
    return getFallbackResponse(userMessage, userProfile);
  }

  try {
    // Format conversation history
    const conversationHistory = messageHistory
      .map(m => `${m.role === 'user' ? 'User' : 'Advisor'}: ${m.content}`)
      .join('\n');

    // Build the prompt with user context
    const systemPrompt = buildAdvisorPrompt(userProfile);
    
    const response = await vertesiaAPI.chatWithDocument({
      document_id: 'daily-advisor',  // Or appropriate interaction ID
      conversation_history: conversationHistory,
      question: userMessage,
      system_prompt: systemPrompt
    });

    // Handle streaming or direct response
    if (response.runId && response.workflowId) {
      return await pollForResponse(vertesiaAPI, response.workflowId, response.runId);
    }

    return response.answer || getFallbackResponse(userMessage, userProfile);
  } catch (error) {
    console.error('Vertesia API error:', error);
    return getFallbackResponse(userMessage, userProfile);
  }
}

// Poll for streaming response
async function pollForResponse(vertesiaAPI, workflowId, runId, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const status = await vertesiaAPI.getRunStatus(workflowId, runId);
    
    if (status?.status === 'completed' && status?.result) {
      return vertesiaAPI.extractAnswer(status.result);
    }
    
    if (status?.status === 'failed') {
      throw new Error('Response generation failed');
    }
  }
  
  throw new Error('Response timeout');
}

// Build advisor prompt with user context
function buildAdvisorPrompt(userProfile) {
  const profileContext = userProfile ? `
User Profile:
- Name: ${userProfile.name || 'Unknown'}
- Work: ${userProfile.work || 'Not specified'}
- Income Stability: ${userProfile.incomeStability || 'Not specified'}
- Income Range: ${userProfile.income || 'Not specified'}
- Savings Range: ${userProfile.savings || 'Not specified'}
- Has Debt: ${userProfile.hasDebt ? 'Yes' : 'No'}
- Debt Stress: ${userProfile.debtStress || 'Not specified'}
- Goals: ${userProfile.goals?.join(', ') || 'Not specified'}
- Dependents: ${userProfile.dependents ? `Yes (${userProfile.dependentCount})` : 'No'}
- Decision Comfort: ${userProfile.decisionComfort || 'Not specified'}
- What they want to change: ${userProfile.changeWish || 'Not specified'}
` : 'No profile available - provide general guidance.';

  return `You are the OpenSpace Daily Advisor. Keep responses under 150 words. Be warm, specific to their situation, and give one actionable next step.

${profileContext}

NEVER provide specific investment recommendations, tax advice, or legal advice. Always explain the "why" behind suggestions.`;
}

// Fallback response when API unavailable
function getFallbackResponse(userMessage, userProfile) {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes('debt') || lower.includes('owe')) {
    return `I hear that debt is on your mind${userProfile?.debtStress === 'Yes, significantly' ? ' — and you mentioned it's been causing real stress' : ''}. Here's what helps: focus on one card at a time, usually the highest interest rate first. Even $25 extra per month makes a difference over time. What's the one debt that bothers you most?`;
  }
  
  if (lower.includes('first') || lower.includes('focus') || lower.includes('start')) {
    return `Good question. ${userProfile?.hasDebt && userProfile?.debtStress ? 'Given your debt is causing stress, I\'d start there — but with a twist: build a tiny $500 buffer first. That way, surprises don\'t create new debt while you\'re paying off old debt.' : 'The foundation is always: small emergency buffer → high-interest debt → expand the buffer → then investing.'} What feels most urgent to you right now?`;
  }
  
  if (lower.includes('purchase') || lower.includes('buy') || lower.includes('worth it')) {
    return `When I'm thinking through a purchase, I ask: "Will I still be glad I bought this in 2 weeks?" If it passes that test, the next question is whether it fits the budget without creating stress. ${userProfile?.goals?.includes('breathing') ? 'You mentioned wanting breathing room — does this purchase support that, or work against it?' : 'What\'s your gut telling you?'}`;
  }
  
  if (lower.includes('month') || lower.includes('doing')) {
    return `Without seeing your actual numbers (we can connect your accounts if you'd like), here's what I'd focus on: Are you ending each month with something left over, even $50? That's the foundation. ${userProfile?.incomeStability === 'Uncertain' ? 'With uncertain income, having even a small buffer matters more than optimizing.' : ''} What does a typical month look like for you?`;
  }
  
  return `I want to make sure I'm actually helpful here. ${userProfile?.name ? `${userProfile.name}, ` : ''}Could you tell me a bit more about what's prompting this question? The more specific you can be, the more relevant I can make my response to your actual situation.`;
}

// Synthesize chat into actionable summary
async function synthesizeChat(messages, userProfile, vertesiaAPI) {
  const transcript = messages
    .map(m => `${m.role === 'user' ? 'User' : 'Advisor'}: ${m.content}`)
    .join('\n\n');

  // If no API, use fallback synthesis
  if (!vertesiaAPI) {
    return getFallbackSynthesis(messages, userProfile);
  }

  try {
    const response = await vertesiaAPI.chatWithDocument({
      document_id: 'chat-synthesis',
      conversation_history: '',
      question: `Synthesize this conversation into actionable takeaways:\n\n${transcript}`,
      system_prompt: `You create brief, actionable summaries of financial conversations. Output format:

**What we discussed:** [1-2 sentences]
**Key insight:** [1-2 sentences]  
**Your action item:** [One specific, doable action]
**Remember:** [One encouraging sentence]

Keep total under 150 words. Be specific to what was discussed.`
    });

    if (response.runId && response.workflowId) {
      const result = await pollForResponse(vertesiaAPI, response.workflowId, response.runId);
      return { content: result };
    }

    return { content: response.answer };
  } catch (error) {
    console.error('Synthesis error:', error);
    return getFallbackSynthesis(messages, userProfile);
  }
}

// Fallback synthesis when API unavailable
function getFallbackSynthesis(messages, userProfile) {
  const userMessages = messages.filter(m => m.role === 'user');
  const mainTopic = userMessages[0]?.content || 'your finances';
  
  return {
    content: `**💬 Your Conversation Summary**
*Saved on ${new Date().toLocaleDateString()}*

**What we discussed:**
${mainTopic.substring(0, 100)}${mainTopic.length > 100 ? '...' : ''}

**Key insight:**
Taking time to think through financial decisions — instead of just reacting — puts you ahead of most people.

**Your action item:**
This week: Take 5 minutes to write down the one financial thing that's been on your mind most. Getting it out of your head is the first step.

**Remember:**
You're asking the right questions. That's what progress looks like.`
  };
}

// ============================================
// STYLES
// ============================================
const styles = {
  chatContainer: {
    minHeight: '100vh',
    background: '#f8fafc',
    maxWidth: 430,
    margin: '0 auto',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'white',
    borderBottom: '1px solid #f1f5f9',
    gap: 12,
  },
  chatBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  chatHeaderCenter: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  chatAdvisorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatAdvisorName: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
  },
  chatAdvisorStatus: {
    fontSize: 13,
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#10b981',
  },
  chatMenuBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  chatMessages: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  messageWrapper: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-end',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: '#ecfdf5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: 16,
  },
  userBubble: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderBottomRightRadius: 4,
    color: 'white',
  },
  advisorBubble: {
    background: 'white',
    borderBottomLeftRadius: 4,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 1.5,
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  messageTime: {
    fontSize: 11,
    opacity: 0.7,
    display: 'block',
    marginTop: 6,
  },
  typingIndicator: {
    display: 'flex',
    gap: 4,
    padding: '4px 0',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#94a3b8',
    animation: 'pulse 1.4s infinite',
  },
  limitWarning: {
    textAlign: 'center',
    fontSize: 13,
    color: '#f59e0b',
    background: '#fffbeb',
    padding: '8px 16px',
    borderRadius: 12,
    margin: '8px 0',
  },
  chatEndedBanner: {
    textAlign: 'center',
    padding: 20,
    background: 'white',
    borderRadius: 16,
    margin: '8px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  savePromptBtn: {
    marginTop: 12,
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 12,
    color: 'white',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  quickPrompts: {
    padding: '0 16px 16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickPromptBtn: {
    padding: '10px 14px',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    fontSize: 13,
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  chatInputArea: {
    padding: '8px 16px 24px',
    background: 'white',
    borderTop: '1px solid #f1f5f9',
  },
  inputLimitIndicator: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    marginBottom: 8,
    padding: '0 4px',
  },
  messageLimitText: {
    color: '#94a3b8',
  },
  chatInputWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
    background: '#f8fafc',
    borderRadius: 16,
    padding: '8px 8px 8px 16px',
  },
  chatInput: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontSize: 15,
    resize: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    padding: '8px 0',
    maxHeight: 100,
  },
  chatSendBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    flexShrink: 0,
  },
  chatDisclaimer: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
  },
  // Limit reached state
  limitReached: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    textAlign: 'center',
  },
  limitIcon: {
    marginBottom: 24,
  },
  limitTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 12,
  },
  limitText: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 1.5,
  },
  limitSubtext: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 24,
  },
  limitBtn: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 12,
    color: 'white',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  // Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    borderRadius: 20,
    padding: 24,
    maxWidth: 340,
    width: '100%',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 1.5,
  },
  modalSubtext: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 16,
  },
  modalPrimaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 12,
    color: 'white',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 12,
  },
  modalSecondaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: 'transparent',
    border: 'none',
    borderRadius: 12,
    color: '#64748b',
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    background: '#ecfdf5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  synthesisPre: {
    background: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 13,
    color: '#64748b',
    textAlign: 'left',
    marginBottom: 20,
    lineHeight: 1.5,
  },
};
