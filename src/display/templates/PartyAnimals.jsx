import PersonAvatar from '../PersonAvatar'
import { monthNames } from '../constants'
import MonthlyGrid from '../MonthlyGrid'

export default function PartyAnimals({ mode, person, members, month, spotlightIndex, totalSpotlight, dailyContent }) {

  const bg = {
    backgroundImage: "url('/party-animals.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  // ── Spotlight ──────────────────────────────────────────────────────────────
  if (mode === 'spotlight' && person) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={bg}>
        {/* semi-transparent white card so text pops over the white center */}
        <div className="relative z-10 flex flex-col items-center text-center gap-5 px-16 py-12 bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl mx-16">
          <h1 className="text-7xl font-black text-orange-500 leading-tight drop-shadow-sm">
            Happy Birthday!
          </h1>
          <div className="w-52 h-52 rounded-full ring-8 ring-orange-300 shadow-2xl overflow-hidden">
            <PersonAvatar photoUrl={person.photo_url} name={person.name} className="w-full h-full" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800">{person.name}</h2>
          <p className="text-2xl font-semibold text-orange-500">
            {monthNames[person.birthday_month - 1]} {person.birthday_day}
          </p>
          {totalSpotlight > 1 && (
            <div className="flex gap-2">
              {Array.from({ length: totalSpotlight }).map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i === spotlightIndex ? 'bg-orange-500' : 'bg-gray-300'}`} />
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
      <div className="min-h-screen flex flex-col relative overflow-hidden" style={bg}>
        <div className="relative z-10 px-16 py-10 flex flex-col min-h-screen bg-white/60 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-black text-orange-500 leading-tight drop-shadow-sm">
              {monthNames[month - 1]} Birthdays
            </h1>
            <p className="text-gray-600 text-xl mt-1 font-semibold">The party animals are here to celebrate!</p>
          </div>

          <MonthlyGrid
            members={members}
            cardBg="bg-white/90 shadow-lg"
            nameColor="text-gray-800"
            dateColor="text-orange-500"
          />
        </div>
      </div>
    )
  }

  // ── Empty / Daily Quote ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={bg}>
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12">
          <p className="text-orange-500 text-lg font-bold uppercase tracking-widest mb-4">Quote of the Day</p>
          {dailyContent && (
            <>
              <p className="text-3xl font-bold text-gray-800 leading-snug mb-6">
                "{dailyContent.text}"
              </p>
              <p className="text-gray-500 text-xl">— {dailyContent.author}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
