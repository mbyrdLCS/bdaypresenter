import CakeExplosion from '../display/templates/CakeExplosion'
import PartyAnimals from '../display/templates/PartyAnimals'
import RetroArcade from '../display/templates/RetroArcade'
import BrightSeasonal from '../display/templates/BrightSeasonal'

const sampleMembers = [
  { id: 1, name: 'Sarah Johnson',  birthday_month: 5, birthday_day: 3,  photo_url: null },
  { id: 2, name: 'Mike Davis',     birthday_month: 5, birthday_day: 11, photo_url: null },
  { id: 3, name: 'Lisa Chen',      birthday_month: 5, birthday_day: 19, photo_url: null },
  { id: 4, name: 'Tom Wilson',     birthday_month: 5, birthday_day: 24, photo_url: null },
]

const samplePerson = { id: 1, name: 'Sarah Johnson', birthday_month: 5, birthday_day: 3, photo_url: null }

// Renders a template scaled down to fit a 16:9 preview box
function TemplatePreview({ children, width = 340 }) {
  const height = Math.round(width * (9 / 16))
  const scale = width / 1280
  return (
    <div style={{ width, height, overflow: 'hidden', position: 'relative', borderRadius: 8 }} className="shadow-xl">
      <div style={{ width: 1280, height: 720, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute' }}>
        {children}
      </div>
    </div>
  )
}

function Card({ children }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl flex" style={{ width: 1200, height: 630 }}>
      {children}
    </div>
  )
}

function Checkmark() {
  return (
    <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  )
}

// ── Card 1: Monthly feed ────────────────────────────────────────────────────
function Card1() {
  return (
    <Card>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full" />
      <div className="absolute -bottom-24 left-64 w-72 h-72 bg-purple-500/20 rounded-full" />

      <div className="relative z-10 flex flex-col justify-center pl-16 pr-8" style={{ width: 480 }}>
        <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 w-fit mb-6">
          <span className="text-yellow-300 text-sm font-bold uppercase tracking-widest">Free for SignPresenter users</span>
        </div>
        <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: 42 }}>
          Team Birthdays<br />on Your TV —<br /><span className="text-yellow-300">Automatically</span>
        </h1>
        <p className="text-indigo-200 text-lg mb-8 leading-snug">
          Add to your SignPresenter playlist in minutes. Updates live the moment you make a change.
        </p>
        <ul className="space-y-2 mb-10">
          {['10 beautiful display templates', 'Works with any SignPresenter playlist', 'Import from Google or Apple Calendar'].map(item => (
            <li key={item} className="flex items-center gap-3 text-white font-medium">
              <Checkmark />{item}
            </li>
          ))}
        </ul>
        <div className="bg-white/10 rounded-2xl px-6 py-3 w-fit">
          <p className="text-white font-bold text-xl tracking-wide">bdaypresenter.com</p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-end flex-1 pr-8">
        <img src="/hero-monthly.png" alt="" className="rounded-xl shadow-2xl" style={{ height: 520, width: 'auto' }} />
      </div>
    </Card>
  )
}

// ── Card 2: Birthday spotlight ──────────────────────────────────────────────
function Card2() {
  return (
    <Card>
      <div className="absolute inset-0 bg-gradient-to-br from-rose-700 via-pink-700 to-purple-800" />
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-pink-400/10 rounded-full" />
      <div className="absolute bottom-0 left-48 w-64 h-64 bg-rose-400/15 rounded-full" />

      <div className="relative z-10 flex items-center justify-start flex-1 pl-10">
        <img src="/hero-spotlight.png" alt="" className="rounded-xl shadow-2xl" style={{ height: 520, width: 'auto' }} />
      </div>

      <div className="relative z-10 flex flex-col justify-center pr-16 pl-8" style={{ width: 460 }}>
        <div className="text-5xl mb-5">🎂</div>
        <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: 40 }}>
          When it's<br />someone's<br /><span className="text-yellow-300">big day —</span><br />your TV<br />shows it off
        </h1>
        <p className="text-pink-200 text-lg mb-8 leading-snug">
          Full-screen spotlight mode automatically kicks in on their birthday. No setup needed.
        </p>
        <div className="bg-white/10 rounded-2xl px-6 py-3 w-fit">
          <p className="text-white font-bold text-xl tracking-wide">bdaypresenter.com</p>
        </div>
      </div>
    </Card>
  )
}

// ── Card 3: Template variety ─────────────────────────────────────────────────
function Card3() {
  return (
    <Card>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400" />

      <div className="relative z-10 w-full flex flex-col justify-center px-14 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-2">10 templates included — free</p>
            <h1 className="text-white font-black" style={{ fontSize: 44 }}>
              Pick the look that fits<br /><span className="text-yellow-300">your vibe</span>
            </h1>
          </div>
          <div className="bg-white/10 rounded-2xl px-6 py-3">
            <p className="text-white font-bold text-lg tracking-wide">bdaypresenter.com</p>
          </div>
        </div>

        <div className="flex gap-5 justify-center">
          <div className="flex flex-col gap-2 items-center">
            <TemplatePreview width={265}>
              <CakeExplosion mode="monthly" members={sampleMembers} month={5} />
            </TemplatePreview>
            <p className="text-gray-300 text-sm font-semibold">Cake Explosion</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <TemplatePreview width={265}>
              <PartyAnimals mode="monthly" members={sampleMembers} month={5} />
            </TemplatePreview>
            <p className="text-gray-300 text-sm font-semibold">Party Animals</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <TemplatePreview width={265}>
              <RetroArcade mode="monthly" members={sampleMembers} month={5} />
            </TemplatePreview>
            <p className="text-gray-300 text-sm font-semibold">Retro Arcade</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <TemplatePreview width={265}>
              <BrightSeasonal mode="monthly" members={sampleMembers} month={5} />
            </TemplatePreview>
            <p className="text-gray-300 text-sm font-semibold">Bright Seasonal</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Share() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-12 px-8 gap-10">
      <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
        Screenshot any card below — 1200 × 630, ideal for Facebook
      </p>

      <div className="flex flex-col items-center gap-3">
        <p className="text-gray-500 text-xs uppercase tracking-widest">Card 1 — Monthly Feed</p>
        <Card1 />
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-gray-500 text-xs uppercase tracking-widest">Card 2 — Birthday Spotlight</p>
        <Card2 />
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-gray-500 text-xs uppercase tracking-widest">Card 3 — Template Variety</p>
        <Card3 />
      </div>

      <p className="text-gray-600 text-xs pb-8">Mac: Cmd+Shift+4 and drag around the card &nbsp;·&nbsp; Windows: Snipping Tool</p>
    </div>
  )
}
