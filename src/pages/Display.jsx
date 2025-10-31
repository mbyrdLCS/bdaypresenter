import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../services/supabase'

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
    const todaysBirthdays = getTodaysBirthdays()

    if (todaysBirthdays.length > 0) {
      // Alternate between monthly view and spotlight view
      // Spotlight shows for 10 seconds, monthly view shows for 5 seconds
      const timeout = setTimeout(() => {
        setShowSpotlight((prev) => {
          const nextShowSpotlight = !prev

          // If switching to spotlight and there are multiple people, rotate through them
          if (nextShowSpotlight && todaysBirthdays.length > 1) {
            setCurrentSpotlightIndex((prevIndex) => (prevIndex + 1) % todaysBirthdays.length)
          }

          return nextShowSpotlight
        })
      }, showSpotlight ? 10000 : 5000) // 10s for spotlight, 5s for monthly

      return () => clearTimeout(timeout)
    }
  }, [teamMembers, showSpotlight])

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
      <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center p-8`}>
        <div className="text-center max-w-4xl">
          {/* Birthday Header */}
          <div className="mb-8 animate-bounce">
            <div className="text-8xl mb-4">{theme.emoji} 🎂 🎉</div>
            <h1 className={`text-7xl font-bold ${theme.accentColor} mb-4`}>
              Happy Birthday!
            </h1>
          </div>

          {/* Person Photo or Placeholder */}
          <div className="mb-8 flex justify-center">
            {spotlightPerson.photo_url ? (
              <img
                src={spotlightPerson.photo_url}
                alt={spotlightPerson.name}
                className="w-96 h-96 object-cover rounded-full border-8 border-white shadow-2xl"
              />
            ) : (
              <div className="w-96 h-96 rounded-full border-8 border-white shadow-2xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                <span className="text-9xl">🎂</span>
              </div>
            )}
          </div>

          {/* Person Name */}
          <h2 className="text-6xl font-bold text-gray-800 mb-4">
            {spotlightPerson.name}
          </h2>

          {/* Birthday Date */}
          <p className="text-4xl text-gray-600 mb-8">
            {monthNames[spotlightPerson.birthday_month - 1]} {spotlightPerson.birthday_day}
          </p>

          {/* Multiple birthdays indicator */}
          {todaysBirthdays.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
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
          <div className="text-6xl mt-12 space-x-4">
            🎈 🎁 🎊 🎉 🎂 🎈
          </div>
        </div>
      </div>
    )
  }

  // Show monthly view (default or when toggled from spotlight)
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Month Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{theme.emoji}</div>
          <h1 className={`text-6xl font-bold ${theme.accentColor} mb-2`}>
            {monthNames[currentMonth - 1]} Birthdays
          </h1>
          <p className="text-2xl text-gray-600">{theme.name}</p>
        </div>

        {/* Birthday List */}
        {thisMonthsBirthdays.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-3xl text-gray-600">
              No birthdays this month! 🎈
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              {thisMonthsBirthdays.map((member, index) => {
                // Dynamic font size based on number of birthdays
                // Smaller sizes to fit multiple names on TV screens
                const getFontSize = () => {
                  const count = thisMonthsBirthdays.length
                  if (count <= 2) return 'text-5xl md:text-6xl'
                  if (count <= 4) return 'text-4xl md:text-5xl'
                  if (count <= 8) return 'text-3xl md:text-4xl'
                  return 'text-2xl md:text-3xl'
                }

                const getDateSize = () => {
                  const count = thisMonthsBirthdays.length
                  if (count <= 4) return 'text-2xl md:text-3xl'
                  return 'text-xl md:text-2xl'
                }

                const getSpacing = () => {
                  const count = thisMonthsBirthdays.length
                  if (count <= 2) return 'py-6'
                  if (count <= 4) return 'py-4'
                  return 'py-3'
                }

                return (
                  <div
                    key={member.id}
                    className={`text-center ${getSpacing()} border-b border-gray-200 last:border-b-0`}
                  >
                    <h3 className={`${getFontSize()} font-bold text-gray-800 mb-2`}>
                      {member.name}
                    </h3>
                    <p className={`${getDateSize()} ${theme.accentColor} font-semibold`}>
                      {monthNames[member.birthday_month - 1]} {member.birthday_day}
                    </p>
                    <div className="text-3xl md:text-4xl mt-2">🎂</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Footer decorations */}
        <div className="text-center text-5xl mt-12 space-x-3">
          🎈 🎁 🎊 🎉 🎂 🎈 🎁 🎊
        </div>
      </div>
    </div>
  )
}
