import Image from "next/image"

interface ReplaiLogoProps {
  className?: string
  iconOnly?: boolean
  invert?: boolean
}

export function ReplaiLogo({ className = "", iconOnly = false, invert = false }: ReplaiLogoProps) {
  if (iconOnly) {
    return (
      <Image
        src="/images/replai-icon.png"
        alt="Replai"
        width={48}
        height={48}
        className={className}
      />
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/replai-icon.png"
        alt=""
        width={36}
        height={36}
        className="flex-shrink-0"
      />
      <span
        className="font-bold text-xl leading-none"
        style={{
          color: invert ? "#ffffff" : "#1B3A5C",
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          letterSpacing: "-0.5px",
        }}
      >
        Replai
      </span>
    </div>
  )
}
