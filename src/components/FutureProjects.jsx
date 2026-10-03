import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Github } from 'lucide-react'

export default function FutureProjects({ projects }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="py-16 md:py-20">
      {projects.map((project) => {
        const isOpen = openId === project.index
        return (
          <div key={project.index} className="border-b border-line">
            <button
              onClick={() => setOpenId(isOpen ? null : project.index)}
              className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
              aria-expanded={isOpen}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-sm text-muted">{project.index}</span>
                <span className="font-display text-2xl md:text-4xl text-offwhite/70 group-hover:text-offwhite transition-colors duration-300">
                  {project.name}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-muted hidden sm:inline">{project.year}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-accent"
                >
                  <Plus size={18} />
                </motion.span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 md:pl-16 grid md:grid-cols-2 gap-6">
                    <p className="text-muted text-sm leading-relaxed">{project.description}</p>
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((t) => (
                          <span key={t} className="font-mono text-[11px] uppercase tracking-widest2 text-muted border border-line rounded-full px-3 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-muted hover:text-accent transition-colors"
                      >
                        GitHub <Github size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
