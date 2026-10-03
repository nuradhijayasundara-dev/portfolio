import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Reveal — a small, reusable scroll-reveal wrapper.
 * Keeps animation intentional and consistent instead of animating everything ad hoc.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  duration = 0.9,
  once = true,
  className = '',
  ...props
}) {
  const reduced = useReducedMotion()
  const Component = motion[as] || motion.div

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className} {...props}>
        {children}
      </Plain>
    )
  }

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}
