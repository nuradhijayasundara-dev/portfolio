import leadership from '../data/leadership'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'

export default function Leadership() {
  const [aurora, ieee, nexus] = leadership

  return (
    <section id="leadership" className="max-w-content mx-auto px-6 md:px-12 py-28 md:py-40">
      <SectionLabel number="04" label="Leadership & Achievements" />

      <Reveal as="h2" className="font-display text-display-lg text-offwhite mb-16 md:mb-24 text-balance">
        Beyond
        <br />
        the code.
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <Reveal className="border border-line rounded-2xl p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest2 text-accent mb-4">{aurora.role}</p>
          <h3 className="font-display text-3xl md:text-4xl text-offwhite mb-2">{aurora.org}</h3>
          <p className="text-muted text-sm mb-6">{aurora.eventType}</p>

          <div className="hairline mb-6" />

          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-2">Conducted by</p>
          <p className="font-display text-xl text-offwhite mb-1">{aurora.organizer}</p>
          <p className="text-muted text-sm mb-6">{aurora.institution}</p>

          <div className="flex flex-wrap gap-2">
            {aurora.focus.map((f) => (
              <span key={f} className="font-mono text-[11px] uppercase tracking-widest2 text-muted border border-line rounded-full px-3 py-1.5">
                {f}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="border border-line rounded-2xl p-8 md:p-10 flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-accent mb-4">{ieee.role}</p>
          <h3 className="font-display text-2xl text-offwhite mb-2">{ieee.org}</h3>
          <p className="text-muted text-sm">{ieee.description}</p>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2 border border-line rounded-2xl p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest2 text-accent mb-4">{nexus.role}</p>
          <h3 className="font-display text-2xl text-offwhite mb-2">{nexus.org}</h3>
          <p className="text-muted text-sm mb-6">{nexus.institution}</p>

          <div className="hairline mb-6" />

          <p className="text-muted text-sm md:text-base leading-relaxed max-w-3xl mb-5">{nexus.description}</p>

          <div className="flex flex-wrap gap-2">
            {nexus.focus.map((f) => (
              <span key={f} className="font-mono text-[11px] uppercase tracking-widest2 text-muted border border-line rounded-full px-3 py-1.5">
                {f}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
