import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Portrait — a cinematic, editorial treatment of the hero photograph.
 * No frame, no card, no circle: the studio backdrop is pushed down into the
 * page's own dark navy via a matched vignette, then the silhouette's edge is
 * lifted back out with a restrained blue rim light and a soft mask, so
 * the photo dissolves into the atmosphere rather than sitting in a box.
 * The base image keeps its natural colour — a light editorial grade adds
 * warmth on the face and cool blue ambient light only at the outer edges.
 * A few degrees of mouse-driven parallax add depth without calling attention
 * to itself.
 */
export default function Portrait({ className = '', style }) {
  const reduced = useReducedMotion()
  const wrapRef = useRef(null)

  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const springX = useSpring(mvX, { stiffness: 55, damping: 20, mass: 0.6 })
  const springY = useSpring(mvY, { stiffness: 55, damping: 20, mass: 0.6 })

  const rotateX = useTransform(springY, [-1, 1], [2, -2])
  const rotateY = useTransform(springX, [-1, 1], [-2.5, 2.5])
  const shiftX = useTransform(springX, [-1, 1], [-9, 9])
  const shiftY = useTransform(springY, [-1, 1], [-7, 7])

  useEffect(() => {
    if (reduced) return undefined
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFine) return undefined

    const onMove = (e) => {
      mvX.set((e.clientX / window.innerWidth) * 2 - 1)
      mvY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, mvX, mvY])

  return (
    <motion.div
      ref={wrapRef}
      className={`relative select-none aspect-[1106/1422] ${className}`}
      style={style}
      initial={reduced ? false : { opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      {/* soft blue glow behind the portrait — free to bloom past its edges */}
      <div
        className="absolute -inset-x-14 -inset-y-16 -z-10 blur-[90px]"
        style={{
          background:
            'radial-gradient(45% 55% at 48% 32%, rgba(37,99,235,0.32), transparent 70%),' +
            'radial-gradient(38% 42% at 72% 68%, rgba(96,165,250,0.16), transparent 75%)',
        }}
      />

      {/* the photo itself, masked so its rectangular edges dissolve into the page */}
      <div className="absolute inset-0 fade-edges isolate">
        <motion.div
          style={reduced ? undefined : { x: shiftX, y: shiftY, rotateX, rotateY, transformPerspective: 1400 }}
          className="relative w-full h-full"
        >
          <img
            src="/images/portrait.webp"
            alt="Portrait of Wiyathma Anuradhi Jayasundara"
            width={1106}
            height={1422}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ filter: 'contrast(1.08) saturate(1.16) brightness(1.03) sepia(0.06)' }}
          />

          {/* push the bright studio backdrop down into the page's own navy, sparing the face */}
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                'radial-gradient(52% 48% at 50% 36%, transparent 0%, transparent 40%, rgba(5,11,20,0.42) 68%, rgba(5,11,20,0.88) 100%)',
            }}
          />

          {/* a gentle warm glow on the face — natural highlight, not a colour filter */}
          <div
            className="absolute inset-0 mix-blend-soft-light opacity-[0.22]"
            style={{
              background: 'radial-gradient(42% 38% at 48% 34%, rgba(255,214,170,0.55), transparent 72%)',
            }}
          />

          {/* rim light — restrained blue ambient glow, kept to the outer edges only */}
          <div
            className="absolute inset-0 mix-blend-color-dodge opacity-[0.18]"
            style={{
              background:
                'linear-gradient(120deg, rgba(59,130,246,0.6) 0%, transparent 30%, transparent 70%, rgba(96,165,250,0.45) 100%)',
              WebkitMaskImage: 'radial-gradient(closest-side, transparent 52%, black 100%)',
              maskImage: 'radial-gradient(closest-side, transparent 52%, black 100%)',
            }}
          />

          {/* a whisper of deep blue low in the frame, well below the face */}
          <div
            className="absolute inset-x-0 bottom-0 h-[36%] mix-blend-soft-light opacity-[0.12]"
            style={{ background: 'linear-gradient(to top, rgba(37,99,235,0.5), transparent)' }}
          />

          {/* grain, matched to the page-level texture */}
          <div
            className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '140px 140px',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
