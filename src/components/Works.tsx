import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { scrollToSection } from "./Navbar"
import TypingEffect from "./TypingEffect"
import { useEffect, useState } from "react";
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

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect to handle the auto-iteration of images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % images.length); // Cycle through images
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <div id="works" className="w-full h-full bg-[#1a252f] bg-opacity-75 snap-center p-6 pt-[4rem] md:pt-[6rem] md:px-[6rem] flex justify-center items-center overflow-hidden">
        <div className="w-full h-full gap-3 lg:gap-6 max-w-[100rem] flex flex-col lg:flex-row justify-center items-center">
          <div className="h-fit max-w-full p-4 relative rounded-xl bg-opacity-[80%] bg-base-200">
            <ul className="gap-5 flex flex-row lg:flex-col justify-start items-center overflow-y-auto">
              {logos.map((src, index) => (
                <li key={index} className="w-[3rem] lg:w-[5rem]  aspect-square rounded-md overflow-hidden flex-shrink-0 cursor-pointer">
                  <img className="h-full w-full object-cover" src={src} alt={`Image ${index + 1}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full sm:max-h-[50rem] md:max-h-full w-full p-6 relative md:p-10 xl:py-[4rem] xl:px-[5rem] flex flex-col justify-between items-center bg-opacity-[80%] bg-base-200 rounded-xl">
            <div className="w-full min-h-0 max-h-full flex flex-col flex-1 shrink overflow-hidden">
              <h1 className="w-full mb-5 text-4xl !leading-normal lg:text-5xl font-bold text-red-200">
                LMWN INTERNSHIP
              </h1>
              <div className="w-full max-h-full min-h-0 flex-1 flex flex-col lg:flex-row gap-6">
                <div className="w-full h-1/2 lg:h-auto md:w-[90%] md:min-w-[22em] flex flex-col justify-center items-center">
                  <ImageCarousel images={images} />
                </div>
                <div className="shrink-[1] min-w-0 w-full min-h-0 max-h-full flex flex-col">
                  <h1 className="text-lg lg:text-2xl lg:pt-6 font-bold">Whats I've learn</h1>
                  <p className="min-h-0 max-h-full py-2 indent-6 overflow-auto">
                    Explanation about the works
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
    </>
  )

}