# OpenSpace - Fiduciary Guardian Platform UI

A human-centered financial platform that empowers individuals to transform their financial lives through guided support, transparent advice, and genuine care.

## Philosophy

OpenSpace is built on the principle that financial tools should protect, not extract. Every design decision prioritizes:

- **Simplicity over complexity** — After a long day of work, users don't have cognitive bandwidth for complicated interfaces
- **Trust through transparency** — Every recommendation explains the "why" in plain language
- **Protection before growth** — Emergency funds come before investments
- **Human context over cold numbers** — Debt isn't just a number; it's a story

## Structure

```
openspace-app/
├── index.js              # Main exports
├── App.jsx               # Root component, routing & global state
├── styles.js             # Shared style definitions
│
├── HomePage.jsx          # Main dashboard
├── OnboardingFlow.jsx    # 5-step human-centered onboarding
├── AdvisorChat.jsx       # AI advisor conversation interface
├── AccountLinking.jsx    # Bank/card connection flow
│
├── PlanView.jsx          # Financial plan & goals
├── LearnView.jsx         # Educational content
├── ProgressView.jsx      # Progress tracking & milestones
├── MessagesView.jsx      # Notifications & messages
│
├── NavPills.jsx          # Top navigation component
├── BottomNav.jsx         # Bottom navigation component
└── README.md             # This file
```

## Views

### HomePage
The central dashboard featuring:
- Greeting and avatar
- Next check-in card with AI Advisor scheduling
- Financial snapshot (Net Worth, Surplus, Goal Progress, Safety Score)
- Tasks list (profile, accounts, goals, quarterly update)
- Bottom navigation

### OnboardingFlow
5-step wizard designed to be completed in under 10 minutes:

| Step | Name | Purpose |
|------|------|---------|
| 1 | Basics | Name, contact, work, income stability |
| 2 | Money | Income, savings, debt types & **stress level** |
| 3 | Goals | Up to 3 priority goals (human-centered options) |
| 4 | Context | Dependents, upcoming events, decision comfort |
| 5 | Human | Open-ended questions about what they'd change |

### AdvisorChat
Conversational interface for ongoing relationship with AI advisor:
- Natural chat interface
- Quick prompts for common questions
- Responses always include "Here's why" explanations
- Simulated typing indicator

### AccountLinking
Plaid-style account connection flow:
- Trust-building introduction
- Institution selection grid
- Connecting animation with progress steps
- Success state with account summary

### PlanView
Financial planning dashboard:
- Recommended priority order with explanations
- Goal cards with progress bars
- Suggested monthly allocation

### LearnView
Financial education:
- Personalized lesson recommendations
- Category-based organization
- Short, practical content (5-8 min each)

### ProgressView
Progress tracking:
- Net worth trend visualization
- Key metrics grid
- Milestone timeline
- Encouragement messaging

### MessagesView
Notifications and communications:
- Filterable message list
- Unread indicators
- Message type categorization (insights, alerts, reminders)

## Data Flow

```
User completes onboarding
        ↓
formData stored in App state
        ↓
Profile documents generated (future)
        ↓
Documents passed to AI agents
        ↓
Personalized advice delivered
```

## Profile Documents (Generated on Completion)

```
Profile: Core
- Name, contact, employment
- Income stability assessment

Profile: Snapshot  
- Income range, savings range
- Debt types and stress level

Profile: Goals
- Prioritized objectives (up to 3)
- Timelines where applicable

Profile: Context
- Dependents, household structure
- Upcoming life events
- Decision-making preference
- Open-ended responses (verbatim)
```

## Design System

### Colors
- Primary: `#6366f1` → `#8b5cf6` (indigo to purple gradient)
- Success: `#10b981` (emerald)
- Warning: `#f59e0b` (amber)
- Error: `#ef4444` (red)
- Text: `#1e293b` (slate-800)
- Muted: `#64748b` (slate-500)
- Background: `#f8fafc` (slate-50)

### Typography
- Font: DM Sans (with system fallbacks)
- Titles: 26px, weight 700
- Body: 15px, weight 500
- Caption: 13px, weight 500

### Spacing
- Container max-width: 430px
- Section padding: 20px
- Card padding: 20-24px
- Card border-radius: 16-20px

### Components
- Buttons: 14px border-radius, gradient backgrounds
- Inputs: 14px border-radius, 2px borders
- Cards: 16-20px border-radius, subtle shadows

## Usage

```jsx
import { App } from './openspace-app';

function Root() {
  return <App />;
}
```

## Agent Integration

This UI is designed to work with Agent 1 (the constitutional layer) and its module agents:

| Agent | UI Integration |
|-------|----------------|
| Onboarding Agent | OnboardingFlow.jsx generates Profile documents |
| Evaluation Agent | Reads profiles, populates HomePage snapshot |
| Planning Agent | Generates content for PlanView |
| Advisor Agent | Powers AdvisorChat conversations |
| Email Agent | Creates content surfaced in MessagesView |

## Next Steps

- [ ] Connect to Vertesia API for real AI responses
- [ ] Implement Plaid integration for real account linking
- [ ] Profile document generation and storage
- [ ] Quarterly check-in scheduling system
- [ ] Push notification integration
- [ ] Settings and profile editing views

## License

Proprietary - All rights reserved
