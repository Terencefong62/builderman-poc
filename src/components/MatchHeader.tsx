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

  return (
    <header className="match-header">
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
