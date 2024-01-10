import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactMe() {
  return (
    <>
      <div id="contact-me" className="w-full h-full bg-[#1a252f] bg-opacity-75">
        <div className="w-full h-full backdrop-blur-sm flex justify-center items-center">
          <div className="w-full h-full p-6 lg:p-28 flex justify-center items-center">
            <div className="w-full h-fit max-h-[80vh] md:max-h-full lg:h-full relative flex flex-col lg:flex-row p-4 lg:gap-20 justify-center items-center rounded-xl bg-opacity-[80%] bg-base-200">
              <div className="absolute w-full h-full bg-transparent -z-10 rounded-[inherit] shadow-2xl shadow-[rgba(97,97,170,0.5)] animate-pulse"></div>
              <div className="max-h-[37rem] lg:min-h-[20rem] lg:h-full min-w-[17rem] shrink-0 lg:mockup-phone lg:m-0 order-3 lg:order-1 border-green-300 border-opacity-20">
                <div className="camera"></div>
                <div className="lg:h-full display">
                  <div className="lg:h-full max-w-[20rem] lg:artboard lg:artboard-demo">
                    <div className="lg:h-fit flex gap-6 p-3 lg:p-[10%] flex-col justify-center">
                      <div className="rounded-xl h-[8rem] lg:h-[10rem] overflow-hidden  mb-5 order-2 lg:order-1 opacity-75">
                        <img className="object-cover bg-center origin-bottom -translate-y-[38%] lg:-translate-y-[33%]" src="https://i.redd.it/xte6gka2ghj91.gif" alt="" />
                      </div>
                      <div className="w-full mb-5 mt-5 hidden lg:flex gap-2 justify-center">
                        <div className="w-full shrink h-[60%] border-b-2 border-b-red-200"></div>
                        <div className="text-2xl text-red-200">Contact</div>
                        <div className="w-full shrink h-[60%] border-b-2 border-b-red-200"></div>
                      </div>
                      <div className="flex flex-col lg:mb-10">
                        <div>
                          <FontAwesomeIcon icon={['fab', 'facebook-square']} />
                          <a className="pl-2" href="https://fb.com/profile.php?id=100007253977880" target="_blank">Peerapat Patcharamontree</a>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={['fab', 'line']} />
                          <span className="pl-2">atomlove12345</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={['fas', 'phone']} />
                          <span className="pl-2">0801154802</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={['fab', 'instagram-square']} />
                          <a className="pl-2" href="https://www.instagram.com/_taihenc/" target="_blank">_taihenc</a>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={['fab', 'linkedin']} />
                          <a className="pl-2" href="https://linkedin.com/in/peerapat-patcharamontree-138a8b229" target="_blank">Peerapat Patcharamontree</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[5rem] max-h-[10rem] w-full lg:hidden shrink-[1] order-2"></div>
              <div className="lg:mb-24 shrink-0 md:shrink order-1 px-5 mt-10 lg:block">
                <h1 className="lg:mb-5 text-4xl lg:text-5xl font-bold text-red-200">Let's Connect😇</h1>
                <p className="my-2 mt-6 overflow-auto">
                  - Feel free to contact me if you have any questions or suggestions. <br />
                  - I'm always open to new ideas and <span className="text-green-300">opportunities</span>. <br />
                  ( I may not be quick to respond, but I will do my best to reply to you as soon as possible. )
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}