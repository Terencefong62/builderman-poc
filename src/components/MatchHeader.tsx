import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './MatchHeader.css'

type MatchHeaderProps = {
  stepIndex: number
  stepTotal: number
  stepLabel: string
}

export default function MatchHeader({
  stepIndex,
  stepTotal,
  stepLabel,
}: MatchHeaderProps) {
  const progress = ((stepIndex + 1) / stepTotal) * 100
  const [isHidden, setIsHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    let frameId = 0

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0)
      const delta = currentScrollY - lastScrollY.current

      if (currentScrollY <= 16) {
        setIsHidden(false)
        setIsScrolled(false)
      } else {
        setIsScrolled(true)

        if (delta > 6 && currentScrollY > 96) {
          setIsHidden(true)
        } else if (delta < -6) {
          setIsHidden(false)
        }
      }

      lastScrollY.current = currentScrollY
      frameId = 0
    }

    const handleScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateHeader)
      }
    }

    lastScrollY.current = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== 0) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <header
      className={`match-header${isHidden ? ' is-hidden' : ''}${isScrolled ? ' is-scrolled' : ''}`}
    >
      <div className="match-header__inner">
        <Link to="/" className="match-header__brand" aria-label="Builderman 首頁">
          <span className="match-header__mark" aria-hidden="true" />
          <span className="match-header__name en">Builderman</span>
        </Link>

        <div className="match-header__step">
          <span className="match-header__step-label">{stepLabel}</span>
          <span className="match-header__step-count en">
            {String(stepIndex + 1).padStart(2, '0')} /{' '}
            {String(stepTotal).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div
        className="match-header__progress"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="配對進度"
      >
        <div
          className="match-header__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  )
}
