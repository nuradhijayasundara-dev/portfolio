import { ArrowUpRight, Github } from 'lucide-react'
import Reveal from './Reveal'
import SystemArchitecture from './SystemArchitecture'

export default function ProjectImmersive({ project }) {
  return (
    <article className="py-20 md:py-32 border-b border-line">
      <div className="flex items-baseline gap-4 mb-8">
        <span className="font-mono text-sm text-accent">{project.index}</span>
        <span className="font-mono text-xs uppercase tracking-widest2 text-muted">
          {project.tags.join(' / ')}
        </span>
      </div>

      <Reveal as="h3" className="font-display text-display-lg text-offwhite mb-10">
        {project.title.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Reveal>

      <div className="grid md:grid-cols-12 gap-10 md:gap-6 mb-16">
        <Reveal as="p" className="md:col-span-7 text-lg md:text-xl text-muted leading-relaxed">
          {project.description}
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-accent mb-3">Problem</p>
          <p className="text-muted leading-relaxed">{project.problem}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-accent mb-3">Solution</p>
          <p className="text-muted leading-relaxed">{project.solution}</p>
        </Reveal>
      </div>

      {project.architecture && (
        <Reveal className="mb-16">
          <SystemArchitecture />
        </Reveal>
      )}

      <Reveal className="mb-16">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-5">Technologies</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="font-display text-base md:text-xl text-offwhite/80">
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="mb-16">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-5">
          Technical features
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {project.features.map((feature) => (
            <li key={feature} className="text-muted text-sm flex items-start gap-3">
              <span className="text-accent mt-1.5 block w-1 h-1 rounded-full bg-accent shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="flex flex-wrap gap-6 md:gap-10">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-offwhite border-b border-offwhite/40 pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            View project <ArrowUpRight size={14} />
          </a>
        )}
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
    </article>
  )
}
