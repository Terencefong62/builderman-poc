import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MatchHeader from '../components/MatchHeader'
import {
  isContactComplete,
  isValidEmail,
  isValidPhone,
  type ContactInfo,
} from '../data/contact'
import { MATCH_STEPS } from '../data/styles'
import { loadMatchDraft, saveMatchDraft } from '../lib/matchDraft'
import './ContactPage.css'

type FieldErrors = Partial<Record<keyof ContactInfo, string>>

function validateContact(contact: ContactInfo, touched: boolean): FieldErrors {
  if (!touched) return {}

  const errors: FieldErrors = {}

  if (contact.name.trim().length < 2) {
    errors.name = '請輸入姓名'
  }

  if (!isValidEmail(contact.email)) {
    errors.email = '請輸入有效電郵地址'
  }

  if (!isValidPhone(contact.phone)) {
    errors.phone = '請輸入有效香港電話號碼'
  }

  return errors
}

export default function ContactPage() {
  const navigate = useNavigate()
  const [contact, setContact] = useState<ContactInfo>(
    () => loadMatchDraft().contact,
  )
  const [touched, setTouched] = useState(false)

  const errors = useMemo(
    () => validateContact(contact, touched),
    [contact, touched],
  )

  const canContinue = isContactComplete(contact)

  const summary = useMemo(() => {
    if (!canContinue) return '尚未完成個人檔案'
    return `${contact.name.trim()} · ${contact.phone.trim()}`
  }, [canContinue, contact])

  function patch(partial: Partial<ContactInfo>) {
    setContact((prev) => ({ ...prev, ...partial }))
  }

  function handleBack() {
    saveMatchDraft({ contact })
    navigate('/match/unit')
  }

  function handleContinue() {
    setTouched(true)
    if (!isContactComplete(contact)) return
    saveMatchDraft({ contact })
    navigate('/match/matching')
  }

  return (
    <div className="contact-page">
      <MatchHeader
        stepIndex={2}
        stepTotal={MATCH_STEPS.length}
        stepLabel={MATCH_STEPS[2].label}
      />

      <main className="contact-page__main">
        <section className="contact-page__intro">
          <p className="contact-page__eyebrow">步驟3 完成個人檔案</p>
          <h1 className="contact-page__title">一次填好，之後跟進裝修更輕鬆</h1>
          <p className="contact-page__lead">
            填寫以下資料後，我哋會自動為你建立帳戶，方便你隨時登入繼續。
          </p>

          <ul className="contact-benefits" aria-label="完成個人檔案的好處">
            <li>
              <span className="contact-benefits__number" aria-hidden="true">01</span>
              <span>方便平台同裝修公司聯絡你</span>
            </li>
            <li>
              <span className="contact-benefits__number" aria-hidden="true">02</span>
              <span>儲存你已填寫嘅資料，下次登入就可以繼續，唔使重新填過</span>
            </li>
            <li>
              <span className="contact-benefits__number" aria-hidden="true">03</span>
              <span>幫你儲存及管理報價同繳費紀錄</span>
            </li>
          </ul>
        </section>

        <form
          className="contact-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            handleContinue()
          }}
        >
          <section className="contact-card" aria-labelledby="contact-heading">
            <div className="contact-card__head">
              <h2 id="contact-heading" className="contact-card__title">
                完成你嘅個人檔案
              </h2>
              <p className="contact-card__hint">所有欄位均為必填</p>
            </div>

            <div className="contact-fields">
              <label className="field">
                <span className="field__label">
                  姓名 <span className="field__required">*</span>
                </span>
                <input
                  className={`field__input${errors.name ? ' is-error' : ''}`}
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="例如 陳大文"
                  value={contact.name}
                  onChange={(event) => patch({ name: event.target.value })}
                  onBlur={() => setTouched(true)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="field__error">
                    {errors.name}
                  </span>
                )}
              </label>

              <label className="field">
                <span className="field__label">
                  電郵 <span className="field__required">*</span>
                </span>
                <input
                  className={`field__input field__input--en${errors.email ? ' is-error' : ''}`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="name@email.com"
                  value={contact.email}
                  onChange={(event) => patch({ email: event.target.value })}
                  onBlur={() => setTouched(true)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="field__error">
                    {errors.email}
                  </span>
                )}
              </label>

              <label className="field">
                <span className="field__label">
                  電話 <span className="field__required">*</span>
                </span>
                <input
                  className={`field__input field__input--en${errors.phone ? ' is-error' : ''}`}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="例如 9123 4567"
                  value={contact.phone}
                  onChange={(event) => patch({ phone: event.target.value })}
                  onBlur={() => setTouched(true)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <span id="phone-error" className="field__error">
                    {errors.phone}
                  </span>
                )}
              </label>
            </div>
          </section>
        </form>
      </main>

      <div className="contact-page__bar" role="region" aria-label="聯絡資料進度">
        <div className="contact-page__bar-inner">
          <div className="contact-page__selection">
            <p className="contact-page__selection-count">
              {canContinue ? '資料已齊' : '請完成必填項目'}
            </p>
            <p className="contact-page__selection-list">{summary}</p>
          </div>
          <div className="contact-page__actions">
            <button type="button" className="contact-page__back" onClick={handleBack}>
              上一步
            </button>
            <button
              type="button"
              className="contact-page__cta"
              disabled={!canContinue}
              onClick={handleContinue}
            >
              建立帳戶並繼續
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
