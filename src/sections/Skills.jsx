import skills from '../data/skills'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'

export default function Skills() {
  return (
    <section id="toolkit" className="max-w-content mx-auto px-6 md:px-12 py-28 md:py-40">
      <SectionLabel number="07" label="Toolkit" />

      <Reveal as="h2" className="font-display text-display-lg text-offwhite mb-16 md:mb-24 text-balance">
        I work with
      </Reveal>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.06} className="border-t border-line pt-6">
            <p className="font-mono text-xs uppercase tracking-widest2 text-accent mb-4">
              {group.category}
            </p>
            <p className="font-display text-xl md:text-2xl text-offwhite/85 leading-snug text-balance">
              {group.items.join(', ')}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
