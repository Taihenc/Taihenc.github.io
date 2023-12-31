import AboutMe from './components/AboutMe.tsx'
import Home from './components/Home.tsx'
import NavBar from './components/Navbar.tsx'
import './styles/custom-3dot-color.css'

export default function App() {
  return (
    <>
      <NavBar />
      <Home />
      <AboutMe />
    </>
  )
}