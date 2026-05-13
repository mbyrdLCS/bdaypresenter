export default function Share() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">

      {/* Instruction — not part of the screenshot */}
      <p className="text-gray-400 text-sm mb-4 font-medium tracking-wide uppercase">
        Screenshot the card below for your Facebook post
      </p>

      {/* The 1200×630 card — exact Facebook image size */}
      <div
        className="relative overflow-hidden flex rounded-2xl shadow-2xl"
        style={{ width: 1200, height: 630 }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900" />

        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-24 left-64 w-72 h-72 bg-purple-500/20 rounded-full" />

        {/* Left: copy */}
        <div className="relative z-10 flex flex-col justify-center pl-16 pr-8" style={{ width: 480 }}>

          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 w-fit mb-6">
            <span className="text-yellow-300 text-sm font-bold uppercase tracking-widest">Free for SignPresenter users</span>
          </div>

          <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: 42 }}>
            Team Birthdays<br />
            on Your TV —<br />
            <span className="text-yellow-300">Automatically</span>
          </h1>

          <p className="text-indigo-200 text-lg mb-8 leading-snug">
            Add to your SignPresenter playlist in minutes. Updates live the moment you make a change.
          </p>

          <ul className="space-y-2 mb-10">
            {[
              '10 beautiful display templates',
              'Works with any SignPresenter playlist',
              'Import birthdays from Google or Apple Calendar',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-white font-medium">
                <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>

          <div className="bg-white/10 rounded-2xl px-6 py-3 w-fit">
            <p className="text-white font-bold text-xl tracking-wide">bdaypresenter.com</p>
          </div>
        </div>

        {/* Right: hero image */}
        <div className="relative z-10 flex items-center justify-end flex-1 pr-8">
          <img
            src="/hero-monthly.png"
            alt="BdayPresenter on TV"
            className="rounded-xl shadow-2xl"
            style={{ height: 520, width: 'auto' }}
          />
        </div>
      </div>

      <p className="text-gray-500 text-xs mt-4">1200 × 630 — ideal size for Facebook</p>
    </div>
  )
}
