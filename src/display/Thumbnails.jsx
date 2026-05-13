import React from 'react'

// Reusable face photo for thumbnail previews
function Face({ size = 'w-12 h-12', ring = 'ring-2 ring-white/50' }) {
  return (
    <div className={`${size} rounded-full overflow-hidden flex-shrink-0 ${ring}`}>
      <img src="/thumb-face.png" alt="" className="w-full h-full object-cover" />
    </div>
  )
}

export function ThumbModernDark() {
  return (
    <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-purple-900 h-full relative overflow-hidden">
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-pink-500 rounded-full opacity-50" />
      <div className="absolute bottom-0 -left-4 w-14 h-14 bg-blue-500 rounded-full opacity-40" />
      <div className="absolute inset-0 p-4 flex items-center gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 rounded bg-white/90 w-3/5" />
          <div className="h-1.5 rounded bg-white/50 w-2/5" />
          <div className="h-1 rounded bg-pink-400/70 w-16 mt-1" />
        </div>
        <Face size="w-12 h-12" ring="ring-2 ring-purple-300/60" />
      </div>
    </div>
  )
}

export function ThumbBrightSeasonal() {
  return (
    <div className="bg-gradient-to-br from-yellow-300 to-amber-400 h-full relative overflow-hidden">
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-500 rounded-full opacity-50" />
      <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-yellow-500 rounded-full opacity-40" />
      <div className="absolute inset-0 p-4 flex items-center gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-3 rounded bg-amber-900/60 w-2/3" />
          <div className="h-2 rounded bg-amber-800/40 w-1/2" />
        </div>
        <Face size="w-12 h-12" ring="ring-2 ring-white/70" />
      </div>
    </div>
  )
}

export function ThumbBoldDramatic() {
  return (
    <div className="bg-gray-950 h-full relative overflow-hidden flex items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-indigo-600/15 rounded-full blur-xl" />
      <div className="absolute inset-0 p-4 flex items-center gap-3">
        <div className="flex-1">
          <div className="h-4 rounded bg-white/90 w-4/5 mb-1" />
          <div className="h-2 w-10 rounded bg-yellow-400 mb-2" />
          <div className="h-2 rounded bg-white/40 w-1/2" />
        </div>
        <Face size="w-11 h-11" ring="ring-2 ring-yellow-400/50" />
      </div>
    </div>
  )
}

export function ThumbCleanMinimal() {
  return (
    <div className="bg-white h-full relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-900" />
      <div className="absolute inset-0 p-4 pl-5 flex items-center gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 rounded bg-gray-800/80 w-3/5" />
          <div className="h-2 rounded bg-gray-400/60 w-2/5" />
          <div className="h-1.5 rounded bg-gray-300/70 w-1/3" />
        </div>
        <Face size="w-12 h-12" ring="ring-2 ring-gray-200" />
      </div>
    </div>
  )
}

export function ThumbRetroFun() {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-pink-500 h-full relative overflow-hidden">
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/15 rounded-full" />
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/15 rounded-full" />
      <div className="absolute inset-0 p-4 flex items-center gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 rounded bg-white/90 w-3/4" />
          <div className="h-2 rounded bg-white/50 w-1/2" />
        </div>
        <Face size="w-12 h-12" ring="ring-2 ring-white/60" />
      </div>
    </div>
  )
}

export function ThumbNavyCorporate() {
  const stripeStyle = {
    backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 8px)',
  }
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-700 h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={stripeStyle} />
      <div className="absolute inset-0 p-4 flex items-center gap-3">
        <div className="w-0.5 h-10 bg-blue-400 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-1.5 ml-1">
          <div className="h-1.5 rounded bg-blue-300/70 w-2/5 mb-1" />
          <div className="h-3 rounded bg-white/90 w-3/5" />
          <div className="h-2 rounded bg-blue-200/60 w-2/5" />
        </div>
        <Face size="w-11 h-11" ring="ring-2 ring-blue-300/50" />
      </div>
    </div>
  )
}

export function ThumbEmojiClassic() {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-white h-full relative overflow-hidden flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <div className="text-3xl leading-none">🎂</div>
        <div className="flex gap-1 text-lg">🎈<span>🎉</span>🎁</div>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 space-y-1 w-24">
        <div className="h-2 rounded bg-purple-400/60 w-full" />
        <div className="h-1.5 rounded bg-pink-400/40 w-3/4 mx-auto" />
      </div>
    </div>
  )
}

export function ThumbPartyAnimals() {
  return (
    <div className="h-full relative overflow-hidden"
         style={{ backgroundImage: "url('/party-animals.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/75 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
          <div className="h-2.5 rounded bg-orange-500/80 w-24 mb-1" />
          <div className="h-1.5 rounded bg-gray-500/50 w-16 mx-auto" />
        </div>
      </div>
    </div>
  )
}

export function ThumbCakeExplosion() {
  return (
    <div className="h-full relative overflow-hidden"
         style={{ backgroundImage: "url('/cake-explosion.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 p-4 flex items-center gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-4 rounded bg-yellow-400/90 w-2/3" />
          <div className="h-2 w-10 rounded bg-yellow-400" />
          <div className="h-2 rounded bg-white/50 w-1/2" />
        </div>
        <Face size="w-11 h-11" ring="ring-2 ring-yellow-400/60" />
      </div>
    </div>
  )
}

export function ThumbRetroArcade() {
  return (
    <div className="h-full relative overflow-hidden"
         style={{ backgroundImage: "url('/retro-arcade.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 p-4 flex flex-col justify-center gap-1.5">
        <div className="h-3 rounded bg-yellow-400/90 w-1/2"
             style={{ boxShadow: '2px 2px 0 #f97316' }} />
        <div className="h-2 rounded bg-cyan-400/70 w-2/5" />
        <div className="flex gap-1.5 mt-1">
          <div className="h-4 w-10 rounded-sm bg-yellow-400/80 text-black text-center" style={{ fontSize: '6px', lineHeight: '16px', fontWeight: 900 }}>+XP</div>
          <div className="h-4 w-14 rounded-sm bg-pink-500/80" style={{ fontSize: '6px', lineHeight: '16px', fontWeight: 900, color: 'white', textAlign: 'center' }}>LEVEL UP</div>
        </div>
      </div>
    </div>
  )
}
