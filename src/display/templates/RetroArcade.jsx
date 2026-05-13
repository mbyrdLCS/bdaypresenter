import PersonAvatar from '../PersonAvatar'
import { monthNames } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

export default function RetroArcade({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {

  const bg = {
    backgroundImage: "url('/retro-arcade.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={bg}>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center text-center gap-5 px-16 py-12">
          {/* pixelated-style title using font tricks */}
          <h1 className="text-7xl font-black text-yellow-400 leading-tight uppercase tracking-widest"
              style={{ textShadow: '4px 4px 0 #f97316, 8px 8px 0 #dc2626' }}>
            LEVEL UP!
          </h1>
          <p className="text-pink-400 text-2xl font-bold uppercase tracking-widest">Birthday Unlocked</p>

          <div className="w-48 h-48 rounded-none border-4 border-yellow-400 shadow-2xl overflow-hidden"
               style={{ imageRendering: 'pixelated' }}>
            <PersonAvatar photoUrl={person.photo_url} name={person.name} className="w-full h-full" />
          </div>

          <h2 className="text-4xl font-black text-white uppercase tracking-wide"
              style={{ textShadow: '3px 3px 0 #7c3aed' }}>
            {person.name}
          </h2>
          <p className="text-cyan-400 text-2xl font-bold">
            {monthNames[person.birthday_month - 1]} {person.birthday_day}
          </p>

          <div className="flex gap-3 mt-1">
            <span className="bg-yellow-400 text-black text-sm font-black px-3 py-1 uppercase tracking-widest">+100 XP</span>
            <span className="bg-pink-500 text-white text-sm font-black px-3 py-1 uppercase tracking-widest">Birthday Badge</span>
          </div>

          {totalSpotlight > 1 && (
            <div className="flex gap-2 mt-2">
              {Array.from({ length: totalSpotlight }).map((_, i) => (
                <div key={i} className={`w-3 h-3 ${i === spotlightIndex ? 'bg-yellow-400' : 'bg-white/30'}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Monthly ────────────────────────────────────────────────────────────────
  if (mode === 'monthly') {
    return (
      <div className="h-screen flex flex-col overflow-hidden" style={bg}>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-16 py-10 flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-6xl font-black text-yellow-400 leading-tight uppercase tracking-wide"
                style={{ textShadow: '3px 3px 0 #f97316' }}>
              {monthNames[month - 1]} Birthdays
            </h1>
            <p className="text-cyan-400 text-xl mt-2 font-bold uppercase tracking-widest">New players have entered the game!</p>
          </div>

          <MonthlyGrid
            members={members}
            cardBg="bg-black/60 border-2 border-yellow-400/60"
            nameColor="text-white"
            dateColor="text-cyan-400"
          />
        </div>
      </div>
    )
  }

  // ── Empty / Daily Quote ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={bg}>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-3xl mx-auto px-16 text-center">
        <p className="text-yellow-400 text-sm font-black uppercase tracking-widest mb-6">Loading Daily Wisdom...</p>
        {dailyContent && (
          <>
            <p className="text-4xl font-bold text-white leading-snug mb-6"
               style={{ textShadow: '2px 2px 0 #7c3aed' }}>
              "{dailyContent.text}"
            </p>
            <p className="text-cyan-400 text-xl font-bold">— {dailyContent.author}</p>
          </>
        )}
      </div>
    </div>
  )
}
