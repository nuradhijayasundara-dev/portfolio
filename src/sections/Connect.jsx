import { ArrowUpRight } from 'lucide-react'
import profile from '../data/profile'
import Reveal from '../components/Reveal'

export default function Connect() {
  return (
    <section className="max-w-content mx-auto px-6 md:px-12 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-16 md:gap-10">
        <Reveal>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="group block"
          >
            <h3 className="font-display text-display-md text-offwhite text-balance leading-[0.95]">
              Code
              <br />
              is where
              <br />
              the ideas
              <br />
              live.
            </h3>
            <p className="text-muted mt-8 mb-6 max-w-sm">
              Explore my projects, experiments, and development work.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-offwhite border-b border-offwhite/40 pb-1 group-hover:border-accent group-hover:text-accent transition-colors duration-300">
              View GitHub
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="group block"
          >
            <h3 className="font-display text-display-md text-offwhite text-balance leading-[0.95]">
              Connect.
            </h3>
            <p className="text-muted mt-8 mb-6 max-w-sm">
              If you&rsquo;d like to connect professionally.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-offwhite border-b border-offwhite/40 pb-1 group-hover:border-accent group-hover:text-accent transition-colors duration-300">
              LinkedIn
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
