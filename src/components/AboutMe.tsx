import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { scrollToSection } from "./Navbar"

export default function AboutMe() {
  return (
    <>
      <div id="about-me" className="w-full h-full bg-[#1a252f] bg-opacity-75">
        <div className="w-full h-full backdrop-blur-sm flex justify-center items-center">
          <div className="w-full h-full p-28">
            <div className="hero relative h-full rounded-xl bg-opacity-[80%] bg-base-200">
              <div className="absolute w-full h-full bg-transparent rounded-[inherit] shadow-2xl shadow-[rgba(252,225,7,0.4)] animate-pulse"></div>
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex flex-col justify-center items-center">
                  <div className="stack relative w-72 rounded-lg shadow-2xl">
                    <div className="w-full h-full rounded bg-secondary text-secondary-content place-content-center overflow-hidden">
                      <img src="https://dthezntil550i.cloudfront.net/sp/latest/sp2210222307207530022116305/1280_960/7c9ef945-f10b-4c00-beba-a53c8aa2a12b.png" className="w-full h-full bg-cover" />
                    </div>
                    <div className="w-full h-full rounded bg-red-200 text-secondary-content place-content-center">3</div>
                    <div className="absolute w-fit top-[-1em] right-[-2em] opacity-100 badge badge-secondary z-10 bg-red-200 border-red-200">Coding...</div>
                    <div className="w-full h-full rounded bg-[#223b93] text-primary-content place-content-center">1</div>
                    <div className="w-full h-full rounded bg-green-200 text-accent-content place-content-center">2</div>
                  </div>
                  <div className="w-full pt-10">
                    <p className="w-max text-center font-serif">"If you gaze for long into an abyss, nothing happens."</p>
                    <p className="pt-5 text-center text-yellow-300">Peerapat Patcharamontree</p>
                  </div>
                </div>
                <div className="max-w-[70%] pr-16 pb-10">
                  <h1 className="mb-5 text-5 xl font-bold text-red-200">Greeting!! 👋 I'm Atom</h1>
                  <h1 className="text-2xl pt-6 font-bold">About me</h1>
                  <p className="py-2 indent-6">
                    A Shou-nen who is interested in Computer Programming. I have gone very wide in the Tech field,
                    but I consider my main areas of interest to be <span className="text-green-200">Web development, Android, Game development, and
                      Networking (home server)</span>. I also have a bit of a background in coding competitions. ... So far, this is all I know about
                    myself.. Now, let's see what else I can make this calculator machine do
                    at <a href="https://github.com/Taihenc" target="_blank">Github</a>.
                  </p>
                  <button onClick={() => scrollToSection('contact-me')} className="btn mt-3 text-white bg-[#223b93]">
                    Contact Me
                    <FontAwesomeIcon icon={['fas', 'paper-plane']} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )

}