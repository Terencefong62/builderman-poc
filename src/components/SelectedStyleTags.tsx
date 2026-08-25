import type { RenovationStyle } from '../data/styles'
import './SelectedStyleTags.css'

type SelectedStyleTagsProps = {
  styles: RenovationStyle[]
  onRemove: (id: string) => void
}

export default function SelectedStyleTags({
  styles,
  onRemove,
}: SelectedStyleTagsProps) {
  if (styles.length === 0) return null

  return (
    <div className="style-tags" aria-label="已選風格">
      {styles.map((style, index) => (
        <span
          key={style.id}
          className={`style-tag style-tag--${index + 1}`}
        >
          <span className="style-tag__thumb">
            <img src={style.image} alt="" loading="lazy" decoding="async" />
          </span>
          <span className="style-tag__name">{style.name}</span>
          <button
            type="button"
            className="style-tag__remove"
            aria-label={`移除${style.name}`}
            onClick={() => onRemove(style.id)}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  )
}
