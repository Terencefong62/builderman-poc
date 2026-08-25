import type { RenovationStyle } from '../data/styles'
import './StyleCard.css'

type StyleCardProps = {
  style: RenovationStyle
  selected: boolean
  onToggle: (id: string) => void
  onExplore: (id: string) => void
  index: number
}

export default function StyleCard({
  style,
  selected,
  onToggle,
  onExplore,
  index,
}: StyleCardProps) {
  return (
    <article
      className={`style-card style-card--${style.layout}${selected ? ' is-selected' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <button
        type="button"
        className="style-card__browse"
        onClick={() => onExplore(style.id)}
        aria-label={`瀏覽${style.name}全屋空間設計`}
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
          <span className="style-card__explore">睇全屋靈感 →</span>
        </div>
      </button>

      <button
        type="button"
        className="style-card__check"
        onClick={() => onToggle(style.id)}
        aria-pressed={selected}
        aria-label={selected ? `取消選擇${style.name}` : `選擇${style.name}`}
      >
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
          <path
            d="M5 12.5L10 17.5L19 7.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  )
}
