import Keyboard from "./Keyboard"
import NavBar from "./Navbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TypingEffect from "./TypingEffect"

export default function Home() {
  return (
    <>
      {/* <div role="alert" className="absolute z-10 max-w-fit right-0 top-0 m-10 alert alert-warning animate-pulse duration-75">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Warning: This website is under development!
          <span className="absolute top-[1.75em] right-0 text-xs font-bold">Dec 8, 2023, by <span className="text-red-900">Taihenc</span></span>
        </span>
      </div> */}
      <div className="absolute bg-cover bg-center bg-[url('/assets/home_bg.gif')] w-[100vw] h-[100vh] overflow-hidden"></div>
      <div className="w-[100vw] h-[100vh] backdrop-blur-sm">
        <NavBar />
        <div className="w-[100vw] h-[100vh] flex items-center justify-center ">
          <div className="mockup-code h-[70vh] bg-opacity-60 max-w-[90%]">
            <TypingEffect text={[
              "Hello, My name's Peerapat Pacharamontree",
              "My nickname is Atom.",
              "BTW I usually go by the name 'Taihen' when surfing the internet",
              " ",
            ]} />
          </div>
          <div className="h-min w-min absolute  bottom-20 md:right-20 md:bottom-40">
            <Keyboard />
          </div>
        </div>
      </div>
      <div></div>
    </>
  )
}