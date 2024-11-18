import { faL } from "@fortawesome/free-solid-svg-icons";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {

  const [navigation, setNavigation] = useState([
    { name: "Home", href: "#home", current: false },
    { name: "About me", href: "#about-me", current: false },
    { name: "Contact me", href: "#contact-me", current: false },
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let updatedNavigation = [...navigation]; // Copy of the current navigation state

        entries.forEach((entry) => {

          const navItemIndex = updatedNavigation.findIndex((navItem) => navItem.href === `#${entry.target.id}`);

          if (entry.isIntersecting) {
            if (navItemIndex !== -1) {
              updatedNavigation[navItemIndex] = {
                ...updatedNavigation[navItemIndex],
                current: true,
              };
            }
          } else {
            if (navItemIndex !== -1) {
              updatedNavigation[navItemIndex] = {
                ...updatedNavigation[navItemIndex],
                current: false,
              };
            }
          }
        });

        // Only update the state once after all entries have been processed
        setNavigation(updatedNavigation);
      },
      {
        root: document.querySelector("main"), // Observe sections within <main>
        threshold: 0.5, // 50% visibility for active state
      }
    );

    // Get all sections to observe
    const sections = document.querySelectorAll("main > div");

    sections.forEach((section) => observer.observe(section));

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, [navigation]); // Depend on the navigation state to re-run if needed


  const handleItemClick = (item: NavigationItem) => {
    scrollToSection(item.href.replace('#', ''));
    setNavigation(navigation.map((navItem) => {
      if (navItem.name === item.name) {
        return {
          ...navItem,
          current: true,
        };
      }

      return {
        ...navItem,
        current: false,
      };
    }));
  }

  return (
    <Disclosure as="nav" id="navbar" className="bg-transpalent fixed z-10 w-full top-0 flex justify-end sm:justify-center md:pt-4">
      {({ open }) => (
        <div className="max-w-7xl px-2 sm:px-6 lg:px-8 mr-12 sm:mr-0 relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {open ? (
                <>
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  <div className="absolute top-16 flex flex-col bg-[#1a252f] bg-opacity-50 rounded-lg gap-3">
                    <div className="absolute w-full h-full bg-transparent -z-10 rounded-[inherit] shadow-2xl shadow-[rgba(97,97,170,0.8)] animate-pulse"></div>

                    {navigation.map((item) => (
                      <a
                        href={item.href}
                        key={item.name}
                        onClick={(e) => { e.preventDefault(); handleItemClick(item) }}
                        className={classNames(
                          item.current ? "bg-[#223b93] text-white" : "text-gray-300 hover:text-white hover:bg-[#433969] bg-transparent",
                          "rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 focus:outline-none"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
          <div className="hidden sm:flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="space-x-4">
              {navigation.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  onClick={(e) => { e.preventDefault(); handleItemClick(item) }}
                  className={classNames(
                    item.current ? "bg-[#223b93] text-white" : "text-gray-300 hover:text-white hover:bg-[#433969] bg-transparent",
                    "rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 focus:outline-none"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )
      }
    </Disclosure >

  );
}

export function scrollToSection(sectionId: string): void {
  const sectionElement: HTMLElement | null = document.getElementById(sectionId);
  const main = document.getElementById('main-content');

  if (sectionElement && main) {
    // Disable scroll snapping during the animation
    const originalScrollSnapType = main.style.scrollSnapType;
    main.style.scrollSnapType = 'none';

    const start: number = main.scrollTop; // Current scroll position of the main container
    const target: number = sectionElement.offsetTop - main.offsetTop; // Position of the section relative to the main container
    const duration: number = 500; // duration of the scroll in milliseconds
    const startTime: number = performance.now(); // Start time of the animation

    function animateScroll(time: number): void {
      const elapsed: number = time - startTime;
      const progress: number = Math.min(elapsed / duration, 1); // Progress of the animation (0 to 1)
      const easing: number = easeInOutQuad(progress); // Easing function for smooth scroll

      const newScrollTop: number = start + (target - start) * easing; // New scroll position of main
      main!.scrollTo(0, newScrollTop); // Scroll the main container
      if (elapsed < duration) {
        requestAnimationFrame(animateScroll); // Continue the animation
      } else {
        // Re-enable scroll snapping after the animation completes
        main!.style.scrollSnapType = originalScrollSnapType;
      }
    }

    function easeInOutQuad(t: number): number {
      // Easing function for smooth scroll
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animateScroll); // Start the scroll animation
  }
}

