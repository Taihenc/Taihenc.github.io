import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ImageCarousel from "./ImageCarousel";

export default function Works() {
  const logos = ["/lm.png", "/lm.png", "/lm.png", "/lm.png", "/lm.png", "/lm.png", "/lm.png"]; // Example image sources
  // Array of image URLs
  const images = [
    "https://pbs.twimg.com/media/GC1ObpwbgAAotmR?format=jpg&name=large",
    "https://careers-img.wongnai.com/internship2024/lmwn-poster2024.jpg",
    "https://cdn.prod.website-files.com/621c562c7c7fba5b71a6349a/659b74b001424df0c0bacea7_%5BFood%5D%20Wongnai%20Merchant%20APP%20%E0%B9%82%E0%B8%89%E0%B8%A1%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88!_Cover.jpg",
    // Add more images as needed
  ];

  const handleContactClick = () => { }

  const getLogoName = (src: string) => {
    const name = src.split("/").pop();
    return name?.split(".")[0] || "";
  }

  return (
    <>
      <section id="works" className="w-full h-full bg-[#1a252f] bg-opacity-75 snap-center overflow-hidden p-6 pt-[3rem] md:pt-[7rem] pb-[5rem] md:px-[7rem] flex justify-center items-center">
        <div className="w-full h-full gap-3 lg:gap-6 max-w-[100rem] flex flex-col lg:flex-row justify-center items-center">
          <aside className="h-fit md:h-full max-h-full max-w-full mb-auto p-4 relative rounded-xl bg-opacity-[80%] bg-base-200">
            <ul className="h-full w-full gap-5 flex flex-row lg:flex-col justify-start items-center overflow-y-auto overflow-x-hidden">
              {logos.map((src) => (
                <li key={src} className="w-12 lg:w-20 aspect-square rounded-md overflow-hidden flex-shrink-0 cursor-pointer">
                  <img className="h-full w-full object-cover" src={src} alt={`Logo of ${getLogoName(src)}`} loading="lazy" />
                </li>
              ))}
            </ul>
          </aside>
          <article className="h-full sm:max-h-[50rem] md:max-h-full w-full p-6 relative md:p-10 xl:py-[4rem] xl:px-[5rem] flex flex-col justify-between items-center bg-opacity-[80%] bg-base-200 rounded-xl">
            <div className="w-full min-h-0 max-h-full flex flex-col flex-1 shrink overflow-hidden">
              <h1 className="w-full mb-5 text-4xl !leading-normal lg:text-5xl font-bold text-red-200">
                LMWN INTERNSHIP
              </h1>
              <div className="w-full max-h-full min-h-0 flex-1 flex flex-col lg:flex-row gap-6">
                <div className="w-full h-1/2 lg:h-auto md:w-[90%] md:min-w-[22em] flex flex-col justify-center items-center">
                  <ImageCarousel images={images} />
                </div>
                <div className="shrink-[1] min-w-0 w-full min-h-0 max-h-full flex flex-col">
                  <h1 className="text-lg lg:text-2xl lg:pt-6 font-bold">What I've learned</h1>
                  <p className="h-auto max-h-full py-2 indent-6 overflow-y-auto break-words">
                    Explanation about the works at
                    <a className="link-primary" href="https://github.com/Taihenc" target="_blank" rel="noopener noreferrer">Github</a>.
                  </p>
                  <button
                    aria-label="Scroll to contact section"
                    onClick={handleContactClick}
                    className="md:w-fit btn mt-3 text-white bg-primary">
                    Contact Me
                    <FontAwesomeIcon icon={['fas', 'paper-plane']} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  )

}