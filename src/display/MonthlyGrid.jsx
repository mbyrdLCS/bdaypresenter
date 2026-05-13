import PersonAvatar from './PersonAvatar'
import { monthNames } from './constants'

/**
 * Smart monthly grid that fills the available screen space.
 * Cards scale up when there are fewer people so nothing looks sparse.
 *
 * Props:
 *   members     — array of team members for this month
 *   cardBg      — Tailwind classes for the card background/border
 *   nameColor   — Tailwind text color class for the name
 *   dateColor   — Tailwind text color class for the date
 */
export default function MonthlyGrid({ members, cardBg, nameColor, dateColor }) {
  const count = members.length

  // Grid columns
  const cols =
    count === 1 ? 'grid-cols-1' :
    count === 2 ? 'grid-cols-2' :
    count <= 4  ? 'grid-cols-2' :
    count <= 9  ? 'grid-cols-3' :
                  'grid-cols-4'

  // Avatar size — big when few people, smaller when many
  const avatarClass =
    count === 1 ? 'w-56 h-56' :
    count === 2 ? 'w-44 h-44' :
    count === 3 ? 'w-36 h-36' :
    count === 4 ? 'w-32 h-32' :
    count <= 6  ? 'w-24 h-24' :
    count <= 9  ? 'w-20 h-20' :
                  'w-14 h-14'

  // Name size
  const nameSize =
    count === 1 ? 'text-5xl'  :
    count === 2 ? 'text-4xl'  :
    count === 3 ? 'text-3xl'  :
    count === 4 ? 'text-2xl'  :
    count <= 6  ? 'text-xl'   :
    count <= 9  ? 'text-lg'   :
                  'text-base'

  // Date size
  const dateSize =
    count <= 2 ? 'text-2xl' :
    count <= 4 ? 'text-xl'  :
    count <= 6 ? 'text-lg'  :
                 'text-base'

  return (
    <div className={`flex-1 grid ${cols} gap-4 min-h-0`}>
      {members.map(m => (
        <div
          key={m.id}
          className={`${cardBg} rounded-2xl flex flex-col items-center justify-center gap-3 p-6 min-h-0`}
        >
          <div className={`${avatarClass} flex-shrink-0`}>
            <PersonAvatar photoUrl={m.photo_url} name={m.name} className="w-full h-full" />
          </div>
          <div className="text-center min-w-0 w-full">
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
