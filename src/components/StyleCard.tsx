import type { RenovationStyle } from '../data/styles'
import './StyleCard.css'

type StyleCardProps = {
  style: RenovationStyle
  selected: boolean
  onToggle: (id: string) => void
  index: number
}

export default function StyleCard({
  style,
  selected,
  onToggle,
  index,
}: StyleCardProps) {
  return (
    <button
      type="button"
      className={`style-card style-card--${style.layout}${selected ? ' is-selected' : ''}`}
      onClick={() => onToggle(style.id)}
      aria-pressed={selected}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="style-card__media">
        <img
          src={style.image}
          alt={style.name}
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div className="style-card__shade" aria-hidden="true" />
      </div>

      <div className="style-card__meta">
        <span className="style-card__name">{style.name}</span>
        <span className="style-card__tagline">{style.tagline}</span>
      </div>

      <span className="style-card__check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path
            d="M5 12.5L10 17.5L19 7.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}
