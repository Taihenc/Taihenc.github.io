import Keyboard from "./Keyboard"
import NavBar from "./Navbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {
  return (
    <>
      <div className="absolute bg-cover bg-fixed bg-center bg-[url('/assets/home_bg.gif')] bg-blue-900 w-full h-[100vh] flex overflow-hidden"></div>
      <div className="w-full h-[100vh] backdrop-blur-sm">
        <NavBar />
        <div className="w-full h-[100vh] flex items-center justify-center">
          <div className="mockup-code h-[70vh] bg-opacity-60 w-1/2">
            <pre data-prefix="1">
              <code>
                Hello, My name's <span className="text-red-200">Peerapat Pacharamontree</span>
              </code>
            </pre>
            <pre data-prefix="2">
              <code>
                My nickname is <span className="text-red-200">Atom.</span>
              </code>
            </pre>
            <pre data-prefix="3">
              <code>
                BTW I usually go by the name <span className="text-pink-300">'Taihen'</span> when surfing the internet
              </code>
            </pre>
            <pre data-prefix="4"><code></code></pre>
            <pre><code></code></pre>
            <pre><code></code></pre>
            <pre><code></code></pre>
            <pre><code></code></pre>
            <pre data-prefix="$" className="text-green-200"><code>ShowGithubButton()</code></pre>
            <pre><code></code></pre>
            <div className="w-contents ml-36 mr-36 mockup-browser border bg-base-300 bg-opacity-30 border-none">
              <div className="mockup-browser-toolbar">
                <div className="input">https://github.com/Taihenc</div>
              </div>
              <div className="p-10">
                <a href="https://github.com/Taihenc" className="h-13 w-40 p-2 ml-auto mr-auto flex justify-center items-center gap-2 bg-black text-white rounded-md text-lg opacity-70 hover:text-red-200">
                  <FontAwesomeIcon icon={['fab', 'github']} className="text-4xl animate-bounce" />
                  <div className="flex flex-col justify-center align-middle text-center gap-0">
                    <div className="text-sm">Available on</div>
                    <div className="font-bold -mt-1 text-2xl">Github</div>
                  </div>
                  {/* <FontAwesomeIcon icon="arrow-up-right-from-square" /> */}
                </a>
              </div>
            </div>
          </div>
          <div className="h-full w1/2 flex justify-end items-end pl-20 pb-20">
            <Keyboard />
          </div>
        </div>
      </div>
      <div></div>
    </>
  )
}