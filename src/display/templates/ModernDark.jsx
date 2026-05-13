import PersonAvatar from '../PersonAvatar'
import { monthNames, seasonalThemes } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

export default function ModernDark({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {
  const theme = seasonalThemes[month]

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-purple-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500 rounded-full opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500 rounded-full opacity-40" />
        <div className="absolute top-1/2 right-8 w-40 h-40 bg-purple-500 rounded-full opacity-30" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-16 py-12 grid grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <h1 className="text-7xl font-bold text-white leading-tight mb-4">
              Happy<br />Birthday!
            </h1>
            <div className="w-16 h-1.5 bg-pink-400 rounded-full mb-6" />
            <p className="text-white/70 text-xl leading-relaxed mb-8">
              Wishing you a fantastic year filled with success, happiness, and great moments.
            </p>
            <div className="space-y-3">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Today's the day!</p>
                  <p className="text-white/60 text-sm">Let's celebrate you and all you do.</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4">
                <p className="text-white font-semibold">You're amazing!</p>
                <p className="text-white/60 text-sm">Enjoy your special day.</p>
              </div>
            </div>
          </div>

          {/* Right: photo */}
          <div className="flex flex-col items-center gap-5">
            <div className="w-72 h-72 rounded-full border-4 border-purple-300/40 p-3">
              <PersonAvatar photoUrl={person.photo_url} name={person.name} className="w-full h-full" />
            </div>
            <h2 className="text-3xl font-bold text-white text-center">{person.name}</h2>
            <p className="text-white/60 text-lg">{monthNames[person.birthday_month - 1]} {person.birthday_day}</p>
            {totalSpotlight > 1 && (
              <div className="flex gap-2">
                {Array.from({ length: totalSpotlight }).map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === spotlightIndex ? 'bg-white' : 'bg-white/30'}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Monthly ────────────────────────────────────────────────────────────────
  if (mode === 'monthly') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bg} flex flex-col relative overflow-hidden`}>
        <div className={`absolute -top-20 -right-16 w-64 h-64 ${theme.blob1} rounded-full opacity-60`} />
        <div className={`absolute -bottom-16 -left-16 w-56 h-56 ${theme.blob2} rounded-full opacity-50`} />
        <div className={`absolute top-1/2 -right-8 w-32 h-32 ${theme.blob2} rounded-full opacity-25`} />

        <div className="relative z-10 px-16 py-12 flex flex-col min-h-screen">
          <div className="mb-8">
            <h1 className={`text-6xl font-bold ${theme.text} leading-tight`}>
              {monthNames[month - 1]} Birthdays
            </h1>
            <p className={`${theme.subtext} text-xl mt-2`}>Let's celebrate our amazing team members!</p>
          </div>

          <MonthlyGrid
            members={members}
            cardBg="bg-white/80 backdrop-blur-sm shadow-md"
            nameColor={theme.text}
            dateColor={theme.subtext}
          />
        </div>
      </div>
    )
  }

  // ── Empty / Daily Quote ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-purple-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500 rounded-full opacity-30" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500 rounded-full opacity-30" />
      <div className="absolute top-1/2 right-8 w-40 h-40 bg-purple-500 rounded-full opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto px-16 text-center">
        <p className="text-indigo-200 text-lg font-semibold uppercase tracking-widest mb-6">Daily Inspiration</p>
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
