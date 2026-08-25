import type { RenovationStyle } from '../data/styles'
import './StyleSwapDialog.css'

type StyleSwapDialogProps = {
  pendingStyle: RenovationStyle
  currentStyles: RenovationStyle[]
  onConfirm: (removeId: string) => void
  onCancel: () => void
}

export default function StyleSwapDialog({
  pendingStyle,
  currentStyles,
  onConfirm,
  onCancel,
}: StyleSwapDialogProps) {
  return (
    <div className="style-swap" role="presentation" onClick={onCancel}>
      <div
        className="style-swap__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="style-swap-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="style-swap-title" className="style-swap__title">
          要放棄邊一個風格？
        </h2>
        <p className="style-swap__desc">
          你已揀咗 3 個風格。要加入
          <strong>「{pendingStyle.name}」</strong>，請先放棄其中一個。
        </p>

        <div className="style-swap__pending">
          <span className="style-swap__pending-thumb">
            <img src={pendingStyle.image} alt="" />
          </span>
          <span className="style-swap__pending-label">想加入：{pendingStyle.name}</span>
        </div>

        <ul className="style-swap__options">
          {currentStyles.map((style) => (
            <li key={style.id}>
              <button
                type="button"
                className="style-swap__option"
                onClick={() => onConfirm(style.id)}
              >
                <span className="style-swap__option-thumb">
                  <img src={style.image} alt="" />
                </span>
                <span className="style-swap__option-name">{style.name}</span>
                <span className="style-swap__option-action">放棄此風格</span>
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className="style-swap__cancel" onClick={onCancel}>
          取消
        </button>
      </div>
    </div>
  )
}
