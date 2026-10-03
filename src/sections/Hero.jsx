import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import profile from '../data/profile'
import Reveal from '../components/Reveal'
import Portrait from '../components/Portrait'
import useReducedMotion from '../hooks/useReducedMotion'

const nameLines = profile.name.toUpperCase().split(' ')
const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('.')

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
}

const line = {
  hidden: { y: '100%' },
  show: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const heroTopRef = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroTopRef,
    offset: ['start start', 'end start'],
  })

  const nameY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const metaOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const portraitOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.45])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 36])
  const lineScale = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <section id="hero">
      <div
        ref={heroTopRef}
        className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 max-w-content mx-auto w-full"
      >
        {/* small floating technical metadata — identity + discipline */}
        <motion.div
          style={reduced ? undefined : { opacity: metaOpacity }}
          className="hidden sm:flex absolute top-24 left-6 md:left-12 flex-col gap-1.5 font-mono text-[10px] md:text-[11px] uppercase tracking-widest2 text-muted/70"
        >
          <span>
            {initials} <span className="text-accent/70">&mdash;</span> {profile.location.toUpperCase()}
          </span>
          <span className="text-muted/45">BSc (Hons) Computer Science</span>
        </motion.div>

        {/* vertical section marker, echoes the numbering used later in the page */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center font-mono text-[10px] uppercase tracking-widest2 text-muted/40"
        >
          00 &mdash; Introduction
        </motion.span>

        {/* thin decorative line between portrait and typography, extends on scroll */}
        <motion.span
          aria-hidden="true"
          style={reduced ? undefined : { scaleY: lineScale }}
          className="hidden lg:block absolute top-28 bottom-28 left-1/2 w-px origin-top pointer-events-none bg-gradient-to-b from-transparent via-accent/40 to-transparent"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-16">
          <div className="relative order-1 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:justify-self-start">
            <Portrait
              className="w-[62%] sm:w-[42%] max-w-[320px] mx-auto lg:w-auto lg:max-w-none lg:mx-0 lg:h-[58vh] lg:max-h-[600px] lg:min-h-[420px]"
              style={
                reduced
                  ? undefined
                  : { scale: portraitScale, opacity: portraitOpacity, y: portraitY }
              }
            />
          </div>

          <div className="relative z-10 order-2 lg:col-span-8 lg:col-start-5 lg:row-start-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-mono text-xs md:text-sm uppercase tracking-widest2 text-muted mb-6"
            >
              Hello, I&rsquo;m
            </motion.p>

            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              style={reduced ? undefined : { y: nameY }}
              className="font-display text-display-xl text-offwhite"
            >
              {nameLines.map((word, i) => (
                <span key={i} className="block w-fit overflow-hidden">
                  <motion.span variants={line} className="block">
                    {word}
                    {i === nameLines.length - 1 ? '.' : ''}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 font-mono text-xs md:text-sm uppercase tracking-widest2 text-muted"
            >
              <span>{profile.role}</span>
              <span className="text-accent">/</span>
              <span>{profile.roleSecondary}</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3 text-muted"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest2">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 pb-28 md:pb-40">
        <div className="hairline mb-16" />
        <div className="grid md:grid-cols-12 gap-8 md:gap-6">
          <Reveal className="md:col-span-7 lg:col-span-6">
            <p className="font-display text-display-md text-balance text-offwhite">
              {profile.heroStatement}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8 lg:col-start-8 flex flex-col justify-end">
            <ul className="space-y-3">
              {profile.heroFocusAreas.map((area) => (
                <li
                  key={area}
                  className="font-mono text-sm md:text-base tracking-wide text-muted border-b border-line/70 pb-3"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
