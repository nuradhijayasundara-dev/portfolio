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

      <div className="grid md:grid-cols-12 gap-10 mt-20 pt-10 border-t border-line">
        <Reveal className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-3">Timeline</p>
          <p className="font-display text-3xl md:text-4xl text-offwhite">
            {education.startYear}
            <span className="text-accent mx-3">&mdash;</span>
            {education.expectedGraduation}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-3">
            Academic achievements
          </p>
          <ul className="space-y-3">
            {education.achievements.map((a) => (
              <li key={a} className="font-display text-xl md:text-2xl text-offwhite/90 leading-snug flex gap-4">
                <span className="mt-3 block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-20 pt-10 border-t border-line">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-10">
            Earlier education
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {education.schooling.map((s, i) => (
            <Reveal key={s.level} delay={i * 0.1} className="border-l border-accent/40 pl-6">
              <p className="font-mono text-xs uppercase tracking-widest2 text-accent mb-3">{s.level}</p>
              <p className="font-display text-2xl md:text-3xl text-offwhite leading-snug">{s.school}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
