import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TEMPLATES } from '../display/index'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [profile, setProfile] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [showGuide, setShowGuide] = useState(false)

  // Support mode state
  const viewUserId = searchParams.get('viewUserId')
  const isAdmin = user?.email === 'mike@signpresenter.com'
  const isSupportMode = isAdmin && viewUserId && viewUserId !== user.id

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    birthday_month: '',
    birthday_day: '',
    photo_url: '',
  })

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [savingTemplate, setSavingTemplate] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    loadProfile()
    loadTeamMembers()
  }, [user, viewUserId])

  const loadProfile = async () => {
    try {
      // Use viewUserId if in support mode, otherwise use logged-in user's ID
      const targetUserId = isSupportMode ? viewUserId : user.id

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTeamMembers = async () => {
    try {
      // Use viewUserId if in support mode, otherwise use logged-in user's ID
      const targetUserId = isSupportMode ? viewUserId : user.id

      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('user_id', targetUserId)
        .order('birthday_month', { ascending: true })
        .order('birthday_day', { ascending: true })

      if (error) throw error
      setTeamMembers(data || [])
    } catch (error) {
      console.error('Error loading team members:', error)
    }
  }

  const handleFileUpload = async (event) => {
    try {
      setUploading(true)
      setError('')

      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      let file = event.target.files[0]
      let fileExt = file.name.split('.').pop().toLowerCase()

      // Convert HEIC/HEIF to JPEG for browser compatibility
      if (fileExt === 'heic' || fileExt === 'heif') {
        try {
          // Dynamic import for better Vite/WASM compatibility
          const heic2any = (await import('heic2any')).default
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9
          })
          // heic2any may return an array for multi-image HEIC files
          const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob
          file = new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
            type: 'image/jpeg'
          })
          fileExt = 'jpg'
        } catch (conversionError) {
          console.error('HEIC conversion failed:', conversionError)
          throw new Error('Failed to convert HEIC image. Please try a different photo.')
        }
      }

      const fileName = `${user.id}/${Math.random()}.${fileExt}`

      const { data, error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName)

      setFormData({ ...formData, photo_url: urlData.publicUrl })
    } catch (error) {
      setError(error.message)
    } finally {
      setUploading(false)
    }
  }

  // Touch profiles.updated_at so the display page cache auto-invalidates
  const touchProfile = () =>
    supabase.from('profiles').update({ updated_at: new Date().toISOString() }).eq('id', user.id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingMember) {
        // Update existing member
        const { error } = await supabase
          .from('team_members')
          .update(formData)
          .eq('id', editingMember.id)

        if (error) throw error
      } else {
        // Add new member
        const { error } = await supabase
          .from('team_members')
          .insert([{ ...formData, user_id: user.id }])

        if (error) throw error
      }

      await touchProfile()
      // Reset form
      setFormData({ name: '', birthday_month: '', birthday_day: '', photo_url: '' })
      setShowAddForm(false)
      setEditingMember(null)
      loadTeamMembers()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      birthday_month: member.birthday_month,
      birthday_day: member.birthday_day,
      photo_url: member.photo_url || '',
    })
    setShowAddForm(true)
    // Scroll to form after state updates
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)

      if (error) throw error
      await touchProfile()
      loadTeamMembers()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const saveTemplate = async (templateId) => {
    setSavingTemplate(templateId)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ display_template: templateId })
        .eq('id', user.id)
      if (error) throw error
      setProfile(prev => ({ ...prev, display_template: templateId }))
    } catch (err) {
      console.error('Error saving template:', err)
    } finally {
      setSavingTemplate(false)
    }
  }

  const displayUrl = profile ? `${window.location.origin}/display/${profile.display_url_slug}` : ''

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="text-xl font-semibold text-gray-700">Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            <h1 className="text-xl md:text-3xl font-bold text-white truncate">Birthday Presenter</h1>
          </div>
          <div className="flex items-center gap-2">
            {user.email === 'mike@signpresenter.com' && (
              <button
                onClick={() => navigate('/admin')}
                className="bg-yellow-500/90 backdrop-blur-sm text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg hover:bg-yellow-600 transition-all duration-200 font-semibold border border-yellow-400 text-sm md:text-base whitespace-nowrap flex-shrink-0 flex items-center gap-2"
              >
                <span className="text-lg">👑</span>
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="bg-white/20 backdrop-blur-sm text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30 text-sm md:text-base whitespace-nowrap flex-shrink-0"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Support Mode Banner */}
      {isSupportMode && (
        <div className="bg-yellow-100 border-b-4 border-yellow-500">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👀</span>
                <div>
                  <p className="font-bold text-gray-800">Support Mode</p>
                  <p className="text-sm text-gray-700">
                    Viewing as: <strong>{profile?.organization_name || 'Loading...'}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="bg-yellow-600 text-white px-6 py-2.5 rounded-lg hover:bg-yellow-700 transition-colors font-semibold shadow-md flex items-center gap-2"
              >
                <span>←</span> Back to Admin
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Display URL Section */}
        <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-4 md:p-8 mb-8 border border-indigo-100 fade-in">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h2 className="text-xl md:text-2xl font-bold gradient-text">Your Display URL</h2>
          </div>
          <p className="text-gray-700 mb-2 text-sm md:text-lg">
            Use this URL in <strong className="text-blue-600">SignPresenter</strong> to display your team's birthdays on digital signage:
          </p>
          <p className="text-gray-500 text-xs md:text-sm mb-4">
            Copy this link and add it as a webpage in your SignPresenter playlist
          </p>
          <div className="space-y-3">
            <input
              type="text"
              value={displayUrl}
              readOnly
              className="w-full px-3 md:px-5 py-2 md:py-3 border-2 border-indigo-200 rounded-lg bg-white font-mono text-xs md:text-sm focus:outline-none focus:border-indigo-400 transition-colors"
            />
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(displayUrl)
                  alert('URL copied to clipboard!')
                }}
                className="bg-indigo-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Copy URL
              </button>
              <a
                href={displayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Preview
              </a>
            </div>

            {/* How to add + SignPresenter CTA */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="#signpresenter-setup"
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How to add this to SignPresenter
              </a>
            </div>
          </div>

          {/* No account CTA */}
          <div className="mt-5 pt-5 border-t border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-gray-600 text-sm">
              Don't have a SignPresenter account?{' '}
              <a
                href="https://www.signpresenter.com/#contact-form"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2"
              >
                Make one here
              </a>
              {' '}— free to try for 30 days, only <strong className="text-indigo-700">$10/month</strong> after that!
            </p>
            <a
              href="https://www.signpresenter.com/#contact-form"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Get SignPresenter
            </a>
          </div>
        </div>

        {/* Add Member Button */}
        {!isSupportMode && (
          <div className="mb-6">
            <button
              onClick={() => {
                setShowAddForm(!showAddForm)
                setEditingMember(null)
                setFormData({ name: '', birthday_month: '', birthday_day: '', photo_url: '' })
              }}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2"
            >
              {showAddForm ? (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Cancel
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Add Team Member
                </>
              )}
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 fade-in">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-7 h-7 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {editingMember
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                }
              </svg>
              <h3 className="text-2xl font-bold gradient-text">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 fade-in">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="input"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Birth Month *
                  </label>
                  <select
                    value={formData.birthday_month}
                    onChange={(e) => setFormData({ ...formData, birthday_month: e.target.value })}
                    required
                    className="input"
                  >
                    <option value="">Select month</option>
                    {monthNames.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Birth Day *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={formData.birthday_day}
                    onChange={(e) => setFormData({ ...formData, birthday_day: e.target.value })}
                    required
                    className="input"
                    placeholder="Day"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo {uploading && <span className="text-indigo-600">(Uploading...)</span>}
                </label>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {formData.photo_url && (
                  <div className="mt-4">
                    <img
                      src={formData.photo_url}
                      alt="Preview"
                      className="h-40 w-40 object-cover rounded-xl shadow-md border-4 border-indigo-100"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingMember ? '✓ Update' : '+ Add'} Team Member
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingMember(null)
                    setFormData({ name: '', birthday_month: '', birthday_day: '', photo_url: '' })
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Team Members List */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-7 h-7 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-2xl font-bold gradient-text">
              Team Members ({teamMembers.length})
            </h3>
          </div>

          {teamMembers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <p className="text-xl text-gray-500 mb-2">
                No team members yet
              </p>
              <p className="text-gray-400">
                Click "Add Team Member" above to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="card border border-gray-200 hover:border-indigo-200 transform hover:scale-105 transition-all duration-300 fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {member.photo_url ? (
                    <div className="relative mb-3 md:mb-4 group">
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-48 md:h-56 object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ) : (
                    <div className="w-full h-48 md:h-56 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-3 md:mb-4 flex items-center justify-center">
                      <svg className="w-20 h-20 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                  <h4 className="font-bold text-lg md:text-xl text-gray-800 mb-2">{member.name}</h4>
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-indigo-700 font-semibold text-base md:text-lg">
                      {monthNames[member.birthday_month - 1]} {member.birthday_day}
                    </p>
                  </div>
                  {!isSupportMode && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="flex-1 bg-indigo-600 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-1"
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        <span className="hidden xs:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="flex-1 bg-red-500 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold hover:bg-red-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-1"
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <span className="hidden xs:inline">Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Template Picker */}
        {!isSupportMode && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-8 mb-8 border border-gray-100 fade-in">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <h2 className="text-xl md:text-2xl font-bold gradient-text">Display Template</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">Choose how your birthday display looks on screen. Changes take effect immediately.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.values(TEMPLATES).map((tmpl) => {
                const isSelected = (profile?.display_template || 'modern') === tmpl.id
                const isSaving = savingTemplate === tmpl.id
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => !isSaving && saveTemplate(tmpl.id)}
                    className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-md' : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {/* Visual thumbnail */}
                    <div className="h-24 relative overflow-hidden">
                      <tmpl.Thumb />
                      {/* Selected checkmark */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      {/* Saving indicator */}
                      {isSaving && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Label */}
                    <div className="p-3 bg-white">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className={`font-semibold text-sm truncate ${isSelected ? 'text-indigo-700' : 'text-gray-800'}`}>{tmpl.label}</p>
                          <p className="text-gray-400 text-xs truncate">{tmpl.description}</p>
                        </div>
                        {/* Preview link */}
                        <a
                          href={`${displayUrl}?template=${tmpl.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex-shrink-0 text-xs text-indigo-500 hover:text-indigo-700 font-medium border border-indigo-200 hover:border-indigo-400 px-2 py-1 rounded-lg transition-colors"
                        >
                          Preview
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* SignPresenter Branding */}
        <div id="signpresenter-setup" className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src="/signpresenter-logo.png"
                alt="SignPresenter - Digital Signage Software"
                className="h-12 md:h-14"
              />
              <div className="text-center md:text-left">
                <p className="text-gray-700 font-semibold text-lg">
                  Display on your TV screens
                </p>
                <p className="text-gray-600 text-sm">
                  Professional digital signage software
                </p>
              </div>
            </div>
            <a
              href="https://www.signpresenter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Learn More →
            </a>
          </div>
        </div>

        {/* Setup Guide */}
        <div className="bg-blue-50 rounded-2xl shadow-lg p-4 md:p-6 mt-8 border border-blue-200">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <svg className="w-7 h-7 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  How to Display on Your TV
                </h3>
                <p className="text-sm text-gray-600">
                  Quick setup guide for SignPresenter
                </p>
              </div>
            </div>
            <svg
              className={`w-6 h-6 text-gray-600 transition-transform ${showGuide ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {showGuide && (
            <div className="mt-6 space-y-6 fade-in">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Open SignPresenter
                </h4>
                <p className="text-gray-700 mb-3">
                  In SignPresenter, click on <strong>"Step 1: My Content"</strong> to create new content
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Select "Show Website"
                </h4>
                <p className="text-gray-700 mb-3">
                  From the message templates, select the <strong className="text-blue-600">"Show Website"</strong> option
                </p>
                <img
                  src="/show-website-guide.png"
                  alt="SignPresenter Show Website option"
                  className="rounded-lg border-2 border-gray-200 mt-3 w-full max-w-2xl"
                />
              </div>

              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Paste Your URL
                </h4>
                <p className="text-gray-700 mb-3">
                  Copy the Display URL from above and paste it into the website field
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
                <h4 className="text-lg font-bold text-gray-808 mb-4 flex items-center gap-2">
                  <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Add to Playlist
                </h4>
                <p className="text-gray-700 mb-3">
                  Go to <strong>"Step 2: Playlist"</strong> and add your birthday display to your playlist
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 md:p-6 border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <svg className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-bold text-green-800 mb-2">That's it!</h4>
                    <p className="text-gray-700">
                      Your birthday display is now live! Any changes you make here (adding/editing birthdays) will <strong>automatically update</strong> on your TV. No need to re-add or refresh anything in SignPresenter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
