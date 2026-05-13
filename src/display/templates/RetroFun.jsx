import PersonAvatar from '../PersonAvatar'
import { monthNames } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

const monthGradients = {
  1:  'from-blue-500 to-indigo-600',
  2:  'from-pink-500 to-rose-600',
  3:  'from-green-500 to-emerald-600',
  4:  'from-purple-500 to-violet-600',
  5:  'from-yellow-400 to-orange-500',
  6:  'from-cyan-500 to-sky-600',
  7:  'from-orange-500 to-red-600',
  8:  'from-teal-500 to-cyan-600',
  9:  'from-amber-500 to-orange-600',
  10: 'from-orange-600 to-red-700',
  11: 'from-amber-600 to-orange-700',
  12: 'from-green-600 to-emerald-700',
}

export default function RetroFun({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {
  const gradient = monthGradients[month] || 'from-purple-500 to-pink-600'

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full" />
        <div className="absolute top-1/3 right-12 w-40 h-40 bg-white/10 rounded-full" />

        <div className="relative z-10 flex flex-col items-center text-center gap-6 px-16 py-12">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-2">
            <p className="text-white font-bold text-lg">
              {monthNames[person.birthday_month - 1]} {person.birthday_day}
            </p>
          </div>

          <div className="w-48 h-48 rounded-full ring-4 ring-white/40 ring-offset-4 ring-offset-transparent shadow-2xl overflow-hidden">
            <PersonAvatar photoUrl={person.photo_url} name={person.name} className="w-full h-full" />
          </div>

          <h1 className="text-6xl font-black text-white">Happy Birthday!</h1>
          <p className="text-3xl font-bold text-white/90">{person.name}</p>
          <p className="text-white/70 text-xl">Wishing you an amazing day!</p>

          {totalSpotlight > 1 && (
            <div className="flex gap-2">
              {Array.from({ length: totalSpotlight }).map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i === spotlightIndex ? 'bg-white' : 'bg-white/30'}`} />
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
      <div className={`min-h-screen bg-gradient-to-br ${gradient} flex flex-col relative overflow-hidden`}>
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full" />

        <div className="relative z-10 px-16 py-12 flex flex-col min-h-screen">
          <div className="mb-10">
            <h1 className="text-5xl font-black text-white leading-tight">
              {monthNames[month - 1]} Birthdays
            </h1>
          </div>

          <MonthlyGrid
            members={members}
            cardBg="bg-white/20 backdrop-blur-sm"
            nameColor="text-white"
            dateColor="text-white/70"
          />
        </div>
      </div>
    )
  }

  // ── Empty / Daily Quote ────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto px-16 text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-2 inline-block mb-6">
          <p className="text-white font-bold">Quote of the Day</p>
        </div>
        {dailyContent && (
          <>
            <p className="text-4xl font-bold text-white leading-snug mb-6">
              "{dailyContent.text}"
            </p>
            <p className="text-white/70 text-xl">— {dailyContent.author}</p>
          </>
        )}
      </div>
    </div>
  )
}
