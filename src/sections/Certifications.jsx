import { ArrowUpRight } from 'lucide-react'
import certifications from '../data/certifications'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'

export default function Certifications() {
  return (
    <section id="certifications" className="max-w-content mx-auto px-6 md:px-12 py-28 md:py-40">
      <SectionLabel number="06" label="Certifications & Licenses" />

      <Reveal as="h2" className="font-display text-display-lg text-offwhite mb-16 md:mb-24 text-balance">
        Verified
        <br />
        credentials.
      </Reveal>

      <div>
        {certifications.map((cert) => (
          <div key={cert.index} className="grid md:grid-cols-12 gap-6 md:gap-8 py-10 border-t border-line">
            <Reveal className="md:col-span-1">
              <span className="font-mono text-sm text-accent">{cert.index}</span>
            </Reveal>

            <Reveal delay={0.05} className="md:col-span-2">
              {cert.badge && (
                <a
                  href={cert.credentialUrl || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  aria-label={`View credential: ${cert.title}`}
                  className="group inline-block rounded-xl transition-transform duration-500 ease-premium hover:-translate-y-1.5 hover:rotate-[-2deg]"
                >
                  <img
                    src={cert.badge}
                    alt={cert.title}
                    width={92}
                    height={98}
                    loading="lazy"
                    decoding="async"
                    className="w-20 md:w-[92px] h-auto drop-shadow-[0_10px_22px_rgba(37,99,235,0.35)] transition-[filter] duration-500 group-hover:drop-shadow-[0_14px_28px_rgba(96,165,250,0.6)]"
                  />
                </a>
              )}
            </Reveal>

            <Reveal className="md:col-span-6">
              <h3 className="font-display text-xl md:text-2xl text-offwhite text-balance">{cert.title}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest2 text-muted">
                <span className="text-accent">{cert.issuer}</span>
                <span>{cert.issued}</span>
                <span className="text-[11px] text-accent border border-accent/30 rounded-full px-3 py-1">
                  AWS Academy
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-3 flex items-start md:justify-end">
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-offwhite border-b border-offwhite/40 pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  View credential <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="font-mono text-xs uppercase tracking-widest2 text-muted">Training badge</span>
              )}
            </Reveal>
          </div>
        ))}
        <div className="hairline" />
      </div>
    </section>
  )
}
