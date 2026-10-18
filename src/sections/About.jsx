import { motion } from 'framer-motion'
import profile from '../data/profile'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'
import FocusList from '../components/FocusList'
import useReducedMotion from '../hooks/useReducedMotion'

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const headlineWord = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function AnimatedHeadline() {
  const reduced = useReducedMotion()
  const HeadingTag = reduced ? 'h2' : motion.h2
  const WordTag = reduced ? 'span' : motion.span

  return (
    <HeadingTag
      {...(!reduced && {
        variants: headlineContainer,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.4 },
      })}
      className="font-display text-display-lg text-offwhite text-balance"
    >
      {profile.aboutHeadline.map((line, li) => (
        <span key={li} className="block">
          {line.words.map((w, wi) => (
            <WordTag
              key={wi}
              {...(!reduced && { variants: headlineWord })}
              className="inline-block mr-[0.28em]"
            >
              {w}
            </WordTag>
          ))}
          {line.emphasisWords?.map((w, wi) => (
            <WordTag
              key={`e-${wi}`}
              {...(!reduced && { variants: headlineWord })}
              className="inline-block mr-[0.28em] text-accent"
            >
              {w}
            </WordTag>
          ))}
        </span>
      ))}
    </HeadingTag>
  )
}

export default function About() {
  return (
    <section id="about" className="max-w-content mx-auto px-6 md:px-12 py-28 md:py-40">
      <SectionLabel number="01" label="About" />

      {/* Who I am / how I think — the dominant editorial statement */}
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-6 relative">
          <AnimatedHeadline />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 h-px w-full max-w-[220px] origin-left bg-gradient-to-r from-accent via-accent/40 to-transparent"
          />
        </div>

        <div className="lg:col-span-5 lg:col-start-8 space-y-6">
          <Reveal as="p" className="text-offwhite text-lg leading-relaxed">
            {profile.aboutIntro}
          </Reveal>
          {profile.aboutParagraphs.map((para, i) => (
            <Reveal
              key={i}
              delay={0.06 + i * 0.06}
              as="p"
              className="text-muted leading-relaxed text-[15px] md:text-base"
            >
              {para}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Content priority — typography and spacing carry the hierarchy, not cards */}
      <div className="mt-24 md:mt-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted mb-10 md:mb-14">
            What I&rsquo;m focused on
          </p>
        </Reveal>
        <FocusList />
      </div>
    </section>
  )
}
