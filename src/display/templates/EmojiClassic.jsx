import { monthNames } from '../constants'

// Original seasonal themes with light pastel backgrounds
const themes = {
  1:  { bgGradient: 'from-blue-100 via-blue-50 to-white',   accent: 'text-blue-600',   emoji: '❄️',  name: 'Winter Wonderland' },
  2:  { bgGradient: 'from-pink-100 via-red-50 to-white',    accent: 'text-red-600',    emoji: '💝',  name: 'Love & Hearts' },
  3:  { bgGradient: 'from-green-100 via-lime-50 to-white',  accent: 'text-green-600',  emoji: '🌷',  name: 'Spring Awakening' },
  4:  { bgGradient: 'from-pink-100 via-purple-50 to-white', accent: 'text-purple-600', emoji: '🌸',  name: 'Spring Blossoms' },
  5:  { bgGradient: 'from-yellow-100 via-orange-50 to-white',accent:'text-orange-600', emoji: '🌻',  name: 'Sunshine Days' },
  6:  { bgGradient: 'from-cyan-100 via-blue-50 to-white',   accent: 'text-cyan-600',   emoji: '☀️',  name: 'Summer Vibes' },
  7:  { bgGradient: 'from-red-100 via-orange-50 to-yellow-50',accent:'text-red-600',   emoji: '🎆',  name: 'Summer Fun' },
  8:  { bgGradient: 'from-teal-100 via-cyan-50 to-blue-50', accent: 'text-teal-600',   emoji: '🏖️', name: 'Beach Days' },
  9:  { bgGradient: 'from-amber-100 via-orange-50 to-yellow-50',accent:'text-amber-600',emoji:'🍂', name: 'Autumn Begins' },
  10: { bgGradient: 'from-orange-100 via-red-50 to-yellow-50',accent:'text-orange-600',emoji: '🎃', name: 'Fall Harvest' },
  11: { bgGradient: 'from-orange-50 via-amber-50 to-yellow-50',accent:'text-orange-700',emoji:'🍁', name: 'Cozy Season' },
  12: { bgGradient: 'from-red-100 via-green-50 to-white',   accent: 'text-red-600',    emoji: '🎄',  name: 'Winter Holidays' },
}

export default function EmojiClassic({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {
  const theme = themes[month]

  // ── Birthday Spotlight ────────────────────────────────────────────
  if (mode === 'spotlight') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center p-4`}>
        <div className="text-center max-w-2xl">
          <div className="text-5xl mb-3 animate-bounce">
            {theme.emoji} 🎂 🎉
          </div>
          <h1 className={`text-5xl font-bold ${theme.accent} mb-6`}>Happy Birthday!</h1>

          <div className="mb-6 flex justify-center">
            {person.photo_url ? (
              <img
                src={person.photo_url}
                alt={person.name}
                className="w-56 h-56 object-cover rounded-full border-8 border-white shadow-2xl"
              />
            ) : (
              <div className="w-56 h-56 rounded-full border-8 border-white shadow-2xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                <span className="text-7xl">🎂</span>
              </div>
            )}
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-2">{person.name}</h2>
          <p className="text-2xl text-gray-600 mb-6">
            {monthNames[person.birthday_month - 1]} {person.birthday_day}
          </p>

          {totalSpotlight > 1 && (
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: totalSpotlight }).map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i === spotlightIndex ? 'bg-gray-800' : 'bg-gray-300'}`} />
              ))}
            </div>
          )}

          <div className="text-3xl space-x-2">🎈 🎁 🎊 🎉 🎂</div>
        </div>
      </div>
    )
  }

  // ── Monthly View ──────────────────────────────────────────────────
  if (mode === 'monthly') {
    const count = members.length
    const cols =
      count === 1 ? 'grid-cols-1' :
      count === 2 ? 'grid-cols-2' :
      count <= 4  ? 'grid-cols-2' :
      count <= 9  ? 'grid-cols-3' :
                    'grid-cols-4'
    const nameSize =
      count === 1 ? 'text-5xl'  :
      count === 2 ? 'text-4xl'  :
      count === 3 ? 'text-3xl'  :
      count === 4 ? 'text-2xl'  :
      count <= 6  ? 'text-xl'   :
      count <= 9  ? 'text-lg'   :
                    'text-base'
    const dateSize =
      count <= 2 ? 'text-2xl' :
      count <= 4 ? 'text-xl'  :
      count <= 6 ? 'text-lg'  :
                   'text-base'
    const emojiSize =
      count <= 2 ? 'text-5xl' :
      count <= 4 ? 'text-4xl' :
      count <= 6 ? 'text-3xl' :
                   'text-2xl'

    return (
      <div className={`h-screen bg-gradient-to-br ${theme.bgGradient} flex flex-col overflow-hidden`}>
        <div className="px-16 py-10 flex flex-col h-full">
          <div className="text-center mb-8">
            <div className="text-4xl mb-1">{theme.emoji}</div>
            <h1 className={`text-5xl font-bold ${theme.accent} mb-1`}>
              {monthNames[month - 1]} Birthdays
            </h1>
            <p className="text-gray-500 text-lg">{theme.name}</p>
          </div>

          <div className={`flex-1 grid ${cols} gap-4 min-h-0`} style={{ gridAutoRows: '1fr' }}>
            {members.map(m => (
              <div key={m.id} className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 p-6 min-h-0">
                <span className={emojiSize}>🎂</span>
                <p className={`font-bold ${nameSize} text-gray-800 leading-tight text-center`}>{m.name}</p>
                <p className={`${dateSize} ${theme.accent} font-semibold`}>
                  {monthNames[m.birthday_month - 1]} {m.birthday_day}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center text-3xl mt-6 space-x-2">🎈 🎁 🎊 🎉 🎂</div>
        </div>
      </div>
    )
  }

  // ── Empty State ───────────────────────────────────────────────────
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.bgGradient} p-4`}>
      <div className="text-center max-w-3xl">
        <div className="text-5xl mb-6">{theme.emoji} ✨</div>
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Quote of the Day</p>
          <blockquote className={`text-3xl font-semibold ${theme.accent} leading-relaxed mb-6`}>
            "{dailyContent.text}"
          </blockquote>
          <p className="text-gray-500 text-lg">— {dailyContent.author}</p>
        </div>
        <div className="text-3xl mt-6 space-x-2">🎈 🎁 🎊 🎉</div>
      </div>
    </div>
  )
}
