// ============================================
// OPENSPACE DESIGN SYSTEM — KUMO EDITION
// ============================================

// Kumo cloud image URL
export const KUMO_URL = 'https://i.imgur.com/oWuVYXz.png';

// ============================================
// COLOR PALETTE — INDIGO SKY
// ============================================
export const colors = {
  // Primary gradient colors
  indigo: '#818cf8',
  indigoDeep: '#6366f1',
  sky: '#38bdf8',
  skyDeep: '#0ea5e9',
  
  // Neutrals
  text: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  bgLight: '#f1f5f9',
  bgPage: '#f8fafc',
  white: '#ffffff',
  
  // Semantic
  success: '#10b981',
  successLight: '#ecfdf5',
  warning: '#f59e0b',
  warningLight: '#fffbeb',
  error: '#ef4444',
  errorLight: '#fef2f2',
};

// ============================================
// GRADIENTS
// ============================================
export const gradients = {
  primary: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
  primaryHover: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
  subtle: 'linear-gradient(180deg, #f0f9ff 0%, #f8fafc 100%)',
  card: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
};

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 2px 8px rgba(0, 0, 0, 0.06)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.1)',
  primary: '0 4px 16px rgba(99, 102, 241, 0.25)',
  card: '0 4px 20px rgba(0, 0, 0, 0.06)',
};

// ============================================
// COMPONENT STYLES
// ============================================
export const styles = {
  // ==========================================
  // LAYOUT
  // ==========================================
  container: {
    minHeight: '100vh',
    background: colors.bgPage,
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
    height: 280,
    background: gradients.background,
    zIndex: 0,
  },

  main: {
    padding: '0 20px 120px',
    position: 'relative',
    zIndex: 1,
  },

  // ==========================================
  // HEADER
  // ==========================================
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
    width: 40,
    height: 40,
    borderRadius: 12,
    background: gradients.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    boxShadow: shadows.primary,
  },

  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: 'brightness(0) invert(1)',
  },

  logoText: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.text,
    letterSpacing: -0.5,
  },

  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },

  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.8)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: colors.error,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: gradients.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontWeight: 600,
    fontSize: 16,
    boxShadow: shadows.primary,
  },

  // ==========================================
  // NAV PILLS
  // ==========================================
  navPills: {
    display: 'flex',
    gap: 8,
    padding: '0 20px 20px',
    position: 'relative',
    zIndex: 1,
    overflowX: 'auto',
  },

  navPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 16px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px)',
    border: 'none',
    borderRadius: 24,
    fontSize: 14,
    fontWeight: 500,
    color: colors.textSecondary,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
  },

  navPillActive: {
    background: colors.white,
    color: colors.text,
    boxShadow: shadows.base,
  },

  // ==========================================
  // CARDS
  // ==========================================
  card: {
    background: colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    boxShadow: shadows.card,
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  cardHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },

  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardIconSuccess: {
    background: colors.successLight,
  },

  cardIconPrimary: {
    background: '#eef2ff',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textSecondary,
  },

  cardMenu: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  // ==========================================
  // ADVISOR CARD
  // ==========================================
  advisorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },

  advisorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: gradients.card,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  advisorInfo: {
    flex: 1,
  },

  advisorName: {
    fontSize: 17,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 2,
  },

  advisorSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  dateRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 12,
  },

  dateHighlight: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.indigo,
  },

  timeText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  recommendText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    lineHeight: 1.5,
  },

  // ==========================================
  // BUTTONS
  // ==========================================
  buttonPrimary: {
    width: '100%',
    padding: '14px 20px',
    background: gradients.primary,
    border: 'none',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
    color: colors.white,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: shadows.primary,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },

  buttonSecondary: {
    width: '100%',
    padding: '14px 20px',
    background: 'transparent',
    border: 'none',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
    color: colors.text,
    cursor: 'pointer',
    marginBottom: 8,
  },

  buttonOutline: {
    width: '100%',
    padding: '14px 20px',
    background: colors.white,
    border: `2px solid ${colors.border}`,
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
    color: colors.text,
    cursor: 'pointer',
  },

  // ==========================================
  // SNAPSHOT CARD
  // ==========================================
  snapshotGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    marginTop: 16,
  },

  snapshotItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },

  snapshotLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: 500,
  },

  snapshotValue: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.text,
  },

  snapshotValueEmpty: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.border,
  },

  snapshotHint: {
    gridColumn: '1 / -1',
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 4,
  },

  // ==========================================
  // TASKS
  // ==========================================
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '16px 0',
    background: 'none',
    border: 'none',
    borderBottom: `1px solid ${colors.bgLight}`,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },

  taskItemLast: {
    borderBottom: 'none',
  },

  taskCheck: {
    width: 24,
    height: 24,
    borderRadius: 8,
    border: `2px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  taskCheckComplete: {
    background: colors.success,
    borderColor: colors.success,
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
    color: colors.text,
  },

  taskNameComplete: {
    textDecoration: 'line-through',
    color: colors.textMuted,
  },

  taskStatus: {
    fontSize: 13,
    fontWeight: 500,
  },

  taskStatusUrgent: {
    color: colors.warning,
  },

  taskStatusPending: {
    color: colors.textMuted,
  },

  taskStatusComplete: {
    color: colors.success,
  },

  taskArrow: {
    color: colors.textMuted,
  },

  // ==========================================
  // BOTTOM NAV
  // ==========================================
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 430,
    background: colors.white,
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px 20px 28px',
    borderTop: `1px solid ${colors.bgLight}`,
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
    padding: '4px 12px',
  },

  bottomNavLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textMuted,
  },

  bottomNavLabelActive: {
    color: colors.indigo,
  },

  bottomNavBadge: {
    position: 'absolute',
    top: 0,
    right: 4,
    minWidth: 18,
    height: 18,
    background: colors.error,
    borderRadius: 9,
    color: colors.white,
    fontSize: 11,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
  },

  // ==========================================
  // ONBOARDING
  // ==========================================
  onboardingContainer: {
    minHeight: '100vh',
    background: colors.bgPage,
    position: 'relative',
    maxWidth: 430,
    margin: '0 auto',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    display: 'flex',
    flexDirection: 'column',
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
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.8)',
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
    gap: 8,
  },

  progressBar: {
    width: '100%',
    height: 6,
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    background: gradients.primary,
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },

  progressText: {
    fontSize: 13,
    color: colors.textSecondary,
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
    background: `linear-gradient(180deg, transparent 0%, ${colors.bgPage} 30%)`,
    zIndex: 10,
  },

  continueBtn: {
    width: '100%',
    padding: '16px 24px',
    background: gradients.primary,
    border: 'none',
    borderRadius: 16,
    fontSize: 16,
    fontWeight: 600,
    color: colors.white,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: shadows.primary,
  },

  // ==========================================
  // FORM ELEMENTS
  // ==========================================
  stepContent: {
    paddingTop: 20,
  },

  stepTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },

  stepSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    lineHeight: 1.5,
  },

  formGroup: {
    marginBottom: 28,
  },

  label: {
    display: 'block',
    fontSize: 15,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 12,
  },

  input: {
    width: '100%',
    padding: '16px 18px',
    background: colors.white,
    border: `2px solid ${colors.border}`,
    borderRadius: 14,
    fontSize: 16,
    color: colors.text,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },

  inputFocus: {
    borderColor: colors.sky,
  },

  optionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },

  optionBtn: {
    padding: '14px 16px',
    background: colors.white,
    border: `2px solid ${colors.border}`,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    color: colors.textSecondary,
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
  },

  optionBtnActive: {
    background: '#eef2ff',
    borderColor: colors.indigo,
    color: colors.indigo,
  },

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
    background: colors.white,
    border: `2px solid ${colors.border}`,
    borderRadius: 14,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
  },

  goalBtnActive: {
    background: '#eef2ff',
    borderColor: colors.indigo,
  },

  goalIcon: {
    fontSize: 24,
  },

  goalLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: 500,
    color: colors.text,
  },

  goalCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    background: colors.indigo,
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
  },

  textareaLarge: {
    width: '100%',
    padding: '18px 20px',
    background: colors.white,
    border: `2px solid ${colors.border}`,
    borderRadius: 16,
    fontSize: 16,
    color: colors.text,
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.6,
    boxSizing: 'border-box',
  },

  completionNote: {
    display: 'flex',
    gap: 16,
    padding: 20,
    background: colors.successLight,
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

  // ==========================================
  // CHAT
  // ==========================================
  chatContainer: {
    minHeight: '100vh',
    background: colors.bgPage,
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
    background: colors.white,
    borderBottom: `1px solid ${colors.bgLight}`,
    gap: 12,
  },

  chatBackBtn: {
    width: 44,
    height: 44,
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
    background: gradients.card,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatAdvisorName: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.text,
  },

  chatLimitsDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },

  limitBadge: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: 500,
  },

  limitDivider: {
    color: colors.border,
    fontSize: 12,
  },

  chatMessages: {
    flex: 1,
    padding: 16,
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
    background: colors.successLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  messageBubble: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: 18,
  },

  userBubble: {
    background: gradients.primary,
    borderBottomRightRadius: 4,
    color: colors.white,
  },

  advisorBubble: {
    background: colors.white,
    borderBottomLeftRadius: 4,
    boxShadow: shadows.base,
    color: colors.text,
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

  quickPrompts: {
    padding: '0 16px 16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },

  quickPromptBtn: {
    padding: '10px 14px',
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: 20,
    fontSize: 13,
    color: colors.textSecondary,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  chatInputArea: {
    padding: '12px 16px 28px',
    background: colors.white,
    borderTop: `1px solid ${colors.bgLight}`,
  },

  inputLimitIndicator: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 12,
    marginBottom: 8,
    padding: '0 4px',
    color: colors.textMuted,
  },

  chatInputWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
    background: colors.bgPage,
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
    color: colors.text,
  },

  chatSendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: gradients.primary,
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: colors.white,
    flexShrink: 0,
    boxShadow: shadows.primary,
  },

  chatDisclaimer: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },

  // ==========================================
  // MODALS
  // ==========================================
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 1000,
  },

  modalContent: {
    background: colors.white,
    borderRadius: 24,
    padding: 28,
    maxWidth: 340,
    width: '100%',
    textAlign: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 12,
  },

  modalText: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 24,
    lineHeight: 1.5,
  },

  modalPrimaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: gradients.primary,
    border: 'none',
    borderRadius: 14,
    color: colors.white,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 12,
    boxShadow: shadows.primary,
  },

  modalSecondaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: 'transparent',
    border: 'none',
    borderRadius: 14,
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
  },

  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    background: colors.successLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },

  // ==========================================
  // TYPING INDICATOR
  // ==========================================
  typingIndicator: {
    display: 'flex',
    gap: 4,
    padding: '4px 0',
  },

  typingDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: colors.textMuted,
    animation: 'pulse 1.4s infinite',
  },

  // ==========================================
  // GREETING
  // ==========================================
  greeting: {
    marginBottom: 20,
  },

  greetingText: {
    fontSize: 22,
    fontWeight: 600,
    color: colors.text,
  },

  // ==========================================
  // MENU DROPDOWN
  // ==========================================
  menuContainer: {
    position: 'relative',
  },

  menuDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 8,
    background: colors.white,
    borderRadius: 14,
    boxShadow: shadows.lg,
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
    color: colors.text,
    cursor: 'pointer',
    textAlign: 'left',
    borderBottom: `1px solid ${colors.bgLight}`,
  },

  menuItemLast: {
    borderBottom: 'none',
  },

  // ==========================================
  // INLINE LINK
  // ==========================================
  inlineLink: {
    background: 'none',
    border: 'none',
    color: colors.indigo,
    fontSize: 'inherit',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
    textUnderlineOffset: 2,
  },
};

export default { styles, colors, gradients, shadows, KUMO_URL };
