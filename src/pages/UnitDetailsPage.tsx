import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MatchHeader from '../components/MatchHeader'
import NumberStepper from '../components/NumberStepper'
import PropertyTypeIcon from '../components/PropertyTypeIcon'
import {
  BUDGET_MAX_WAN,
  BUDGET_MIN_WAN,
  BUDGET_STEP_WAN,
  clampBudgetWan,
  formatBudgetRange,
  formatBudgetRangeHkd,
  HK_DISTRICTS,
  PROPERTY_TYPES,
  type UnitDetails,
} from '../data/property'
import { MATCH_STEPS } from '../data/styles'
import { loadMatchDraft, saveMatchDraft } from '../lib/matchDraft'
import './UnitDetailsPage.css'

function isUnitComplete(unit: UnitDetails) {
  const area = Number(unit.areaSqft)
  return (
    unit.propertyType !== '' &&
    unit.district !== '' &&
    unit.estate.trim() !== '' &&
    Number.isFinite(area) &&
    area > 0 &&
    unit.kitchen !== '' &&
    unit.furniture !== ''
  )
}

function toPercent(wan: number) {
  return ((wan - BUDGET_MIN_WAN) / (BUDGET_MAX_WAN - BUDGET_MIN_WAN)) * 100
}

export default function UnitDetailsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [unit, setUnit] = useState<UnitDetails>(() => loadMatchDraft().unit)
  const [activeBudgetThumb, setActiveBudgetThumb] = useState<'min' | 'max'>(
    'max',
  )
  const [focusBudget, setFocusBudget] = useState(
    () => location.hash === '#budget',
  )

  useEffect(() => {
    if (location.hash !== '#budget') return

    setFocusBudget(true)
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('budget')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    const clearFocus = window.setTimeout(() => setFocusBudget(false), 2400)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(clearFocus)
    }
  }, [location.hash])

  const summary = useMemo(() => {
    const typeName =
      PROPERTY_TYPES.find((item) => item.id === unit.propertyType)?.name ?? ''
    const parts = [
      typeName,
      unit.district,
      formatBudgetRange(unit.budgetMinWan, unit.budgetMaxWan),
    ].filter(Boolean)
    return parts.length > 0 ? parts.join(' · ') : '尚未填寫單位資料'
  }, [unit])

  const budgetStart = toPercent(unit.budgetMinWan)
  const budgetEnd = toPercent(unit.budgetMaxWan)

  function patch(partial: Partial<UnitDetails>) {
    setUnit((prev) => ({ ...prev, ...partial }))
  }

  function handleBudgetMin(value: number) {
    const nextMin = clampBudgetWan(value)
    patch({
      budgetMinWan: Math.min(nextMin, unit.budgetMaxWan),
    })
  }

  function handleBudgetMax(value: number) {
    const nextMax = clampBudgetWan(value)
    patch({
      budgetMaxWan: Math.max(nextMax, unit.budgetMinWan),
    })
  }

  function handleBack() {
    saveMatchDraft({ unit })
    navigate('/match/styles')
  }

  function handleContinue() {
    if (!isUnitComplete(unit)) return
    saveMatchDraft({ unit })
    navigate('/match/contact')
  }

  const canContinue = isUnitComplete(unit)

  return (
    <div className="unit-page">
      <MatchHeader
        stepIndex={1}
        stepTotal={MATCH_STEPS.length}
        stepLabel={MATCH_STEPS[1].label}
      />

      <main className="unit-page__main">
        <section className="unit-page__intro">
          <p className="unit-page__eyebrow">步驟2 填寫單位資料</p>
          <h1 className="unit-page__title">單位資料愈完整，裝修方案配對就愈精準。</h1>
          <p className="unit-page__desc">
            預算、樓型同間隔會影響報價同工程安排，幫我哋搵最啱你嘅裝修公司。
          </p>
        </section>

        <form
          className="unit-form"
          onSubmit={(event) => {
            event.preventDefault()
            handleContinue()
          }}
        >
          <section
            id="budget"
            className={`unit-card${focusBudget ? ' unit-card--focus' : ''}`}
            aria-labelledby="budget-heading"
          >
            <div className="unit-card__head">
              <h2 id="budget-heading" className="unit-card__title">
                預算
              </h2>
              <p className="unit-card__hint">拖動兩邊，選擇預算範圍（0–300 萬）</p>
            </div>

            <div className="budget-scale">
              <div className="budget-scale__value">
                <p className="budget-scale__amount en">
                  {formatBudgetRange(unit.budgetMinWan, unit.budgetMaxWan)}
                </p>
                <p className="budget-scale__hkd en">
                  {formatBudgetRangeHkd(unit.budgetMinWan, unit.budgetMaxWan)}
                </p>
              </div>

              <div className="budget-scale__slider-wrap">
                <div className="budget-scale__track" aria-hidden="true">
                  <span
                    className="budget-scale__fill"
                    style={{
                      left: `${budgetStart}%`,
                      width: `${Math.max(budgetEnd - budgetStart, 0)}%`,
                    }}
                  />
                </div>
                <label>
                  <span className="visually-hidden">最低預算（萬港元）</span>
                  <input
                    className="budget-scale__slider budget-scale__slider--min"
                    type="range"
                    min={BUDGET_MIN_WAN}
                    max={BUDGET_MAX_WAN}
                    step={BUDGET_STEP_WAN}
                    value={unit.budgetMinWan}
                    aria-valuemin={BUDGET_MIN_WAN}
                    aria-valuemax={unit.budgetMaxWan}
                    aria-valuenow={unit.budgetMinWan}
                    aria-valuetext={formatBudgetRange(
                      unit.budgetMinWan,
                      unit.budgetMaxWan,
                    )}
                    style={{
                      zIndex: activeBudgetThumb === 'min' ? 3 : 2,
                    }}
                    onPointerDown={() => setActiveBudgetThumb('min')}
                    onChange={(event) =>
                      handleBudgetMin(Number(event.target.value))
                    }
                  />
                </label>
                <label>
                  <span className="visually-hidden">最高預算（萬港元）</span>
                  <input
                    className="budget-scale__slider budget-scale__slider--max"
                    type="range"
                    min={BUDGET_MIN_WAN}
                    max={BUDGET_MAX_WAN}
                    step={BUDGET_STEP_WAN}
                    value={unit.budgetMaxWan}
                    aria-valuemin={unit.budgetMinWan}
                    aria-valuemax={BUDGET_MAX_WAN}
                    aria-valuenow={unit.budgetMaxWan}
                    aria-valuetext={formatBudgetRange(
                      unit.budgetMinWan,
                      unit.budgetMaxWan,
                    )}
                    style={{
                      zIndex: activeBudgetThumb === 'max' ? 3 : 1,
                    }}
                    onPointerDown={() => setActiveBudgetThumb('max')}
                    onChange={(event) =>
                      handleBudgetMax(Number(event.target.value))
                    }
                  />
                </label>
              </div>

              <div className="budget-scale__marks en" aria-hidden="true">
                <span>0</span>
                <span>100萬</span>
                <span>200萬</span>
                <span>300萬</span>
              </div>
            </div>
          </section>

          <section className="unit-card" aria-labelledby="type-heading">
            <div className="unit-card__head">
              <h2 id="type-heading" className="unit-card__title">
                物業類型
              </h2>
              <p className="unit-card__hint">單選一項</p>
            </div>
            <div className="choice-grid choice-grid--types">
              {PROPERTY_TYPES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`choice choice--type${unit.propertyType === item.id ? ' is-selected' : ''}`}
                  aria-pressed={unit.propertyType === item.id}
                  onClick={() => patch({ propertyType: item.id })}
                >
                  <span className="choice__icon">
                    <PropertyTypeIcon type={item.id} />
                  </span>
                  <span className="choice__label">{item.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="unit-card" aria-labelledby="location-heading">
            <div className="unit-card__head">
              <h2 id="location-heading" className="unit-card__title">
                物業位置
              </h2>
              <p className="unit-card__hint">地區同屋苑名會用來配對熟悉該區嘅公司</p>
            </div>

            <div className="district-groups">
              {HK_DISTRICTS.map((group) => (
                <div key={group.region} className="district-group">
                  <p className="district-group__label">{group.region}</p>
                  <div className="chip-row">
                    {group.items.map((district) => (
                      <button
                        key={district}
                        type="button"
                        className={`chip${unit.district === district ? ' is-selected' : ''}`}
                        aria-pressed={unit.district === district}
                        onClick={() => patch({ district })}
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="field-grid">
              <label className="field field--wide">
                <span className="field__label">屋苑／大廈名</span>
                <input
                  className="field__input"
                  type="text"
                  placeholder="例如 太古城、美孚新邨"
                  value={unit.estate}
                  onChange={(event) => patch({ estate: event.target.value })}
                  autoComplete="off"
                />
              </label>
              <label className="field">
                <span className="field__label">座數 (如適用)</span>
                <input
                  className="field__input"
                  type="text"
                  placeholder="例如 A座"
                  value={unit.block}
                  onChange={(event) => patch({ block: event.target.value })}
                  autoComplete="off"
                />
              </label>
              <label className="field">
                <span className="field__label">單位 (如適用)</span>
                <input
                  className="field__input"
                  type="text"
                  placeholder="例如 8樓 C室"
                  value={unit.unit}
                  onChange={(event) => patch({ unit: event.target.value })}
                  autoComplete="off"
                />
              </label>
            </div>
          </section>

          <section className="unit-card" aria-labelledby="area-heading">
            <div className="unit-card__head">
              <h2 id="area-heading" className="unit-card__title">
                實用面積
              </h2>
              <p className="unit-card__hint">用實用面積，唔使填建築面積</p>
            </div>
            <label className="field field--area">
              <span className="field__label">實用面積</span>
              <span className="field__suffix-wrap">
                <input
                  className="field__input field__input--en"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={unit.areaSqft}
                  onChange={(event) => patch({ areaSqft: event.target.value })}
                />
                <span className="field__suffix">平方呎</span>
              </span>
            </label>
          </section>

          <section className="unit-card" aria-labelledby="layout-heading">
            <div className="unit-card__head">
              <h2 id="layout-heading" className="unit-card__title">
                間隔
              </h2>
              <p className="unit-card__hint">房間包睡房；開放式可填 0 房</p>
            </div>
            <div className="stepper-row">
              <NumberStepper
                id="rooms"
                label="房間數目"
                value={unit.rooms}
                min={0}
                max={8}
                onChange={(rooms) => patch({ rooms })}
              />
              <NumberStepper
                id="toilets"
                label="廁所數目"
                value={unit.toilets}
                min={1}
                max={6}
                onChange={(toilets) => patch({ toilets })}
              />
            </div>

            <div className="layout-kitchen">
              <p className="field__label" id="kitchen-label">
                廚房
              </p>
              <div
                className="choice-grid choice-grid--yesno"
                role="group"
                aria-labelledby="kitchen-label"
              >
                <button
                  type="button"
                  className={`choice choice--yesno${unit.kitchen === 'enclosed' ? ' is-selected' : ''}`}
                  aria-pressed={unit.kitchen === 'enclosed'}
                  onClick={() => patch({ kitchen: 'enclosed' })}
                >
                  <span className="choice__label">梗廚</span>
                </button>
                <button
                  type="button"
                  className={`choice choice--yesno${unit.kitchen === 'open' ? ' is-selected' : ''}`}
                  aria-pressed={unit.kitchen === 'open'}
                  onClick={() => patch({ kitchen: 'open' })}
                >
                  <span className="choice__label">開放式</span>
                </button>
              </div>
            </div>
          </section>

          <section className="unit-card" aria-labelledby="furniture-heading">
            <div className="unit-card__head">
              <h2 id="furniture-heading" className="unit-card__title">
                需唔需要訂造全屋傢俬
              </h2>
              <p className="unit-card__hint">衣櫃、廚房櫃、電視櫃等都算</p>
            </div>
            <div className="choice-grid choice-grid--yesno">
              <button
                type="button"
                className={`choice choice--yesno${unit.furniture === 'yes' ? ' is-selected' : ''}`}
                aria-pressed={unit.furniture === 'yes'}
                onClick={() => patch({ furniture: 'yes' })}
              >
                <span className="choice__label">需要</span>
              </button>
              <button
                type="button"
                className={`choice choice--yesno${unit.furniture === 'no' ? ' is-selected' : ''}`}
                aria-pressed={unit.furniture === 'no'}
                onClick={() => patch({ furniture: 'no' })}
              >
                <span className="choice__label">唔需要</span>
              </button>
            </div>
          </section>
        </form>
      </main>

      <div className="unit-page__bar" role="region" aria-label="單位資料進度">
        <div className="unit-page__bar-inner">
          <div className="unit-page__selection">
            <p className="unit-page__selection-count">
              {canContinue ? '資料已齊' : '請完成必填項目'}
            </p>
            <p className="unit-page__selection-list">{summary}</p>
          </div>
          <div className="unit-page__actions">
            <button type="button" className="unit-page__back" onClick={handleBack}>
              上一步
            </button>
            <button
              type="button"
              className="unit-page__cta"
              disabled={!canContinue}
              onClick={handleContinue}
            >
              下一步
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
