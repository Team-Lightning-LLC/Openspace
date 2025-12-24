import React, { useState, useRef, useEffect } from 'react';
import styles from './styles';

export default function AdvisorChat({ userName, userProfile, onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'advisor',
      content: `Hi${userName ? ` ${userName}` : ''}! I'm your OpenSpace advisor. I'm here to help you make sense of your finances and work toward what matters to you.\n\nWhat's on your mind today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate advisor response (in production, this calls the AI backend)
    setTimeout(() => {
      const advisorResponse = generateResponse(userMessage.content, userProfile);
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'advisor',
        content: advisorResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "How am I doing this month?",
    "Help me understand my debt",
    "What should I focus on first?",
    "Explain my options simply"
  ];

  return (
    <div style={styles.chatContainer}>
      {/* Header */}
      <header style={styles.chatHeader}>
        <button style={styles.chatBackBtn} onClick={() => onNavigate('home', 'home')}>
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
              Always available
            </div>
          </div>
        </div>
        <button style={styles.chatMenuBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </header>

      {/* Messages */}
      <div style={styles.chatMessages}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              ...styles.messageWrapper,
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {message.role === 'advisor' && (
              <div style={styles.messageAvatar}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
            )}
            <div
              style={{
                ...styles.messageBubble,
                ...(message.role === 'user' ? styles.userBubble : styles.advisorBubble)
              }}
            >
              <p style={styles.messageText}>{message.content}</p>
              <span style={styles.messageTime}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
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
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && (
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
      <div style={styles.chatInputArea}>
        <div style={styles.chatInputWrapper}>
          <textarea
            ref={inputRef}
            style={styles.chatInput}
            placeholder="Ask anything about your finances..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button 
            style={{
              ...styles.chatSendBtn,
              opacity: inputValue.trim() ? 1 : 0.5
            }}
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <p style={styles.chatDisclaimer}>
          Your advisor explains the "why" behind every suggestion.
        </p>
      </div>
    </div>
  );
}

// Simulated response generator (replaced by real AI in production)
function generateResponse(userMessage, profile) {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes('debt') || lower.includes('owe')) {
    return `I understand debt can feel heavy. Let me break this down simply:\n\n**Here's what I see:**\nBased on what you've shared, you have some debt that's causing you stress. That's important information — not because the number is "bad," but because stress affects how we make decisions.\n\n**Here's what I'd suggest:**\nLet's focus on one thing first: building a small buffer of $500-1000 before aggressively paying down debt. This prevents new debt when surprises happen.\n\n**Why this approach:**\nWithout a buffer, every car repair or medical bill goes right back on the card. We break the cycle first, then attack the debt.\n\nWant me to walk through the specific numbers?`;
  }
  
  if (lower.includes('first') || lower.includes('focus') || lower.includes('start')) {
    return `Great question. When everything feels urgent, it's hard to know where to begin.\n\n**My recommendation for you:**\n\n1. **This week:** Set up a separate savings account (takes 10 minutes)\n2. **This month:** Auto-transfer even $25/paycheck to it\n3. **Next 3 months:** Build to $500 buffer\n\n**Why this order:**\nWe're building the foundation before the house. Once you have a small cushion, everything else becomes less stressful — and that clarity helps you make better decisions.\n\nThis isn't about perfection. It's about progress that sticks. Does this feel doable?`;
  }
  
  if (lower.includes('month') || lower.includes('doing')) {
    return `Let me give you the honest picture.\n\n**What's going well:**\n• You're here, asking questions — that matters\n• You've been consistent with the basics\n\n**Where there's room:**\n• Your spending has a few patterns we could optimize\n• There's opportunity to redirect about $150/month without lifestyle changes\n\n**The simple version:**\nYou're not in crisis. You're in "could be better" territory — and that's actually the best place to make changes, because you have breathing room to do it right.\n\nWant me to show you where that $150 could come from?`;
  }
  
  if (lower.includes('explain') || lower.includes('simply') || lower.includes('understand')) {
    return `I'll always explain things in plain language. No jargon, no complexity for its own sake.\n\n**Here's my promise:**\nEvery suggestion I make, I'll tell you:\n• What to do\n• Why it helps\n• What happens if you don't\n\nYou should never feel confused or pressured. If something doesn't make sense, tell me and I'll explain it differently.\n\nWhat would you like me to break down for you?`;
  }
  
  return `I hear you. Let me think about this in the context of what you've shared with me.\n\n**What I understand:**\nYou're navigating a lot right now, and you want clarity — not more complexity.\n\n**What I can help with:**\n• Breaking down what matters most right now\n• Creating a simple plan that fits your life\n• Explaining any financial concept in plain terms\n• Being honest about tradeoffs\n\nWhat would be most helpful to focus on?`;
}
