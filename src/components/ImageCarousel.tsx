interface ImageGalleryProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div id="default-carousel" className="relative w-full h-full" data-carousel="slide">
      {/* <!-- Carousel wrapper --> */}
      <div className="w-full h-full relative overflow-hidden rounded-lg">
        {
          images.map((src, index) => (
            <div key={index} className="w-full h-full hidden duration-700 ease-in-out bg-[#1a252f]" data-carousel-item>
              <img src={src} className="w-full h-full absolute block object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
            </div>
          ))
        }
      </div>
      {/* <!-- Slider indicators --> */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {
          images.map((_, index) => (
            <button key={index} type="button" className="w-3 h-3 rounded-full" aria-current={index === 0} aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index}></button>
          ))
        }
      </div>
    </div>
  );
}

export default ImageCarousel;