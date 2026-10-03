import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * SecurityNetwork — a very subtle abstract network/graph visualization used
 * behind the About section's cybersecurity statement. Nodes, connections,
 * a few drifting data points and a slow scanning line — nothing more.
 * No terminals, no fake stats, no "hacker" aesthetic: just systems and
 * connections rendered in the site's own blue palette.
 */

const NODES = [
  { x: 70, y: 60 },
  { x: 230, y: 130 },
  { x: 130, y: 230 },
  { x: 380, y: 70 },
  { x: 420, y: 210 },
  { x: 300, y: 300 },
  { x: 560, y: 140 },
  { x: 620, y: 260 },
  { x: 490, y: 330 },
  { x: 700, y: 70 },
]

const LINKS = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [4, 5],
  [2, 5],
  [3, 6],
  [6, 7],
  [4, 8],
  [7, 8],
  [6, 9],
]

export default function SecurityNetwork({ className = '' }) {
  const reduced = useReducedMotion()

  return (
    <svg
      viewBox="0 0 780 400"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id="secgrid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M 26 0 L 0 0 0 26" fill="none" stroke="var(--color-line)" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="scanFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="780" height="400" fill="url(#secgrid)" opacity="0.4" />

      {/* connections */}
      {LINKS.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="var(--color-blue)"
          strokeWidth="0.75"
          opacity="0.35"
        />
      ))}

      {/* nodes */}
      {NODES.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 3 : 2} fill="var(--color-skyblue)" opacity="0.5" />
      ))}

      {/* a few slowly pulsing data points */}
      {!reduced &&
        [0, 3, 6, 8].map((i, idx) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={NODES[i].x}
            cy={NODES[i].y}
            r={2}
            fill="var(--color-accent)"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.9, 0.2], r: [2, 4, 2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.9 }}
          />
        ))}

      {/* slow scanning line — a security-style sweep, not a hacker effect */}
      {!reduced && (
        <motion.rect
          x="0"
          width="780"
          height="70"
          fill="url(#scanFade)"
          initial={{ y: -70 }}
          animate={{ y: 400 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </svg>
  )
}
