import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [showGuide, setShowGuide] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    birthday_month: '',
    birthday_day: '',
    photo_url: '',
  })

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProfile()
    loadTeamMembers()
  }, [user])

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
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
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('user_id', user.id)
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

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
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
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadTeamMembers()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
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
            <span className="text-3xl md:text-4xl flex-shrink-0">🎂</span>
            <h1 className="text-xl md:text-3xl font-bold text-white truncate">Birthday Dashboard</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-white/20 backdrop-blur-sm text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30 text-sm md:text-base whitespace-nowrap flex-shrink-0"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Display URL Section */}
        <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-4 md:p-8 mb-8 border border-indigo-100 fade-in">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="text-2xl md:text-3xl">🔗</span>
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
                <span className="hidden sm:inline">Copy</span>
                <span className="sm:hidden">Copy</span>
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
          </div>
        </div>

        {/* Add Member Button */}
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

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{editingMember ? '✏️' : '➕'}</span>
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
                  accept="image/*"
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
            <span className="text-3xl">👥</span>
            <h3 className="text-2xl font-bold gradient-text">
              Team Members ({teamMembers.length})
            </h3>
          </div>

          {teamMembers.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎂</div>
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
                      <span className="text-5xl md:text-6xl">🎂</span>
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SignPresenter Branding */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-gray-100">
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
              <span className="text-2xl md:text-3xl">📺</span>
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
                  <span className="text-3xl">✨</span>
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
