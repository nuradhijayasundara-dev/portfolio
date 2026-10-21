import { ArrowUpRight, Github } from 'lucide-react'
import Reveal from './Reveal'
import SystemArchitecture from './SystemArchitecture'
import ProjectShowcase from './ProjectShowcase'

const STEP_COLORS = ['#F59E0B', '#A78BFA', '#3B82F6', '#10B981', '#F472B6']

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

      {project.howItWorks && (
        <div className="mb-16">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-8">How it works</p>
          </Reveal>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8">
            {project.howItWorks.map((step, i) => {
              const color = STEP_COLORS[i % STEP_COLORS.length]
              return (
                <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-ink shrink-0"
                      style={{ background: color, boxShadow: `0 0 14px ${color}66` }}
                    >
                      {i + 1}
                    </span>
                    <span className="hidden lg:block h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  </div>
                  <p className="font-display text-xl text-offwhite mb-2">{step.title}</p>
                  <p className="text-muted text-sm leading-relaxed">{step.text}</p>
                </Reveal>
              )
            })}
          </ol>
        </div>
      )}

      {project.advantages && (
        <div className="mb-16">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-8">Why it helps</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 border-t border-line pt-8">
            {project.advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06} className="flex gap-4">
                <span
                  className="mt-2 w-2 h-2 rounded-full shrink-0"
                  style={{ background: STEP_COLORS[i % STEP_COLORS.length], boxShadow: `0 0 10px ${STEP_COLORS[i % STEP_COLORS.length]}` }}
                />
                <div>
                  <p className="font-display text-xl text-offwhite mb-1">{a.title}</p>
                  <p className="text-muted text-sm md:text-base leading-relaxed">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {project.architecture && (
        <Reveal className="mb-16">
          <SystemArchitecture />
        </Reveal>
      )}

      {project.screens && (
        <Reveal className="mb-16">
          <ProjectShowcase screens={project.screens} />
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
