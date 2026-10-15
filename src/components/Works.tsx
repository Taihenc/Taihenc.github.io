import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, AnimatePresence } from 'framer-motion'
import ImageCarousel from './ImageCarousel'
import { getLogoName } from '../utils/utils'
import { workExperiences } from '../data/works-experience'
import { WorkExperience } from '../interfaces/WorkExperience'
import { PortfolioGraph } from './PortfolioGraph'
import { Network, LayoutGrid } from 'lucide-react'

export default function Works() {
  const [selectedWork, setSelectedWork] = useState(workExperiences[0])
  const [viewMode, setViewMode] = useState<'graph' | 'cards'>('graph')

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
        className="w-full h-full bg-[#080c14]/90 bg-opacity-90 snap-center overflow-hidden p-4 pt-[3.25rem] md:pt-[4.5rem] lg:pt-[5rem] lg:pb-[3rem] md:px-[4rem] flex flex-col justify-center items-center font-mono"
      >
        {/* Header Toggle Controls: Graph vs Classic View */}
        <div className="w-full max-w-[100rem] mb-3 flex items-center justify-between px-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400 font-bold">~</span>
            <span className="text-slate-500">/</span>
            <span className="text-cyan-400 font-semibold">taihen</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-200">works-graph</span>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#0f1523] p-1 text-[11px]">
            <button
              onClick={() => setViewMode('graph')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all ${
                viewMode === 'graph'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network size={13} />
              Obsidian Graph
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all ${
                viewMode === 'cards'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid size={13} />
              Classic Cards
            </button>
          </div>
        </div>

        {viewMode === 'graph' ? (
          <div className="w-full h-[calc(100%-4rem)] max-w-[100rem] flex-1">
            <PortfolioGraph />
          </div>
        ) : (
          <div className="w-full h-[calc(100%-4rem)] gap-3 z-0 lg:gap-6 max-w-[100rem] flex flex-col lg:flex-row justify-center items-center relative">
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
                >
                  <motion.img
                    className="h-full w-full object-cover opacity-80"
                    src={work.logo}
                    alt={`Logo of ${getLogoName(work.title)}`}
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
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
