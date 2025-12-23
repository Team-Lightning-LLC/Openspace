// Shared styles for Haven app
const styles = {
  // ===========================================
  // CONTAINER & LAYOUT
  // ===========================================
  container: {
    minHeight: '100vh',
    background: '#f8fafc',
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
    height: 300,
    background: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 50%, #fce7f3 100%)',
    zIndex: 0,
  },

  // ===========================================
  // HEADER
  // ===========================================
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
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1e293b',
    letterSpacing: '-0.5px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  notificationBtn: {
    position: 'relative',
    background: 'white',
    border: 'none',
    borderRadius: 12,
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    background: '#ef4444',
    borderRadius: '50%',
    border: '2px solid white',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },

  // ===========================================
  // NAVIGATION
  // ===========================================
  navPills: {
    display: 'flex',
    gap: 8,
    padding: '0 20px 16px',
    position: 'relative',
    zIndex: 1,
    overflowX: 'auto',
  },
  navPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 16px',
    background: 'rgba(255,255,255,0.7)',
    border: 'none',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 500,
    color: '#64748b',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  navPillActive: {
    background: 'white',
    color: '#1e293b',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },

  // ===========================================
  // MAIN CONTENT
  // ===========================================
  main: {
    padding: '0 20px 100px',
    position: 'relative',
    zIndex: 1,
  },
  greeting: {
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#1e293b',
  },

  // ===========================================
  // CARDS
  // ===========================================
  card: {
    background: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  checkInIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: '#ecfdf5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInLabel: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
  },
  moreBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: 16,
    letterSpacing: 2,
  },
  advisorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  advisorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  advisorName: {
    fontSize: 17,
    fontWeight: 600,
    color: '#1e293b',
  },
  advisorSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
  dateRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 16,
  },
  dateHighlight: {
    fontSize: 18,
    fontWeight: 600,
    color: '#6366f1',
  },
  timeText: {
    fontSize: 15,
    color: '#64748b',
  },
  recommendText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 1.5,
  },

  // ===========================================
  // BUTTONS
  // ===========================================
  secondaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: 'transparent',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
    cursor: 'pointer',
    marginBottom: 10,
  },
  primaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  // ===========================================
  // SNAPSHOT CARD
  // ===========================================
  snapshotCard: {
    background: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  snapshotHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  snapshotTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
  },
  snapshotGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 16,
  },
  snapshotItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  snapshotLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  snapshotValue: {
    fontSize: 20,
    fontWeight: 600,
    color: '#cbd5e1',
  },
  snapshotHint: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // ===========================================
  // TASKS
  // ===========================================
  tasksSection: {
    background: 'white',
    borderRadius: 20,
    padding: 20,
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  tasksHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #f1f5f9',
  },
  tasksTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 0',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #f1f5f9',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
  taskCheck: {
    width: 24,
    height: 24,
  },
  taskCheckEmpty: {
    width: 22,
    height: 22,
    borderRadius: 6,
    border: '2px solid #e2e8f0',
  },
  taskCheckComplete: {
    width: 22,
    height: 22,
    borderRadius: 6,
    background: '#10b981',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
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
    color: '#1e293b',
  },
  taskNameComplete: {
    textDecoration: 'line-through',
    color: '#94a3b8',
  },
  taskUrgent: {
    fontSize: 13,
    color: '#f59e0b',
    fontWeight: 500,
  },
  taskPending: {
    fontSize: 13,
    color: '#94a3b8',
  },
  taskComplete: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: 500,
  },

  // ===========================================
  // BOTTOM NAVIGATION
  // ===========================================
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 430,
    background: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px 20px 24px',
    borderTop: '1px solid #f1f5f9',
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
  },
  bottomNavLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 500,
  },
  messageBadge: {
    position: 'absolute',
    top: -2,
    right: 4,
    width: 18,
    height: 18,
    background: '#ef4444',
    borderRadius: '50%',
    color: 'white',
    fontSize: 11,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ===========================================
  // FLOATING HELP
  // ===========================================
  floatingHelp: {
    position: 'fixed',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },

  // ===========================================
  // ONBOARDING CONTAINER
  // ===========================================
  onboardingContainer: {
    minHeight: '100vh',
    background: '#f8fafc',
    position: 'relative',
    maxWidth: 430,
    margin: '0 auto',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  onboardingGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    background: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 50%, #fce7f3 100%)',
    zIndex: 0,
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
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.8)',
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
    gap: 6,
  },
  progressBar: {
    width: '100%',
    height: 6,
    background: 'rgba(255,255,255,0.5)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
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
    background: 'linear-gradient(180deg, transparent 0%, #f8fafc 20%)',
    zIndex: 10,
  },
  continueBtn: {
    width: '100%',
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 600,
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
  },

  // ===========================================
  // STEP CONTENT
  // ===========================================
  stepContent: {
    paddingTop: 20,
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: '-0.5px',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
    lineHeight: 1.5,
  },

  // ===========================================
  // FORM ELEMENTS
  // ===========================================
  formGroup: {
    marginBottom: 28,
  },
  label: {
    display: 'block',
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 12,
  },
  labelHint: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: -8,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    padding: '16px 18px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    fontSize: 16,
    color: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '16px 18px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    fontSize: 16,
    color: '#1e293b',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  textareaLarge: {
    width: '100%',
    padding: '18px 20px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 16,
    fontSize: 16,
    color: '#1e293b',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.6,
    boxSizing: 'border-box',
  },

  // ===========================================
  // SLIDER
  // ===========================================
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: 'white',
    padding: '16px 20px',
    borderRadius: 14,
    border: '2px solid #e2e8f0',
  },
  slider: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    appearance: 'none',
    background: '#e2e8f0',
    outline: 'none',
  },
  sliderValue: {
    fontSize: 15,
    fontWeight: 600,
    color: '#6366f1',
    minWidth: 80,
    textAlign: 'right',
  },

  // ===========================================
  // OPTION BUTTONS
  // ===========================================
  optionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  optionBtn: {
    padding: '14px 16px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
  },
  optionBtnActive: {
    background: '#f0f0ff',
    borderColor: '#6366f1',
    color: '#6366f1',
  },
  optionRow: {
    display: 'flex',
    gap: 12,
  },
  optionBtnLarge: {
    flex: 1,
    padding: '18px 20px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  // ===========================================
  // CHECKBOX GRID
  // ===========================================
  checkboxGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  checkboxBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 12,
    fontSize: 15,
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  checkboxBtnActive: {
    background: '#f0f0ff',
    borderColor: '#6366f1',
    color: '#6366f1',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    border: '2px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    color: '#6366f1',
    background: 'white',
    flexShrink: 0,
  },
  checkboxActive: {
    background: '#6366f1',
    borderColor: '#6366f1',
    color: 'white',
  },

  // ===========================================
  // GOAL BUTTONS
  // ===========================================
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
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
    position: 'relative',
  },
  goalBtnActive: {
    background: '#f0f0ff',
    borderColor: '#6366f1',
  },
  goalIcon: {
    fontSize: 24,
  },
  goalLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: 500,
    color: '#1e293b',
  },
  goalCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    background: '#6366f1',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
  },

  // ===========================================
  // COUNTER
  // ===========================================
  counterRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    background: 'white',
    padding: '16px',
    borderRadius: 14,
    border: '2px solid #e2e8f0',
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: '#f1f5f9',
    border: 'none',
    fontSize: 24,
    color: '#64748b',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1e293b',
    minWidth: 40,
    textAlign: 'center',
  },

  // ===========================================
  // COMFORT OPTIONS
  // ===========================================
  comfortOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  comfortBtn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '18px 20px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  comfortBtnActive: {
    background: '#f0f0ff',
    borderColor: '#6366f1',
  },
  comfortLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
  },
  comfortDesc: {
    fontSize: 13,
    color: '#94a3b8',
  },

  // ===========================================
  // COMPLETION NOTE
  // ===========================================
  completionNote: {
    display: 'flex',
    gap: 16,
    padding: 20,
    background: '#ecfdf5',
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
};

export default styles;
