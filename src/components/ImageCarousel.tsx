import { useEffect, useRef } from 'react'
import { Carousel } from 'flowbite'
import type {
  CarouselItem,
  CarouselOptions,
  IndicatorItem,
  InstanceOptions,
} from 'flowbite'

// Define the interface for ImageGalleryProps
interface ImageGalleryProps {
  images: string[]
}

const ImageCarousel: React.FC<ImageGalleryProps> = ({ images }) => {
  let carousel: Carousel | null = null // Ref for carousel instance

  useEffect(() => {
    // Ensure Flowbite's Carousel logic runs only when the component mounts or updates
    const carouselElement = document.getElementById(
      'default-carousel'
    ) as HTMLDivElement
    const items = Array.from(
      carouselElement.querySelectorAll('[data-carousel-item]')
    )

    const carouselItems: CarouselItem[] = items.map(
      (item, index) =>
        ({
          position: index,
          el: item as HTMLElement, // Ensuring element is of type HTMLElement
        } as CarouselItem)
    )

    const indicatorItems: IndicatorItem[] = Array.from(
      document.querySelectorAll('[data-carousel-indicator]')
    ).map(
      (indicator, index) =>
        ({
          position: index,
          el: indicator as HTMLElement, // Ensuring element is of type HTMLElement
        } as IndicatorItem)
    )

    const carouselOptions: CarouselOptions = {
      defaultPosition: 0, // Set default active slide (start from 0)
      interval: 2500, // Set interval for auto cycling (optional)
      indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses:
          'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items: indicatorItems,
      }, // No custom indicators defined for now
    }

    const instanceOptions: InstanceOptions = {
      id: 'default-carousel',
      override: true,
    }
    // Initialize the Flowbite carousel with required parameters
    carousel = new Carousel(
      carouselElement,
      carouselItems,
      carouselOptions,
      instanceOptions
    )

    // You can store the carousel instance if needed for manual manipulation
    // e.g. carousel.next(), carousel.prev(), etc.
    carousel.cycle()

    // Cleanup the carousel when component unmounts or images change
    return () => {
      carousel?.pause()
      carousel?.destroy()
    }
  }, [images]) // Re-run the effect when images change

  return (
    <div id="default-carousel" className="relative w-full h-full z-0">
      {/* Carousel wrapper */}
      <div className="w-full h-full relative overflow-hidden rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full h-full hidden duration-700 ease-in-out bg-[#1a252f]"
            data-carousel-item
          >
            `Wait..`
            <img
              src={src}
              className="w-full h-full absolute block object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            id={`carousel-indicator-${index}`}
            key={index}
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            data-carousel-indicator
          ></button>
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
