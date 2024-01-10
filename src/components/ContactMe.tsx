import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactMe() {
  return (
    <>
      <div id="contact-me" className="w-full h-full bg-[#1a252f] bg-opacity-75">
        <div className="w-full h-full backdrop-blur-sm flex justify-center items-center">
          <div className="w-full h-full p-28">
            <div className="hero relative flex justify-center w-full h-full rounded-xl bg-opacity-[80%] bg-base-200">
              <div className="absolute w-full h-full bg-transparent -z-10 rounded-[inherit] shadow-2xl shadow-[rgba(97,97,170,0.5)] animate-pulse"></div>
              <div className="mockup-phone border-green-300 border-opacity-20 m-0 mr-20">
                <div className="camera"></div>
                <div className="display">
                  <div className="artboard artboard-demo phone-1">
                    <div className="flex h-full w-full p-10 flex-col">
                      <div className="rounded-xl h-[10rem] overflow-hidden opacity-75">
                        <img className="w-full origin-bottom -translate-y-[33%]" src="https://i.redd.it/xte6gka2ghj91.gif" alt="" />
                      </div>
                      <div className="w-full mb-5 mt-5 flex gap-2 justify-center">
                        <div className="w-full shrink h-[60%] border-b-2 border-b-red-200"></div>
                        <div className="text-2xl text-red-200">Contact</div>
                        <div className="w-full shrink h-[60%] border-b-2 border-b-red-200"></div>
                      </div>
                      <div className="flex flex-col mb-10">
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
              <div className="mb-24">
                <h1 className="mb-5 text-5 xl font-bold text-red-200">Let's Connect😇</h1>
                <p className="py-2">
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