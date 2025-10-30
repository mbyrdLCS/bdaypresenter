# 🎂 Birthday Celebration App

A beautiful, multi-tenant SaaS application for displaying team birthdays on digital signage using SignPresenter. Built with React and Supabase.

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

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

Your app will be live at `https://your-app.vercel.app`

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site Settings
7. Deploy!

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
- Verify `@tailwind` directives are in `src/index.css`
- Try deleting `node_modules` and running `npm install` again

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
