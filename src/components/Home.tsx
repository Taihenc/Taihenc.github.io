import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TypingEffect from "./TypingEffect"
import '../styles/mockup-animate.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from "./KeyboardModel"
import { IdleAnimation, createKeyboardController } from "./KeyboardConrtoller"
import * as THREE from 'three'
import { useRef } from "react"
import '../styles/arrow-up.css'

export default function Home() {
  const [finished, setFinished] = useState(false);
  const [initBrowser, setInitBrowser] = useState(false);
  const [loadURL, setLoadURL] = useState(false);

  const keyboardRef = createKeyboardController();
  const scrollingDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      keyboardRef.press(e.code);
    }
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    }
  }, []);

  return (
    <>
      {/* <div role="alert" className="absolute z-10 max-w-fit right-0 top-0 m-10 alert alert-warning animate-pulse duration-75">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Warning: This website is under development!
          <span className="absolute top-[1.75em] right-0 text-xs font-bold">Dec 8, 2023, by <span className="text-red-900">Taihenc</span></span>
        </span>
      </div> */}
      <div id="home" className="relative">
        <div className="flex justify-center items-start md:items-center">
          <div className="flex max-h-full max-w-full overflow-hidden items-start justify-center md:items-center">
            <div className="flex gap-6 justify-start md:justify-center items-center h-[100vh] w-[100vw] flex-col pt-14 pl-2 pr-2 md:flex-row md:pt-20 md:p-16">
              <div className="transition-all mockup-code max-h-[50rem] md:h-[70vh] max-w-[50rem] min-w-0 md:w-[40rem] bg-opacity-60 w-[90%] shrink-[1] flex flex-col self-center bg-base-100 md:self-start">
                <div className="transition-all w-fit overflow-y-auto" >
                  <TypingEffect text={[
                    "Hello, My name's Peerapat Pacharamontree",
                    "My nickname is Atom.",
                    "BTW I usually go by the name 'Taihen' when surfing the internet",
                    " ",
                    "I'm a 1st year student at Chulalongkorn University",
                  ]} endRemoveCursor onCharTypedEnd={() => setFinished(true)} onCharTyped={keyboardRef.press} textHighlight={[
                    { word: "Peerapat Pacharamontree", className: 'text-red-200' },
                    { word: "Atom", className: 'text-red-200' },
                    { word: "Taihen", className: 'text-yellow-300' },
                    { word: "Chulalongkorn University", className: 'text-pink-300' },
                  ]} />
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
              {initBrowser && <div className="mockup-show mockup-browser h-60 min-h-[9rem] max-w-[80%] min-w-[1rem] w-[5rem] mb-28 bg-opacity-60 shrink-[2] border-none flex flex-col bg-base-100 md:self-start">
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
            </div>
            <div className="md:block hidden w-[70%] max-w-xl aspect-[2/1] absolute bottom-5 md:right-4 md:bottom-8">
              <Canvas
                camera={{ position: [-2, 2, 2], rotation: [0, 0, 0], fov: 30 }}
              >
                <ambientLight intensity={0.2} />
                <directionalLight color={new THREE.Color(201, 149, 37)} position={[-2, 5, -5]} intensity={0.01} />
                <Model position={[0, 0.25, 0]} rotation={[0, 1, 0]} scale={[10, 10, 10]} controller={keyboardRef} keyboardGroupRefCallback={IdleAnimation} />
                <OrbitControls />
              </Canvas>
            </div>
          </div>
          <div className="md:hidden w-[5rem] h-[10rem absolute bottom-5 wrapper opacity-60">
            <svg className="" id="Flick_1" data-name="Flick 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 50 35 60">
              <g className="arrows" transform="translate(7, 5)">
                <polyline className="arrow-up-3" points="34.7 64.95 40.73 58.79 40.75 58.8 46.91 64.83" />
                <polyline className="arrow-up-2" points="34.7 74.99 40.73 68.83 40.75 68.85 46.91 74.88" />
                <polyline className="arrow-up-1" points="34.7 85.04 40.73 78.88 40.75 78.89 46.91 84.92" />
              </g>
            </svg>

          </div>
        </div >
      </div >
    </>
  )
}