import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import profile from '../data/profile'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'

export default function Contact() {
  return (
    <section id="contact" className="max-w-content mx-auto px-6 md:px-12 py-28 md:py-40">
      <SectionLabel number="07" label="Contact" />

      <Reveal as="h2" className="font-display text-display-xl text-offwhite text-balance leading-[0.92]">
        Let&rsquo;s build
        <br />
        something
        <br />
        meaningful.
      </Reveal>

      <div className="grid md:grid-cols-12 gap-10 mt-16 md:mt-24">
        <Reveal delay={0.1} className="md:col-span-6">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted mb-3">Email</p>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            className="inline-flex items-center gap-3 font-display text-xl md:text-3xl text-offwhite hover:text-accent transition-colors duration-300"
          >
            {profile.email}
            <Mail size={20} strokeWidth={1.5} />
          </a>
        </Reveal>

        <div className="md:col-span-6 flex flex-col gap-6">
          <Reveal delay={0.15}>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest2 text-muted hover:text-accent transition-colors duration-300"
            >
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest2 text-muted hover:text-accent transition-colors duration-300"
            >
              <Github size={16} /> GitHub <ArrowUpRight size={14} />
            </a>
          </Reveal>
          <Reveal delay={0.25}>
            <a
              href={profile.cvUrl}
              download
              data-cursor="link"
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest2 text-offwhite border-b border-offwhite/40 pb-1 w-fit hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Download CV <Download size={14} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
