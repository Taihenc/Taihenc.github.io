import Keyboard from "./Keyboard"
import NavBar from "./Navbar"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TypingEffect from "./TypingEffect"
import '../styles/mockup-animate.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from "./KeyboardModel"
import { createKeyboardController } from "./KeyboardConrtoller"
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { ThreeElements } from "@react-three/fiber"

export default function Home() {
  const [finished, setFinished] = useState(false);
  const [initBrowser, setInitBrowser] = useState(false);
  const [loadURL, setLoadURL] = useState(false);

  const keyboardRef = createKeyboardController();
  const scrollingDivRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* <div role="alert" className="absolute z-10 max-w-fit right-0 top-0 m-10 alert alert-warning animate-pulse duration-75">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Warning: This website is under development!
          <span className="absolute top-[1.75em] right-0 text-xs font-bold">Dec 8, 2023, by <span className="text-red-900">Taihenc</span></span>
        </span>
      </div> */}
      <div className="absolute bg-cover bg-center bg-[url('/assets/home_bg.gif')] w-[100vw] h-[100vh] overflow-hidden"> </div>
      <div className="w-full h-[100vh] backdrop-blur-sm">
        <NavBar />
        <div className="w-[100vw] h-[100vh] relative pt-14 md:pt-20 flex items-start justify-center md:justify-start md:pl-28 ">
          <div className="mockup-code h-[70vh] bg-opacity-60 w-[50rem] md:static flex flex-col max-w-[90%] bg-base-100">
            <div className="w-fit shrink-[10] overflow-y-auto" ref={scrollingDivRef}>
              <TypingEffect text={[
                "Hello, My name's Peerapat Pacharamontree",
                "My nickname is Atom.",
                "BTW I usually go by the name 'Taihen' when surfing the internet",
                " ",
                "I'm a 1st year student at Chulalongkorn University",
              ]} endRemoveCursor onCharTypedEnd={() => setFinished(true)} onCharTyped={keyboardRef.press} />
              <pre><code></code></pre>
              <pre><code></code></pre>
              <pre><code></code></pre>
              {finished && <TypingEffect text={[
                "Initiate(BrowserWindow())",
              ]} isTerminal endRemoveCursor onCharTypedEnd={() => setInitBrowser(true)} onCharTyped={keyboardRef.press} />}
              {initBrowser && <TypingEffect text={[
                "Browser.loadURL('https://taihenc.github.io')",
              ]} isTerminal onCharTypedEnd={() => setLoadURL(true)} onCharTyped={keyboardRef.press} />}
            </div>
          </div>
          {initBrowser && <div className="mockup-show mockup-browser w-[20rem] max-w-[80%] absolute top-3/4 -translate-y-1/2 shrink flex flex-col self-center bg-base-100 md:bg-opacity-60 border-none md:absolute md:left-[60rem] md:mb-80">
            <div className="mockup-browser-toolbar">
              <div className="input">{loadURL && <TypingEffect text={['https://github.com/Taihenc']} isPlainText onCharTyped={keyboardRef.press} />}</div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {loadURL && <a href="https://github.com/Taihenc" className="github-show w-fit h-0 p-2 pt-3 pl-4 pr-4 flex justify-center items-center gap-2 bg-black text-white rounded-md text-lg opacity-70 hover:text-red-200">
                <FontAwesomeIcon icon={['fab', 'github']} className="text-4xl animate-bounce" />
                <div className="flex flex-col justify-center align-middle text-center gap-0">
                  <div className="text-sm">Available on</div>
                  <div className="font-bold -mt-1 text-2xl">Github</div>
                </div>
              </a>}
            </div>
          </div>}
          <div className="w-[20rem] h-[15rem] absolute bottom-5 md:right-20 md:bottom-40">
            <Canvas
              camera={{ position: [-1, 2, 1.35], rotation: [0, 0, 0], fov: 40 }}
            >
              <ambientLight intensity={0.1} />
              <directionalLight color={new THREE.Color(201, 149, 37)} position={[0, 5, -5]} intensity={0.01} />
              <Model position={[0, 0, 0]} scale={[10, 10, 10]} controller={keyboardRef} />
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      </div >
      <div></div>
    </>
  )
}