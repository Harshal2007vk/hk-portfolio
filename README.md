# HK∴DEV — Futuristic Portfolio Platform

A production-grade, admin-controlled futuristic 3D portfolio platform.
**Admin edits everything. Public only views.**

---

## ✦ TECH STACK

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| 3D Scene | Three.js + @react-three/fiber + drei |
| Backend | Firebase (Firestore + Auth + Storage) |
| Auth | Firebase Email/Password (admin only) |
| Deployment | Vercel (frontend) |

---

## ✦ PROJECT STRUCTURE

```
hk-portfolio/
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── Background3D.jsx       ← Three.js scene
│   │   ├── public/
│   │   │   ├── PublicNav.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx       ← Dynamic from Firestore
│   │   │   ├── ProjectsSection.jsx    ← Dynamic from Firestore
│   │   │   ├── MediaSection.jsx       ← Dynamic from Firestore
│   │   │   ├── CommunitySection.jsx
│   │   │   └── ContactSection.jsx     ← Dynamic from Firestore
│   │   └── ui/
│   │       ├── Cursor.jsx             ← Custom glowing cursor
│   │       └── LoadingScreen.jsx      ← Animated boot screen
│   ├── hooks/
│   │   └── useAuth.js                 ← Auth context
│   ├── pages/
│   │   ├── public/
│   │   │   ├── PublicLayout.jsx
│   │   │   └── HomePage.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx         ← Protected auth page
│   │       ├── AdminLayout.jsx        ← Sidebar layout
│   │       ├── Dashboard.jsx          ← Stats + chart + activity log
│   │       ├── ProjectsAdmin.jsx      ← Full CRUD
│   │       ├── AboutAdmin.jsx         ← Edit bio + skills
│   │       ├── MediaAdmin.jsx         ← Upload + manage gallery
│   │       ├── SocialsAdmin.jsx       ← All social links
│   │       └── SettingsAdmin.jsx      ← Section visibility toggles
│   ├── services/
│   │   └── firebase.js                ← All Firebase calls
│   └── styles/
│       └── index.css
├── scripts/
│   └── createAdmin.mjs                ← One-time admin setup script
├── firestore.rules                    ← Security rules
├── storage.rules                      ← Storage security rules
├── vercel.json                        ← Vercel SPA config
└── .env.example                       ← Environment template
```

---

## ✦ STEP-BY-STEP SETUP

### STEP 1 — Install Node.js

Download Node.js 18+ from https://nodejs.org
Verify: `node --version`

---

### STEP 2 — Install Dependencies

```bash
cd hk-portfolio
npm install
```

---

### STEP 3 — Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"Add project"** → Name it `hk-portfolio`
3. Disable Google Analytics (optional) → **Create project**

#### Enable Authentication
- Sidebar → **Build → Authentication → Get started**
- **Sign-in method** tab → Enable **Email/Password**
- Click Save

#### Create Firestore Database
- Sidebar → **Build → Firestore Database → Create database**
- Choose **"Start in production mode"**
- Select a region close to you (e.g., `asia-south1` for India)
- Click Done

#### Enable Storage
- Sidebar → **Build → Storage → Get started**
- Start in production mode → Choose same region → Done

#### Get Web App Config
- Project Settings (gear icon top-left) → **General** tab
- Scroll to **"Your apps"** → Click **`</>`** (Web app)
- Name: `hk-portfolio-web` → Register app
- **Copy the `firebaseConfig` object shown** — you'll need it next

---

### STEP 4 — Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Firebase config values:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=hk-portfolio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=hk-portfolio
VITE_FIREBASE_STORAGE_BUCKET=hk-portfolio.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

### STEP 5 — Apply Firestore Security Rules

1. Open `firestore.rules` in this project
2. Go to Firebase Console → **Firestore → Rules** tab
3. Replace all existing rules with the contents of `firestore.rules`
4. Click **Publish**

Do the same for Storage:
1. Open `storage.rules`
2. Firebase Console → **Storage → Rules** tab
3. Replace rules → Publish

---

### STEP 6 — Create Admin User (ONE TIME)

Edit `scripts/createAdmin.mjs`:
- Paste your `firebaseConfig`
- Set your desired `ADMIN_EMAIL` and `ADMIN_PASSWORD`

```bash
npm run create-admin
```

✅ Output should show: `Admin created successfully!`

**Keep your credentials safe — this can only be run once per email.**

---

### STEP 7 — Run the Project

```bash
npm run dev
```

Open: http://localhost:5173

- **Public portfolio**: http://localhost:5173/
- **Admin panel**: http://localhost:5173/admin/login

---

## ✦ ADMIN PANEL GUIDE

| Page | URL | What you can do |
|---|---|---|
| Dashboard | `/admin` | View stats, chart, recent activity |
| Projects | `/admin/projects` | Add / Edit / Delete / Toggle visibility |
| About | `/admin/about` | Edit bio paragraphs and skills list |
| Media | `/admin/media` | Upload images/videos, delete files |
| Social Links | `/admin/socials` | Update all contact/social links |
| Settings | `/admin/settings` | Toggle which sections show publicly |

---

## ✦ FIRESTORE COLLECTIONS

| Collection | Document(s) | Purpose |
|---|---|---|
| `projects` | auto-id | Project cards |
| `about` | `main` | Bio and skills |
| `socials` | `links` | All social/contact links |
| `media` | auto-id | Uploaded gallery files |
| `settings` | `visibility` | Section show/hide toggles |
| `admins` | `{uid}` | Admin role verification |
| `activity` | auto-id | Admin action log |

---

## ✦ DEPLOYMENT TO VERCEL

### Option A — Vercel CLI

```bash
npm install -g vercel
npm run build
vercel
```

### Option B — GitHub + Vercel Dashboard

1. Push this project to a GitHub repo
2. Go to https://vercel.com → **New Project** → Import your repo
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add all **Environment Variables** from `.env.local`
7. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`

---

## ✦ PUBLIC WEBSITE SECTIONS

| Section | Data Source | Admin Control |
|---|---|---|
| Hero | Static (hardcoded) | — |
| About | Firestore `about/main` | ✅ Full edit |
| Projects | Firestore `projects` | ✅ Full CRUD |
| Media Gallery | Firestore `media` + Storage | ✅ Upload/delete |
| Community | Static (hardcoded) | — |
| Contact | Firestore `socials/links` | ✅ Full edit |
| Section visibility | Firestore `settings/visibility` | ✅ Toggle on/off |

---

## ✦ SECURITY MODEL

```
Public users:
  ✅ Read all Firestore collections (projects, about, media, socials, settings)
  ✅ Read all Storage files (images, videos)
  ❌ Cannot write anything

Admin (authenticated):
  ✅ Read + Write all collections
  ✅ Upload + Delete storage files
  ✅ Access /admin/* routes
  ✅ Activity logged on every action

Non-admin authenticated users:
  ❌ Firestore rules check admins/{uid} — rejected if not in list
```

---

## ✦ CUSTOMIZATION

- **Hero name/title**: Edit `src/components/public/HeroSection.jsx`
- **Community section**: Edit `src/components/public/CommunitySection.jsx`
- **Colors**: Edit CSS variables in `src/styles/index.css`
- **3D scene**: Edit `src/components/3d/Background3D.jsx`
- **Add new admin pages**: Add route in `src/App.jsx` + create page in `src/pages/admin/`

---

Built with ❤️ for Harshal Vasanta Kapale · PRMIT&R, Badnera-Amravati
LEARN · BUILD · DEPLOY
