import './NumberStepper.css'

type NumberStepperProps = {
  id: string
  label: string
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

export default function NumberStepper({
  id,
  label,
  value,
  min = 0,
  max = 10,
  onChange,
}: NumberStepperProps) {
  return (
    <div className="stepper">
      <label className="stepper__label" htmlFor={id}>
        {label}
      </label>
      <div className="stepper__controls">
        <button
          type="button"
          className="stepper__btn"
          aria-label={`減少${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </button>
        <span id={id} className="stepper__value en">
          {value}
        </span>
        <button
          type="button"
          className="stepper__btn"
          aria-label={`增加${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  )
}
