import PersonAvatar from '../PersonAvatar'
import { monthNames } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

export default function CleanMinimal({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-16 py-12 grid grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="w-8 h-0.5 bg-gray-900 mb-8" />
            <h1 className="text-7xl font-bold text-gray-900 leading-tight mb-6">
              Happy<br />Birthday
            </h1>
            <p className="text-2xl font-semibold text-gray-700 mb-2">{person.name}</p>
            <p className="text-gray-400 text-lg">{monthNames[person.birthday_month - 1]} {person.birthday_day}</p>
            {totalSpotlight > 1 && (
              <div className="flex gap-2 mt-8">
                {Array.from({ length: totalSpotlight }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === spotlightIndex ? 'bg-gray-900' : 'bg-gray-200'}`} />
                ))}
              </div>
            )}
          </div>

          {/* Right: photo */}
          <div className="flex justify-center">
            <PersonAvatar photoUrl={person.photo_url} name={person.name} className="w-64 h-64 shadow-2xl" />
          </div>
        </div>
      </div>
    )
  }

  // ── Monthly ────────────────────────────────────────────────────────────────
  if (mode === 'monthly') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <div className="px-16 py-10 flex flex-col h-full">
          <div className="mb-10">
            <div className="w-8 h-0.5 bg-gray-900 mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {monthNames[month - 1]} Birthdays
            </h1>
          </div>

          <MonthlyGrid
            members={members}
            cardBg="bg-white shadow-sm border border-gray-100"
            nameColor="text-gray-900"
            dateColor="text-gray-500"
          />
        </div>
      </div>
    )
  }

  // ── Empty / Daily Quote ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-16 text-center">
        <div className="w-8 h-0.5 bg-gray-900 mb-8 mx-auto" />
        {dailyContent && (
          <>
            <p className="text-3xl font-light text-gray-800 leading-relaxed mb-6">
              "{dailyContent.text}"
            </p>
            <p className="text-gray-400 text-lg">— {dailyContent.author}</p>
          </>
        )}
      </div>
    </div>
  )
}
