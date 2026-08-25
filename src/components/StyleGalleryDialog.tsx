import { useEffect, useRef, useState } from 'react'
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
  },
  {
    name: '廚房',
    label: 'Kitchen',
  },
  {
    name: '睡房',
    label: 'Bedroom',
  },
  {
    name: '浴室',
    label: 'Bathroom',
  },
]

export default function StyleGalleryDialog({
  style,
  selected,
  onToggle,
  onClose,
}: StyleGalleryDialogProps) {
  const [unitSize, setUnitSize] = useState<'small' | 'large'>('small')
  const [activeRoom, setActiveRoom] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const galleryImage = unitSize === 'small' ? style.smallGalleryImage : style.galleryImage

  const selectUnitSize = (size: 'small' | 'large') => {
    setUnitSize(size)
    setActiveRoom(0)
    requestAnimationFrame(() => carouselRef.current?.scrollTo({ left: 0, behavior: 'smooth' }))
  }

  const scrollRooms = (direction: -1 | 1) => {
    const carousel = carouselRef.current
    if (!carousel) return
    carousel.scrollBy({ left: carousel.clientWidth * direction, behavior: 'smooth' })
  }

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current
    const firstCard = carousel?.firstElementChild as HTMLElement | null
    if (!carousel || !firstCard) return
    const gap = 0
    setActiveRoom(Math.max(0, Math.min(3, Math.round(carousel.scrollLeft / (firstCard.offsetWidth + gap)))))
  }

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
        aria-label={`${style.name}空間設計`}
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

        <div className="style-gallery__body">
          <div className="style-gallery__unit-tabs" role="tablist" aria-label="選擇單位大小">
            <button
              type="button"
              role="tab"
              aria-selected={unitSize === 'small'}
              className={unitSize === 'small' ? 'is-active' : ''}
              onClick={() => selectUnitSize('small')}
            >
              <strong>小單位</strong>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={unitSize === 'large'}
              className={unitSize === 'large' ? 'is-active' : ''}
              onClick={() => selectUnitSize('large')}
            >
              <strong>大單位</strong>
            </button>
          </div>

          <div className="style-gallery__carousel-shell">
            <p className="style-gallery__unit-note">
              {unitSize === 'small' ? '實用 300–400 呎' : '寬敞空間靈感'}
            </p>
            <div className="style-gallery__arrows" aria-label="切換空間">
              <button type="button" onClick={() => scrollRooms(-1)} aria-label="上一個空間">←</button>
              <button type="button" onClick={() => scrollRooms(1)} aria-label="下一個空間">→</button>
            </div>

            <div
              className="style-gallery__spaces"
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              aria-label={`${unitSize === 'small' ? '小單位' : '大單位'}空間設計，可左右滑動`}
            >
              {SPACE_IDEAS.map((space, index) => (
                <figure className="style-gallery__space" key={space.name}>
                  <div className={`style-gallery__space-image style-gallery__space-image--${index + 1}`}>
                    <img src={galleryImage} alt={`${style.name}${space.name}設計`} />
                  </div>
                  <figcaption>
                    <span className="style-gallery__space-number en">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="style-gallery__space-label en">{space.label}</span>
                      <strong>{space.name}</strong>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="style-gallery__dots" aria-label="空間位置">
              {SPACE_IDEAS.map((space, index) => (
                <span key={space.name} className={activeRoom === index ? 'is-active' : ''} />
              ))}
            </div>
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
