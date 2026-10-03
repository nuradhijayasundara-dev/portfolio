import { ArrowUp } from 'lucide-react'
import profile from '../data/profile'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-12 py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div>
          <p className="font-display text-xl text-offwhite">{profile.name}</p>
          <p className="text-muted text-sm mt-2">
            Computer Science (Hons) · University of Sri Jayewardenepura
          </p>
        </div>

        <nav className="flex gap-8 font-mono text-xs uppercase tracking-widest2 text-muted" aria-label="Footer">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">
            Email
          </a>
        </nav>

        <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
          <span className="text-muted text-xs font-mono">© {year}</span>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest2 text-muted hover:text-accent transition-colors duration-300"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
