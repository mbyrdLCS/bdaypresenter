import PersonAvatar from './PersonAvatar'
import { monthNames } from './constants'

export default function MonthlyGrid({ members, cardBg, nameColor, dateColor }) {
  const count = members.length

  const cols =
    count === 1 ? 'grid-cols-1' :
    count === 2 ? 'grid-cols-2' :
    count <= 4  ? 'grid-cols-2' :
    count <= 9  ? 'grid-cols-3' :
                  'grid-cols-4'

  const nameSize =
    count === 1 ? 'text-5xl'  :
    count === 2 ? 'text-4xl'  :
    count === 3 ? 'text-3xl'  :
    count === 4 ? 'text-2xl'  :
    count <= 6  ? 'text-xl'   :
    count <= 9  ? 'text-lg'   :
                  'text-base'

  const dateSize =
    count <= 2 ? 'text-2xl' :
    count <= 4 ? 'text-xl'  :
    count <= 6 ? 'text-lg'  :
                 'text-base'

  return (
    <div className={`flex-1 grid ${cols} gap-4 min-h-0`} style={{ gridAutoRows: '1fr' }}>
      {members.map(m => (
        <div
          key={m.id}
          className={`${cardBg} rounded-2xl flex flex-col items-center justify-between p-4 min-h-0 overflow-hidden`}
        >
          {/* Avatar grows to fill available card height — never overflows */}
          <div className="flex-1 min-h-0 flex items-center justify-center w-full py-1">
            <div className="h-full aspect-square max-w-full">
              <PersonAvatar photoUrl={m.photo_url} name={m.name} className="w-full h-full" />
            </div>
          </div>
          {/* Text always pinned at bottom, never clipped */}
          <div className="flex-shrink-0 text-center min-w-0 w-full pt-1">
            <p className={`font-bold ${nameSize} ${nameColor} leading-tight truncate`}>{m.name}</p>
            <p className={`${dateSize} ${dateColor} font-medium mt-1`}>
              {monthNames[m.birthday_month - 1]} {m.birthday_day}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
