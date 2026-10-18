import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * ProjectShowcase — real interface screenshots in a browser-style frame, with a
 * tab per portal, a soft crossfade between them and a full-size lightbox.
 */
export default function ProjectShowcase({ screens, name = 'backhaul-match', heading = 'Interface — one portal per role' }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const current = screens[index]

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">{heading}</p>
        <div role="tablist" aria-label={`${name} screens`} className="flex flex-wrap gap-2">
          {screens.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`font-mono text-[11px] uppercase tracking-widest2 rounded-full px-3.5 py-1.5 border transition-colors duration-300 ${
                i === index
                  ? 'text-ink bg-accent border-accent'
                  : 'text-muted border-line hover:text-offwhite hover:border-accent/60'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative rounded-2xl border border-line bg-panel/70 overflow-hidden shadow-[0_30px_80px_-30px_rgba(37,99,235,0.35)]">
        {/* browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line bg-ink/70">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="flex-1 truncate text-center font-mono text-[11px] text-muted/80">
            {name} &middot; {current.title.toLowerCase()}
          </span>
          <button
            onClick={() => setOpen(true)}
            aria-label="View full size"
            className="text-muted hover:text-accent transition-colors"
          >
            <Maximize2 size={15} />
          </button>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label={`Enlarge screenshot: ${current.title}`}
          className={`relative block w-full aspect-[16/10] cursor-zoom-in group ${current.fit === "contain" ? "bg-white" : "bg-ink"}`}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current.id}
              src={current.src}
              alt={`${current.title} — ${current.caption}`}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full ${current.fit === "contain" ? "object-contain" : "object-cover object-top"}`}
              initial={reduced ? false : { opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-accent/40 transition-all duration-500" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="font-display text-xl md:text-2xl text-offwhite">{current.title}</p>
        <p className="text-muted text-sm md:text-base max-w-xl">{current.caption}</p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[80] bg-ink/92 backdrop-blur-sm overflow-auto p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="fixed top-5 right-5 z-[81] w-11 h-11 rounded-full border border-line bg-panel text-offwhite flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              <X size={18} />
            </button>
            <img
              src={current.src}
              alt={current.title}
              className="mx-auto max-w-full md:max-w-[1400px] rounded-xl border border-line"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-4 text-center text-muted text-sm">{current.title} &mdash; {current.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
