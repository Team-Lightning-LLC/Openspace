import React, { useState, useRef, useEffect } from 'react';
import { styles, colors, gradients, KUMO_URL } from './styles';

// ============================================
// CONSTANTS
// ============================================
const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES_PER_CHAT = 20;
const MAX_CHATS_PER_DAY = 10;
const STORAGE_KEY = 'openspace_advisor_usage';

// ============================================
// MAIN COMPONENT
// ============================================
export default function AdvisorChat({
  userName,
  userProfile,
  onNavigate,
  onOpenScheduler,
  onSaveChat,
}) {
  // Messages state
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // Usage tracking
  const [usage, setUsage] = useState(() => getUsageFromStorage());
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Count user messages
  const userMessageCount = messages.filter(m => m.role === 'user').length;
  const totalMessageCount = messages.length;
  const messagesRemaining = MAX_MESSAGES_PER_CHAT - totalMessageCount;

  // Check daily limit
  const dailyLimitReached = usage.chatsToday >= MAX_CHATS_PER_DAY;

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0 && !dailyLimitReached) {
      const greeting = {
        role: 'advisor',
        content: `Hi${userName ? ` ${userName}` : ''}! I am here to help you navigate your day-to-day financial questions.\n\nFor meaningful changes to your overall approach, schedule time with your AI Advisor.`,
        time: new Date(),
        hasScheduleLink: true,
      };
      setMessages([greeting]);
      
      // Increment chat count
      incrementChatCount();
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ==========================================
  // USAGE TRACKING
  // ==========================================
  function getUsageFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        const today = new Date().toDateString();
        if (data.date === today) {
          return data;
        }
      }
    } catch (e) {}
    return { date: new Date().toDateString(), chatsToday: 0 };
  }

  function incrementChatCount() {
    const today = new Date().toDateString();
    const newUsage = {
      date: today,
      chatsToday: usage.date === today ? usage.chatsToday + 1 : 1
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsage));
    setUsage(newUsage);
  }

  // ==========================================
  // MESSAGE HANDLING
  // ==========================================
  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || chatEnded) return;
    if (totalMessageCount >= MAX_MESSAGES_PER_CHAT - 1) {
      setChatEnded(true);
      return;
    }

    const userMessage = {
      role: 'user',
      content: inputValue.trim().slice(0, MAX_MESSAGE_LENGTH),
      time: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const response = getFallbackResponse(userMessage.content, userProfile);
      setMessages(prev => [...prev, {
        role: 'advisor',
        content: response,
        time: new Date(),
      }]);
      setIsTyping(false);

      // Check if this was the last message
      if (totalMessageCount + 2 >= MAX_MESSAGES_PER_CHAT) {
        setChatEnded(true);
      }
    }, 1500);
  };

  const handleQuickPrompt = (prompt) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ==========================================
  // SAVE/END CHAT
  // ==========================================
  const handleEndChat = () => {
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
    onNavigate('home', 'home');
  };

  const handleDiscard = () => {
    setShowSaveModal(false);
    onNavigate('home', 'home');
  };

  // ==========================================
  // RENDER: DAILY LIMIT REACHED
  // ==========================================
  if (dailyLimitReached) {
    return (
      <div style={styles.chatContainer}>
        <ChatHeader 
          onBack={() => onNavigate('home', 'home')}
          chatNumber={usage.chatsToday}
          messageCount={0}
        />
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          textAlign: 'center',
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: gradients.card,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <img src={KUMO_URL} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: colors.text, marginBottom: 12 }}>
            You have used all 10 chats today
          </h2>
          <p style={{ fontSize: 15, color: colors.textSecondary, marginBottom: 24, lineHeight: 1.5 }}>
            Your daily limit resets at midnight. For deeper guidance, schedule time with your AI Advisor.
          </p>
          <button
            style={styles.buttonPrimary}
            onClick={onOpenScheduler}
          >
            Schedule Full Session
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: MAIN CHAT
  // ==========================================
  return (
    <div style={styles.chatContainer}>
      <ChatHeader 
        onBack={handleEndChat}
        chatNumber={usage.chatsToday}
        messageCount={totalMessageCount}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        onSave={() => setShowSaveModal(true)}
        onEndChat={handleEndChat}
      />

      {/* Messages */}
      <div style={styles.chatMessages}>
        {messages.map((msg, i) => (
          <MessageBubble 
            key={i} 
            message={msg} 
            onScheduleClick={onOpenScheduler}
          />
        ))}
        
        {isTyping && (
          <div style={{ ...styles.messageWrapper, justifyContent: 'flex-start' }}>
            <div style={styles.messageAvatar}>
              <img src={KUMO_URL} alt="" style={{ width: 16, height: 16, objectFit: 'contain' }} />
            </div>
            <div style={{ ...styles.messageBubble, ...styles.advisorBubble }}>
              <TypingIndicator />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && !chatEnded && (
        <div style={styles.quickPrompts}>
          {['How am I doing?', 'Help with debt', 'Is this worth buying?'].map(prompt => (
            <button
              key={prompt}
              style={styles.quickPromptBtn}
              onClick={() => handleQuickPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      {!chatEnded ? (
        <div style={styles.chatInputArea}>
          <div style={styles.inputLimitIndicator}>
            <span style={{ color: messagesRemaining <= 4 ? colors.warning : colors.textMuted }}>
              {messagesRemaining} messages left
            </span>
          </div>
          <div style={styles.chatInputWrapper}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              rows={1}
              style={styles.chatInput}
            />
            <button
              style={{
                ...styles.chatSendBtn,
                opacity: inputValue.trim() && !isTyping ? 1 : 0.5,
              }}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <p style={styles.chatDisclaimer}>
            {inputValue.length}/{MAX_MESSAGE_LENGTH}
          </p>
        </div>
      ) : (
        <div style={styles.chatInputArea}>
          <p style={{ textAlign: 'center', color: colors.textSecondary, marginBottom: 16 }}>
            This chat has ended
          </p>
          <button style={styles.buttonPrimary} onClick={() => setShowSaveModal(true)}>
            Save & Close
          </button>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <SaveModal 
          onSave={handleSave}
          onDiscard={handleDiscard}
          onCancel={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}

// ============================================
// CHAT HEADER
// ============================================
function ChatHeader({ onBack, chatNumber, messageCount, showMenu, setShowMenu, onSave, onEndChat }) {
  return (
    <header style={styles.chatHeader}>
      <button style={styles.chatBackBtn} onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <div style={styles.chatHeaderCenter}>
        <div style={styles.chatAdvisorAvatar}>
          <img src={KUMO_URL} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
        </div>
        <div>
          <div style={styles.chatAdvisorName}>Daily Advisor</div>
          <div style={styles.chatLimitsDisplay}>
            <span style={styles.limitBadge}>Chat {chatNumber}/{MAX_CHATS_PER_DAY}</span>
            <span style={styles.limitDivider}>•</span>
            <span style={styles.limitBadge}>Msg {messageCount}/{MAX_MESSAGES_PER_CHAT}</span>
          </div>
        </div>
      </div>

      <div style={styles.menuContainer}>
        <button style={styles.cardMenu} onClick={() => setShowMenu && setShowMenu(!showMenu)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
        
        {showMenu && (
          <div style={styles.menuDropdown}>
            <button style={styles.menuItem} onClick={() => { setShowMenu(false); onSave(); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              Save chat
            </button>
            <button style={{ ...styles.menuItem, ...styles.menuItemLast }} onClick={() => { setShowMenu(false); onEndChat(); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              End chat
            </button>
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

  // Parse content for schedule link
  const renderContent = () => {
    if (message.hasScheduleLink) {
      const parts = message.content.split('schedule time with your AI Advisor');
      return (
        <>
          {parts[0]}
          <button style={styles.inlineLink} onClick={onScheduleClick}>
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
      justifyContent: isUser ? 'flex-end' : 'flex-start',
    }}>
      {!isUser && (
        <div style={styles.messageAvatar}>
          <img src={KUMO_URL} alt="" style={{ width: 16, height: 16, objectFit: 'contain' }} />
        </div>
      )}
      <div style={{
        ...styles.messageBubble,
        ...(isUser ? styles.userBubble : styles.advisorBubble),
      }}>
        <p style={styles.messageText}>{renderContent()}</p>
        <span style={styles.messageTime}>
          {message.time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
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
    <div style={styles.typingIndicator}>
      <span style={{ ...styles.typingDot, animationDelay: '0s' }} />
      <span style={{ ...styles.typingDot, animationDelay: '0.2s' }} />
      <span style={{ ...styles.typingDot, animationDelay: '0.4s' }} />
    </div>
  );
}

// ============================================
// SAVE MODAL
// ============================================
function SaveModal({ onSave, onDiscard, onCancel }) {
  return (
    <div style={styles.modalOverlay} onClick={onCancel}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div style={styles.successIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
          </svg>
        </div>
        <h3 style={styles.modalTitle}>Save this chat?</h3>
        <p style={styles.modalText}>
          We will send a summary to your Message Center so you can reference it later.
        </p>
        <button style={styles.modalPrimaryBtn} onClick={onSave}>
          Save & Close
        </button>
        <button style={styles.modalSecondaryBtn} onClick={onDiscard}>
          Discard
        </button>
      </div>
    </div>
  );
}

// ============================================
// FALLBACK RESPONSES
// ============================================
function getFallbackResponse(userMessage, userProfile) {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes('debt') || lower.includes('owe')) {
    const stressNote = userProfile?.debtStress === 'Yes, significantly' 
      ? ' — and you mentioned it has been causing real stress' 
      : '';
    return `I hear that debt is on your mind${stressNote}. Here is what helps: focus on one card at a time, usually the highest interest rate first. Even $25 extra per month makes a difference. What is the one debt that bothers you most?`;
  }
  
  if (lower.includes('first') || lower.includes('focus') || lower.includes('start')) {
    const advice = userProfile?.hasDebt && userProfile?.debtStress 
      ? 'Given your debt is causing stress, I would start there — but build a tiny $500 buffer first so surprises do not create new debt.' 
      : 'The foundation: small emergency buffer → high-interest debt → expand buffer → then investing.';
    return `Good question. ${advice} What feels most urgent right now?`;
  }
  
  if (lower.includes('purchase') || lower.includes('buy') || lower.includes('worth')) {
    const goalNote = userProfile?.goals?.includes('breathing') 
      ? 'You mentioned wanting breathing room — does this support that, or work against it?' 
      : 'What is your gut telling you?';
    return `When thinking through a purchase: "Will I still be glad I bought this in 2 weeks?" If yes, does it fit the budget without stress? ${goalNote}`;
  }
  
  if (lower.includes('doing') || lower.includes('how am i')) {
    const incomeNote = userProfile?.incomeStability === 'Uncertain' 
      ? 'With uncertain income, even a small buffer matters more than optimizing.' 
      : '';
    return `Without your actual numbers connected, here is what matters: Are you ending each month with something left over, even $50? That is the foundation. ${incomeNote} How does a typical month look?`;
  }
  
  return `I want to make sure I am helpful here. Could you tell me more about what is prompting this question? The more specific, the more relevant I can be to your actual situation.`;
}
