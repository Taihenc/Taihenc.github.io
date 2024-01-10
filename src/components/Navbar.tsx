import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const handleClickScrollHome = () => {
  scrollToSection("home");
}

const handleClickScrollAboutMe = () => {
  scrollToSection("about-me");
};

const handleClickScrollContactMe = () => {
  scrollToSection("contact-me");
};

type NavigationItem = {
  name: string;
  href: () => void;
  current: boolean;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {

  const [navigation, setNavigation] = useState([
    { name: "Home", href: handleClickScrollHome, current: false },
    { name: "About me", href: handleClickScrollAboutMe, current: false },
    { name: "Contact me", href: handleClickScrollContactMe, current: false },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const updatedNavigation = navigation.map((item) => {
        const section = document.getElementById(item.name.replace(/\s/g, '-').toLowerCase());

        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          return {
            ...item,
            current: (sectionHeight - Math.abs(scrollPosition - sectionTop)) / sectionHeight > 0.5,
          };
        }

        return item;
      });

      setNavigation(updatedNavigation);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigation]);

  const handleItemClick = (item: NavigationItem) => {
    item.href();
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
    <Disclosure as="nav" className="bg-transpalent fixed z-10 w-full top-0 flex justify-end md:justify-center md:pt-4">
      {({ open }) => (
        <div className="max-w-7xl px-2 sm:px-6 lg:px-8 mr-12 md:mr-0 relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block flex space-x-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={classNames(
                    item.current ? "bg-[#223b93] text-white" : "text-gray-300 hover:text-white hover:bg-[#433969] bg-transparent",
                    "rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 focus:outline-none"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Disclosure>

  );
}

export function scrollToSection(sectionId: string): void {
  const sectionElement: HTMLElement | null = document.getElementById(sectionId);

  if (sectionElement) {
    const start: number = window.scrollY;
    const target: number = sectionElement.offsetTop;
    const duration: number = 500; // milliseconds
    const startTime: number = performance.now();

    function animateScroll(time: number): void {
      const elapsed: number = time - startTime;
      const progress: number = Math.min(elapsed / duration, 1);
      const easing: number = easeInOutQuad(progress);

      const newScrollTop: number = start + (target - start) * easing;
      window.scroll(0, newScrollTop);
      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    }

    function easeInOutQuad(t: number): number {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animateScroll);
  }
}

