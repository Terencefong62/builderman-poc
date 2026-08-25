import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MatchHeader from '../components/MatchHeader'
import SelectedStyleTags from '../components/SelectedStyleTags'
import StyleCard from '../components/StyleCard'
import StyleGalleryDialog from '../components/StyleGalleryDialog'
import StyleSwapDialog from '../components/StyleSwapDialog'
import { MATCH_STEPS, RENOVATION_STYLES } from '../data/styles'
import { loadMatchDraft, saveMatchDraft } from '../lib/matchDraft'
import './StyleSelectPage.css'

const MAX_STYLES = 3

export default function StyleSelectPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>(() => loadMatchDraft().styles)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [pendingStyleId, setPendingStyleId] = useState<string | null>(null)
  const [exploringStyleId, setExploringStyleId] = useState<string | null>(null)
  const uploadInputRef = useRef<HTMLInputElement | null>(null)

  const selectedStyles = useMemo(
    () => RENOVATION_STYLES.filter((style) => selected.includes(style.id)),
    [selected],
  )

  const pendingStyle = useMemo(
    () => RENOVATION_STYLES.find((style) => style.id === pendingStyleId) ?? null,
    [pendingStyleId],
  )

  const exploringStyle = useMemo(
    () => RENOVATION_STYLES.find((style) => style.id === exploringStyleId) ?? null,
    [exploringStyleId],
  )

  const uploadedLabel = useMemo(() => {
    if (uploadedFiles.length === 0) {
      return '未上傳參考圖'
    }

    return uploadedFiles.map((file) => file.name).join(' · ')
  }, [uploadedFiles])

  function toggleStyle(id: string) {
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((item) => item !== id))
      return
    }

    if (selected.length >= MAX_STYLES) {
      setPendingStyleId(id)
      return
    }

    setSelected((prev) => [...prev, id])
  }

  function confirmSwap(removeId: string) {
    if (!pendingStyleId) return
    setSelected((prev) => [
      ...prev.filter((id) => id !== removeId),
      pendingStyleId,
    ])
    setPendingStyleId(null)
  }

  function handleContinue() {
    if (selected.length === 0 && uploadedFiles.length === 0) return
    saveMatchDraft({
      styles: selected,
      uploadedFileNames: uploadedFiles.map((file) => file.name),
    })
    navigate('/match/unit')
  }

  function handleUploadClick() {
    uploadInputRef.current?.click()
  }

  function handleUploadChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    setUploadedFiles(files)
  }

  const canContinue = selected.length > 0 || uploadedFiles.length > 0

  return (
    <div className="style-page">
      <MatchHeader
        stepIndex={0}
        stepTotal={MATCH_STEPS.length}
        stepLabel={MATCH_STEPS[0].label}
      />

      <main className="style-page__main">
        <section className="style-page__intro">
          <p className="style-page__eyebrow">步驟1 選擇心儀風格</p>
          <h1 className="style-page__title">揀你鍾意嘅裝修風格</h1>
          <p className="style-page__desc">
            可同時揀最多 {MAX_STYLES}{' '}
            個風格，之後會按你嘅喜好配對最啱你嘅裝修公司。
          </p>
        </section>

        {selectedStyles.length > 0 && (
          <section className="style-page__selected" aria-label="已選風格預覽">
            <p className="style-page__selected-label">
              已選 <span className="en">{selected.length}/{MAX_STYLES}</span>
            </p>
            <SelectedStyleTags styles={selectedStyles} onRemove={toggleStyle} />
          </section>
        )}

        <section
          className="style-page__grid"
          aria-label="裝修風格選項"
        >
          {RENOVATION_STYLES.map((style, index) => (
            <StyleCard
              key={style.id}
              style={style}
              selected={selected.includes(style.id)}
              onToggle={toggleStyle}
              onExplore={setExploringStyleId}
              index={index}
            />
          ))}
        </section>

        <section className="style-page__upload" aria-label="自訂風格上傳">
          <div className="style-page__upload-copy">
            <p className="style-page__upload-eyebrow">自訂風格參考</p>
            <h2 className="style-page__upload-title">我已經有心水設計!</h2>
            <p className="style-page__upload-desc">
              搵唔到啱你心水嘅風格，又或者你已經有心水設計?
              上傳畀我哋用AI幫你分析啦。
            </p>
          </div>

          <button
            type="button"
            className="style-page__upload-dropzone"
            onClick={handleUploadClick}
          >
            <span className="style-page__upload-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path
                  d="M12 16V6M12 6L8.5 9.5M12 6L15.5 9.5M5 16.5V17.5C5 18.6046 5.89543 19.5 7 19.5H17C18.1046 19.5 19 18.6046 19 17.5V16.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="style-page__upload-action">上傳參考圖片</span>
            <span className="style-page__upload-hint">
              JPG、PNG、WebP，最多可加入多張靈感圖
            </span>
          </button>

          <input
            ref={uploadInputRef}
            type="file"
            accept="image/*"
            multiple
            className="style-page__upload-input"
            onChange={handleUploadChange}
          />

          <p className="style-page__upload-files">{uploadedLabel}</p>
        </section>
      </main>

      <div className="style-page__bar" role="region" aria-label="已選風格">
        <div className="style-page__bar-inner">
          <div className="style-page__selection">
            <p className="style-page__selection-count">
              已選{' '}
              <span className="en">
                {selected.length}/{MAX_STYLES}
              </span>
            </p>
            {selectedStyles.length > 0 ? (
              <SelectedStyleTags styles={selectedStyles} onRemove={toggleStyle} />
            ) : (
              <p className="style-page__selection-list">
                {uploadedFiles.length > 0
                  ? `已上傳 ${uploadedFiles.length} 張參考圖`
                  : '尚未選擇風格'}
              </p>
            )}
          </div>

          <button
            type="button"
            className="style-page__cta"
            disabled={!canContinue}
            onClick={handleContinue}
          >
            下一步
            <span aria-hidden="true"> →</span>
          </button>
        </div>
      </div>

      {pendingStyle && (
        <StyleSwapDialog
          pendingStyle={pendingStyle}
          currentStyles={selectedStyles}
          onConfirm={confirmSwap}
          onCancel={() => setPendingStyleId(null)}
        />
      )}

      {exploringStyle && (
        <StyleGalleryDialog
          style={exploringStyle}
          selected={selected.includes(exploringStyle.id)}
          onToggle={() => {
            toggleStyle(exploringStyle.id)
            setExploringStyleId(null)
          }}
          onClose={() => setExploringStyleId(null)}
        />
      )}
    </div>
  )
}
