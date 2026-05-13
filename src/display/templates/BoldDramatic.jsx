import PersonAvatar from '../PersonAvatar'
import { monthNames } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

const accentText = {
  1: 'text-sky-400',    2: 'text-pink-400',   3: 'text-green-400',
  4: 'text-purple-400', 5: 'text-yellow-400', 6: 'text-cyan-400',
  7: 'text-orange-400', 8: 'text-teal-400',   9: 'text-amber-400',
  10: 'text-orange-400', 11: 'text-amber-300', 12: 'text-green-400',
}

const accentBg = {
  1: 'bg-sky-400',    2: 'bg-pink-400',   3: 'bg-green-400',
  4: 'bg-purple-400', 5: 'bg-yellow-400', 6: 'bg-cyan-400',
  7: 'bg-orange-400', 8: 'bg-teal-400',   9: 'bg-amber-400',
  10: 'bg-orange-400', 11: 'bg-amber-300', 12: 'bg-green-400',
}

export default function BoldDramatic({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {
  const accent = accentText[month] || 'text-yellow-400'
  const accentB = accentBg[month] || 'bg-yellow-400'

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-16 py-12 grid grid-cols-5 gap-12 items-center">
          {/* Left: text (3 cols) */}
          <div className="col-span-3">
            <p className={`${accent} text-sm font-bold uppercase tracking-widest mb-6`}>
              {monthNames[person.birthday_month - 1]} {person.birthday_day}
            </p>
            <h1 className="text-8xl font-black text-white leading-none mb-6">
              HAPPY<br />BIRTH<br />DAY!
            </h1>
            <div className={`w-24 h-2 ${accentB} rounded-full mb-6`} />
            <p className="text-4xl font-bold text-white mb-3">{person.name}</p>
            <p className="text-gray-400 text-lg">Wishing you an incredible year ahead!</p>
            {totalSpotlight > 1 && (
              <div className="flex gap-2 mt-6">
                {Array.from({ length: totalSpotlight }).map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === spotlightIndex ? 'bg-white' : 'bg-white/20'}`} />
                ))}
              </div>
            )}
          </div>

          {/* Right: photo (2 cols) */}
          <div className="col-span-2 flex justify-center">
            <PersonAvatar photoUrl={person.photo_url} name={person.name} className="w-56 h-56" />
          </div>
        </div>
      </div>
    )
  }

  // ── Monthly ────────────────────────────────────────────────────────────────
  if (mode === 'monthly') {
    return (
      <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
        <div className="relative z-10 px-16 py-10 flex flex-col h-full">
          <div className="mb-10">
            <p className={`${accent} text-sm font-bold uppercase tracking-widest mb-3`}>This Month</p>
            <h1 className="text-6xl font-black text-white leading-tight">
              {monthNames[month - 1]} Birthdays
            </h1>
          </div>

          <MonthlyGrid
            members={members}
            cardBg="bg-gray-900 border border-gray-800"
            nameColor="text-white"
            dateColor={accent}
          />
        </div>
      </div>
    )
  }

  // ── Empty / Daily Quote ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto px-16 text-center">
        <p className={`${accent} text-sm font-bold uppercase tracking-widest mb-6`}>Daily Inspiration</p>
        {dailyContent && (
          <>
            <p className="text-4xl font-bold text-white leading-snug mb-6">
              "{dailyContent.text}"
            </p>
            <p className="text-gray-400 text-xl">— {dailyContent.author}</p>
          </>
        )}
      </div>
    </div>
  )
}
