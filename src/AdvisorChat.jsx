import React, { useState, useRef, useEffect } from 'react';

// ============================================
// CONSTANTS
// ============================================
const LIMITS = {
  MAX_CHARS: 500,
  MAX_MESSAGES: 20,
  MAX_CHATS_PER_DAY: 10,
};

// ============================================
// ADVISOR CHAT COMPONENT
// ============================================
export default function AdvisorChat({ 
  userName, 
  userProfile, 
  onNavigate,
  onOpenScheduler,        // Opens the AI Advisor scheduling modal
  vertesiaAPI,
  onSaveChat,
  savedChatsToday = 0,
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
  
  // Menu & Save state
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSummary, setSavedSummary] = useState(null);
  const [chatEnded, setChatEnded] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  // Current chat number (1-indexed for display)
  const currentChatNumber = chatsUsedToday + 1;

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0 && chatsUsedToday < LIMITS.MAX_CHATS_PER_DAY) {
      const greeting = {
        id: Date.now(),
        role: 'advisor',
        content: `Hi${userName ? ` ${userName}` : ''}! I'm here to help you navigate your day-to-day financial questions.\n\nFor meaningful changes to your overall approach, [schedule time with your AI Advisor].`,
        timestamp: new Date(),
        hasLink: true  // Flag to render the link
      };
      setMessages([greeting]);
      setMessageCount(1);
      incrementDailyChats();
    }
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Derived state
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

  // Handle input change
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
      const response = await getAdvisorResponse(userMessage.content, messages, userProfile, vertesiaAPI);
      
      const advisorMessage = {
        id: Date.now(),
        role: 'advisor',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, advisorMessage]);
      setMessageCount(prev => prev + 1);

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

  // Save chat
  const handleSaveChat = async () => {
    setShowMenu(false);
    setIsSaving(true);
    
    try {
      const synthesis = await synthesizeChat(messages, userProfile, vertesiaAPI);
      setSavedSummary(synthesis);
      
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
    setShowSaveModal(true);
  };

  // End chat
  const handleEndChat = () => {
    setShowMenu(false);
    setChatEnded(true);
  };

  // Quick prompts
  const quickPrompts = [
    "How am I doing this month?",
    "Help me understand my debt",
    "What should I focus on first?",
    "Is this purchase worth it?"
  ];

  // Daily limit reached
  if (isAtDailyLimit && messages.length === 0) {
    return (
      <div style={styles.chatContainer}>
        <ChatHeader 
          onBack={() => onNavigate('home', 'home')}
          chatNumber={LIMITS.MAX_CHATS_PER_DAY}
          maxChats={LIMITS.MAX_CHATS_PER_DAY}
          messageNumber={0}
          maxMessages={LIMITS.MAX_MESSAGES}
        />
        <div style={styles.limitReached}>
          <div style={styles.limitIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h2 style={styles.limitTitle}>You've reached today's limit</h2>
          <p style={styles.limitText}>
            You've had {LIMITS.MAX_CHATS_PER_DAY} conversations today. Your limit resets at midnight.
          </p>
          <p style={styles.limitSubtext}>
            Need deeper guidance? 
            <button style={styles.inlineLink} onClick={onOpenScheduler}>
              Schedule time with your AI Advisor
            </button>
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
        chatNumber={currentChatNumber}
        maxChats={LIMITS.MAX_CHATS_PER_DAY}
        messageNumber={messageCount}
        maxMessages={LIMITS.MAX_MESSAGES}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        menuRef={menuRef}
        onSave={handleSaveChat}
        onEndChat={handleEndChat}
        chatEnded={chatEnded}
        isSaving={isSaving}
      />

      {/* Messages */}
      <div style={styles.chatMessages}>
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            onScheduleClick={onOpenScheduler}
          />
        ))}

        {isTyping && <TypingIndicator />}

        {/* Limit warning */}
        {messagesRemaining <= 4 && messagesRemaining > 0 && !chatEnded && (
          <div style={styles.limitWarning}>
            {messagesRemaining} messages remaining
          </div>
        )}

        {/* Chat ended */}
        {chatEnded && !showSaveModal && (
          <div style={styles.chatEndedBanner}>
            <p>This conversation has ended.</p>
            <button style={styles.savePromptBtn} onClick={handleSaveChat}>
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
          savedSummary={savedSummary}
          onClose={() => {
            setShowSaveModal(false);
            onNavigate('home', 'home');
          }}
          onNewChat={() => {
            if (chatsUsedToday >= LIMITS.MAX_CHATS_PER_DAY) {
              setShowSaveModal(false);
              return;
            }
            setShowSaveModal(false);
            setMessages([]);
            setMessageCount(0);
            setChatEnded(false);
            setSavedSummary(null);
            const greeting = {
              id: Date.now(),
              role: 'advisor',
              content: `Starting fresh! What's on your mind?`,
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
function ChatHeader({ 
  onBack, 
  chatNumber, 
  maxChats, 
  messageNumber, 
  maxMessages,
  showMenu,
  setShowMenu,
  menuRef,
  onSave,
  onEndChat,
  chatEnded,
  isSaving
}) {
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
          <div style={styles.chatAdvisorName}>Daily Check-in</div>
          <div style={styles.chatLimitsDisplay}>
            <span style={styles.limitBadge}>
              Chat {chatNumber}/{maxChats}
            </span>
            <span style={styles.limitDivider}>•</span>
            <span style={styles.limitBadge}>
              Message {messageNumber}/{maxMessages}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Button */}
      <div style={styles.menuContainer} ref={menuRef}>
        <button 
          style={styles.chatMenuBtn} 
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div style={styles.menuDropdown}>
            <button 
              style={styles.menuItem} 
              onClick={onSave}
              disabled={isSaving}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              {isSaving ? 'Saving...' : 'Save to Messages'}
            </button>
            {!chatEnded && (
              <button style={styles.menuItem} onClick={onEndChat}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                </svg>
                End conversation
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================
// MESSAGE BUBBLE
// ============================================
function MessageBubble({ message, onScheduleClick }) {
  const isUser = message.role === 'user';
  
  // Render content with inline link if flagged
  const renderContent = () => {
    if (message.hasLink) {
      // Split by the link placeholder
      const parts = message.content.split('[schedule time with your AI Advisor]');
      return (
        <>
          {parts[0]}
          <button style={styles.inlineLinkBubble} onClick={onScheduleClick}>
            schedule time with your AI Advisor
          </button>
          {parts[1]}
        </>
      );
    }
    return message.content;
  };
  
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
        <p style={styles.messageText}>{renderContent()}</p>
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
function SaveModal({ savedSummary, onClose, onNewChat, chatsRemaining }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.successIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h2 style={styles.modalTitle}>Saved to Messages</h2>
        <p style={styles.modalText}>
          Your conversation summary is in your Message Center. Check it anytime.
        </p>
        
        {savedSummary?.content && (
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
              You've used all 10 conversations for today.
            </p>
            <button style={styles.modalPrimaryBtn} onClick={onClose}>
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// API FUNCTIONS (same as before, abbreviated)
// ============================================
async function getAdvisorResponse(userMessage, messageHistory, userProfile, vertesiaAPI) {
  if (!vertesiaAPI) {
    return getFallbackResponse(userMessage, userProfile);
  }
  // ... Vertesia integration (same as previous)
  return getFallbackResponse(userMessage, userProfile);
}

async function synthesizeChat(messages, userProfile, vertesiaAPI) {
  return getFallbackSynthesis(messages, userProfile);
}

function getFallbackResponse(userMessage, userProfile) {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes('debt') || lower.includes('owe')) {
    return `I hear that debt is on your mind${userProfile?.debtStress === 'Yes, significantly' ? ' — and you mentioned it's been causing real stress' : ''}. Here's what helps: focus on one card at a time, usually the highest interest rate first. Even $25 extra per month makes a difference. What's the one debt that bothers you most?`;
  }
  
  if (lower.includes('first') || lower.includes('focus') || lower.includes('start')) {
    return `Good question. ${userProfile?.hasDebt && userProfile?.debtStress ? 'Given your debt is causing stress, I\'d start there — but build a tiny $500 buffer first so surprises don\'t create new debt.' : 'The foundation: small emergency buffer → high-interest debt → expand buffer → then investing.'} What feels most urgent right now?`;
  }
  
  if (lower.includes('purchase') || lower.includes('buy') || lower.includes('worth it')) {
    return `When thinking through a purchase: "Will I still be glad I bought this in 2 weeks?" If yes, does it fit the budget without stress? ${userProfile?.goals?.includes('breathing') ? 'You mentioned wanting breathing room — does this support that, or work against it?' : 'What\'s your gut telling you?'}`;
  }
  
  if (lower.includes('month') || lower.includes('doing')) {
    return `Without your actual numbers connected, here's what matters: Are you ending each month with something left over, even $50? That's the foundation. ${userProfile?.incomeStability === 'Uncertain' ? 'With uncertain income, even a small buffer matters more than optimizing.' : ''} How does a typical month look?`;
  }
  
  return `I want to make sure I'm helpful here. Could you tell me more about what's prompting this question? The more specific, the more relevant I can be to your actual situation.`;
}

function getFallbackSynthesis(messages, userProfile) {
  const userMessages = messages.filter(m => m.role === 'user');
  const mainTopic = userMessages[0]?.content || 'your finances';
  
  return {
    content: `**💬 Conversation Summary**
*${new Date().toLocaleDateString()}*

**What we discussed:**
${mainTopic.substring(0, 100)}${mainTopic.length > 100 ? '...' : ''}

**Key insight:**
Taking time to think through decisions — instead of just reacting — puts you ahead.

**Your action item:**
This week: Write down the one financial thing on your mind most. Getting it out of your head is the first step.

**Remember:**
You're asking the right questions. That's progress.`
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
  chatLimitsDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  limitBadge: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 500,
  },
  limitDivider: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  menuContainer: {
    position: 'relative',
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
  menuDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 8,
    background: 'white',
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    minWidth: 180,
    zIndex: 100,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '14px 16px',
    background: 'none',
    border: 'none',
    fontSize: 14,
    color: '#1e293b',
    cursor: 'pointer',
    textAlign: 'left',
    borderBottom: '1px solid #f1f5f9',
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
  inlineLinkBubble: {
    background: 'none',
    border: 'none',
    color: '#6366f1',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
    textUnderlineOffset: 2,
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
  },
  chatInputArea: {
    padding: '8px 16px 24px',
    background: 'white',
    borderTop: '1px solid #f1f5f9',
  },
  inputLimitIndicator: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 12,
    marginBottom: 8,
    padding: '0 4px',
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
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  inlineLink: {
    background: 'none',
    border: 'none',
    color: '#6366f1',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    marginLeft: 4,
    textDecoration: 'underline',
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
