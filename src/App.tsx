import { Backdrop } from './components/Backdrop';
import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Nav, SectionRail } from './components/Nav';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Credentials } from './sections/Credentials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen w-full">
      <Backdrop />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <SectionRail />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
