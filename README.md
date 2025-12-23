# Haven App - UI Components

A fiduciary guardian platform UI built with React.

## Structure

```
haven-app/
├── index.js          # Main exports
├── App.jsx           # Root component, routing & state management
├── HomePage.jsx      # Main dashboard view
├── OnboardingFlow.jsx # 5-step onboarding wizard
├── styles.js         # Shared style definitions
└── README.md         # This file
```

## Components

### App.jsx
The root component that:
- Manages global state (current view, form data)
- Handles routing between HomePage and OnboardingFlow
- Provides form helpers (updateForm, toggleArrayItem)

### HomePage.jsx
The main dashboard featuring:
- Header with logo, notifications, avatar
- Navigation pills (Home, Plan, Learn, Progress)
- Next check-in card with AI Advisor
- Financial snapshot (populates after account linking)
- Tasks list (onboarding, account linking, goal setting)
- Bottom navigation (Home, Advisor, Messages)

### OnboardingFlow.jsx
5-step onboarding wizard:

| Step | Component | Purpose |
|------|-----------|---------|
| 1 | StepBasics | Name, contact, work, income stability |
| 2 | StepMoney | Income, savings, debt types & stress level |
| 3 | StepGoals | Up to 3 priority goals |
| 4 | StepContext | Dependents, life events, decision comfort |
| 5 | StepHuman | Open-ended: what they'd change, anything else |

### styles.js
Centralized style object for consistency across components.

## Design Principles

- **Warm, not cold**: Gradient backgrounds, rounded corners, wellness-app feel
- **Human-centered**: Questions about stress, not just numbers
- **Progressive disclosure**: Debt details only appear if hasDebt is true
- **Mobile-first**: Max-width 430px, touch-friendly targets

## Data Flow

```
User fills onboarding
        ↓
formData object populated
        ↓
On complete: generate Profile documents
        ↓
Profile docs passed to downstream agents
```

## Profile Documents (Generated on Completion)

- **Profile: Core** - Name, contact, employment
- **Profile: Snapshot** - Income, savings, debt, stress indicators
- **Profile: Goals** - Prioritized objectives with timelines
- **Profile: Context** - Life circumstances, decision preferences, open responses

## Usage

```jsx
import { App } from './haven-app';

function Root() {
  return <App />;
}
```

## Next Steps

- [ ] Profile document generation on completion
- [ ] Account linking flow (Plaid integration)
- [ ] Advisor chat interface
- [ ] Quarterly check-in scheduling
