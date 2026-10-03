import Reveal from './Reveal'

export default function SectionLabel({ number, label, id }) {
  return (
    <Reveal
      as="div"
      className="flex items-center gap-4 mb-10 md:mb-16"
      aria-hidden="false"
    >
      <span className="font-mono text-xs md:text-sm text-accent tracking-widest2">{number}</span>
      <span className="hairline flex-1 max-w-[60px]" />
      <span className="font-mono text-xs md:text-sm text-muted uppercase tracking-widest2">
        {label}
      </span>
    </Reveal>
  )
}
