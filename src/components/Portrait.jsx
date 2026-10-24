import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Portrait — the hero photograph: a round, white-backed portrait that floats
 * on the dark page. It reveals slowly on load, drifts a few pixels with the
 * cursor and scales/fades gently as you scroll away (scroll values come from
 * the Hero via `style`).
 */
export default function Portrait({ className = '', style }) {
  const reduced = useReducedMotion()

  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const springX = useSpring(mvX, { stiffness: 55, damping: 20, mass: 0.6 })
  const springY = useSpring(mvY, { stiffness: 55, damping: 20, mass: 0.6 })

  const rotateX = useTransform(springY, [-1, 1], [3, -3])
  const rotateY = useTransform(springX, [-1, 1], [-4, 4])
  const shiftX = useTransform(springX, [-1, 1], [-10, 10])
  const shiftY = useTransform(springY, [-1, 1], [-8, 8])
  const glowX = useTransform(springX, [-1, 1], [14, -14])
  const glowY = useTransform(springY, [-1, 1], [10, -10])

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
      className={`relative select-none aspect-[900/1271] ${className}`}
      style={style}
      initial={reduced ? false : { opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      {/* soft blue glow behind the portrait, moving slightly against the cursor */}
      <motion.div
        className="absolute -inset-10 -z-10 rounded-3xl blur-[70px]"
        style={{
          x: reduced ? 0 : glowX,
          y: reduced ? 0 : glowY,
          background:
            'radial-gradient(circle at 40% 35%, rgba(37,99,235,0.5), transparent 62%), radial-gradient(circle at 75% 80%, rgba(96,165,250,0.3), transparent 65%)',
        }}
      />

      {/* fine ring that sits just outside the photo */}
      <div
        className="absolute -inset-2 rounded-[1.6rem] border border-accent/40"
        style={{ boxShadow: '0 0 40px -6px rgba(59,130,246,0.5)' }}
      />

      <motion.div
        style={reduced ? undefined : { x: shiftX, y: shiftY, rotateX, rotateY, transformPerspective: 1400 }}
        className="relative w-full h-full"
      >
        <img
          src="/images/portrait-rect.webp"
          alt="Portrait of Wiyathma Anuradhi Jayasundara"
          width={900}
          height={1271}
          loading="eager"
          fetchpriority="high"
          decoding="async"
          className="w-full h-full object-cover rounded-2xl"
        />
      </motion.div>
    </motion.div>
  )
}
