import experience from '../data/experience'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'

export default function Experience() {
  return (
    <section id="experience" className="max-w-content mx-auto px-6 md:px-12 py-28 md:py-40">
      <SectionLabel number="03" label="Experience" />

      <Reveal as="h2" className="font-display text-display-lg text-offwhite mb-16 md:mb-24 text-balance">
        Where I&rsquo;ve
        <br />
        worked.
      </Reveal>

      <div>
        {experience.map((job) => (
          <div key={job.index} className="grid md:grid-cols-12 gap-6 md:gap-8 py-12 border-t border-line">
            <Reveal className="md:col-span-1">
              <span className="font-mono text-sm text-accent">{job.index}</span>
            </Reveal>

            <Reveal className="md:col-span-4">
              <h3 className="font-display text-2xl md:text-3xl text-offwhite">{job.company}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest2 text-muted">
                <span className="text-accent">{job.role}</span>
                <span>{job.period}</span>
                {job.location && <span>{job.location}</span>}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-7">
              {job.label && (
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-accent mb-3">
                  {job.label}
                </p>
              )}
              <p className="text-muted leading-relaxed mb-6">{job.summary}</p>

              {job.points && (
                <ul className="space-y-2 mb-6">
                  {job.points.map((point) => (
                    <li key={point} className="text-muted text-sm flex items-start gap-3">
                      <span className="mt-1.5 block w-1 h-1 rounded-full bg-accent shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {job.qualities && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                  {job.qualities.map((q) => (
                    <span key={q} className="font-mono text-xs uppercase tracking-widest2 text-offwhite/70 border border-line rounded-full px-3 py-1.5">
                      {q}
                    </span>
                  ))}
                </div>
              )}

              {job.technologies && (
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  Technologies used — {job.technologies}
                </p>
              )}
            </Reveal>
          </div>
        ))}
        <div className="hairline" />
      </div>
    </section>
  )
}
