import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { scrollToSection } from "./Navbar"

export default function AboutMe() {
  return (
    <>
      <div id="about-me" className="w-full h-full bg-[#1a252f] bg-opacity-75">
        <div className="w-full h-full flex justify-center items-center overflow-hidden">
          <div className="w-full h-full md:p-28 p-6 flex justify-center items-center">
            <div className="w-full h-fit max-w-[100rem] max-h-[50rem] relative rounded-xl bg-opacity-[80%] bg-base-200">
              <div className="w-full h-full absolute -z-10 bg-transparent rounded-[inherit] shadow-2xl shadow-[rgba(252,225,7,0.4)] animate-pulse"></div>
              <div className="w-full h-full p-3 md:p-6 md:py-[5%] md:px-[7%] flex justify-center items-center">
                <div className="w-full h-full max-h-[80vh] flex flex-col lg:flex-row justify-center items-center">
                  <div className="max-h-full min-h-[10rem] w-[20rem] mb-5 lg:mt-16 flex flex-col shrink-0 justify-center items-center order-3">
                    <div className="stack aspect-square lg:w-3/4 w-[40%] relative shrink-[2] rounded-lg shadow-2xl">
                      <div className="w-full h-full rounded bg-secondary overflow-hidden">
                        {/* <img src="https://dthezntil550i.cloudfront.net/sp/latest/sp2210222307207530022116305/1280_960/7c9ef945-f10b-4c00-beba-a53c8aa2a12b.png" className="w-full h-full bg-cover" /> */}
                        <img src="https://github.com/Taihenc.png" className="w-full h-full object-cover bg-cover" />
                      </div>
                      <div className="w-full h-full rounded bg-red-200 text-secondary-content place-content-center">3</div>
                      <div className="absolute w-fit top-[-1em] right-[-2em] opacity-100 badge badge-secondary z-10 bg-red-200 border-red-200">Staring...</div>
                      <div className="w-full h-full rounded bg-[#223b93] text-primary-content place-content-center">1</div>
                      <div className="w-full h-full rounded bg-green-200 text-accent-content place-content-center">2</div>
                    </div>
                    <div className="w-fit mt-2 lg:mt-16 flex flex-col">
                      <p className="md:w-max text-sm md:text-base text-center font-serif">"If you gaze f or long into an abyss, nothing happens."</p>
                      <p className="pt-2 lg:pt-5 text-center text-xs md:text-sm text-yellow-300">Peerapat Patcharamontree</p>
                    </div>
                  </div>
                  <div className="h-[5rem] max-h-[10rem] w-full lg:hidden shrink-[10] order-2"></div>
                  <div className="w-full max-w-[55rem] p-5 lg:pr-[7rem] md:pb-16 flex flex-col max-h-full shrink overflow-hidden order-1">
                    <h1 className="w-full mb-5 text-4xl lg:text-5xl font-bold text-red-200">Greeting!! 👋 I'm Atom</h1>
                    <h1 className="text-lg lg:text-2xl lg:pt-6 font-bold">About me</h1>
                    <p className="md:max-h-[10rem] min-h-[5rem] py-2 indent-6 overflow-auto shrink">
                      A Shou-nen who is interested in Computer Programming. I have gone very wide in the Tech field,
                      but I consider my main areas of interest to be <span className="text-green-200">Web development, Android, Game development, and
                        Networking (home server)</span>. I also have a bit of a background in coding competitions. ... So far, this is all I know about
                      myself.. Now, let's see what else I can make this calculator machine do
                      at <a className="link-primary" href="https://github.com/Taihenc" target="_blank">Github</a>.
                    </p>
                    <button onClick={() => scrollToSection('contact-me')} className="md:w-fit btn mt-3 text-white bg-[#223b93]">
                      Contact Me
                      <FontAwesomeIcon icon={['fas', 'paper-plane']} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )

}