/**
 * AmbientField — a fixed, whole-page atmosphere layer: fine grain, a faint
 * technical grid, and a couple of very soft blue light pools.
 * Pure CSS/SVG, no JS cost, and it sits behind everything (z-index 0/1)
 * so it never interferes with layout or interaction.
 */
export default function AmbientField() {
  return (
    <div aria-hidden="true">
      <div className="grid-layer" />
      <div className="glow-ambient">
        <div
          className="absolute -top-40 left-[8%] w-[560px] h-[560px] rounded-full opacity-[0.16] blur-[140px] animate-drift"
          style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
        />
        <div
          className="absolute top-[38%] right-[4%] w-[480px] h-[480px] rounded-full opacity-[0.12] blur-[130px] animate-drift-slow"
          style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[6%] left-[22%] w-[420px] h-[420px] rounded-full opacity-[0.08] blur-[120px] animate-drift"
          style={{ background: 'radial-gradient(circle, #60A5FA, transparent 70%)' }}
        />
      </div>
      <div className="grain-layer" />
    </div>
  )
}
