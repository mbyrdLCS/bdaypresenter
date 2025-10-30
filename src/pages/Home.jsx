import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-7xl mb-6 animate-bounce">🎂 🎉</div>
          <h1 className="text-7xl font-bold gradient-text mb-6 fade-in">
            Birthday Celebration
          </h1>
          <p className="text-3xl text-gray-700 mb-6 font-semibold slide-in">
            Celebrate your team's birthdays with style
          </p>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto slide-in" style={{ animationDelay: '0.2s' }}>
            Beautiful, automated birthday displays for digital signage.
            Add your team members, set their birthdays, and let the celebrations begin!
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {user ? (
              <Link
                to="/dashboard"
                className="btn-primary text-xl px-10 py-4"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="btn-primary text-xl px-10 py-4"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary text-xl px-10 py-4"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="card hover:scale-105 transform transition-all duration-300 fade-in">
              <div className="text-5xl mb-4">🎂</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Simple Setup</h3>
              <p className="text-gray-600 text-lg">
                Add names, birthdays, and photos in minutes. No technical knowledge required.
              </p>
            </div>

            <div className="card hover:scale-105 transform transition-all duration-300 fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Seasonal Themes</h3>
              <p className="text-gray-600 text-lg">
                Every month gets a unique look with beautiful seasonal decorations.
              </p>
            </div>

            <div className="card hover:scale-105 transform transition-all duration-300 fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl mb-4">📺</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">SignPresenter Ready</h3>
              <p className="text-gray-600 text-lg">
                Works perfectly with SignPresenter. Just point to your unique URL.
              </p>
            </div>
          </div>

          <div className="mt-20 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-2xl p-10 border border-indigo-100">
            <h3 className="text-3xl font-bold gradient-text mb-8">How It Works</h3>
            <div className="text-left max-w-2xl mx-auto space-y-5">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <p className="text-gray-700 text-lg pt-1"><strong className="text-gray-900">Sign up</strong> and create your organization account</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <p className="text-gray-700 text-lg pt-1"><strong className="text-gray-900">Add team members</strong> with their names, birthdays, and photos</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <p className="text-gray-700 text-lg pt-1"><strong className="text-gray-900">Get your unique display URL</strong></p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <p className="text-gray-700 text-lg pt-1"><strong className="text-gray-900">Add the URL to SignPresenter</strong> and let it run</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <p className="text-gray-700 text-lg pt-1"><strong className="text-gray-900">Watch the magic</strong> - monthly birthday lists and special daily spotlights!</p>
              </div>
            </div>
          </div>

          {/* SignPresenter Branding */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-lg mb-6">
              Display on your TV with
            </p>
            <a
              href="https://www.signpresenter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
            >
              <img
                src="/signpresenter-logo.png"
                alt="SignPresenter - Digital Signage Software"
                className="h-16 md:h-20 mx-auto"
              />
            </a>
            <p className="text-gray-500 text-sm mt-4">
              Professional digital signage software for businesses
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
