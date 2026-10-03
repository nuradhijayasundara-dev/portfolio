import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * SystemArchitecture — a living, animated visualization of the Backhaul-Match
 * platform: courier → gateway → matching → fleet → driver, with data
 * particles travelling the connections, a mini OSRM route calculation, and
 * a matching-engine state sequence. Pure SVG + Framer Motion, no images.
 */

const NODES = [
  {
    id: 'courier',
    label: 'COURIER SYSTEM',
    sub: ['COURIER', 'SHIPMENT', 'BOOKING'],
    x: 90,
    description: 'Submits shipment and booking requests from courier operations.',
  },
  {
    id: 'gateway',
    label: 'API GATEWAY',
    sub: [],
    x: 300,
    description: 'Central entry point for service communication.',
  },
  {
    id: 'matching',
    label: 'MATCHING PLATFORM',
    sub: ['MATCHING ENGINE', 'OSRM'],
    x: 560,
    description: 'Route-based vehicle matching using OSRM.',
    wide: true,
  },
  {
    id: 'fleet',
    label: 'FLEET SYSTEM',
    sub: ['FLEET', 'VEHICLE', 'AVAILABILITY'],
    x: 820,
    description: 'Tracks vehicle availability for matched shipments.',
  },
  {
    id: 'driver',
    label: 'DRIVER',
    sub: [],
    x: 1010,
    description: 'Receives the matched shipment for dispatch.',
  },
]

const CONNECTIONS = [
  { from: 'courier', to: 'gateway', label: 'SHIPMENT REQUEST', duration: 3.2, color: 'var(--color-accent)' },
  { from: 'gateway', to: 'matching', label: 'API REQUEST', duration: 2.4, color: 'var(--color-skyblue)' },
  { from: 'matching', to: 'fleet', label: 'VEHICLE MATCH', duration: 3.6, color: 'var(--color-blue)' },
  { from: 'fleet', to: 'driver', label: 'DISPATCH', duration: 2.8, color: 'var(--color-accent)' },
]

const MICROSERVICES = [
  { label: 'AUTH', dx: -170, dy: -78 },
  { label: 'SHIPMENT', dx: 0, dy: -92 },
  { label: 'MATCHING', dx: 170, dy: -78 },
  { label: 'FLEET', dx: -170, dy: 78 },
  { label: 'GPS', dx: 0, dy: 92 },
  { label: 'NOTIFICATION', dx: 170, dy: 78 },
]

const STATES = ['WAITING_FOR_MATCH', 'ROUTE CALCULATION', 'MATCHING', 'MATCH FOUND', 'BOOKING PENDING']

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    setIsDesktop(query.matches)
    const handler = (e) => setIsDesktop(e.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])
  return isDesktop
}

function node(id) {
  return NODES.find((n) => n.id === id)
}

function Particle({ x1, y1, x2, y2, duration, delay = 0, color, reduced, size = 3.4 }) {
  if (reduced) {
    return <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r={size} fill={color} opacity={0.7} />
  }
  return (
    <motion.circle
      r={size}
      fill={color}
      initial={{ cx: x1, cy: y1, opacity: 0 }}
      animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    />
  )
}

function DesktopDiagram({ reduced }) {
  const [hovered, setHovered] = useState(null)
  const y = 130

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 1100 460" className="w-full h-auto" role="img" aria-label="Backhaul-Match system architecture">
        <defs>
          <pattern id="sysgrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--color-line)" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="1100" height="460" fill="url(#sysgrid)" opacity="0.5" />

        {/* coordinate-style corner marks, purely decorative */}
        <text x="16" y="24" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--color-muted)" letterSpacing="1">
          SYS.ARCH — BACKHAUL-MATCH
        </text>
        <text x="1084" y="24" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--color-muted)" letterSpacing="1">
          LIVE FLOW SIMULATION
        </text>

        {/* connections + particles */}
        {CONNECTIONS.map((c) => {
          const a = node(c.from)
          const b = node(c.to)
          const highlighted = hovered === c.from || hovered === c.to
          return (
            <g key={c.from + c.to}>
              <line
                x1={a.x}
                y1={y}
                x2={b.x}
                y2={y}
                stroke="var(--color-line)"
                strokeWidth={highlighted ? 1.6 : 1}
                opacity={highlighted ? 0.9 : 0.6}
              />
              <text
                x={(a.x + b.x) / 2}
                y={y - 12}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="8.5"
                letterSpacing="1"
                fill="var(--color-muted)"
                opacity={highlighted ? 0.95 : 0.55}
              >
                {c.label}
              </text>
              <Particle x1={a.x + 62} y1={y} x2={b.x - 62} y2={y} duration={c.duration} color={c.color} reduced={reduced} />
              {c.from === 'gateway' || c.to === 'gateway' ? null : (
                <Particle
                  x1={a.x + 62}
                  y1={y}
                  x2={b.x - 62}
                  y2={y}
                  duration={c.duration}
                  delay={c.duration / 2}
                  color={c.color}
                  reduced={reduced}
                  size={2.2}
                />
              )}
            </g>
          )
        })}

        {/* microservice tags fanning out from the matching platform */}
        {MICROSERVICES.map((m) => {
          const mx = node('matching').x + m.dx * 0.72
          const my = y + m.dy * 0.62
          const active = hovered === 'matching'
          return (
            <g key={m.label} opacity={active ? 1 : 0.55} style={{ transition: 'opacity 300ms' }}>
              <line x1={node('matching').x} y1={y} x2={mx} y2={my} stroke="var(--color-accent)" strokeWidth="0.75" opacity={active ? 0.5 : 0.25} />
              <rect x={mx - 30} y={my - 9} width="60" height="16" rx="8" fill="var(--color-ink)" stroke="var(--color-line)" strokeWidth="0.75" />
              <text x={mx} y={my + 3} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="0.5" fill="var(--color-skyblue)">
                {m.label}
              </text>
            </g>
          )
        })}

        {/* neutral-layer caption under the matching platform */}
        <text
          x={node('matching').x}
          y={y + 118}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          letterSpacing="1.5"
          fill="var(--color-muted)"
        >
          NEUTRAL MATCHING LAYER
        </text>

        {/* nodes */}
        {NODES.map((n) => {
          const w = n.wide ? 190 : n.sub.length ? 150 : 110
          const h = 70
          const isHovered = hovered === n.id
          return (
            <g
              key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered((h2) => (h2 === n.id ? null : h2))}
              style={{ cursor: 'pointer' }}
            >
              <motion.rect
                x={n.x - w / 2}
                y={y - h / 2}
                width={w}
                height={h}
                rx="10"
                fill="rgba(8,21,37,0.75)"
                stroke={isHovered ? 'var(--color-accent)' : 'var(--color-line)'}
                strokeWidth={isHovered ? 1.6 : 1}
                animate={{ scale: isHovered ? 1.045 : 1 }}
                style={{ transformOrigin: `${n.x}px ${y}px`, filter: isHovered ? 'drop-shadow(0 0 14px rgba(59,130,246,0.45))' : 'none' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <text
                x={n.x}
                y={n.sub.length ? y - 8 : y + 4}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="500"
                fontSize="9.5"
                letterSpacing="0.5"
                fill="var(--color-offwhite, #F8FAFC)"
              >
                {n.label}
              </text>
              {n.sub.map((s, i) => (
                <text
                  key={s}
                  x={n.x}
                  y={y + 10 + i * 11}
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="7.5"
                  letterSpacing="0.5"
                  fill="var(--color-muted)"
                >
                  {s}
                </text>
              ))}
            </g>
          )
        })}
      </svg>

      {/* hover description panel */}
      <div className="mt-4 h-6">
        {hovered && (
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-accent">
            {node(hovered).label} — <span className="text-muted normal-case tracking-normal">{node(hovered).description}</span>
          </p>
        )}
      </div>
    </div>
  )
}

function OsrmAndState({ reduced }) {
  const pickup = { x: 40, y: 60 }
  const delivery = { x: 400, y: 60 }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* OSRM mini route */}
      <div className="border border-line rounded-2xl bg-panel/60 p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-6">OSRM route calculation</p>
        <svg viewBox="0 0 440 140" className="w-full h-auto" role="img" aria-label="OSRM route calculation visualization">
          <line x1={pickup.x} y1={pickup.y} x2={delivery.x} y2={delivery.y} stroke="var(--color-line)" strokeWidth="1" strokeDasharray="4 5" />
          <motion.line
            x1={pickup.x}
            y1={pickup.y}
            y2={pickup.y}
            stroke="var(--color-accent)"
            strokeWidth="2"
            initial={{ x2: pickup.x }}
            animate={reduced ? { x2: delivery.x } : { x2: [pickup.x, delivery.x, pickup.x] }}
            transition={reduced ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx={pickup.x} cy={pickup.y} r="6" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="1.5" />
          <circle cx={delivery.x} cy={delivery.y} r="6" fill="var(--color-ink)" stroke="var(--color-skyblue)" strokeWidth="1.5" />
          <text x={pickup.x} y={pickup.y - 16} textAnchor="start" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1" fill="var(--color-muted)">
            PICKUP
          </text>
          <text x={delivery.x} y={delivery.y - 16} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1" fill="var(--color-muted)">
            DELIVERY
          </text>

          <Particle
            x1={pickup.x}
            y1={pickup.y + 26}
            x2={delivery.x}
            y2={pickup.y + 26}
            duration={4.5}
            color="var(--color-skyblue)"
            reduced={reduced}
            size={3}
          />
          <text x={(pickup.x + delivery.x) / 2} y={pickup.y + 46} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.5" fill="var(--color-muted)">
            VEHICLE
          </text>
        </svg>

        <div className="relative h-5 mt-2 overflow-hidden">
          <motion.p
            className="absolute inset-0 font-mono text-[11px] uppercase tracking-widest2 text-muted"
            animate={reduced ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
            transition={reduced ? {} : { duration: 6, repeat: Infinity, times: [0, 0.45, 0.55, 1] }}
          >
            Calculating route&hellip;
          </motion.p>
          <motion.p
            className="absolute inset-0 font-mono text-[11px] uppercase tracking-widest2 text-accent"
            animate={reduced ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }}
            transition={reduced ? {} : { duration: 6, repeat: Infinity, times: [0, 0.45, 0.55, 1] }}
          >
            Route compatible
          </motion.p>
        </div>
        <p className="font-mono text-[10px] text-muted/60 mt-3">
          Illustrative visualization of the project&rsquo;s route-matching logic — not live data.
        </p>
      </div>

      {/* matching engine state sequence */}
      <div className="border border-line rounded-2xl bg-panel/60 p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-6">Matching engine — state sequence</p>
        <div className="relative pl-6">
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-line" />
          {!reduced && (
            <motion.div
              className="absolute left-[5px] w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)', height: '22%' }}
              animate={{ top: ['0%', '78%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <ul className="space-y-5">
            {STATES.map((s, i) => (
              <li key={s} className="relative flex items-center gap-3">
                <motion.span
                  className="absolute -left-6 w-2.5 h-2.5 rounded-full bg-accent"
                  animate={reduced ? { opacity: 0.6 } : { opacity: [0.3, 1, 0.3] }}
                  transition={reduced ? {} : { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: (i * 7) / STATES.length }}
                />
                <motion.span
                  className="font-mono text-xs uppercase tracking-widest2"
                  animate={reduced ? { color: 'var(--color-muted)' } : { color: ['var(--color-muted)', 'var(--color-accent)', 'var(--color-muted)'] }}
                  transition={reduced ? {} : { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: (i * 7) / STATES.length }}
                >
                  STATE {String(i + 1).padStart(2, '0')} — {s}
                </motion.span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function MobileDiagram({ reduced }) {
  const steps = [
    { label: 'COURIER', sub: 'Shipment & booking requests' },
    { label: 'API GATEWAY', sub: 'Service entry point' },
    { label: 'MATCHING ENGINE', sub: 'Route-based vehicle matching' },
    { label: 'OSRM', sub: 'Route calculation' },
    { label: 'FLEET', sub: 'Vehicle availability' },
    { label: 'DRIVER', sub: 'Dispatch' },
  ]

  return (
    <div className="border border-line rounded-2xl bg-panel/60 p-6">
      <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-6">System flow</p>
      <div className="relative pl-7">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-line" />
        {steps.map((step, i) => (
          <div key={step.label} className="relative pb-9 last:pb-0">
            <span className="absolute -left-7 top-1 w-[18px] h-[18px] rounded-full border border-accent/50 bg-ink flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
            {i < steps.length - 1 && !reduced && (
              <motion.span
                className="absolute -left-[19px] top-1 w-1.5 h-1.5 rounded-full bg-skyblue"
                animate={{ top: ['4px', '38px'], opacity: [0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
              />
            )}
            <p className="font-mono text-sm uppercase tracking-widest2 text-offwhite">{step.label}</p>
            <p className="text-muted text-xs mt-1">{step.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SystemArchitecture() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  return (
    <div className="w-full border border-line rounded-2xl bg-panel/40 p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">Animated system architecture</p>
        <p className="hidden sm:block font-mono text-[10px] uppercase tracking-widest2 text-muted/50">
          Courier &rarr; Gateway &rarr; Matching &rarr; Fleet &rarr; Driver
        </p>
      </div>

      {isDesktop ? <DesktopDiagram reduced={reduced} /> : <MobileDiagram reduced={reduced} />}

      {isDesktop && (
        <div className="mt-10">
          <OsrmAndState reduced={reduced} />
        </div>
      )}
    </div>
  )
}
