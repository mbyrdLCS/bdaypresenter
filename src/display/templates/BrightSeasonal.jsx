import PersonAvatar from '../PersonAvatar'
import { monthNames, seasonalThemes } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

export default function BrightSeasonal({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {
  const theme = seasonalThemes[month]

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bg} flex items-center justify-center relative overflow-hidden`}>
        <div className={`absolute -top-20 -right-16 w-64 h-64 ${theme.blob1} rounded-full opacity-60`} />
        <div className={`absolute -bottom-16 -left-16 w-56 h-56 ${theme.blob2} rounded-full opacity-50`} />
        <div className={`absolute top-1/2 -right-8 w-32 h-32 ${theme.blob2} rounded-full opacity-25`} />

        <div className="relative z-10 flex flex-col items-center text-center gap-6 px-16 py-12">
          <h1 className={`text-7xl font-bold ${theme.text} leading-tight`}>
            Happy Birthday!
          </h1>
          <div className="w-56 h-56 rounded-full ring-4 ring-white/60 shadow-xl overflow-hidden">
            <PersonAvatar photoUrl={person.photo_url} name={person.name} className="w-full h-full" />
          </div>
          <h2 className={`text-4xl font-bold ${theme.text}`}>{person.name}</h2>
          <p className={`${theme.subtext} text-2xl font-medium`}>
            {monthNames[person.birthday_month - 1]} {person.birthday_day}
          </p>
          {totalSpotlight > 1 && (
            <div className="flex gap-2">
              {Array.from({ length: totalSpotlight }).map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i === spotlightIndex ? theme.text.replace('text-', 'bg-') : 'bg-black/20'}`} />
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
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} flex items-center justify-center relative overflow-hidden`}>
      <div className={`absolute -top-20 -right-16 w-64 h-64 ${theme.blob1} rounded-full opacity-60`} />
      <div className={`absolute -bottom-16 -left-16 w-56 h-56 ${theme.blob2} rounded-full opacity-50`} />

      <div className="relative z-10 max-w-3xl mx-auto px-16">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center">
          {dailyContent && (
            <>
              <p className={`text-4xl font-bold ${theme.text} leading-snug mb-6`}>
                "{dailyContent.text}"
              </p>
              <p className={`${theme.subtext} text-xl`}>— {dailyContent.author}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
