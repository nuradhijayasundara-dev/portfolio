import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import AmbientField from './components/AmbientField'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Experience from './sections/Experience'
import Leadership from './sections/Leadership'
import Education from './sections/Education'
import Certifications from './sections/Certifications'
import Skills from './sections/Skills'
import Connect from './sections/Connect'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="no-overflow bg-ink min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-ink focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <AmbientField />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Leadership />
        <Education />
        <Certifications />
        <Skills />
        <Connect />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
