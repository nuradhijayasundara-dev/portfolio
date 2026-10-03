import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(isFine && !reduced)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return undefined

    document.body.classList.add('cursor-active')

    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2
    let dotX = ringX
    let dotY = ringY
    let raf

    const onMove = (e) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const loop = () => {
      ringX += (dotX - ringX) * 0.18
      ringY += (dotY - ringY) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      setExpanded(!!e.target.closest('a, button, [data-cursor="link"]'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('cursor-active')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-accent/60 transition-[width,height,opacity] duration-300 ease-premium ${
          expanded ? 'w-14 h-14 opacity-100' : 'w-8 h-8 opacity-70'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
