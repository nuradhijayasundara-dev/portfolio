import { Github } from 'lucide-react'
import Reveal from './Reveal'

export default function ProjectSplit({ project }) {
  return (
    <article className="py-20 md:py-28 border-b border-line grid md:grid-cols-12 gap-10 md:gap-6">
      <div className="md:col-span-4">
        <span className="font-mono text-sm text-accent block mb-2">{project.index}</span>
        <span className="font-mono text-xs uppercase tracking-widest2 text-muted">
          {project.tags.join(' / ')}
        </span>
        <Reveal as="h3" className="font-display text-3xl md:text-4xl text-offwhite mt-6">
          {project.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Reveal>
      </div>

      <div className="md:col-span-7 md:col-start-6">
        <Reveal as="p" className="text-muted leading-relaxed text-base md:text-lg mb-8">
          {project.description}
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
          {project.technologies.map((tech) => (
            <span key={tech} className="font-mono text-xs uppercase tracking-widest2 text-offwhite/70 border border-line rounded-full px-3 py-1.5">
              {tech}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-2">Features</p>
          <ul className="space-y-2">
            {project.features.map((f) => (
              <li key={f} className="text-muted text-sm">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        {project.github && (
          <Reveal delay={0.25} className="mt-8">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-muted border-b border-line pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
            >
              GitHub <Github size={14} />
            </a>
          </Reveal>
        )}
      </div>
    </article>
  )
}
