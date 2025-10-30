# 🎂 Birthday Celebration App

**Live at: [bdaypresenter.com](https://bdaypresenter.com)**

A beautiful, multi-tenant SaaS application for displaying team birthdays on digital signage using SignPresenter. Built with React and Supabase.

## 🏗️ Architecture Overview

This is a serverless web application with the following components:

- **Frontend**: React SPA hosted on Vercel (auto-deploys from GitHub)
- **Backend**: Supabase (managed PostgreSQL database, authentication, and file storage)
- **Domain**: bdaypresenter.com (GoDaddy DNS → Vercel)
- **Version Control**: GitHub ([mbyrdLCS/bdaypresenter](https://github.com/mbyrdLCS/bdaypresenter))

### How It Works

1. **User Signs Up** → Creates account in Supabase Auth
2. **Profile Created** → Automatic trigger creates user profile with unique display URL slug
3. **Add Team Members** → Stored in Supabase database with photos in Supabase Storage
4. **Display Page** → Public URL at `/display/{slug}` shows birthdays in real-time
5. **SignPresenter** → Points to the display URL, auto-updates when data changes (no re-configuration needed!)

### Auto-Updates Feature

The beauty of this system: **Set it once in SignPresenter, and changes auto-update!**

- User adds/edits/deletes birthdays in dashboard
- Changes are saved to Supabase database
- Display page fetches fresh data on each load
- SignPresenter shows updated content automatically
- No need to re-add URLs or refresh anything in SignPresenter

## ✨ Features

- 🔐 **Multi-tenant Authentication** - Each organization has their own account
- 👥 **Team Management** - Add, edit, and delete team members
- 📸 **Photo Uploads** - Upload profile photos for each team member
- 🎨 **Seasonal Themes** - Automatically changing themes for each month
- 📅 **Monthly View** - Shows all birthdays for the current month
- 🎉 **Daily Spotlight** - Full-screen celebration on actual birthdays
- 🔄 **Auto-rotation** - Cycles through multiple birthdays on the same day
- 🔗 **Unique Display URLs** - Each organization gets their own display URL
- 📺 **SignPresenter Ready** - Optimized for digital signage

## 🚀 Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Routing**: React Router
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- A Supabase account (free tier works great)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd birthday-celebration-app
npm install
```

### 2. Set Up Supabase

#### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project (note: it may take 2-3 minutes to set up)

#### Run the Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `database-schema.sql`
3. Paste and run the SQL script
4. This will create:
   - `profiles` table
   - `team_members` table
   - Row Level Security policies
   - Automatic profile creation trigger

#### Set Up Storage

1. In your Supabase dashboard, go to **Storage**
2. Click "New bucket"
3. Create a bucket named `profile-photos`
4. Make it **public**
5. Add the following policy for uploads:
   - Policy name: "Authenticated users can upload"
   - Allowed operation: INSERT
   - Target roles: authenticated
   - Policy definition: `(bucket_id = 'profile-photos')`

#### Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Project Settings** → **API**
2. Copy your **Project URL** (looks like `https://xxxxx.supabase.co`)
3. Copy your **anon/public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📱 Usage

### For Organizations

1. **Sign Up**: Create an account with your organization name
2. **Add Team Members**: Go to the dashboard and add team members with:
   - Name
   - Birthday (month and day)
   - Photo (optional)
3. **Get Your Display URL**: Copy the unique URL from your dashboard
4. **Set Up SignPresenter**:
   - Add a new website element in SignPresenter
   - Paste your display URL
   - Set the duration as desired (recommended: 30-60 seconds)
   - [SignPresenter Website Guide](https://support.signpresenter.com/topics/showwebsite.html)

### Display Behavior

- **Monthly View**: Shows all birthdays for the current month in a grid layout
- **Birthday Spotlight**: On someone's actual birthday, shows a full-screen celebration with their photo
- **Multiple Birthdays**: If multiple people share a birthday, it rotates between them every 10 seconds
- **Seasonal Themes**: Each month has a unique color scheme and emoji theme

## 🎨 Seasonal Themes

| Month | Theme | Colors | Emoji |
|-------|-------|--------|-------|
| January | Winter Wonderland | Blue & White | ❄️ |
| February | Love & Hearts | Pink & Red | 💝 |
| March | Spring Awakening | Green & Lime | 🌷 |
| April | Spring Blossoms | Pink & Purple | 🌸 |
| May | Sunshine Days | Yellow & Orange | 🌻 |
| June | Summer Vibes | Cyan & Blue | ☀️ |
| July | Summer Fun | Red & Orange | 🎆 |
| August | Beach Days | Teal & Cyan | 🏖️ |
| September | Autumn Begins | Amber & Orange | 🍂 |
| October | Fall Harvest | Orange & Red | 🎃 |
| November | Cozy Season | Brown & Amber | 🍁 |
| December | Winter Holidays | Red & Green | 🎄 |

## 🚢 Deployment

### Current Production Setup

**Live URLs:**
- Production: https://bdaypresenter.com
- Vercel URL: https://bdaypresenter.vercel.app
- GitHub Repo: https://github.com/mbyrdLCS/bdaypresenter

**Infrastructure:**
- Hosting: Vercel (Free tier - auto-deploys from GitHub main branch)
- Database: Supabase (Free tier - hosted PostgreSQL)
- Domain: GoDaddy (bdaypresenter.com)
- DNS: Points to Vercel via A record to 216.198.79.1

**Environment Variables in Vercel:**
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### How to Update the Live Site

**The app uses continuous deployment - it's fully automated!**

1. Make your changes locally
2. Test locally with `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. **That's it!** Vercel automatically:
   - Detects the push to main branch
   - Runs the build (`npm run build`)
   - Deploys to production
   - Updates https://bdaypresenter.com
   - Usually takes 1-2 minutes

You can watch the deployment progress at: https://vercel.com/dashboard

### Initial Deployment (Already Done)

This section is for reference - the app is already deployed!

1. ✅ Created GitHub repository at `mbyrdLCS/bdaypresenter`
2. ✅ Connected Vercel to GitHub
3. ✅ Configured environment variables in Vercel
4. ✅ Set up custom domain bdaypresenter.com
5. ✅ Configured DNS in GoDaddy:
   - A record: @ → 216.198.79.1
   - CNAME: www → cname.vercel-dns.com
6. ✅ Updated Supabase redirect URLs to include:
   - http://localhost:5173/**
   - https://bdaypresenter.com/**
   - https://*.vercel.app/**

### Deploy to a New Instance (If Starting Fresh)

1. Fork this repo or create your own
2. Set up Supabase project and run `database-schema.sql`
3. Go to [vercel.com](https://vercel.com) and import your repo
4. Add environment variables in Vercel
5. Deploy
6. (Optional) Add custom domain in Vercel settings

## 📁 Project Structure

```
birthday-celebration-app/
├── src/
│   ├── components/       # Reusable React components
│   ├── contexts/         # React contexts (Auth)
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Landing page
│   │   ├── Login.jsx    # Login page
│   │   ├── Signup.jsx   # Signup page
│   │   ├── Dashboard.jsx # Admin dashboard
│   │   └── Display.jsx  # Public birthday display
│   ├── services/        # External services
│   │   └── supabase.js  # Supabase client
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles with Tailwind
├── database-schema.sql  # Supabase database schema
├── .env.example         # Example environment variables
└── README.md           # This file
```

## 🔒 Security

- **Row Level Security (RLS)**: Enabled on all tables
- **User Isolation**: Each user can only access their own data
- **Public Display URLs**: Display pages are publicly accessible (read-only)
- **Authenticated Uploads**: Only authenticated users can upload photos
- **Secure Storage**: Photos stored in Supabase Storage with proper policies

## 🔄 Common Updates & Maintenance

### Adding New Features

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test locally
4. Commit and push:
   ```bash
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```
5. Merge to main when ready (or create PR on GitHub)

### Updating Styles/Design

- Main styles: `src/index.css` (Tailwind utilities and custom classes)
- Component styles: Tailwind classes in JSX files
- Color scheme: Edit gradient colors in component files
- Seasonal themes: `src/pages/Display.jsx` (line ~100-200)

### Database Changes

1. Make changes in Supabase dashboard SQL editor
2. Update `database-schema.sql` file to keep it in sync
3. Document changes in this README

### Environment Variables

**Local development:**
- Edit `.env` file
- Restart dev server

**Production (Vercel):**
1. Go to Vercel dashboard
2. Select bdaypresenter project
3. Settings → Environment Variables
4. Add/Edit variables
5. Redeploy (or push to trigger auto-deploy)

## 🐛 Troubleshooting

### "Supabase credentials not found" warning

- Make sure your `.env` file exists and has the correct variables
- Restart your development server after creating/updating `.env`

### Photos not uploading

- Verify you created the `profile-photos` bucket in Supabase Storage
- Ensure the bucket is set to public
- Check that upload policies are configured correctly

### Display page not showing team members

- Verify the database schema was run successfully
- Check that team members were added through the dashboard
- Ensure the correct user ID is in the URL

### Build fails with Tailwind errors

- Make sure `tailwind.config.js` and `postcss.config.js` exist
- Verify `@import "tailwindcss"` is in `src/index.css`
- Try deleting `node_modules` and running `npm install` again

### Domain not working

- Check DNS settings in GoDaddy
- Verify A record points to 216.198.79.1
- Check Vercel domain configuration
- DNS changes can take up to 48 hours (usually 5-30 minutes)

### Deployment failed on Vercel

- Check build logs in Vercel dashboard
- Ensure environment variables are set
- Verify `package.json` scripts are correct
- Check for TypeScript/ESLint errors

## 📝 Database Schema

See `database-schema.sql` for the complete schema with:
- User profiles with organization names
- Team members with birthdays
- Row Level Security policies
- Automatic triggers
- Storage bucket configuration

## 🤝 Contributing

This is a free service for SignPresenter users. If you find bugs or have feature requests, please open an issue!

## 📄 License

MIT License - feel free to use this for your organization!

## 🎉 Credits

Built with ❤️ for the SignPresenter community.

---

**Questions or need help?** Open an issue or refer to the [SignPresenter documentation](https://support.signpresenter.com/).
