import PersonAvatar from '../PersonAvatar'
import { monthNames } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

export default function NavyCorporate({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {

  const stripeStyle = {
    backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 10px)',
  }

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={stripeStyle} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-16 py-12 grid grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-blue-400 rounded-full flex-shrink-0" />
              <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest">Birthday Recognition</p>
            </div>
            <h1 className="text-6xl font-bold text-white leading-tight mb-6">
              Happy<br />Birthday!
            </h1>
            <p className="text-3xl font-semibold text-blue-200 mb-2">{person.name}</p>
            <p className="text-blue-400 text-xl mb-8">
              {monthNames[person.birthday_month - 1]} {person.birthday_day}
            </p>
            <div className="bg-white/10 rounded-xl border border-white/10 px-5 py-4">
              <p className="text-white font-semibold">We appreciate everything you bring to the team.</p>
              <p className="text-blue-300 text-sm mt-1">Thank you for your dedication and hard work.</p>
            </div>
            {totalSpotlight > 1 && (
              <div className="flex gap-2 mt-6">
                {Array.from({ length: totalSpotlight }).map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === spotlightIndex ? 'bg-white' : 'bg-white/20'}`} />
                ))}
              </div>
            )}
          </div>

          {/* Right: photo */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full ring-4 ring-blue-400/30 overflow-hidden">
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
      <div className="h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={stripeStyle} />

        <div className="relative z-10 px-16 py-10 flex flex-col h-full">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-10 bg-blue-400 rounded-full flex-shrink-0" />
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Team Birthday Recognition</p>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              {monthNames[month - 1]} Birthdays
            </h1>
          </div>

          <MonthlyGrid
            members={members}
            cardBg="bg-white/10 border border-white/10"
            nameColor="text-white"
            dateColor="text-blue-400"
          />
        </div>
      </div>
    )
  }

  // ── Empty / Daily Quote ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={stripeStyle} />

      <div className="relative z-10 max-w-3xl mx-auto px-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-1 h-10 bg-blue-400 rounded-full flex-shrink-0" />
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest">Daily Inspiration</p>
        </div>
        {dailyContent && (
          <>
            <p className="text-3xl font-semibold text-white leading-relaxed mb-6">
              "{dailyContent.text}"
            </p>
            <p className="text-blue-400 text-xl">— {dailyContent.author}</p>
          </>
        )}
      </div>
    </div>
  )
}
