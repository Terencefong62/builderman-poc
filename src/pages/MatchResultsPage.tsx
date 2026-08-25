import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MatchHeader from '../components/MatchHeader'
import { getTopMatchedCompanies, type MatchedCompany } from '../data/companies'
import { MATCH_STEPS } from '../data/styles'
import './MatchResultsPage.css'

function formatProjects(count: number) {
  return `${count.toLocaleString('zh-HK')} 單`
}

function formatMonths(months: number) {
  const text = Number.isInteger(months) ? String(months) : months.toFixed(1)
  return `約 ${text} 個月`
}

function CompanyCard({
  company,
  booked,
  onBook,
}: {
  company: MatchedCompany
  booked: boolean
  onBook: () => void
}) {
  const isTop = company.rank === 1
  const projectsRef = useRef<HTMLDivElement>(null)
  const hasProjectSlider = (company.recentProjects?.length ?? 0) > 2

  function scrollProjects(direction: -1 | 1) {
    const projects = projectsRef.current
    if (!projects) return
    projects.scrollBy({
      left: projects.clientWidth * 0.82 * direction,
      behavior: 'smooth',
    })
  }

  return (
    <article
      className={`company-card${isTop ? ' company-card--top' : ''}`}
      aria-labelledby={`company-${company.id}-name`}
    >
      <div className="company-card__top">
        <div className="company-card__identity">
          <div className="company-card__rank-row">
            <span className={`company-card__rank en${isTop ? ' is-top' : ''}`}>
              #{company.rank}
            </span>
            {isTop && <span className="company-card__badge">最推薦</span>}
          </div>
          <div className="company-card__name-row">
            <h2 id={`company-${company.id}-name`} className="company-card__name">
              {company.name}
            </h2>
            {company.contactPerson && (
              <p className="company-card__contact">
                <span className="company-card__contact-avatar" aria-hidden="true">
                  {company.contactPerson.slice(0, 1)}
                </span>
                <span>
                  <span className="company-card__contact-label">公司聯絡人</span>
                  <strong>{company.contactPerson}</strong>
                  {company.contactRole && <span> · {company.contactRole}</span>}
                </span>
              </p>
            )}
          </div>
        </div>

        <div
          className="company-card__score"
          aria-label={`AI 總體評分 ${company.aiScore}`}
        >
          <span className="company-card__score-label">AI 評分</span>
          <span className="company-card__score-value en">
            {company.aiScore.toFixed(1)}
          </span>
          <span className="company-card__score-max en">/ 10</span>
        </div>
      </div>

      <div className="company-card__body">
        <dl className="company-meta">
          <div className="company-meta__item">
            <dt>地點</dt>
            <dd>{company.location}</dd>
          </div>
          <div className="company-meta__item">
            <dt>開業</dt>
            <dd className="en">{company.foundedYear}</dd>
          </div>
          <div className="company-meta__item">
            <dt>曾順利完成裝修項目</dt>
            <dd>{formatProjects(company.clientCount)}</dd>
          </div>
          <div className="company-meta__item">
            <dt>
              <span>AI預測完工期</span>
              <span
                className="company-meta__tip"
                tabIndex={0}
                aria-label="以AI大數據分析過往同類型項目"
              >
                <span className="company-meta__tip-icon" aria-hidden="true">
                  i
                </span>
                <span className="company-meta__tip-bubble" role="tooltip">
                  以AI大數據分析過往同類型項目
                </span>
              </span>
            </dt>
            <dd>{formatMonths(company.avgCompletionMonths)}</dd>
          </div>
          <div className="company-meta__item">
            <dt>自設傢俬廠房</dt>
            <dd>{company.hasOwnFurnitureFactory ? '有' : '沒有'}</dd>
          </div>
          <div
            className={`company-meta__item company-meta__item--news${
              company.hasNegativeNews ? ' is-alert' : ' is-clear'
            }`}
          >
            <dt>負面新聞</dt>
            <dd>
              {company.hasNegativeNews ? (
                <span className="company-news company-news--alert">
                  <span className="company-news__status">有</span>
                  {company.newsSourceUrl && (
                    <a
                      className="company-news__link"
                      href={company.newsSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={company.newsHeadline}
                    >
                      來源
                    </a>
                  )}
                </span>
              ) : (
                <span className="company-news company-news--clear">
                  <span className="company-news__status">未發現</span>
                </span>
              )}
            </dd>
          </div>
        </dl>

        <aside className="company-why" aria-label="推薦原因">
          <p className="company-why__label">點解推薦</p>
          <p className="company-why__text">{company.matchReason}</p>
        </aside>
      </div>

      {company.recentProjects && company.recentProjects.length > 0 && (
        <section className="company-projects" aria-labelledby={`company-${company.id}-projects`}>
          <div className="company-projects__head">
            <div>
              <h3 id={`company-${company.id}-projects`}>近期工程</h3>
              <p>公司最近完成嘅住宅項目</p>
            </div>
            {hasProjectSlider && (
              <div className="company-projects__controls" aria-label="切換近期工程">
                <button type="button" onClick={() => scrollProjects(-1)} aria-label="上一個工程">
                  ←
                </button>
                <button type="button" onClick={() => scrollProjects(1)} aria-label="下一個工程">
                  →
                </button>
              </div>
            )}
          </div>
          <div
            ref={projectsRef}
            className={`company-projects__list${hasProjectSlider ? ' has-slider' : ''}`}
          >
            {company.recentProjects.map((project) => (
              <figure className="company-project" key={`${project.estateName}-${project.space}`}>
                <img
                  src={project.image}
                  alt={`${company.name}於${project.estateName}完成的${project.space}裝修工程`}
                  loading="lazy"
                />
                <figcaption>
                  <strong>{project.estateName}</strong>
                  <span>{project.space}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <button
        type="button"
        className={`company-card__cta${booked ? ' is-booked' : ''}`}
        disabled={booked}
        onClick={onBook}
      >
        {booked ? '已提交預約' : '預約上門度尺'}
      </button>
    </article>
  )
}

export default function MatchResultsPage() {
  const navigate = useNavigate()
  const topCompanies = useMemo(() => getTopMatchedCompanies(), [])
  const [bookedIds, setBookedIds] = useState<string[]>([])

  function handleBook(id: string) {
    setBookedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <div className="results-page">
      <MatchHeader
        stepIndex={3}
        stepTotal={MATCH_STEPS.length}
        stepLabel={MATCH_STEPS[3].label}
      />

      <main className="results-page__main">
        <section className="results-page__intro">
          <p className="results-page__eyebrow">步驟4 智能配對結果</p>
          <h1 className="results-page__title">為你推薦最合適嘅裝修公司</h1>
          <p className="results-page__desc">
            根據你嘅風格、單位同預算，AI 已為你排出前三名。可預約上門度尺確認細節。
          </p>
        </section>

        <ol className="results-list">
          {topCompanies.map((company) => (
            <li key={company.id}>
              <CompanyCard
                company={company}
                booked={bookedIds.includes(company.id)}
                onBook={() => handleBook(company.id)}
              />
            </li>
          ))}
        </ol>

        <div className="results-more">
          <p className="results-more__hint">
            對前三名唔滿意？可以返回步驟 2 修改預算，再重新進行智能配對。
          </p>
          <button
            type="button"
            className="results-more__btn"
            onClick={() => navigate('/match/unit#budget')}
          >
            返回步驟 2 修改預算
          </button>
        </div>
      </main>
    </div>
  )
}
