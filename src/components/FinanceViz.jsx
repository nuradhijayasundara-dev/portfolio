import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * FinanceViz — a small animated illustration of the dashboard the Personal
 * Finance Tracker is being built around: spending by category (doughnut) and
 * income vs expenses by month (bars). Sample shapes only, not real data.
 */

const CATS = [
  { label: 'Housing', frac: 0.34, color: '#3B82F6' },
  { label: 'Food', frac: 0.26, color: '#10B981' },
  { label: 'Transport', frac: 0.22, color: '#F59E0B' },
  { label: 'Leisure', frac: 0.18, color: '#F472B6' },
]

const MONTHS = [
  { m: 'JAN', inc: 62, exp: 44 },
  { m: 'FEB', inc: 58, exp: 50 },
  { m: 'MAR', inc: 70, exp: 46 },
  { m: 'APR', inc: 66, exp: 58 },
  { m: 'MAY', inc: 78, exp: 52 },
  { m: 'JUN', inc: 74, exp: 48 },
]

const R = 54
const CIRC = 2 * Math.PI * R
const MONO = 'JetBrains Mono, monospace'

export default function FinanceViz() {
  const reduced = useReducedMotion()
  let offset = 0

  return (
    <div className="border border-line rounded-2xl bg-panel/50 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">Dashboard preview</p>
        <p className="font-mono text-[10px] text-muted/60">Illustrative · sample shapes</p>
      </div>

      <svg viewBox="0 0 480 190" className="w-full h-auto" role="img" aria-label="Illustration of a spending by category doughnut chart and an income versus expenses bar chart">
        {/* doughnut */}
        <g transform="translate(86 92)">
          <circle r={R} fill="none" stroke="#10243D" strokeWidth="20" />
          {CATS.map((c, i) => {
            const len = c.frac * CIRC - 3
            const rot = -90 + (offset / CIRC) * 360
            offset += c.frac * CIRC
            return (
              <motion.circle
                key={c.label}
                r={R}
                fill="none"
                stroke={c.color}
                strokeWidth="20"
                transform={`rotate(${rot})`}
                initial={{ strokeDasharray: reduced ? `${len} ${CIRC}` : `0 ${CIRC}` }}
                whileInView={{ strokeDasharray: `${len} ${CIRC}` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.1, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              />
            )
          })}
          <text textAnchor="middle" y="-2" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="#94A3B8">SPENDING</text>
          <text textAnchor="middle" y="12" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="#94A3B8">BY CATEGORY</text>
        </g>

        {/* bars */}
        <g transform="translate(200 20)">
          {[0, 1, 2, 3].map((g) => (
            <line key={g} x1="0" x2="270" y1={30 + g * 34} y2={30 + g * 34} stroke="#10243D" strokeWidth="1" />
          ))}
          {MONTHS.map((d, i) => {
            const x = 8 + i * 44
            return (
              <g key={d.m}>
                <motion.rect
                  x={x}
                  y={132 - d.inc * 1.5}
                  width="14"
                  height={d.inc * 1.5}
                  rx="3"
                  fill="#10B981"
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                  initial={{ scaleY: reduced ? 1 : 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.rect
                  x={x + 17}
                  y={132 - d.exp * 1.5}
                  width="14"
                  height={d.exp * 1.5}
                  rx="3"
                  fill="#F43F5E"
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                  initial={{ scaleY: reduced ? 1 : 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: 0.38 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
                <text x={x + 15} y="150" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#94A3B8">
                  {d.m}
                </text>
              </g>
            )
          })}
          {!reduced && (
            <motion.circle
              r="4"
              fill="#3B82F6"
              initial={{ cx: 8, cy: 136, opacity: 0 }}
              animate={{ cx: [8, 270], cy: [136, 136], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </g>
      </svg>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
        {CATS.map((c) => (
          <span key={c.label} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-muted">
            <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
            {c.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-muted">
          <span className="w-2 h-2 rounded-sm bg-emerald-500" /> Income
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-muted">
          <span className="w-2 h-2 rounded-sm bg-rose-500" /> Expenses
        </span>
      </div>
    </div>
  )
}
