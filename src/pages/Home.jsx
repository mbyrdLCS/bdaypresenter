import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-white">

      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-6xl">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl text-gray-900">Birthday Presenter</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="btn-primary px-5 py-2 text-base">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary px-5 py-2 text-base">
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-16 pb-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Free with SignPresenter
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Celebrate every birthday on your office TV
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Beautiful birthday displays for digital signage. Add your team, get a URL, and every birthday shows up automatically — monthly calendar view and a special spotlight on the big day.
            </p>
            <div className="flex flex-wrap gap-4">
              {user ? (
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          <div>
            <img
              src="/hero-spotlight.png"
              alt="Birthday spotlight display on office TV"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Two display previews */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Two views, always up to date</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">The display switches automatically — monthly calendar all month long, spotlight on the actual birthday.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src="/hero-spotlight.png" alt="Birthday spotlight view on TV" className="w-full" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Birthday Spotlight</h3>
                <p className="text-gray-600">On someone's birthday, the display automatically switches to a full celebration view with their photo and confetti.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src="/hero-monthly.png" alt="Monthly birthday calendar on TV" className="w-full" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Monthly Calendar</h3>
                <p className="text-gray-600">Every other day, the display shows a beautiful calendar of everyone's birthdays for the current month.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simple Setup</h3>
              <p className="text-gray-600 leading-relaxed">Add names, birthdays, and headshots in minutes. No technical knowledge required.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seasonal Themes</h3>
              <p className="text-gray-600 leading-relaxed">12 beautiful color themes — one for each month. The display updates automatically all year long.</p>
            </div>

            <a
              href="https://www.signpresenter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group block"
            >
              <div className="h-12 mb-6 flex items-start">
                <img
                  src="/signpresenter-logo.png"
                  alt="SignPresenter"
                  className="h-8 group-hover:opacity-80 transition-opacity"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">SignPresenter Ready</h3>
              <p className="text-gray-600 leading-relaxed">Works perfectly with SignPresenter. Paste your unique URL into any web-content slot and it runs forever.</p>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-600 text-xl">Up and running in under 5 minutes</p>
          </div>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Create your free account', desc: 'Sign up with your email and organization name.' },
              { step: 2, title: 'Add your team members', desc: 'Enter names, birthdays, and optional headshots for each person.' },
              { step: 3, title: 'Copy your display URL', desc: 'Each account gets a unique, permanent URL for your display.' },
              { step: 4, title: 'Paste the URL into SignPresenter', desc: 'Use the "Show Website" content type in any playlist.' },
              { step: 5, title: 'Birthdays appear automatically', desc: 'Monthly calendar view, plus a special spotlight on the actual birthday.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-center gap-5 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{title}</p>
                  <p className="text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SignPresenter CTA */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-indigo-200 font-semibold mb-4 uppercase tracking-widest text-sm">Powered by</p>
          <a href="https://www.signpresenter.com/" target="_blank" rel="noopener noreferrer" className="inline-block mb-8">
            <img src="/signpresenter-logo.png" alt="SignPresenter" className="h-14 mx-auto brightness-0 invert" />
          </a>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Want to show more on your office screens?
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Birthday Presenter is just one example of what SignPresenter can do. Display announcements, menus, KPI dashboards, and more — all from one easy platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {!user && (
              <Link
                to="/signup"
                className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-lg shadow-lg"
              >
                Get Birthday Presenter Free
              </Link>
            )}
            <a
              href="https://www.signpresenter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Explore SignPresenter →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold">Birthday Presenter</span>
            <span className="text-gray-600 text-sm">by</span>
            <a href="https://www.signpresenter.com/" target="_blank" rel="noopener noreferrer">
              <img src="/signpresenter-logo.png" alt="SignPresenter" className="h-6 brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
            </a>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            {!user && (
              <Link to="/signup" className="hover:text-gray-300 transition-colors">
                Get Started Free
              </Link>
            )}
            {!user && (
              <Link to="/login" className="hover:text-gray-300 transition-colors">
                Sign In
              </Link>
            )}
            <a
              href="https://www.signpresenter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              SignPresenter
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
