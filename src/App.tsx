import AboutMe from './components/AboutMe.tsx'
import ContactMe from './components/ContactMe.tsx'
import Home from './components/Home.tsx'
import NavBar from './components/Navbar.tsx'
import Works from './components/Works.tsx'
import './styles/custom-3dot-color.css'

export default function App() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] blur-sm fixed z-[-1] bg-cover bg-center bg-[url('/assets/home_bg.gif')]"></div>
      <NavBar />
      <main
        id="main-content"
        className="w-[100vw] h-[100vh] overflow-x-hidden overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        <Home />
        <Works />
        <AboutMe />
        <ContactMe />
      </main>
    </>
  )
}
