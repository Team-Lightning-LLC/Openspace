// ============================================
// OPENSPACE DESIGN SYSTEM — KUMO EDITION
// ============================================

// Kumo cloud image
export const KUMO_URL = 'https://i.imgur.com/oWuVYXz.png';

// ============================================
// COLORS (matched to the kumo gradient)
// ============================================
export const colors = {
  // Primary - Indigo Sky (from kumo image)
  primary: {
    gradient: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
    gradientReverse: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
    gradientSubtle: 'linear-gradient(135deg, #e0e7ff 0%, #e0f2fe 100%)',
    gradientVertical: 'linear-gradient(180deg, #38bdf8 0%, #1e3a5f 100%)', // Matches kumo top-to-bottom
    
    // Solid colors (sampled from kumo)
    skyLight: '#38bdf8',    // Top of cloud
    sky: '#0ea5e9',         // Mid sky
    indigo: '#818cf8',      // Purple tone
    indigoDeep: '#6366f1',  // Deeper purple
    navy: '#1e3a5f',        // Bottom of cloud
    navyDeep: '#172554',    // Darkest
  },
  
  // Neutrals
  neutral: {
    900: '#0f172a',
    800: '#1e293b',
    700: '#334155',
    600: '#475569',
    500: '#64748b',
    400: '#94a3b8',
    300: '#cbd5e1',
    200: '#e2e8f0',
    100: '#f1f5f9',
    50: '#f8fafc',
    0: '#ffffff',
  },
  
  // Semantic
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 2px 8px rgba(0, 0, 0, 0.06)',
  md: '0 4px 16px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.12)',
  primary: '0 4px 20px rgba(99, 102, 241, 0.25)',
  sky: '0 4px 20px rgba(56, 189, 248, 0.25)',
};

// ============================================
// SHARED STYLES
// ============================================
export const styles = {
  // Container
  container: {
    minHeight: '100vh',
    background: colors.neutral[50],
    position: 'relative',
    maxWidth: 430,
    margin: '0 auto',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  
  // Background gradient
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    background: 'linear-gradient(135deg, #e0e7ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
    zIndex: 0,
  },
  
  // Header
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    position: 'relative',
    zIndex: 1,
  },
  
  // Logo container
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  
  // Logo icon (kumo on gradient bg)
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: colors.primary.gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    boxShadow: shadows.primary,
  },
  
  // Logo image style (makes it white)
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: 'brightness(0) invert(1)',
  },
  
  // Logo text
  logoText: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.neutral[800],
    letterSpacing: '-0.5px',
  },
  
  // Cards
  card: {
    background: colors.neutral[0],
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    boxShadow: shadows.base,
  },
  
  // Primary Button
  buttonPrimary: {
    width: '100%',
    padding: '14px 20px',
    background: colors.primary.gradient,
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    color: colors.neutral[0],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: shadows.primary,
  },
  
  // Secondary Button
  buttonSecondary: {
    width: '100%',
    padding: '14px 20px',
    background: 'transparent',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    color: colors.neutral[800],
    cursor: 'pointer',
  },
  
  // Avatar
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: colors.primary.gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.neutral[0],
    fontWeight: 600,
    fontSize: 16,
  },
  
  // Nav Pills
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
    color: colors.neutral[500],
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  
  navPillActive: {
    background: colors.neutral[0],
    color: colors.neutral[800],
    boxShadow: shadows.sm,
  },
  
  // Bottom Nav
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 430,
    background: colors.neutral[0],
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px 20px 24px',
    borderTop: `1px solid ${colors.neutral[100]}`,
    zIndex: 100,
  },
  
  // Chat Bubbles
  messageBubbleUser: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    background: colors.primary.gradient,
    color: colors.neutral[0],
  },
  
  messageBubbleAdvisor: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    background: colors.neutral[0],
    boxShadow: shadows.base,
  },
  
  // Progress Bar
  progressBar: {
    width: '100%',
    height: 6,
    background: colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    background: colors.primary.gradient,
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  
  // Input
  input: {
    width: '100%',
    padding: '16px 18px',
    background: colors.neutral[0],
    border: `2px solid ${colors.neutral[200]}`,
    borderRadius: 14,
    fontSize: 16,
    color: colors.neutral[800],
    outline: 'none',
    boxSizing: 'border-box',
  },
  
  // Quick Prompt
  quickPrompt: {
    padding: '10px 14px',
    background: colors.neutral[0],
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: 20,
    fontSize: 13,
    color: colors.neutral[500],
    cursor: 'pointer',
  },
};

export default { colors, shadows, styles, KUMO_URL };
