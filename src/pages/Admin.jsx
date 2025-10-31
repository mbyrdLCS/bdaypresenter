import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBirthdays: 0,
    totalPhotos: 0,
    recentSignups: 0
  })
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [deleting, setDeleting] = useState(null)

  // Admin email - Only this email can access admin panel
  const ADMIN_EMAIL = 'mike@signpresenter.com'

  useEffect(() => {
    // Check if user is admin
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate('/')
      return
    }
    loadAdminData()
  }, [user, navigate])

  const loadAdminData = async () => {
    try {
      setLoading(true)

      // Get all users with stats
      const { data: usersData, error: usersError } = await supabase
        .rpc('get_admin_users_stats')

      if (usersError) throw usersError

      setUsers(usersData || [])

      // Calculate overall stats
      const totalUsers = usersData?.length || 0
      const totalBirthdays = usersData?.reduce((sum, u) => sum + (u.birthday_count || 0), 0) || 0
      const totalPhotos = usersData?.reduce((sum, u) => sum + (u.photo_count || 0), 0) || 0

      // Recent signups (last 7 days)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const recentSignups = usersData?.filter(u => new Date(u.created_at) > sevenDaysAgo).length || 0

      setStats({ totalUsers, totalBirthdays, totalPhotos, recentSignups })
    } catch (error) {
      console.error('Error loading admin data:', error)
      alert('Error loading admin data: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId, email, organizationName) => {
    if (!confirm(`Are you sure you want to permanently delete ${organizationName} (${email})?\n\nThis will delete:\n- User account\n- Profile\n- All team members\n- All photos\n\nThis CANNOT be undone!`)) {
      return
    }

    try {
      setDeleting(userId)

      // 1. Get all photo URLs for this user
      const { data: teamMembers, error: fetchError } = await supabase
        .from('team_members')
        .select('photo_url')
        .eq('user_id', userId)

      if (fetchError) throw fetchError

      // 2. Delete all photos from storage
      const photoUrls = teamMembers?.filter(tm => tm.photo_url).map(tm => tm.photo_url) || []

      for (const photoUrl of photoUrls) {
        // Extract file path from full URL
        const urlParts = photoUrl.split('/profile-photos/')
        if (urlParts.length === 2) {
          const filePath = urlParts[1]
          await supabase.storage
            .from('profile-photos')
            .remove([filePath])
        }
      }

      // 3. Delete user from auth (this cascades to delete profile and team_members)
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)

      if (deleteError) throw deleteError

      alert(`Successfully deleted ${organizationName} and all associated data!`)
      loadAdminData() // Reload data
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error deleting user: ' + error.message)
    } finally {
      setDeleting(null)
    }
  }

  const filteredUsers = users.filter(u =>
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.organization_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="text-xl font-semibold text-gray-700">Loading admin panel...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">👑</span>
            <h1 className="text-3xl font-bold text-white">Super Admin Panel</h1>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-2.5 rounded-lg hover:bg-white/30 transition-all duration-200 font-semibold border border-white/30"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👥</span>
              <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            </div>
            <p className="text-4xl font-bold text-indigo-600">{stats.totalUsers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎂</span>
              <h3 className="text-lg font-semibold text-gray-700">Total Birthdays</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600">{stats.totalBirthdays}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-pink-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📸</span>
              <h3 className="text-lg font-semibold text-gray-700">Total Photos</h3>
            </div>
            <p className="text-4xl font-bold text-pink-600">{stats.totalPhotos}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🆕</span>
              <h3 className="text-lg font-semibold text-gray-700">Last 7 Days</h3>
            </div>
            <p className="text-4xl font-bold text-green-600">{stats.recentSignups}</p>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <h3 className="text-2xl font-bold gradient-text">User Management</h3>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={loadAdminData}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Organization</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Birthdays</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Photos</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Signed Up</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Last Sign In</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition-colors`}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.organization_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-purple-600">{user.birthday_count || 0}</td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-pink-600">{user.photo_count || 0}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.last_sign_in ? new Date(user.last_sign_in).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/dashboard?viewUserId=${user.id}`)}
                          className="bg-indigo-600 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-indigo-700 transition-colors"
                        >
                          Dashboard
                        </button>
                        <a
                          href={`/display/${user.display_url_slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-green-700 transition-colors inline-block"
                        >
                          Display
                        </a>
                        <button
                          onClick={() => deleteUser(user.id, user.email, user.organization_name)}
                          disabled={deleting === user.id}
                          className="bg-red-500 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleting === user.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No users found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
