import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMatchingDurationMs } from '../data/companies'
import { loadMatchDraft } from '../lib/matchDraft'
import './MatchingPage.css'

const STATUS_LINES = [
  '分析你嘅風格喜好…',
  '比對相近單位完工紀錄…',
  '篩選合適裝修公司…',
  '計算 AI 總體評分…',
]

export default function MatchingPage() {
  const navigate = useNavigate()
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const durationMs = useMemo(() => {
    const draft = loadMatchDraft()
    return getMatchingDurationMs({
      styleCount: draft.styles.length,
      hasUnitArea: Boolean(draft.unit.areaSqft),
    })
  }, [])

  useEffect(() => {
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / durationMs)
      setProgress(Math.round(ratio * 100))
      if (ratio < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    const lineTimer = window.setInterval(() => {
      setLineIndex((prev) => Math.min(prev + 1, STATUS_LINES.length - 1))
    }, Math.max(280, durationMs / STATUS_LINES.length))

    const doneTimer = window.setTimeout(() => {
      navigate('/match/results', { replace: true })
    }, durationMs)

    return () => {
      cancelAnimationFrame(frame)
      window.clearInterval(lineTimer)
      window.clearTimeout(doneTimer)
    }
  }, [durationMs, navigate])

  return (
    <div className="matching-page" role="status" aria-live="polite">
      <div className="matching-page__glow" aria-hidden="true" />
      <div className="matching-page__panel">
        <div className="matching-page__spinner" aria-hidden="true">
          <span className="matching-page__ring" />
          <span className="matching-page__dot" />
        </div>

        <p className="matching-page__eyebrow en">Builderman AI</p>
        <h1 className="matching-page__title">開始智能配對中</h1>
        <p className="matching-page__status">{STATUS_LINES[lineIndex]}</p>

        <div
          className="matching-page__bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="配對進度"
        >
          <div
            className="matching-page__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="matching-page__percent en">{progress}%</p>
      </div>
    </div>
  )
}
