import { useEffect } from 'react'
import type { RenovationStyle } from '../data/styles'
import './StyleGalleryDialog.css'

type StyleGalleryDialogProps = {
  style: RenovationStyle
  selected: boolean
  onToggle: () => void
  onClose: () => void
}

const SPACE_IDEAS = [
  {
    name: '客廳',
    label: 'Living room',
    copy: '由主牆、燈光到傢俬比例，保持整體線條一致，營造舒服又開揚嘅日常空間。',
  },
  {
    name: '廚房',
    label: 'Kitchen',
    copy: '用同一套色調同物料延伸至廚櫃、工作枱及收納，兼顧美感同實用性。',
  },
  {
    name: '睡房',
    label: 'Bedroom',
    copy: '以柔和燈光、布藝同簡潔收納延續風格，令私人空間更安靜、耐看。',
  },
  {
    name: '浴室及其他空間',
    label: 'Bathroom & more',
    copy: '將特色材質、五金同色彩帶入浴室、玄關及走廊，令全屋設計真正連貫。',
  },
]

export default function StyleGalleryDialog({
  style,
  selected,
  onToggle,
  onClose,
}: StyleGalleryDialogProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="style-gallery" role="presentation" onClick={onClose}>
      <div
        className="style-gallery__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="style-gallery-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="style-gallery__close"
          onClick={onClose}
          aria-label="關閉風格詳情"
        >
          ×
        </button>

        <div className="style-gallery__hero">
          <img src={style.image} alt={`${style.name}風格參考`} />
          <div className="style-gallery__hero-shade" aria-hidden="true" />
          <div className="style-gallery__heading">
            <p className="style-gallery__eyebrow">全屋風格靈感</p>
            <h2 id="style-gallery-title">{style.name}</h2>
            <p>{style.tagline}</p>
          </div>
        </div>

        <div className="style-gallery__body">
          <div className="style-gallery__intro">
            <p>將你鍾意嘅風格延伸到屋企每一個空間。</p>
            <span>以下係設計師配搭時會留意嘅重點：</span>
          </div>

          <div className="style-gallery__spaces">
            {SPACE_IDEAS.map((space, index) => (
              <article className="style-gallery__space" key={space.name}>
                <span className="style-gallery__space-number en">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="style-gallery__space-label en">{space.label}</p>
                  <h3>{space.name}</h3>
                  <p>{space.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="style-gallery__actions">
            <button type="button" className="style-gallery__secondary" onClick={onClose}>
              繼續睇其他風格
            </button>
            <button type="button" className="style-gallery__primary" onClick={onToggle}>
              {selected ? '取消選擇此風格' : `揀選${style.name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
