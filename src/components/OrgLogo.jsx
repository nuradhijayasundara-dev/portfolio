/**
 * OrgLogo — a small institution mark. Uses the supplied logo when there is one
 * and falls back to a neutral monogram so every row keeps the same rhythm.
 */
export default function OrgLogo({ src, name, size = 48, className = "", fallback = true }) {
  const initials = name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  if (!src && !fallback) return null

  if (src) {
    return (
      <img
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{ height: size, width: 'auto', maxWidth: size * 2.2 }}
        className={`shrink-0 object-contain ${className}`}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`shrink-0 inline-flex items-center justify-center rounded-full border border-accent/40 bg-panel font-display text-offwhite/80 ${className}`}
    >
      <span style={{ fontSize: size * 0.34 }}>{initials}</span>
    </span>
  )
}
