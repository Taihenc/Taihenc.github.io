import { lazy, Suspense, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, AnimatePresence } from 'framer-motion'
import ImageCarousel from './ImageCarousel'
import SkeletonImage from './SkeletonImage'
import { getLogoName } from '../utils/utils'
import { workExperiences } from '../data/works-experience'
import { WorkExperience } from '../interfaces/WorkExperience'
import { portfolioGraph } from '../data/portfolio-graph'

// Canvas + force simulation live in their own chunk.
const PortfolioGraph = lazy(() => import('./PortfolioGraph'))

type WorksView = 'graph' | 'cards'
const VIEWS: { id: WorksView; label: string }[] = [
  { id: 'graph', label: 'Graph' },
  { id: 'cards', label: 'Cards' },
]

export default function Works() {
  const [selectedWork, setSelectedWork] = useState(workExperiences[0])
  const [view, setView] = useState<WorksView>('graph')

  const handleLogoClick = (work: WorkExperience) => {
    setSelectedWork(work)
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  }

  return (
    <>
      <section
        id="works"
        className="w-full h-full bg-[#1a252f] bg-opacity-75 snap-center overflow-hidden p-6 pt-[4.5rem] md:pt-[5rem] lg:pt-[6rem] lg:pb-[4rem] md:px-[7rem] flex flex-col items-center gap-3"
      >
        <div className="w-full max-w-[100rem] flex items-center justify-between gap-3 shrink-0">
          <h2 className="text-sm font-semibold tracking-wide text-slate-300">
            Works &amp; experience
          </h2>
          <div
            role="tablist"
            aria-label="Works view"
            className="flex rounded-lg border border-white/10 bg-black/30 p-0.5 text-xs"
          >
            {VIEWS.map((v) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={view === v.id}
                onClick={() => setView(v.id)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  view === v.id
                    ? 'bg-white/15 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
        {view === 'graph' ? (
          <div className="w-full max-w-[100rem] flex-1 min-h-0">
            <Suspense
              fallback={
                <div className="w-full h-full rounded-xl border border-white/10 bg-[#0b0f17]" />
              }
            >
              <PortfolioGraph graph={portfolioGraph} />
            </Suspense>
          </div>
        ) : (
          <div className="w-full flex-1 min-h-0 gap-3 z-0 lg:gap-6 max-w-[100rem] flex flex-col lg:flex-row justify-center items-center relative">
            {/* Aside for Logos */}
            <motion.aside
              className="h-fit max-h-full max-w-full mb-auto p-4 relative rounded-xl bg-opacity-[80%] bg-base-200"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="h-full w-full gap-5 z-[2] flex flex-row lg:flex-col justify-start items-center overflow-y-auto overflow-x-hidden">
                {workExperiences.map((work) => (
                  <motion.li
                    key={work.logo}
                    className="w-12 lg:w-16 aspect-square rounded-md overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => handleLogoClick(work)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkeletonImage
                      wrapperClassName="h-full w-full opacity-80"
                      className="h-full w-full object-cover"
                      src={work.logo}
                      alt={`Logo of ${getLogoName(work.title)}`}
                      loading="lazy"
                    />
                  </motion.li>
                ))}
              </ul>
              <div className="w-full h-full absolute -z-10 top-0 left-0 bg-transparent rounded-[inherit] shadow-2xl shadow-[rgba(134,150,230,0.5)] animate-pulse"></div>
            </motion.aside>

            {/* Article for Content */}
            <motion.article
              className="min-h-0 h-full sm:max-h-[50rem] md:max-h-full w-full p-6 relative md:p-10 xl:py-[4rem] xl:px-[5rem] flex flex-col justify-between items-center bg-opacity-[80%] bg-base-200 rounded-xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedWork.title}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  transition={{ duration: 0.5 }}
                  className="w-full min-h-0 max-h-full flex flex-col flex-1 shrink overflow-hidden"
                >
                  <h1 className="w-full mb-5 text-4xl !leading-normal lg:text-5xl font-bold text-red-200">
                    {selectedWork.title} {/* Dynamic Title */}
                  </h1>
                  <div className="w-full max-h-full lg:h-fit lg:aspect-video min-h-0 flex-1 flex flex-col lg:flex-row gap-6">
                    <div className="w-full h-1/2 lg:h-auto md:w-[90%] md:min-w-[22em] flex flex-col justify-center items-center">
                      <ImageCarousel
                        key={selectedWork.title}
                        images={selectedWork.images}
                      />
                    </div>
                    <div className="shrink-[1] min-w-0 w-full min-h-0 max-h-full flex flex-col">
                      <h1 className="text-lg lg:text-2xl lg:pt-6 font-bold text-green-200">
                        {selectedWork.subtitle}
                      </h1>
                      <p className="h-auto max-h-full py-2 indent-6 overflow-y-auto break-words">
                        {selectedWork.description}
                        <a
                          className="link-primary"
                          href={selectedWork.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* {selectedWork.link} */}
                        </a>
                      </p>
                      <a
                        aria-label="Scroll to contact section"
                        // onClick={handleContactClick}
                        href={selectedWork.link}
                        target="_blank"
                        className="md:w-fit btn mt-3 text-white bg-[#223b93]"
                      >
                        Check it out!
                        <FontAwesomeIcon icon={['fas', 'paper-plane']} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.article>
          </div>
        )}
      </section>
    </>
  )
}
