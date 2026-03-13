interface ReplaiLogoProps {
  className?: string
  iconOnly?: boolean
  invert?: boolean
}

export function ReplaiLogo({ className = "", iconOnly = false, invert = false }: ReplaiLogoProps) {
  const textColor = invert ? "#ffffff" : "#1B3A5C"

  return (
    <svg
      viewBox={iconOnly ? "0 0 60 60" : "0 0 180 52"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Replai"
      role="img"
    >
      <defs>
        <linearGradient id="replai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B3A5C" />
          <stop offset="100%" stopColor="#0F6E56" />
        </linearGradient>
      </defs>

      {/* Chat bubble outline */}
      <circle cx="26" cy="24" r="22" stroke="url(#replai-grad)" strokeWidth="4" fill="none" />

      {/* Tail of the chat bubble */}
      <path
        d="M10 42 Q6 50 2 52 Q10 50 16 44"
        fill="url(#replai-grad)"
        stroke="none"
      />

      {/* R letterform inside bubble */}
      <path
        d="M18 14 L18 34 M18 14 L28 14 Q34 14 34 20 Q34 26 28 26 L18 26 M26 26 L34 34"
        stroke="url(#replai-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Wordmark "Replai" — only when not iconOnly */}
      {!iconOnly && (
        <text
          x="56"
          y="33"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="26"
          fontWeight="700"
          fill={textColor}
          letterSpacing="-0.5"
        >
          Replai
        </text>
      )}
    </svg>
  )
}
