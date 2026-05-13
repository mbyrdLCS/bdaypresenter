import PersonAvatar from '../PersonAvatar'
import { monthNames } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

export default function CakeExplosion({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {

  const bg = {
    backgroundImage: "url('/cake-explosion.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={bg}>
        {/* dark overlay so text pops */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-16 py-12 grid grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4">
              {monthNames[person.birthday_month - 1]} {person.birthday_day}
            </p>
            <h1 className="text-8xl font-black text-white leading-none mb-4 drop-shadow-lg">
              BOOM!<br />
              <span className="text-yellow-400">Birthday!</span>
            </h1>
            <div className="w-20 h-2 bg-yellow-400 rounded-full mb-6" />
            <p className="text-3xl font-bold text-white mb-2">{person.name}</p>
            <p className="text-white/70 text-lg">Another year older, another reason to celebrate!</p>
            {totalSpotlight > 1 && (
              <div className="flex gap-2 mt-6">
                {Array.from({ length: totalSpotlight }).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i === spotlightIndex ? 'bg-yellow-400' : 'bg-white/30'}`} />
                ))}
              </div>
            )}
          </div>

          {/* Right: photo */}
          <div className="flex flex-col items-center gap-5">
            <div className="w-64 h-64 rounded-full ring-4 ring-yellow-400/60 shadow-2xl overflow-hidden">
              <PersonAvatar photoUrl={person.photo_url} name={person.name} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Monthly ────────────────────────────────────────────────────────────────
  if (mode === 'monthly') {
    return (
      <div className="h-screen flex flex-col overflow-hidden" style={bg}>
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 px-16 py-10 flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-6xl font-black text-white leading-tight">
              {monthNames[month - 1]} <span className="text-yellow-400">Birthdays</span>
            </h1>
            <p className="text-white/60 text-xl mt-2">It's gonna be a blast!</p>
          </div>

          <MonthlyGrid
            members={members}
            cardBg="bg-white/10 backdrop-blur-sm border border-white/20"
            nameColor="text-white"
            dateColor="text-yellow-400"
          />
        </div>
      </div>
    )
  }

  // ── Empty / Daily Quote ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={bg}>
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-3xl mx-auto px-16 text-center">
        <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-6">Daily Inspiration</p>
        {dailyContent && (
          <>
            <p className="text-4xl font-bold text-white leading-snug mb-6">
              "{dailyContent.text}"
            </p>
            <p className="text-white/60 text-xl">— {dailyContent.author}</p>
          </>
        )}
      </div>
    </div>
  )
}
