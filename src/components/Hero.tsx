import { PlusIcon } from '@heroicons/react/24/outline'
import MagicButton from './MagicButton'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { AuroraBackground } from './ui/AuroraBackground'

const Hero = () => {
  return (
    <section id="home">
      <AuroraBackground>
        <div className="pt-36">
          {/**
           *  UI: grid
           *  change bg color to bg-black-100 and reduce grid color from
           *  0.2 to 0.03
           */}
          <div className="bg-grid-sunflower-600/[0.05] absolute left-0 top-0 flex h-screen w-full items-center justify-center dark:bg-grid-white/[0.03]">
            {/* Radial gradient for the container to give a faded look */}
            <div
              // chnage the bg to bg-black-100, so it matches the bg color and will blend in
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100"
            />
          </div>

          <div className="relative z-10 flex justify-center">
            <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
              {/* <p className="max-w-80 text-center text-xs uppercase tracking-widest text-blue-500 dark:text-blue-100">
              Dynamic Web Magic with Next.js
            </p> */}

              {/**
               *  Link: https://ui.aceternity.com/components/text-generate-effect
               *
               *  change md:text-6xl, add more responsive code
               */}
              <TextGenerateEffect
                words="Unlock the Future with Cutting-Edge Full Stack and Web3 Solutions"
                className="text-center text-[40px] md:text-5xl lg:text-6xl"
              />

              <p className="text-md mb-4 text-center font-light md:text-lg md:tracking-wider lg:text-2xl">
                Hi! I&apos;m Thomas, full-stack developer with a strong focus on web3 and blockchain
                applications.
              </p>

              <a href="#about">
                <MagicButton
                  title="Show my work"
                  icon={<PlusIcon className="h-6 w-6" />}
                  position="right"
                />
              </a>
            </div>
          </div>
        </div>
      </AuroraBackground>
    </section>
  )
}

export default Hero
