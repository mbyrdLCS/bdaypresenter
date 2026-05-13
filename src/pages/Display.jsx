import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { supabase } from '../services/supabase'
import confetti from 'canvas-confetti'
import { TEMPLATES, DEFAULT_TEMPLATE } from '../display/index'
import { getDailyContent } from '../display/dailyContent'

export default function Display() {
  const { userId } = useParams()
  const [searchParams] = useSearchParams()
  const [teamMembers, setTeamMembers] = useState([])
  const [templateId, setTemplateId] = useState(DEFAULT_TEMPLATE)
  const [loading, setLoading] = useState(true)
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0)
  const [showSpotlight, setShowSpotlight] = useState(true)

  const today = new Date()
  const previewMonth = searchParams.get('month')
  const templateOverride = searchParams.get('template')
  const currentMonth = previewMonth ? parseInt(previewMonth) : today.getMonth() + 1
  const currentDay = today.getDate()
  const dailyContent = getDailyContent()

  useEffect(() => {
    loadData()
  }, [userId])

  const loadData = async () => {
    try {
      const [membersRes, profileRes] = await Promise.all([
        supabase.from('team_members').select('*').eq('user_id', userId)
          .order('birthday_month', { ascending: true }).order('birthday_day', { ascending: true }),
        supabase.from('profiles').select('display_template').eq('id', userId).single()
      ])
      if (membersRes.data) setTeamMembers(membersRes.data)
      if (!templateOverride && profileRes.data?.display_template) {
        setTemplateId(profileRes.data.display_template)
      } else if (templateOverride && TEMPLATES[templateOverride]) {
        setTemplateId(templateOverride)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const todaysBirthdays = teamMembers.filter(
    m => m.birthday_month === currentMonth && m.birthday_day === currentDay
  )
  const thisMonthsBirthdays = teamMembers.filter(m => m.birthday_month === currentMonth)

  useEffect(() => {
    if (todaysBirthdays.length === 0) return
    const interval = setInterval(() => {
      setShowSpotlight(prev => !prev)
      if (todaysBirthdays.length > 1) {
        setCurrentSpotlightIndex(prev => (prev + 1) % todaysBirthdays.length)
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [teamMembers, currentMonth, currentDay])

  useEffect(() => {
    if (todaysBirthdays.length === 0 || !showSpotlight) return
    const shoot = () => {
      const count = 200
      const defaults = { origin: { y: 0.7 } }
      const fire = (ratio, opts) => confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio), spread: 100, startVelocity: 30 })
      fire(0.25, { spread: 26, startVelocity: 55 })
      fire(0.2,  { spread: 60 })
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
      fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
      fire(0.1,  { spread: 120, startVelocity: 45 })
    }
    shoot()
    const interval = setInterval(shoot, 3000)
    return () => clearInterval(interval)
  }, [teamMembers, currentMonth, currentDay, showSpotlight])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    )
  }

  const TemplateComponent = (TEMPLATES[templateId] || TEMPLATES[DEFAULT_TEMPLATE]).component

  let mode = 'empty'
  if (todaysBirthdays.length > 0 && showSpotlight) mode = 'spotlight'
  else if (thisMonthsBirthdays.length > 0) mode = 'monthly'

  return (
    <TemplateComponent
      mode={mode}
      person={todaysBirthdays[currentSpotlightIndex]}
      members={thisMonthsBirthdays}
      month={currentMonth}
      spotlightIndex={currentSpotlightIndex}
      totalSpotlight={todaysBirthdays.length}
      dailyContent={dailyContent}
    />
  )
}
