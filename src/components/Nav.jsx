import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Github, Linkedin } from 'lucide-react'
import profile from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'

const links = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership & Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { active, scrolled } = useActiveSection(links.map((l) => l.id))

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-premium ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-line/60' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-content mx-auto flex items-center justify-between px-6 md:px-12 h-20"
        aria-label="Primary"
      >
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 text-offwhite group"
          aria-label="Scroll to top"
        >
          <span className="w-9 h-9 border border-line rounded-full flex items-center justify-center font-display text-sm group-hover:border-accent transition-colors duration-300">
            {profile.initial}
          </span>
          <span className="hidden 2xl:inline text-sm tracking-wide text-muted group-hover:text-offwhite transition-colors duration-300">
            {profile.name}
          </span>
        </button>

        <ul className="hidden xl:flex items-center gap-8 font-mono text-xs uppercase tracking-widest2">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`relative py-2 whitespace-nowrap transition-colors duration-300 ${
                  active === link.id ? 'text-offwhite' : 'text-muted hover:text-offwhite'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-5 text-muted">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hover:text-accent transition-colors duration-300"
          >
            <Github size={18} strokeWidth={1.5} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-accent transition-colors duration-300"
          >
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
        </div>

        <button
          className="xl:hidden text-offwhite"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden bg-ink border-b border-line overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-6 gap-6 font-display text-2xl">
              {links.map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollTo(link.id)} className="text-offwhite">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6 px-6 pb-8 text-muted font-mono text-xs uppercase tracking-widest2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
