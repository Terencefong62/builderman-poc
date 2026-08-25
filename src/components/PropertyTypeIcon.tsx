import type { ReactElement, ReactNode } from 'react'
import type { PropertyTypeId } from '../data/property'

type PropertyTypeIconProps = {
  type: PropertyTypeId
  className?: string
}

function IconShell({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="28"
      height="28"
    >
      {children}
    </svg>
  )
}

/** 私樓 — modern private high-rise */
function PrivateIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M8 28V8.5C8 7.67 8.67 7 9.5 7H22.5C23.33 7 24 7.67 24 8.5V28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M6 28H26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 11H14.5M17.5 11H20M12 15H14.5M17.5 15H20M12 19H14.5M17.5 19H20M12 23H14.5M17.5 23H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </IconShell>
  )
}

/** 公屋 — public housing slab block */
function PublicIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M5 28V10H27V28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4 28H28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 14H27M5 18H27M5 22H27" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 14V28M16 14V28M22 14V28" stroke="currentColor" strokeWidth="1.5" />
    </IconShell>
  )
}

/** 居屋 — home with ownership mark */
function HoshIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M6 14.5L16 6L26 14.5V26C26 27.1 25.1 28 24 28H8C6.9 28 6 27.1 6 26V14.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13 28V18H19V28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 11.5L23 13L26.5 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  )
}

/** 村屋 — 3-storey village house with pitched roof */
function VillageIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M7 13L16 5L25 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M9 13V28H23V13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 18H23M9 23H23" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14.5 23V28H17.5V23"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </IconShell>
  )
}

/** 唐樓 — narrow tong lau with shopfront */
function TonglauIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M10 28V6H22V28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 28H24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 9.5H22M10 13.5H22M10 17.5H22" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 21.5H20V28H12V21.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.5 6V4.5H18.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </IconShell>
  )
}

/** 全新樓 — new building with sparkle */
function NewIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M7 28V11L16 7L25 11V28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M5 28H27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 15H14.5M17.5 15H20M12 19.5H14.5M17.5 19.5H20M12 24H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M24.5 5.5L25.2 7.3L27 8L25.2 8.7L24.5 10.5L23.8 8.7L22 8L23.8 7.3L24.5 5.5Z"
        fill="currentColor"
      />
    </IconShell>
  )
}

const ICONS: Record<
  PropertyTypeId,
  (props: { className?: string }) => ReactElement
> = {
  private: PrivateIcon,
  public: PublicIcon,
  hosh: HoshIcon,
  village: VillageIcon,
  tonglau: TonglauIcon,
  new: NewIcon,
}

export default function PropertyTypeIcon({ type, className }: PropertyTypeIconProps) {
  const Icon = ICONS[type]
  return <Icon className={className} />
}
