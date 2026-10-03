import projects, { futureProjects } from '../data/projects'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'
import ProjectImmersive from '../components/ProjectImmersive'
import ProjectSplit from '../components/ProjectSplit'
import FutureProjects from '../components/FutureProjects'

export default function Work() {
  const [backhaul, airplane, farmhouse] = projects

  return (
    <section id="work" className="max-w-content mx-auto px-6 md:px-12 py-28 md:py-40">
      <SectionLabel number="02" label="Selected Work" />

      <Reveal as="h2" className="font-display text-display-lg text-offwhite mb-6 text-balance">
        Things I&rsquo;ve
        <br />
        built.
      </Reveal>

      <ProjectImmersive project={backhaul} />
      <ProjectSplit project={airplane} />
      <ProjectSplit project={farmhouse} />

      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted pt-16 md:pt-20">
          Upcoming
        </p>
        <FutureProjects projects={futureProjects} />
      </div>
    </section>
  )
}
