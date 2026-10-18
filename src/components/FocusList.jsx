import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import profile from '../data/profile'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * FocusList — "What I'm focused on" as a living vertical system: a spine that
 * fills with light as you scroll, nodes that switch on one by one, rows that
 * draw their divider and slide in, and a hover state that sweeps colour
 * across the row. Hierarchy is carried by type size, not cards.
 */

const COLORS = ['#22D3EE', '#3B82F6', '#A78BFA', '#10B981', '#F59E0B']
const ease = [0.16, 1, 0.3, 1]

export default function FocusList() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 })
  const dotTop = useTransform(progress, [0, 1], ['0%', '100%'])

  const items = profile.focusHierarchy

  return (
    <div ref={ref} className="relative pl-9 md:pl-14">
      {/* spine */}
      <div className="absolute left-[11px] md:left-[15px] top-3 bottom-3 w-px bg-line" />
      {!reduced && (
        <>
          <motion.div
            className="absolute left-[11px] md:left-[15px] top-3 bottom-3 w-px origin-top"
            style={{
              scaleY: progress,
              background: 'linear-gradient(to bottom, #22D3EE, #3B82F6, #A78BFA, #10B981, #F59E0B)',
            }}
          />
          <div className="absolute left-0 top-3 bottom-3 w-6 md:w-8 pointer-events-none">
            <motion.span
              className="absolute left-[3px] md:left-[7px] w-[17px] h-[17px] -ml-px rounded-full"
              style={{
                top: dotTop,
                translateY: '-50%',
                background: 'radial-gradient(circle, #fff 0%, #60A5FA 40%, transparent 70%)',
                boxShadow: '0 0 18px 4px rgba(96,165,250,0.55)',
              }}
            />
          </div>
        </>
      )}

      <ul>
        {items.map((item, i) => {
          const color = COLORS[i % COLORS.length]
          const size = {
            fontSize: `clamp(${1.15 + (4 - i) * 0.12}rem, ${2.4 + (4 - i) * 0.5}vw, ${1.5 + (4 - i) * 0.4}rem)`,
          }

          const Row = reduced ? 'li' : motion.li
          const rowMotion = reduced
            ? {}
            : {
                initial: 'hidden',
                whileInView: 'show',
                viewport: { once: true, amount: 0.6 },
              }

          return (
            <Row key={item.index} {...rowMotion} className="group relative py-6 md:py-8 cursor-default">
              {/* divider that draws itself */}
              <motion.span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-px origin-left bg-line"
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease, delay: 0.05 } } }}
              />
              {/* hover colour sweep */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-9 md:-left-14 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(90deg, ${color}22, transparent 70%)` }}
              />

              {/* node on the spine */}
              <motion.span
                aria-hidden="true"
                className="absolute -left-9 md:-left-14 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center"
                variants={{
                  hidden: { scale: 0.4, opacity: 0.3 },
                  show: { scale: 1, opacity: 1, transition: { duration: 0.7, ease, delay: 0.2 } },
                }}
              >
                <span
                  className="relative block w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-150"
                  style={{ borderColor: color, background: '#050B14', boxShadow: `0 0 12px ${color}88` }}
                />
              </motion.span>

              <div className="relative flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <motion.span
                  className="font-mono text-xs w-8 shrink-0"
                  style={{ color }}
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.25, duration: 0.6 } } }}
                >
                  {item.index}
                </motion.span>
                <motion.span
                  className="font-display text-offwhite shrink-0 transition-all duration-500 ease-premium group-hover:translate-x-2"
                  style={{ ...size, opacity: 1 - i * 0.06 }}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1 - i * 0.06, x: 0, transition: { duration: 0.8, ease, delay: 0.15 } },
                  }}
                >
                  <span className="bg-clip-text transition-colors duration-500 group-hover:text-transparent" style={{ backgroundImage: `linear-gradient(90deg, #F8FAFC, ${color})` }}>
                    {item.label}
                  </span>
                </motion.span>
                <motion.span
                  className="text-muted text-sm md:text-base flex-1 min-w-[200px] transition-colors duration-500 group-hover:text-offwhite/90"
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.35 } } }}
                >
                  {item.description}
                </motion.span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="hidden md:block -translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                  style={{ color }}
                />
              </div>
            </Row>
          )
        })}
      </ul>
      <div className="hairline" />
    </div>
  )
}
