import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * SystemArchitecture — an animated, colour-coded view of Backhaul-Match:
 * courier → gateway → matching platform → fleet → driver, with data
 * particles on every connection, the microservices behind the platform, a
 * mini OSRM route calculation and the matching-engine state sequence.
 * Pure SVG + Framer Motion, generated in the frontend. Illustrative only.
 */

const C = {
  courier: '#F59E0B',
  gateway: '#A78BFA',
  matching: '#3B82F6',
  fleet: '#10B981',
  driver: '#F472B6',
  cyan: '#22D3EE',
}

const NODES = [
  {
    id: 'courier',
    step: 1,
    label: 'COURIER SYSTEM',
    sub: ['COURIER', 'SHIPMENT', 'BOOKING'],
    x: 95,
    w: 150,
    color: C.courier,
    description: 'Submits shipment and booking requests from courier operations.',
  },
  {
    id: 'gateway',
    step: 2,
    label: 'API GATEWAY',
    sub: ['SINGLE ENTRY POINT'],
    x: 318,
    w: 140,
    color: C.gateway,
    description: 'Central entry point for service communication.',
  },
  {
    id: 'matching',
    step: 3,
    label: 'MATCHING PLATFORM',
    sub: ['MATCHING ENGINE', 'OSRM'],
    x: 550,
    w: 190,
    color: C.matching,
    description: 'Route-based vehicle matching using OSRM.',
  },
  {
    id: 'fleet',
    step: 4,
    label: 'FLEET SYSTEM',
    sub: ['FLEET', 'VEHICLE', 'AVAILABILITY'],
    x: 782,
    w: 150,
    color: C.fleet,
    description: 'Tracks vehicle availability for matched shipments.',
  },
  {
    id: 'driver',
    step: 5,
    label: 'DRIVER',
    sub: ['DISPATCH'],
    x: 1005,
    w: 130,
    color: C.driver,
    description: 'Receives the matched shipment for dispatch.',
  },
]

const LINKS = [
  { from: 'courier', to: 'gateway', label: ['SHIPMENT', 'REQUEST'], duration: 3.2 },
  { from: 'gateway', to: 'matching', label: ['API', 'REQUEST'], duration: 2.6 },
  { from: 'matching', to: 'fleet', label: ['VEHICLE', 'MATCH'], duration: 3.4 },
  { from: 'fleet', to: 'driver', label: ['DISPATCH'], duration: 2.8 },
]

const SERVICES = [
  { label: 'AUTH', color: C.gateway },
  { label: 'SHIPMENT', color: C.courier },
  { label: 'MATCHING', color: C.matching },
  { label: 'FLEET', color: C.fleet },
  { label: 'GPS', color: C.cyan },
  { label: 'NOTIFICATION', color: C.driver },
  { label: 'PAYMENT', color: '#FACC15' },
]

const STATES = [
  { label: 'WAITING_FOR_MATCH', color: C.courier },
  { label: 'ROUTE CALCULATION', color: C.cyan },
  { label: 'MATCHING', color: C.matching },
  { label: 'MATCH FOUND', color: C.fleet },
  { label: 'BOOKING PENDING', color: C.driver },
]

const MONO = 'JetBrains Mono, monospace'
const byId = (id) => NODES.find((n) => n.id === id)

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

function Particle({ x1, y1, x2, y2, duration, delay = 0, color, reduced, size = 4.5 }) {
  if (reduced) {
    return <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r={size} fill={color} />
  }
  const anim = { cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }
  const tr = { duration, repeat: Infinity, ease: 'linear', delay }
  return (
    <>
      <motion.circle r={size * 2.2} fill={color} opacity={0} initial={{ cx: x1, cy: y1, opacity: 0 }} animate={{ ...anim, opacity: [0, 0.28, 0.28, 0] }} transition={tr} />
      <motion.circle r={size} fill={color} initial={{ cx: x1, cy: y1, opacity: 0 }} animate={anim} transition={tr} />
    </>
  )
}

function DesktopDiagram({ reduced }) {
  const [active, setActive] = useState(null)
  const y = 150
  const h = 104

  return (
    <div className="w-full">
      <svg viewBox="0 0 1100 410" className="w-full h-auto" role="img" aria-label="Backhaul-Match system architecture">
        <defs>
          <pattern id="sysdots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#1E3A5F" />
          </pattern>
          {LINKS.map((l) => (
            <linearGradient key={l.from} id={`g-${l.from}`} gradientUnits="userSpaceOnUse" x1={byId(l.from).x} y1="0" x2={byId(l.to).x} y2="0">
              <stop offset="0" stopColor={byId(l.from).color} />
              <stop offset="1" stopColor={byId(l.to).color} />
            </linearGradient>
          ))}
        </defs>
        <rect width="1100" height="410" fill="url(#sysdots)" opacity="0.55" />

        {/* neutral layer bracket */}
        <rect x={byId('matching').x - 120} y="24" width="240" height="22" rx="11" fill={`${C.matching}22`} stroke={C.matching} strokeOpacity="0.6" />
        <text x={byId('matching').x} y="39" textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="600" letterSpacing="1.5" fill="#93C5FD">
          NEUTRAL MATCHING LAYER
        </text>

        {/* connections */}
        {LINKS.map((l) => {
          const a = byId(l.from)
          const b = byId(l.to)
          const hot = active === l.from || active === l.to
          const x1 = a.x + a.w / 2
          const x2 = b.x - b.w / 2
          return (
            <g key={l.from}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke={`url(#g-${l.from})`} strokeWidth={hot ? 3.5 : 2.5} strokeLinecap="round" opacity={hot ? 1 : 0.8} />
              <polygon points={`${x2},${y} ${x2 - 9},${y - 5.5} ${x2 - 9},${y + 5.5}`} fill={b.color} />
              {l.label.map((t, i) => (
                <text key={t} x={(x1 + x2) / 2} y={y + 24 + i * 12} textAnchor="middle" fontFamily={MONO} fontSize="10" fontWeight="600" letterSpacing="0.8" fill={a.color} opacity={hot ? 1 : 0.85}>
                  {t}
                </text>
              ))}
              <Particle x1={x1} y1={y} x2={x2 - 6} y2={y} duration={l.duration} color={a.color} reduced={reduced} />
              <Particle x1={x1} y1={y} x2={x2 - 6} y2={y} duration={l.duration} delay={l.duration / 2} color={b.color} reduced={reduced} size={3} />
            </g>
          )
        })}

        {/* microservices fanning out of the matching platform */}
        {SERVICES.map((s, i) => {
          const px = byId('matching').x + (i - (SERVICES.length - 1) / 2) * 118
          const py = 336
          const w = 108
          const hot = active === 'matching'
          return (
            <g key={s.label}>
              <path
                d={`M ${byId('matching').x} ${y + h / 2 + 4} C ${byId('matching').x} ${y + 120}, ${px} ${y + 120}, ${px} ${py - 14}`}
                fill="none"
                stroke={s.color}
                strokeWidth={hot ? 1.8 : 1.1}
                strokeOpacity={hot ? 0.9 : 0.45}
                strokeDasharray="4 4"
              >
                {!reduced && <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2.4s" repeatCount="indefinite" />}
              </path>
              <rect x={px - w / 2} y={py - 14} width={w} height="28" rx="14" fill={`${s.color}1F`} stroke={s.color} strokeOpacity={hot ? 1 : 0.7} />
              <circle cx={px - w / 2 + 14} cy={py} r="3" fill={s.color} />
              <text x={px + 5} y={py + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="9.5" fontWeight="600" letterSpacing="0.6" fill="#E2E8F0">
                {s.label}
              </text>
            </g>
          )
        })}
        <text x={byId('matching').x} y="392" textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="2" fill="#94A3B8">
          INDEPENDENT MICROSERVICES BEHIND THE PLATFORM
        </text>

        {/* nodes */}
        {NODES.map((n) => {
          const on = active === n.id
          const nh = n.id === 'matching' ? 120 : h
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={`${n.label}: ${n.description}`}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive((c) => (c === n.id ? null : c))}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive((c) => (c === n.id ? null : c))}
              onClick={() => setActive((c) => (c === n.id ? null : n.id))}
              style={{ cursor: 'pointer', outline: 'none' }}
            >
              <motion.g
                animate={{ scale: on ? 1.06 : 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${n.x}px ${y}px`, filter: on ? `drop-shadow(0 0 16px ${n.color}99)` : `drop-shadow(0 0 6px ${n.color}33)` }}
              >
                <rect x={n.x - n.w / 2} y={y - nh / 2} width={n.w} height={nh} rx="14" fill="#08121F" stroke={n.color} strokeWidth={on ? 2.2 : 1.5} />
                <rect x={n.x - n.w / 2} y={y - nh / 2} width={n.w} height={nh} rx="14" fill={n.color} opacity={on ? 0.2 : 0.11} />
                <circle cx={n.x - n.w / 2 + 14} cy={y - nh / 2 + 14} r="9" fill={n.color} />
                <text x={n.x - n.w / 2 + 14} y={y - nh / 2 + 18} textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="700" fill="#08121F">
                  {n.step}
                </text>
                <text x={n.x} y={y - nh / 2 + 42} textAnchor="middle" fontFamily={MONO} fontSize={n.label.length > 14 ? 11.5 : 12.5} fontWeight="700" letterSpacing="0.4" fill="#F8FAFC">
                  {n.label}
                </text>
                {n.sub.map((s, i) => (
                  <text key={s} x={n.x} y={y - nh / 2 + 62 + i * 14} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="0.6" fill={n.color}>
                    {s}
                  </text>
                ))}
              </motion.g>
            </g>
          )
        })}
      </svg>

      <div className="mt-4 min-h-[3.25rem] flex items-start">
        {active ? (
          <p className="text-sm md:text-base text-offwhite flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: byId(active).color }} />
            <span className="font-mono text-xs uppercase tracking-widest2" style={{ color: byId(active).color }}>
              {byId(active).label}
            </span>
            <span className="text-muted">{byId(active).description}</span>
          </p>
        ) : (
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted/70">
            Hover or tap a node to see what it does
          </p>
        )}
      </div>
    </div>
  )
}

function OsrmAndState({ reduced }) {
  const a = { x: 50, y: 82 }
  const b = { x: 430, y: 82 }
  const c1 = { x: 150, y: 20 }
  const c2 = { x: 250, y: 150 }
  const path = `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`
  // sample the bezier so the vehicle follows the route
  const pts = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12
    const u = 1 - t
    return [
      u ** 3 * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t ** 3 * b.x,
      u ** 3 * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t ** 3 * b.y,
    ]
  })

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-line rounded-2xl bg-panel/60 p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-cyan-300 mb-6">OSRM route calculation</p>
        <svg viewBox="0 0 480 170" className="w-full h-auto" role="img" aria-label="OSRM route calculation visualization">
          <defs>
            <linearGradient id="routeGrad" x1="0" x2="1">
              <stop offset="0" stopColor={C.courier} />
              <stop offset="0.5" stopColor={C.matching} />
              <stop offset="1" stopColor={C.fleet} />
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="#1E3A5F" strokeWidth="2" strokeDasharray="5 6" />
          <motion.path
            d={path}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
            transition={reduced ? {} : { duration: 6, repeat: Infinity, times: [0, 0.55, 0.9, 1], ease: 'easeInOut' }}
          />
          <circle cx={a.x} cy={a.y} r="9" fill="#08121F" stroke={C.courier} strokeWidth="3" />
          <circle cx={b.x} cy={b.y} r="9" fill="#08121F" stroke={C.fleet} strokeWidth="3" />
          <text x={a.x} y={a.y + 30} textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="600" letterSpacing="1" fill={C.courier}>PICKUP</text>
          <text x={b.x} y={b.y + 30} textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="600" letterSpacing="1" fill={C.fleet}>DELIVERY</text>
          {!reduced && (
            <motion.g
              initial={{ x: pts[0][0], y: pts[0][1], opacity: 1 }}
              animate={{
                x: [...pts.map((p) => p[0]), b.x, a.x],
                y: [...pts.map((p) => p[1]), b.y, a.y],
                opacity: [...pts.map(() => 1), 0, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
                times: [...pts.map((_, i) => (i / (pts.length - 1)) * 0.55), 0.9, 1],
              }}
            >
              <rect x="-11" y="-7" width="22" height="14" rx="4" fill={C.matching} />
              <circle cx="-6" cy="8" r="2.6" fill="#F8FAFC" />
              <circle cx="6" cy="8" r="2.6" fill="#F8FAFC" />
            </motion.g>
          )}
          <text x="240" y="160" textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="1.5" fill="#94A3B8">VEHICLE</text>
        </svg>

        <div className="relative h-6 mt-2">
          <motion.p
            className="absolute inset-0 font-mono text-xs uppercase tracking-widest2"
            style={{ color: C.courier }}
            animate={reduced ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
            transition={reduced ? {} : { duration: 6, repeat: Infinity, times: [0, 0.5, 0.58, 1] }}
          >
            ● Calculating route&hellip;
          </motion.p>
          <motion.p
            className="absolute inset-0 font-mono text-xs uppercase tracking-widest2"
            style={{ color: C.fleet }}
            animate={reduced ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }}
            transition={reduced ? {} : { duration: 6, repeat: Infinity, times: [0, 0.5, 0.58, 1] }}
          >
            ✓ Route compatible
          </motion.p>
        </div>
        <p className="font-mono text-[10px] text-muted/70 mt-3">
          Illustrative visualization of the project&rsquo;s route-matching logic — not live data.
        </p>
      </div>

      <div className="border border-line rounded-2xl bg-panel/60 p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-pink-300 mb-6">Matching engine — state sequence</p>
        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-line" />
          <ul className="space-y-5">
            {STATES.map((s, i) => (
              <li key={s.label} className="relative flex items-center">
                <motion.span
                  className="absolute -left-8 w-4 h-4 rounded-full border-2"
                  style={{ borderColor: s.color, background: '#08121F' }}
                  animate={reduced ? {} : { scale: [1, 1.35, 1], boxShadow: [`0 0 0 0 ${s.color}00`, `0 0 12px 2px ${s.color}AA`, `0 0 0 0 ${s.color}00`] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: (i * 7) / STATES.length }}
                />
                <motion.span
                  className="font-mono text-xs md:text-sm uppercase tracking-widest2"
                  style={{ color: s.color }}
                  animate={reduced ? { opacity: 0.9 } : { opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: (i * 7) / STATES.length }}
                >
                  <span className="opacity-60 mr-2">0{i + 1}</span>
                  {s.label}
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
    { label: 'COURIER', sub: 'Shipment & booking requests', color: C.courier },
    { label: 'API GATEWAY', sub: 'Central entry point for services', color: C.gateway },
    { label: 'MATCHING ENGINE', sub: 'Route-based vehicle matching', color: C.matching },
    { label: 'OSRM', sub: 'Route calculation', color: C.cyan },
    { label: 'FLEET', sub: 'Vehicle availability', color: C.fleet },
    { label: 'DRIVER', sub: 'Dispatch', color: C.driver },
  ]

  return (
    <div className="border border-line rounded-2xl bg-panel/60 p-5">
      <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-6">System flow</p>
      <div className="relative pl-12">
        {steps.map((s, i) => (
          <div key={s.label} className="relative pb-10 last:pb-0">
            <span
              className="absolute -left-12 top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-ink"
              style={{ background: s.color, boxShadow: `0 0 14px ${s.color}66` }}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <>
                <span className="absolute -left-[17px] top-9 bottom-[-4px] w-0.5" style={{ background: `linear-gradient(${s.color}, ${steps[i + 1].color})` }} />
                {!reduced && (
                  <motion.span
                    className="absolute -left-[21px] w-2.5 h-2.5 rounded-full"
                    style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }}
                    initial={{ top: '36px', opacity: 0 }}
                    animate={{ top: ['36px', '78px'], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: i * 0.35 }}
                  />
                )}
              </>
            )}
            <div className="rounded-xl border px-4 py-3" style={{ borderColor: `${s.color}88`, background: `${s.color}14` }}>
              <p className="font-mono text-sm font-semibold uppercase tracking-widest2" style={{ color: s.color }}>
                {s.label}
              </p>
              <p className="text-offwhite/80 text-sm mt-1">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {SERVICES.map((s) => (
          <span key={s.label} className="font-mono text-[10px] uppercase tracking-widest2 rounded-full px-3 py-1.5 border" style={{ color: s.color, borderColor: `${s.color}88`, background: `${s.color}14` }}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SystemArchitecture() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  return (
    <div className="w-full border border-line rounded-2xl bg-panel/40 p-5 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">Animated system architecture</p>
        <p className="hidden sm:block font-mono text-[10px] uppercase tracking-widest2 text-muted/60">
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
