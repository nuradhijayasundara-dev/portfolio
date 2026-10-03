import education from '../data/education'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'

export default function Education() {
  return (
    <section id="education" className="max-w-content mx-auto px-6 md:px-12 py-28 md:py-40">
      <SectionLabel number="05" label="Education" />

      <Reveal as="h2" className="font-display text-display-lg text-offwhite text-balance">
        BSc (Hons)
        <br />
        in Computer Science
      </Reveal>

      <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-4">
        <span className="font-display text-xl md:text-2xl text-muted">{education.institution}</span>
        <span className="font-mono text-xs uppercase tracking-widest2 text-accent border border-accent/30 rounded-full px-3 py-1.5">
          {education.status}
        </span>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-10 mt-20 pt-10 border-t border-line">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-3">Timeline</p>
          <p className="text-offwhite">
            {education.startYear} — {education.expectedGraduation}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-3">
            Relevant coursework
          </p>
          <ul className="space-y-1.5">
            {education.coursework.map((c) => (
              <li key={c} className="text-muted text-sm">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-3">
            Academic achievements
          </p>
          <ul className="space-y-1.5">
            {education.achievements.map((a) => (
              <li key={a} className="text-muted text-sm">
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
