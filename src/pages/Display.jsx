import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../services/supabase'
import confetti from 'canvas-confetti'

// Seasonal theme configurations
const seasonalThemes = {
  1: { // January
    name: 'Winter Wonderland',
    bgGradient: 'from-blue-100 via-blue-50 to-white',
    accentColor: 'text-blue-600',
    emoji: '❄️',
  },
  2: { // February
    name: 'Love & Hearts',
    bgGradient: 'from-pink-100 via-red-50 to-white',
    accentColor: 'text-red-600',
    emoji: '💝',
  },
  3: { // March
    name: 'Spring Awakening',
    bgGradient: 'from-green-100 via-lime-50 to-white',
    accentColor: 'text-green-600',
    emoji: '🌷',
  },
  4: { // April
    name: 'Spring Blossoms',
    bgGradient: 'from-pink-100 via-purple-50 to-white',
    accentColor: 'text-purple-600',
    emoji: '🌸',
  },
  5: { // May
    name: 'Sunshine Days',
    bgGradient: 'from-yellow-100 via-orange-50 to-white',
    accentColor: 'text-orange-600',
    emoji: '🌻',
  },
  6: { // June
    name: 'Summer Vibes',
    bgGradient: 'from-cyan-100 via-blue-50 to-white',
    accentColor: 'text-cyan-600',
    emoji: '☀️',
  },
  7: { // July
    name: 'Summer Fun',
    bgGradient: 'from-red-100 via-orange-50 to-yellow-50',
    accentColor: 'text-red-600',
    emoji: '🎆',
  },
  8: { // August
    name: 'Beach Days',
    bgGradient: 'from-teal-100 via-cyan-50 to-blue-50',
    accentColor: 'text-teal-600',
    emoji: '🏖️',
  },
  9: { // September
    name: 'Autumn Begins',
    bgGradient: 'from-amber-100 via-orange-50 to-yellow-50',
    accentColor: 'text-amber-600',
    emoji: '🍂',
  },
  10: { // October
    name: 'Fall Harvest',
    bgGradient: 'from-orange-100 via-red-50 to-yellow-50',
    accentColor: 'text-orange-600',
    emoji: '🎃',
  },
  11: { // November
    name: 'Cozy Season',
    bgGradient: 'from-brown-100 via-orange-50 to-amber-50',
    accentColor: 'text-brown-600',
    emoji: '🍁',
  },
  12: { // December
    name: 'Winter Holidays',
    bgGradient: 'from-red-100 via-green-50 to-white',
    accentColor: 'text-red-600',
    emoji: '🎄',
  },
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function Display() {
  const { userId } = useParams()
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0)
  const [showSpotlight, setShowSpotlight] = useState(true)

  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const theme = seasonalThemes[currentMonth]

  useEffect(() => {
    loadTeamMembers()
  }, [userId])

  useEffect(() => {
    if (teamMembers.length === 0) return

    const todaysBirthdays = teamMembers.filter(
      (member) =>
        member.birthday_month === currentMonth && member.birthday_day === currentDay
    )

    if (todaysBirthdays.length > 0) {
      // Simpler rotation using setInterval for older browsers
      const interval = setInterval(() => {
        setShowSpotlight((prev) => !prev)

        // Rotate spotlight index for multiple birthdays
        if (todaysBirthdays.length > 1) {
          setCurrentSpotlightIndex((prevIndex) => (prevIndex + 1) % todaysBirthdays.length)
        }
      }, 8000) // Switch every 8 seconds

      return () => clearInterval(interval)
    }
  }, [teamMembers, currentMonth, currentDay])

  // Confetti effect for today's birthday - shoots confetti every 3 seconds during spotlight
  useEffect(() => {
    const todaysBirthdays = teamMembers.filter(
      (member) =>
        member.birthday_month === currentMonth && member.birthday_day === currentDay
    )

    if (todaysBirthdays.length > 0 && showSpotlight) {
      // Initial confetti burst
      const shootConfetti = () => {
        const count = 200
        const defaults = {
          origin: { y: 0.7 }
        }

        function fire(particleRatio, opts) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
            spread: 100,
            startVelocity: 30,
          })
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        })
        fire(0.2, {
          spread: 60,
        })
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        })
      }

      // Shoot confetti immediately and then every 3 seconds
      shootConfetti()
      const confettiInterval = setInterval(shootConfetti, 3000)

      return () => clearInterval(confettiInterval)
    }
  }, [teamMembers, currentMonth, currentDay, showSpotlight])

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('user_id', userId)
        .order('birthday_month', { ascending: true })
        .order('birthday_day', { ascending: true })

      if (error) throw error
      setTeamMembers(data || [])
    } catch (error) {
      console.error('Error loading team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTodaysBirthdays = () => {
    return teamMembers.filter(
      (member) =>
        member.birthday_month === currentMonth && member.birthday_day === currentDay
    )
  }

  const getThisMonthsBirthdays = () => {
    return teamMembers.filter((member) => member.birthday_month === currentMonth)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="text-2xl text-gray-600">Loading celebrations...</div>
      </div>
    )
  }

  const todaysBirthdays = getTodaysBirthdays()
  const thisMonthsBirthdays = getThisMonthsBirthdays()

  // If someone has a birthday today, alternate between spotlight and monthly view
  if (todaysBirthdays.length > 0 && showSpotlight) {
    const spotlightPerson = todaysBirthdays[currentSpotlightIndex]

    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center p-4`}>
        {/* 16:9 Aspect Ratio Container with TV Safe Area */}
        <div className="w-full max-w-7xl mx-auto" style={{ aspectRatio: '16/9' }}>
          <div className={`h-full flex flex-col justify-center items-center px-12 py-10 bg-gradient-to-br ${theme.bgGradient}`}>
            {/* Birthday Header */}
            <div className="mb-3 animate-bounce">
              <div className="text-4xl mb-1">{theme.emoji} 🎂 🎉</div>
              <h1 className={`text-4xl font-bold ${theme.accentColor}`}>
                Happy Birthday!
              </h1>
            </div>

            {/* Person Photo or Placeholder */}
            <div className="mb-4 flex justify-center">
              {spotlightPerson.photo_url ? (
                <img
                  src={spotlightPerson.photo_url}
                  alt={spotlightPerson.name}
                  className="w-64 h-64 object-cover rounded-full border-8 border-white shadow-2xl"
                />
              ) : (
                <div className="w-64 h-64 rounded-full border-8 border-white shadow-2xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                  <span className="text-8xl">🎂</span>
                </div>
              )}
            </div>

            {/* Person Name */}
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {spotlightPerson.name}
            </h2>

            {/* Birthday Date */}
            <p className="text-2xl text-gray-600 mb-4">
              {monthNames[spotlightPerson.birthday_month - 1]} {spotlightPerson.birthday_day}
            </p>

            {/* Multiple birthdays indicator */}
            {todaysBirthdays.length > 1 && (
              <div className="flex justify-center gap-2 mt-2">
                {todaysBirthdays.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentSpotlightIndex ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Decorative elements */}
            <div className="text-3xl mt-2 space-x-2">
              🎈 🎁 🎊 🎉 🎂
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show monthly view (default or when toggled from spotlight)
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.bgGradient} p-4`}>
      {/* 16:9 Aspect Ratio Container with TV Safe Area */}
      <div className="w-full max-w-7xl mx-auto" style={{ aspectRatio: '16/9' }}>
        <div className={`h-full flex flex-col justify-between px-12 py-10 bg-gradient-to-br ${theme.bgGradient}`}>
          {/* Month Header */}
          <div className="text-center">
            <div className="text-3xl mb-1">{theme.emoji}</div>
            <h1 className={`text-3xl font-bold ${theme.accentColor} mb-1`}>
              {monthNames[currentMonth - 1]} Birthdays
            </h1>
            <p className="text-base text-gray-600">{theme.name}</p>
          </div>

          {/* Birthday List */}
          <div className="flex-1 flex items-center justify-center py-4">
            {thisMonthsBirthdays.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <p className="text-2xl text-gray-600">
                  No birthdays this month! 🎈
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 w-full h-full max-w-6xl flex items-center justify-center">
                {(() => {
                  const count = thisMonthsBirthdays.length

                  // Determine grid layout based on number of birthdays
                  const getGridCols = () => {
                    if (count === 1) return 'grid-cols-1'
                    if (count === 2) return 'grid-cols-2'
                    if (count === 3) return 'grid-cols-3'
                    if (count === 4) return 'grid-cols-2'
                    if (count <= 6) return 'grid-cols-3'
                    if (count <= 9) return 'grid-cols-3'
                    return 'grid-cols-4'
                  }

                  // Font sizes based on count
                  const getFontSize = () => {
                    if (count === 1) return 'text-6xl'
                    if (count === 2) return 'text-5xl'
                    if (count === 3) return 'text-4xl'
                    if (count <= 6) return 'text-3xl'
                    if (count <= 9) return 'text-2xl'
                    return 'text-xl'
                  }

                  const getDateSize = () => {
                    if (count <= 3) return 'text-3xl'
                    if (count <= 6) return 'text-2xl'
                    return 'text-xl'
                  }

                  const getEmojiSize = () => {
                    if (count <= 3) return 'text-4xl'
                    if (count <= 6) return 'text-3xl'
                    return 'text-2xl'
                  }

                  return (
                    <div className={`grid ${getGridCols()} gap-6 w-full`}>
                      {thisMonthsBirthdays.map((member) => (
                        <div
                          key={member.id}
                          className="text-center p-4"
                        >
                          <h3 className={`${getFontSize()} font-bold text-gray-800 mb-2`}>
                            {member.name}
                          </h3>
                          <p className={`${getDateSize()} ${theme.accentColor} font-semibold mb-2`}>
                            {monthNames[member.birthday_month - 1]} {member.birthday_day}
                          </p>
                          <div className={getEmojiSize()}>🎂</div>
                        </div>
                      ))}
                    </div>
                  )
                })()}
              </div>
            )}
          </div>

          {/* Footer decorations */}
          <div className="text-center text-2xl space-x-2">
            🎈 🎁 🎊 🎉 🎂
          </div>
        </div>
      </div>
    </div>
  )
}
