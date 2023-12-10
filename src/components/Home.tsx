import Keyboard from "./Keyboard"
import NavBar from "./Navbar"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TypingEffect from "./TypingEffect"
import '../styles/mockup-animate.css'

export default function Home() {
  const [finished, setFinished] = useState(false);
  const [initBrowser, setInitBrowser] = useState(false);
  const [loadURL, setLoadURL] = useState(false);
  return (
    <>
      <div role="alert" className="absolute z-10 max-w-fit right-0 top-0 m-10 alert alert-warning animate-pulse duration-75">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Warning: This website is under development!
          <span className="absolute top-[1.75em] right-0 text-xs font-bold">Dec 8, 2023, by <span className="text-red-900">Taihenc</span></span>
        </span>
      </div>
      <div className="absolute bg-cover bg-center bg-[url('/assets/home_bg.gif')] w-[100vw] h-[100vh] overflow-hidden"></div>
      <div className="w-full h-[100vh] backdrop-blur-sm">
        <NavBar />
        <div className="w-[100vw] h-[100vh] flex items-center justify-center md:justify-start md:pl-28 ">
          <div className="mockup-code h-[70vh] bg-opacity-60 w-[50rem] max-w-[90%] bg-base-100">
            <TypingEffect text={[
              "Hello, My name's Peerapat Pacharamontree",
              "My nickname is Atom.",
              "BTW I usually go by the name 'Taihen' when surfing the internet",
              " ",
              "I'm a 1st year student at Chulalongkorn University",
            ]} endRemoveCursor onCharTypedEnd={() => setFinished(true)} />
            <pre><code></code></pre>
            <pre><code></code></pre>
            <pre><code></code></pre>
            {finished && <TypingEffect text={[
              "Initiate(BrowserWindow())",
            ]} isTerminal endRemoveCursor onCharTypedEnd={() => setInitBrowser(true)} />}
            {initBrowser && <TypingEffect text={[
              "Browser.loadURL('https://taihenc.github.io')",
            ]} isTerminal onCharTypedEnd={() => setLoadURL(true)} />}
          </div>

          {initBrowser && <div className="mockup-show w-contents flex flex-col pb-10 ml-36 mr-36 mockup-browser bg-base-100 bg-opacity-60 border-none mb-80 ">
            <div className="mockup-browser-toolbar">
              <div className="input">{loadURL && 'https://github.com/Taihenc'}</div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {loadURL && <a href="https://github.com/Taihenc" className="github-show w-fit h-0 p-2 pt-3 pl-4 pr-4 flex justify-center items-center gap-2 bg-black text-white rounded-md text-lg opacity-70 hover:text-red-200">
                <FontAwesomeIcon icon={['fab', 'github']} className="text-4xl animate-bounce" />
                <div className="flex flex-col justify-center align-middle text-center gap-0">
                  <div className="text-sm">Available on</div>
                  <div className="font-bold -mt-1 text-2xl">Github</div>
                </div>
                {/* <FontAwesomeIcon icon="arrow-up-right-from-square" /> */}
              </a>}
            </div>
          </div>}
          <div className="h-min w-min absolute  bottom-20 md:right-20 md:bottom-40">
            <Keyboard />
          </div>
        </div>
      </div>
      <div></div>
    </>
  )
}