# Deploying OpenSpace to Vercel

## Quick Start (5 minutes)

### Step 1: Download the Project

Download the `openspace-deploy` folder from this chat.

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `openspace` (or whatever you prefer)
3. Keep it **Public** or **Private** — your choice
4. Don't initialize with README (we already have one)
5. Click **Create repository**

### Step 3: Push to GitHub

Open your terminal in the `openspace-deploy` folder:

```bash
# Navigate to the project folder
cd openspace-deploy

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: OpenSpace UI"

# Add your GitHub repo as remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/openspace.git

# Push
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New...** → **Project**
3. Find and select your `openspace` repository
4. Vercel auto-detects Vite — settings should be:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**

Wait 30-60 seconds. Done! 🎉

Your app will be live at: `https://openspace-YOUR_USERNAME.vercel.app`

---

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Opens at `http://localhost:5173`

---

## Project Structure

```
openspace-deploy/
├── index.html          # Entry HTML (Vite)
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
├── .gitignore          # Git ignore rules
├── README.md           # Project documentation
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Root component
    ├── styles.js       # Design system
    ├── HomePage.jsx
    ├── OnboardingFlow.jsx
    ├── AdvisorChat.jsx
    ├── AccountLinking.jsx
    ├── PlanView.jsx
    ├── LearnView.jsx
    ├── ProgressView.jsx
    ├── MessagesView.jsx
    ├── NavPills.jsx
    └── BottomNav.jsx
```

---

## Updating After Deployment

After you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel automatically redeploys on every push to `main`.

---

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Update DNS records as instructed

---

## Environment Variables (Future)

When you add API integrations:

1. In Vercel, go to **Settings** → **Environment Variables**
2. Add variables like:
   - `VITE_API_URL` — Your backend URL
   - `VITE_PLAID_KEY` — Plaid API key

Access in code: `import.meta.env.VITE_API_URL`
